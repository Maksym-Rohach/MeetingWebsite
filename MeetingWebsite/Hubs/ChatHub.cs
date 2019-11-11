using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }
        public void AddMessage(string message)
        {
            var chatMessage = _chatService.CreateNewMessage("Juergen", message);
            // Call the MessageAdded method to update clients.
            //Clients.All.InvokeAsync("MessageAdded", chatMessage);
        }
    }
}
