using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Hubs
{
    public interface IAddMessage
    {
        Task ReceiveOrder(SendViewModel sendMod);
        Task ReceiveApprove(List<int> declineIds);

    }
}
