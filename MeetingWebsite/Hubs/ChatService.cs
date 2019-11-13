using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public class ChatService : Hub<IChatService>
    {
        //readonly IClientWaiterProvider _clientWaiterProvider;
        //public AddMessageHub(IClientWaiterProvider clientWaiterProvider)
        //{
        //    _clientWaiterProvider = clientWaiterProvider;
        //}
        //public async Task SendOrder(ReceiveViewModel receivedMod)
        //{
            //var (sendMod, waiters) = await _clientWaiterProvider.ConvertOrderViewModelAsync(receivedMod);
            //foreach (User waiter in waiters)
            //{
            //    await Clients.User(waiter.Id.ToString()).ReceiveOrder(sendMod);
            //}
        //}
        //public async Task SendApprove(ApproveViewModel approveMod)
        //{
            //повернути юзеру, який відправив повідомлення
            //await Clients.User(approveMod.UserId.ToString()).ReceiveApprove(approveMod.DeclinedId);
        //}
    }
}
