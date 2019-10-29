using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.BLL.Interfaces
{
    public interface IImageWorker
    {
        /// <summary>
        /// Додати фото на сервер
        /// </summary>
        /// <param name="base64">Фото у форматі base64</param>
        /// <returns>Повертаємо назву фотки</returns>
        string SaveImage(string base64);
    }
}

