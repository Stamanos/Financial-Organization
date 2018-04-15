using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
using Excel = Microsoft.Office.Interop.Excel;


namespace Algorithms
{
    public class Data
    {
        public class MicrosoftExcel
        {
            string file = @"C:\Users\thema\Desktop\Algorithms\costs.xlsx";
            //Console.WriteLine(file);

            Excel.Application excel = null;
            Excel.Workbook wkb = null;

            private void ExcelOpen()
            {
                var excelApp = new Excel.Application();
                excelApp.Visible = true;
                Workbook wb = excelApp.Workbooks.Open(@"C:\Users\thema\Desktop\Algorithms\costs.xlsx");
                Worksheet ws = (Worksheet)wb.Worksheets[1];
                Excel.Range xlRange = ws.UsedRange;
            }
        }
    }
}
