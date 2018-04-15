using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Screen
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            lbl_DatePicker.Hide();
            dateTimePicker.Hide();
        }

        private void ButonPressed(Button button)
        {
            pl_indicator.Height = button.Height;
            pl_indicator.Top = button.Top;
            btn_done.Hide();
        }

        private void ButtonPressed(Button button)
        {
            btn_day.FlatAppearance.BorderSize = 0;
            btn_Week.FlatAppearance.BorderSize = 0;
            btn_month.FlatAppearance.BorderSize = 0;
            btn_Year.FlatAppearance.BorderSize = 0;
            btn_type.FlatAppearance.BorderSize = 0;
            btn_region.FlatAppearance.BorderSize = 0;
            button.FlatAppearance.BorderSize = 1;
        }

        private void btn_home_Click(object sender, EventArgs e)
        {
            ButonPressed(btn_home);
        }

        private void btn_pin_Click(object sender, EventArgs e)
        {
            ButonPressed(btn_pin);
        }

        private void btn_calendar_Click(object sender, EventArgs e)
        {
            ButonPressed(btn_calendar);
        }

        private void btn_userGroup_Click(object sender, EventArgs e)
        {
            ButonPressed(btn_userGroup);
        }

        private void btn_Year_Click(object sender, EventArgs e)
        {
            ButtonPressed(btn_Year);
        }

        private void btn_Week_Click(object sender, EventArgs e)
        {
            ButtonPressed(btn_Week);
        }

        private void btn_month_Click(object sender, EventArgs e)
        {
            ButtonPressed(btn_month);
            pb_graph.Image = Image.FromFile("C:/Users/thema/Desktop/projects/C#/Algorithms/graphs/3.png");
        }

        private void btn_day_Click(object sender, EventArgs e)
        {
            ButtonPressed(btn_day);
            lbl_DatePicker.Show();
            dateTimePicker.Show();
            btn_done.Show();
        }

        private void btn_region_Click(object sender, EventArgs e)
        {
            ButtonPressed(btn_region);
            pb_graph.Image = Image.FromFile("C:/Users/thema/Desktop/projects/C#/Algorithms/graphs/2.png");
        }

        private void btn_type_Click(object sender, EventArgs e)
        {
            ButtonPressed(btn_type);
            pb_graph.Image = Image.FromFile("C:/Users/thema/Desktop/projects/C#/Algorithms/graphs/1.png");
        }

        private void pb_graph_Click(object sender, EventArgs e)
        {

        }
    }
}
