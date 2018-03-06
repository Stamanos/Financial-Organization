﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms
{
    public class Holidays
    {
        public int Easter(int year)
        {
            int temp = ((year - 2) % 19) % 30;
            if (temp <= 23)
            {
                return 26 - temp;
            }
            else
            {
                return 57 - temp;
            }
        }
    }
}
