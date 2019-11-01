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
            if (User.Claims.ToList()[0] != null)
            {
                if (User.Claims.ToList()[0].Value.ToString() != filter.chat.SenderId||
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
            ListMessages model = new ListMessages();
            foreach (var item in array)
            {
                model.messages.Add(new ModelMessage { SenderId = item.SenderId, DateCreate = item.DateCreate, RecipientId = item.RecipientId, Text = item.Text });
            }



            return Ok(model);
        }
        [HttpPost("sendmessage")]
        public ActionResult AddMessage([FromBody]ModelSendMessage message)
        {
            if (User.Claims.ToList()[0] != null)
            {
                if (User.Claims.ToList()[0].Value.ToString() != message.SenderId)
                {
                    return BadRequest();
                }

            }

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
        public ActionResult<IsSuccess> DeleteMessage([FromBody]ModelMessage message)
        {
            if (User.Claims.ToList()[0] != null)
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

            return Ok();
        }
        [HttpPost("getchats")]
        public ActionResult<ListChats> GetChats([FromBody]UserModel UserID)
        {
            //User.Claims.ToList()[0].Value.ToString();


            if (User.Claims.ToList()[0] != null)
            {
                if (User.Claims.ToList()[0].Value.ToString() != UserID.UserID)
                {
                    return BadRequest();
                }

            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            List<UserProfile> interlocutors = new List<UserProfile>();
            UserProfile visitor;
            try
            {

                visitor = _context.UserProfile
                    .SingleOrDefault(x => x.Id == UserID.UserID);
                interlocutors = visitor
                    .Messages.GroupBy(x => x.UserRecipient.UserProfile)
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
                interlocutors.AddRange(visitor
                    .Messages.GroupBy(x => x.UserSender)
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

            ListChats chats = new ListChats();
            chats.Chats = new List<Chat>();
            interlocutors.ForEach(x => chats.Chats.Add(
                new Chat { RecipientId = x.Id, SenderId = UserID.UserID, RecipientName = x.NickName, SenderName = visitor.NickName }
                ));


            return Ok(interlocutors);
        }



    }

}