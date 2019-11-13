using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingWebsite.Areas.User.ViewModels.RostyslavModels;
using MeetingWebsite.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace MeetingWebsite.Areas.User.Controllers.RosyslavControllers
{
    public class SendHub : Hub
    {
        private readonly EFDbContext _context;
        public SendHub(EFDbContext context)
        {
            _context = context;
        }
        public void Send(ModelMessage message)
        {
            Messages mess = new Messages { RecipientId = message.RecipientId, SenderId = message.SenderId, Text = message.Text, DateCreate = DateTime.Now };
            if (!mess.IsValide())
            {
                return;
            }
            var Sender = _context.UserProfile.FirstOrDefault(x => x.Id == mess.SenderId);
            if (Sender == null)
            {
                return;
            }
            if (Sender.Messages == null)
            {
                Sender.Messages = new List<Messages>();
            }


            var Recip = _context.UserRecipient.FirstOrDefault(x => x.Id == mess.RecipientId);


            if (Recip == null)
            {

                var recProfile = _context.UserProfile.FirstOrDefault(x => x.Id == mess.RecipientId);
                if (recProfile == null)
                {
                    return;
                }
                UserRecipient user = new UserRecipient { Id = recProfile.Id, Messages = new List<Messages>() };
                Recip = user;
                _context.UserRecipient.Add(user);

            }
            var messages =
            _context.Messages;
            messages.Add(mess);

            _context.SaveChanges();



            
            Clients.All.SendAsync(message.RecipientId, message);
        }

        // Подключение нового пользователя
        //public void Connect(string userName)
        //{
        //    Context.C
        //    var id = Context.ConnectionId;


        //    if (!Users.Any(x => x.ConnectionId == id))
        //    {
        //        Users.Add(new User { ConnectionId = id, Name = userName });

        //        // Посылаем сообщение текущему пользователю
        //        Clients.Caller.onConnected(id, userName, Users);

        //        // Посылаем сообщение всем пользователям, кроме текущего
        //        Clients.AllExcept(id).onNewUserConnected(id, userName);
        //    }
        //}

        //// Отключение пользователя
        //public Task OnDisconnected(bool stopCalled)
        //{
        //    var item = Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
        //    if (item != null)
        //    {
        //        Users.Remove(item);
        //        var id = Context.ConnectionId;
        //        Clients.All.onUserDisconnected(id, item.Name);
        //    }

        //    return base.OnDisconnected(stopCalled);
        //}
    }
}