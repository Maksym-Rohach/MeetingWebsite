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
        public ChatController(EFDbContext context)
        {
            _context = context;
        }


        [HttpPost("gg")]
        public ActionResult<List<Messages>> GG([FromBody]MessageFilter filter)
        {
            var y = _context.UserProfile.Where(x => x.Id == filter.chat.SenderId).FirstOrDefault();

            return Ok(y.Messages);
        }
        [HttpPost("loadmessages")]
        public ActionResult<List<ModelMessage>> GetMessageList([FromBody]MessageFilter  filter)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }
            var array = _context.Messages.Where(x => (x.SenderId == filter.chat.SenderId ||
                x.SenderId == filter.chat.RecipientId) && (x.RecipientId == filter.chat.RecipientId ||
                x.RecipientId == filter.chat.SenderId))
                .Select(m => new ModelMessage
                {
                    SenderId = m.SenderId,
                    DateCreate = m.DateCreate,
                    RecipientId = m.RecipientId,
                    Text = m.Text
                }).ToList();
            //List<ModelMessage> models = new List<ModelMessage>();
            //foreach (var item in array)
            //{
            //    models.Add(new ModelMessage { SenderId = item.SenderId, DateCreate = item.DateCreate, RecipientId = item.RecipientId, Text = item.Text });
            //}



            return Ok(array);
        }
        [HttpPost("sendmessage")]
        public ActionResult AddMessage([FromBody]ModelSendMessage message)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }
            Messages mess = new Messages { RecipientId = message.RecipientId, SenderId = message.SenderId, Text = message.Text, DateCreate=DateTime.Now };
            if (!mess.IsValide())
            {
                return BadRequest();
            }
            var Sender = _context.UserProfile.Where(x => x.Id == mess.SenderId).FirstOrDefault();
            if (Sender == null)
            {
                return BadRequest();
            }
            if (Sender.Messages == null)
            {
                Sender.Messages = new List<Messages>();
            }
            

            var Recip = _context.UserRecipient.Where(x => x.Id == mess.RecipientId).FirstOrDefault();


            if (Recip==null ){

                var recProfile = _context.UserProfile.Where(x => x.Id == mess.RecipientId).FirstOrDefault();
                if (recProfile== null)
                {
                    return BadRequest();
                }
                UserRecipient user = new UserRecipient { Id = recProfile.Id, Messages = new List<Messages>() };
                Recip = user;
                _context.UserRecipient.Add(user);

            }
            var messages=
            _context.Messages;
            messages.Add(mess);

            _context.SaveChanges();




            return Ok();
        }
        [HttpPost("deletemessage")]
        public ActionResult<List<Chat>> DeleteMessage([FromBody]ModelSendMessage message)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }


            Messages mess = new Messages { RecipientId = message.RecipientId, SenderId = message.SenderId, Text = message.Text };
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }
            try
            {
                var Sender = _context.UserProfile.Where(x => x.Id == mess.RecipientId).FirstOrDefault();
                var Recip = _context.UserRecipient.Where(x => x.Id == mess.RecipientId).FirstOrDefault();
                var Mess = Recip.Messages.Where(x => x.SenderId == message.SenderId && message.RecipientId == x.RecipientId && x.Text == mess.Text).FirstOrDefault();
                Recip.Messages.Remove(Mess);

                Sender.Messages.Remove(Mess);

                _context.Messages.Remove(Mess);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                return BadRequest();
            }

            return Ok();
        }
        [HttpPost("GetChats")]
        public ActionResult<List<string>> GetChats([FromBody]UserModel UserID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            List<string> interlocutors = new List<string>();
            try
            {
                interlocutors = _context.UserProfile
                    .SingleOrDefault(x => x.Id == UserID.UserID)
                    .Messages.GroupBy(x => x.RecipientId)
                    .Select(i => i.Key).ToList();
               
                //foreach (var item in _context.UserProfile.Where(x => x.Id == UserID.UserID).FirstOrDefault().Messages.GroupBy(x => x.RecipientId).ToList())
                //{
                //    interlocutors.Add(item.Key);
                //}
            }
            catch (Exception)
            {

                return BadRequest();
            }
            try
            {
                interlocutors.AddRange( _context.UserProfile
                    .SingleOrDefault(x => x.Id == UserID.UserID)
                    .Messages.GroupBy(x => x.SenderId)
                    .Select(i => i.Key).ToList());
                //foreach (var item in _context.UserRecipient.Where(x => x.Id == UserID.UserID).FirstOrDefault().Messages.GroupBy(x => x.SenderId).ToList())
                //{
                //    interlocutors.Add(item.Key);
                //}
            }
            catch (Exception)
            {
                try
                {
                    UserRecipient recipient = new UserRecipient();
                    recipient.Id = UserID.UserID;
                    recipient.Messages = new List<Messages>();
                    _context.UserRecipient.Add(recipient);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    return BadRequest();
                }

            }


            return Ok(interlocutors);
        }
    }

}