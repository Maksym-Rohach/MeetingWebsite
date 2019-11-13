using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public interface IChatService
    {
        Task CreateNewMessage(string nickname, string message);
        //Task ReceiveOrder(SendViewModel sendMod);
        //Task ReceiveApprove(List<int> declineIds);

    }
}
