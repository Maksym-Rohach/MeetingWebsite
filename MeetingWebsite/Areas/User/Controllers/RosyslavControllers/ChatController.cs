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
        
        [HttpPost("loadmessages")]
        public ActionResult<ListMessages> GetMessageList([FromBody]MessageFilter  filter)
        {
            if (filter.Count < 0 || filter.From < 0)
            {
                return BadRequest();
            }
            if (User.Claims.ToList().Count>0)
            {
                var a = User.Claims.ToList()[0].Value;
                if (User.Claims.ToList()[0].Value.ToString() != filter.chat.SenderId&&
                    User.Claims.ToList()[0].Value.ToString() != filter.chat.RecipientId)
                {
                    return BadRequest();
                }

            }
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }
            var array = _context.Messages
                .Where(x => (x.SenderId == filter.chat.SenderId || x.SenderId == filter.chat.RecipientId) 
                   && (x.RecipientId == filter.chat.RecipientId || x.RecipientId == filter.chat.SenderId)).ToList();
            array.Reverse();
            ListMessages model = new ListMessages();
            model.messages=new List<ModelMessage>();
            for (int i = filter.From; i < filter.Count+filter.From&&i < array.Count; i++)
            {
                model.messages.Add(new ModelMessage { SenderId = array[i].SenderId, DateCreate = array[i].DateCreate, RecipientId = array[i].RecipientId, Text = array[i].Text });
            }



            return Ok(model);
        }
        [HttpPost("sendmessage")]
        public ActionResult AddMessage([FromBody]ModelSendMessage message)
        { 

            //if (User.Claims.ToList().Count>0)
            //{
            //    if (User.Claims.ToList()[0].Value.ToString() != message.SenderId)
            //    {
            //        return BadRequest();
            //    }
            //
            //}

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
            var Sender = _context.UserProfile.FirstOrDefault(x => x.Id == mess.SenderId);
            if (Sender == null)
            {
                return BadRequest();
            }
            if (Sender.Messages == null)
            {
                Sender.Messages = new List<Messages>();
            }
            

            var Recip = _context.UserRecipient.FirstOrDefault(x => x.Id == mess.RecipientId);


            if (Recip==null ){

                var recProfile = _context.UserProfile.FirstOrDefault(x => x.Id == mess.RecipientId);
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
        public ActionResult<ChatIsSuccess> DeleteMessage([FromBody]ModelMessage message)
        {
            if (User.Claims.ToList().Count>0)
            {
                if (User.Claims.ToList()[0].Value.ToString() != message.SenderId|| User.Claims.ToList()[0].Value.ToString()!=message.RecipientId)
                {
                    return BadRequest();
                }

            }



            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }
            try
            {
                var Message = _context.Messages.First(x => 
                    x.RecipientId == message.RecipientId && x.SenderId == message.SenderId && 
                    x.Text == message.Text && x.DateCreate == message.DateCreate);
                if (Message == null)
                {
                    return BadRequest();

                }

                var Sender = Message.UserSender;
                var Recip = Message.UserRecipient;
                
                Recip.Messages.Remove(Message);

                Sender.Messages.Remove(Message);

                _context.Messages.Remove(Message);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                return BadRequest();
            }
            ChatIsSuccess isSuccess = new ChatIsSuccess { IsSuccess = true };
            return Ok(isSuccess);
        }
        [HttpPost("getchats")]
        public ActionResult<ListChats> GetChats([FromBody]UserModel UserID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var AllIncomeMessage = _context.Messages.Where(x => x.RecipientId == UserID.UserID).ToList();
            AllIncomeMessage.Reverse();
            List<UserProfile> interlocutors = new List<UserProfile>();
            interlocutors.AddRange(_context.Messages.Where(x => x.SenderId == UserID.UserID).GroupBy(x=>x.UserRecipient.UserProfile).Select(x => x.Key).ToList());
            interlocutors.AddRange(_context.Messages.Where(x => x.RecipientId == UserID.UserID).GroupBy(x => x.UserSender).Select(x => x.Key).ToList());
            interlocutors = interlocutors.GroupBy(x => x.Id).Select(x => x.First()).ToList();
            ListChats chats = new ListChats();
            chats.Chats = new List<Chat>();

            interlocutors.ForEach(x => chats.Chats.Add(
                new Chat { RecipientId = x.Id, SenderId = UserID.UserID, name=x.NickName, path="/"+x.Id, CountUnreaded=GetCountIncomeMessages(x.Id, AllIncomeMessage)}
                ));


            return Ok(chats);
        }
        [HttpPost("informread")]
        public ActionResult InforRead([FromBody]Chat chat)
        {
            var messages = _context.Messages.Where(x => x.SenderId == chat.RecipientId && x.RecipientId == chat.SenderId).ToList();
            messages.ForEach(x=>x.DateRecipientRead=DateTime.Now);
            _context.SaveChanges();
            return Ok();
        }
        public int GetCountIncomeMessages(string senderId, List<Messages> messages )
        {
            int i = 0;
            var message_s = messages.Where(x => x.SenderId == senderId).ToList();
            for (; i < message_s.Count; i++)
            {
                if (message_s[i].DateRecipientRead != null)
                {
                    return i;
                }
            }
            return i;
        }

    }

}