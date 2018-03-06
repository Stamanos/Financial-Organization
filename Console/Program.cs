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
            Console.WriteLine(Algorithms.Date.Day(3, 3, 2018));
            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}
