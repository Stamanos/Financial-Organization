using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace screen
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Εισάγεται ημερομηνία (μέρα/μήνα/χρόνο)");
            string date = Console.ReadLine();
            Console.WriteLine(Algorithms.Date.Day(date));
            Console.WriteLine(Algorithms.Holidays.Easter(2018).ToString());
            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}
