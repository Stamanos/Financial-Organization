using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms
{
    public class Date
    {
        private static string[] days = new string[7];
        private static Dictionary<int, int> months = new Dictionary<int, int>();

        private static void StartingValues()
        {
            months.Clear(); //Anoid to insert the same key
            months.Add(1, 1);
            months.Add(2, 4);
            months.Add(3, 4);
            months.Add(4, 0);
            months.Add(5, 2);
            months.Add(6, 5);
            months.Add(7, 0);
            months.Add(8, 3);
            months.Add(9, 6);
            months.Add(10, 1);
            months.Add(11, 4);
            months.Add(12, 6);

            days[0] = "Saturday";
            days[1] = "Sunday";
            days[2] = "Monday";
            days[3] = "Tuesday";
            days[4] = "Wednesday";
            days[5] = "Thursday";
            days[6] = "Friday";
        }

        public static string Day(string date)
        {
            string[] day = date.Split(' '); //Take only the type etc: 05/02/1997
            string[] numbers = day[0].Split('/');
            bool IsAmericanDate = true;
            int dayNumber, monthNumber, yearNumber;


            try
            {
                if (IsAmericanDate)//if date is writen by America
                {
                    dayNumber = Int32.Parse(numbers[1]);
                    monthNumber = Int32.Parse(numbers[0]);
                }
                else //if date is writen by Europe
                {
                    dayNumber = Int32.Parse(numbers[0]);
                    monthNumber = Int32.Parse(numbers[1]);
                }
                yearNumber = Int32.Parse(numbers[2]);

                StartingValues();

                if (((monthNumber == 1) || (monthNumber == 2)) && ((yearNumber % 4) == 0))
                {
                    return days[YearCode(yearNumber) + months[monthNumber] + dayNumber - 1];
                }
                else
                {
                    return days[(YearCode(yearNumber) + months[monthNumber] + dayNumber) % 7];
                }
            }
            catch (System.IndexOutOfRangeException e)//swallow System.IndexOutOfRangeException
            {
                return "Null";
            }
        }

        private static int CenturyCode(int year)
        {
            if (((year / 100) % 4) == 0)
            {
                return 6;
            }
            else if (((year / 100) % 4) == 1)
            {
                return 4;
            }
            else if (((year / 100) % 4) == 2)
            {
                return 2;
            }
            else
            {
                return 0;
            }
        }

        private static int YearCode(int year)
        {
            return (CenturyCode(year) + year % 100 + (year % 100) / 4) % 7;
        }
    }
}
