using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.User.ViewModels.RostyslavModels;
using MeetingWebsite.DAL.Entities;
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
        [HttpPost("messages")]
        public ActionResult<ChatMessageList> GetMessageList([FromBody]int ThisId,int AnotherId )
        {


            ChatMessageList list = new ChatMessageList();
            //var LastMessage _context.AdminProfiles.Find(new { ThisId, AnotherId }).LastMessage;
            //list.Messages.Add(LastMessage);
            //for (int i = 0; i < 20; i++)
            //{
            //if (LastMessage.prewiew == null)
            //{
            //    return Ok(list);
            //}
            //    list.Messages.Add(LastMessage.prewiew);
            //    LastMessage = LastMessage.prewiew;
            //}
            return Ok(list);
        }
        public ActionResult<ChatMessageList> LoadMessages([FromBody]ChatMessage mess)
        {


            ChatMessageList list = new ChatMessageList();
            //for (int i = 0; i < 20; i++)
            //{
            //    if (mess.pewiew == null)
            //    {
            //        return Ok(list);
            //    }
            //    list.Messages.Add(mess.prewiew);
            //    
            //    mess = mess.prewiew;
            //}
            return Ok(list);
        }
        public ActionResult AddMessage([FromBody]ChatMessage mess)
        {
            //var Chat = _context.AdminProfiles.Find(new { mess.SenderId, ToId });
            //mess.PrewiewId = Chat.LastMess.Id;
            //Chat.LastMess = mess;
            //_context.SaveChanges();
            return Ok();
        }
    }
}