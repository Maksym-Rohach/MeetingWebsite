using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MeetingWebsite.Services
{
    static public class PasswordGenerator
    {
        public static string GenerationPassword()
        {
            string regex = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,9}$";

            while (true)
            {
                string str = Generation();
                var match = Regex.Match(str, regex, RegexOptions.IgnoreCase);
                if (match.Success) { return str; }
            }


        }

        static string Generation()
        {
            const string valid = "abcdefghjkmnpqrstuvwxyz";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random(Guid.NewGuid().GetHashCode());
            int length = 8;
            while (0 <= length--)
            {
                res.Append(valid[rnd.Next(0, valid.Length)]);
            }
            return CheckPassword(res.ToString());
        }

        static string CheckPassword(string pass)
        {
            const string BigLeter = "ABCDEFGHJKMNPQRSTUVWXYZ";
            const string number = "23456789";
            const string symb = "-";
            int countNum = 0, countBigLet = 0, countSymb = 0;
            Random random = new Random(Guid.NewGuid().GetHashCode());
            char[] pas = pass.ToCharArray();

            for (int i = random.Next(0, pas.Length); i < pas.Length; i = random.Next(0, pas.Length))
            {
                if (Char.IsLower(pas[i]))
                {
                    pas[i] = number[random.Next(number.Length)];
                    countNum++;
                }
                if (countNum == 2)
                    break;
            }
            for (int i = random.Next(0, pas.Length); i < pas.Length; i = random.Next(0, pas.Length))
            {
                if (Char.IsLower(pas[i]))
                {
                    pas[i] = BigLeter[random.Next(BigLeter.Length)];
                    countBigLet++;
                }
                if (countBigLet == pas.Length - 5)
                    break;
            }
            for (int i = random.Next(0, pas.Length); i < pas.Length; i = random.Next(0, pas.Length))
            {
                if (Char.IsLower(pas[i]) || Char.IsUpper(pas[i]))
                {
                    pas[i] = symb[random.Next(symb.Length)];
                    countSymb++;
                }
                if (countSymb == 1)
                    break;
            }
            pass = new string(pas);
            return pass;
        }


    }
}
