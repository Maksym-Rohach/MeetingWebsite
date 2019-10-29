using MeetingWebsite.BLL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingWebsite.BLL.Services
{
    public class ImageWorker : IImageWorker
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public ImageWorker(IConfiguration configuration, IHostingEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        public string SaveImage(string base64)
        {
            string folderName = _configuration.GetValue<string>("ImagesPath");
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }

            using (Bitmap bmp = this.ConvertToBitmap(base64))
            {
                if (bmp != null)
                {
                    string pathServer = _env.ContentRootPath;
                    string dirPath = Path.Combine(pathServer, folderName);
                    if (!Directory.Exists(dirPath))
                    {
                        Directory.CreateDirectory(dirPath);
                    }
                    var imageName = Path.GetRandomFileName() + ".jpg";

                    var resultImage = this.CompressImage(bmp, 50, 50);
                    string fileSave = Path.Combine(dirPath, "50_" + imageName);
                    resultImage.Save(fileSave, ImageFormat.Jpeg);

                    resultImage = this.CompressImage(bmp, 100, 100);
                    fileSave = Path.Combine(dirPath, "100_" + imageName);
                    resultImage.Save(fileSave, ImageFormat.Jpeg);

                    return imageName;
                }
            }
            return null;
        }

        private Bitmap ConvertToBitmap(string base64)
        {
            try
            {
                byte[] byteBuffer = Convert.FromBase64String(base64);
                using (MemoryStream memoryStream = new MemoryStream(byteBuffer))
                {
                    memoryStream.Position = 0;
                    using (Image imgReturn = Image.FromStream(memoryStream))
                    {
                        memoryStream.Close();
                        byteBuffer = null;
                        return new Bitmap(imgReturn);
                    }
                }
            }
            catch { return null; }
        }

        /// <summary>
        /// Зміна розширення фото (Якщо розмір фото менший максимальної ширини, 
        /// то залишає оригінальну ширину або висоту)
        /// </summary>
        /// <param name="originalPic">Вхідне фото</param>
        /// <param name="maxWidth">максильний розмір, який має бути для фото</param>
        /// <param name="maxHeight">максимальна ширина яка може бути для фото</param>
        /// <returns>Вертаємо нове фото з новими розмірами із збереженням пропорцій </returns>
        private Bitmap CompressImage(Bitmap originalPic, int maxWidth, int maxHeight)
        {
            try
            {
                //Оригінальні розміри
                int width = originalPic.Width;
                int height = originalPic.Height;
                //Співідношення сторін відносно нового зображення
                int widthDiff = width - maxWidth;
                int heightDiff = height - maxHeight;
                //Обчислюємо більша ширина фото чи більша висота фото відносно пропорцій
                bool doWidthResize = (maxWidth > 0 && width > maxWidth && widthDiff > heightDiff);
                bool doHeightResize = (maxHeight > 0 && height > maxHeight && heightDiff > widthDiff);
                //Обчислюємо розмір вихідного фото, яке має получитися на виході,
                //щоб зберегти пропорції
                if (doWidthResize || doHeightResize || (width.Equals(height) && widthDiff.Equals(heightDiff)))
                {
                    int iStart;
                    Decimal divider;
                    if (doWidthResize)
                    {
                        iStart = width;
                        divider = Math.Abs((Decimal)iStart / maxWidth);
                        width = maxWidth;
                        height = (int)Math.Round((height / divider));
                    }
                    else
                    {
                        iStart = height;
                        divider = Math.Abs((Decimal)iStart / maxHeight);
                        height = maxHeight;
                        width = (int)Math.Round(width / divider);
                    }
                }
                //Робимо зображення, що буде на виході
                using (Bitmap outBmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
                {
                    //Робимо перо (контекст), який буде малювати по новому зображенню
                    using (Graphics oGraphics = Graphics.FromImage(outBmp))
                    {
                        //oGraphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
                        //oGraphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                        //Перемальовуємо старе фото на нове із вказанням звідки починати і куди малювати 
                        oGraphics.DrawImage(originalPic, 0, 0, width, height);
                        //Водяний знак
                        //Font font = new Font("Arial", 20);
                        //Brush brash = new SolidBrush(Color.Blue);
                        //oGraphics.DrawString("Hello Vova", font, brash, new Point(25, 25));
                        //Вертаємо нову фотку
                        return new Bitmap(outBmp);
                    }
                }
            }
            //В кетч попадає тоді коли файл це не фото, 
            //не вистачило оперативки 
            catch
            {
                return null;
            }
        }
    }
}

