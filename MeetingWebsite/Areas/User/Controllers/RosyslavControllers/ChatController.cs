using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.User.ViewModels.RostyslavModels;
using MeetingWebsite.DAL.Entities;
using MeetingWebsite.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MeetingWebsite.Areas.User.Controllers.RosyslavControllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly EFDbContext _context;

        [HttpPost("getusers")]
        public ActionResult<List<UserProfile>> GetDatabaseUsers()
        {
            
            return Ok(_context.UserProfile);
        }

        public ChatController(EFDbContext context)
        {
            _context = context;
        }
        [HttpPost("loadmessages")]
        public ActionResult<List<Messages>> GetMessageList([FromBody]MessageFilter  filter)
        {
            //if(Mode)
            List<Messages> messageList = new List<Messages>();
            //var lis=_context.UserRecipient.Where(x=>x.)
            List<Messages> mess = new List<Messages>();
            _context.UserProfile.Where(x => x.Id == filter.chat.SenderId||x.Id==filter.chat.SenderId).ToList().ForEach(x =>mess.AddRange(x.Messages.Where(y => y.RecipientId == filter.chat.RecipientId||y.RecipientId==filter.chat.SenderId)));
            mess.Sort((x, y) =>DateTime.Compare(x.DateCreate, y.DateCreate));
            
                //x=>x.Messages.Where(x=>x.RecipientId==filter.chat.RecipientId);)
            




            var list= _context.Messages.Reverse().Where(x => x.SenderId == filter.chat.SenderId && x.RecipientId == filter.chat.RecipientId).Take(filter.Count).ToList();
            
            for (int i = 0; i < list.Count; i++)
            {
               // messageList.Messages.Add(new Messages { Text = list[i].Text, Id = list[i].Id, SenderId = list[i].SenderId, SendTime = list[i].DateCreate, DateRead = list[i].DateRecipientRead, chat = new Chat { RecipientId = list[i].RecipientId, SenderId = list[i].SenderId } });
            }
            return Ok(messageList);
        }
        [HttpPost("sendmessage")]
        public ActionResult AddMessage([FromBody]ModelSendMessage message)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }


            Messages mess = new Messages { RecipientId=message.RecipientId, SenderId=message.SenderId, Text= message.Text};

            if (!mess.IsValide())
            {
                return BadRequest();
            }

            
                var Recip = _context.UserRecipient.Where(x => x.Id == mess.RecipientId).ToList();
                if (Recip.Count() > 0)
                {
                    Recip[0].Messages.Add(mess);
                }
                else
                {

                    var rec = _context.UserProfile.Where(x => x.Id == mess.RecipientId).ToList();
                    if (rec.Count <= 0)
                    {
                        return BadRequest();
                    }
                    UserRecipient user = new UserRecipient { Id = rec[0].Id, Messages = new List<Messages>(new Messages[] { mess }), UserProfile = rec[0] };
                    _context.UserRecipient.Add(user);
                    Recip.Add(user);

                }
           

            var Sender = _context.UserProfile.Where(x => x.Id == mess.SenderId).ToList();
            if (Sender.Count == 0)
            {
                return BadRequest();
            }
            if (Sender[0].Messages == null)
            {
                Sender[0].Messages = new List<Messages>();
            }
            Sender[0].Messages.Add(mess);

            _context.Messages.Add(mess);




            mess.UserRecipient = Recip[0];
            mess.UserSender = Sender[0];
            mess.DateCreate = DateTime.Now;
            Recip[0].UserProfile= _context.UserProfile.Where(x => x.Id == mess.RecipientId).ToList()[0];

            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("addchat")]
        public ActionResult AddChat([FromBody]Chat chat)
        {
            UserRecipient userRecipient = new UserRecipient();
            //userRecipient.

            //var Chat = _context.AdminProfiles.Find(new { mess.SenderId, ToId });
            //mess.PrewiewId = Chat.LastMess.Id;
            //Chat.LastMess = mess;
            //_context.SaveChanges();
            return Ok();
        }
    }
}