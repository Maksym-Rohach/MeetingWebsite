using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.Services
{
    public interface IFileService
    {
        string UploadImage(string base64, string pathConfig);
    }
}
