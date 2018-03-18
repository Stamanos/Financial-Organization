namespace Screen
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.pl_left = new System.Windows.Forms.Panel();
            this.btn_userGroup = new System.Windows.Forms.Button();
            this.btn_calendar = new System.Windows.Forms.Button();
            this.btn_pin = new System.Windows.Forms.Button();
            this.btn_home = new System.Windows.Forms.Button();
            this.pl_left_up = new System.Windows.Forms.Panel();
            this.lbl_logo = new System.Windows.Forms.Label();
            this.pl_bottom = new System.Windows.Forms.Panel();
            this.lbl_expenses = new System.Windows.Forms.Label();
            this.pb_graph = new System.Windows.Forms.PictureBox();
            this.btn_day = new System.Windows.Forms.Button();
            this.btn_Week = new System.Windows.Forms.Button();
            this.btn_month = new System.Windows.Forms.Button();
            this.btn_Year = new System.Windows.Forms.Button();
            this.pl_indicator = new System.Windows.Forms.Panel();
            this.btn_type = new System.Windows.Forms.Button();
            this.btn_region = new System.Windows.Forms.Button();
            this.pl_left.SuspendLayout();
            this.pl_left_up.SuspendLayout();
            this.pl_bottom.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pb_graph)).BeginInit();
            this.SuspendLayout();
            // 
            // pl_left
            // 
            this.pl_left.Controls.Add(this.btn_userGroup);
            this.pl_left.Controls.Add(this.btn_calendar);
            this.pl_left.Controls.Add(this.btn_pin);
            this.pl_left.Controls.Add(this.btn_home);
            this.pl_left.Controls.Add(this.pl_left_up);
            this.pl_left.Dock = System.Windows.Forms.DockStyle.Left;
            this.pl_left.Location = new System.Drawing.Point(0, 0);
            this.pl_left.Name = "pl_left";
            this.pl_left.Size = new System.Drawing.Size(172, 538);
            this.pl_left.TabIndex = 0;
            // 
            // btn_userGroup
            // 
            this.btn_userGroup.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("btn_userGroup.BackgroundImage")));
            this.btn_userGroup.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btn_userGroup.FlatAppearance.BorderSize = 0;
            this.btn_userGroup.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_userGroup.Font = new System.Drawing.Font("Century Gothic", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(161)));
            this.btn_userGroup.ForeColor = System.Drawing.Color.White;
            this.btn_userGroup.Location = new System.Drawing.Point(0, 440);
            this.btn_userGroup.Name = "btn_userGroup";
            this.btn_userGroup.Size = new System.Drawing.Size(172, 95);
            this.btn_userGroup.TabIndex = 4;
            this.btn_userGroup.Text = "user group";
            this.btn_userGroup.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.btn_userGroup.UseVisualStyleBackColor = true;
            this.btn_userGroup.Click += new System.EventHandler(this.btn_userGroup_Click);
            // 
            // btn_calendar
            // 
            this.btn_calendar.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("btn_calendar.BackgroundImage")));
            this.btn_calendar.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btn_calendar.FlatAppearance.BorderSize = 0;
            this.btn_calendar.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_calendar.Font = new System.Drawing.Font("Century Gothic", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(161)));
            this.btn_calendar.ForeColor = System.Drawing.Color.White;
            this.btn_calendar.Location = new System.Drawing.Point(0, 339);
            this.btn_calendar.Name = "btn_calendar";
            this.btn_calendar.Size = new System.Drawing.Size(172, 95);
            this.btn_calendar.TabIndex = 3;
            this.btn_calendar.Text = "calendar";
            this.btn_calendar.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.btn_calendar.UseVisualStyleBackColor = true;
            this.btn_calendar.Click += new System.EventHandler(this.btn_calendar_Click);
            // 
            // btn_pin
            // 
            this.btn_pin.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("btn_pin.BackgroundImage")));
            this.btn_pin.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btn_pin.FlatAppearance.BorderSize = 0;
            this.btn_pin.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_pin.Font = new System.Drawing.Font("Century Gothic", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(161)));
            this.btn_pin.ForeColor = System.Drawing.Color.White;
            this.btn_pin.Location = new System.Drawing.Point(0, 238);
            this.btn_pin.Name = "btn_pin";
            this.btn_pin.Size = new System.Drawing.Size(172, 95);
            this.btn_pin.TabIndex = 2;
            this.btn_pin.Text = "pin";
            this.btn_pin.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.btn_pin.UseVisualStyleBackColor = true;
            this.btn_pin.Click += new System.EventHandler(this.btn_pin_Click);
            // 
            // btn_home
            // 
            this.btn_home.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("btn_home.BackgroundImage")));
            this.btn_home.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.btn_home.FlatAppearance.BorderSize = 0;
            this.btn_home.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_home.Font = new System.Drawing.Font("Century Gothic", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(161)));
            this.btn_home.ForeColor = System.Drawing.Color.White;
            this.btn_home.Location = new System.Drawing.Point(0, 137);
            this.btn_home.Name = "btn_home";
            this.btn_home.Size = new System.Drawing.Size(172, 95);
            this.btn_home.TabIndex = 1;
            this.btn_home.Text = "home";
            this.btn_home.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.btn_home.UseVisualStyleBackColor = true;
            this.btn_home.Click += new System.EventHandler(this.btn_home_Click);
            // 
            // pl_left_up
            // 
            this.pl_left_up.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.pl_left_up.Controls.Add(this.lbl_logo);
            this.pl_left_up.Dock = System.Windows.Forms.DockStyle.Top;
            this.pl_left_up.Location = new System.Drawing.Point(0, 0);
            this.pl_left_up.Name = "pl_left_up";
            this.pl_left_up.Size = new System.Drawing.Size(172, 111);
            this.pl_left_up.TabIndex = 0;
            // 
            // lbl_logo
            // 
            this.lbl_logo.AutoSize = true;
            this.lbl_logo.Font = new System.Drawing.Font("Century Gothic", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(161)));
            this.lbl_logo.Location = new System.Drawing.Point(-4, 22);
            this.lbl_logo.Name = "lbl_logo";
            this.lbl_logo.Size = new System.Drawing.Size(180, 56);
            this.lbl_logo.TabIndex = 0;
            this.lbl_logo.Text = "TaxWiz";
            // 
            // pl_bottom
            // 
            this.pl_bottom.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(38)))), ((int)(((byte)(40)))), ((int)(((byte)(47)))));
            this.pl_bottom.Controls.Add(this.btn_region);
            this.pl_bottom.Controls.Add(this.btn_type);
            this.pl_bottom.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.pl_bottom.Location = new System.Drawing.Point(172, 434);
            this.pl_bottom.Name = "pl_bottom";
            this.pl_bottom.Size = new System.Drawing.Size(802, 104);
            this.pl_bottom.TabIndex = 0;
            // 
            // lbl_expenses
            // 
            this.lbl_expenses.AutoSize = true;
            this.lbl_expenses.Location = new System.Drawing.Point(221, 31);
            this.lbl_expenses.Name = "lbl_expenses";
            this.lbl_expenses.Size = new System.Drawing.Size(124, 21);
            this.lbl_expenses.TabIndex = 1;
            this.lbl_expenses.Text = "Total expenses";
            // 
            // pb_graph
            // 
            this.pb_graph.Location = new System.Drawing.Point(191, 67);
            this.pb_graph.Name = "pb_graph";
            this.pb_graph.Size = new System.Drawing.Size(755, 361);
            this.pb_graph.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pb_graph.TabIndex = 2;
            this.pb_graph.TabStop = false;
            // 
            // btn_day
            // 
            this.btn_day.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_day.Location = new System.Drawing.Point(871, 22);
            this.btn_day.Name = "btn_day";
            this.btn_day.Size = new System.Drawing.Size(75, 39);
            this.btn_day.TabIndex = 3;
            this.btn_day.Text = "Day";
            this.btn_day.UseVisualStyleBackColor = true;
            this.btn_day.Click += new System.EventHandler(this.btn_day_Click);
            // 
            // btn_Week
            // 
            this.btn_Week.FlatAppearance.BorderSize = 0;
            this.btn_Week.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_Week.Location = new System.Drawing.Point(790, 22);
            this.btn_Week.Name = "btn_Week";
            this.btn_Week.Size = new System.Drawing.Size(75, 39);
            this.btn_Week.TabIndex = 4;
            this.btn_Week.Text = "Week";
            this.btn_Week.UseVisualStyleBackColor = true;
            this.btn_Week.Click += new System.EventHandler(this.btn_Week_Click);
            // 
            // btn_month
            // 
            this.btn_month.FlatAppearance.BorderSize = 0;
            this.btn_month.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_month.Location = new System.Drawing.Point(709, 22);
            this.btn_month.Name = "btn_month";
            this.btn_month.Size = new System.Drawing.Size(75, 39);
            this.btn_month.TabIndex = 5;
            this.btn_month.Text = "Month";
            this.btn_month.UseVisualStyleBackColor = true;
            this.btn_month.Click += new System.EventHandler(this.btn_month_Click);
            // 
            // btn_Year
            // 
            this.btn_Year.FlatAppearance.BorderSize = 0;
            this.btn_Year.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_Year.Location = new System.Drawing.Point(628, 22);
            this.btn_Year.Name = "btn_Year";
            this.btn_Year.Size = new System.Drawing.Size(75, 39);
            this.btn_Year.TabIndex = 6;
            this.btn_Year.Text = "Year";
            this.btn_Year.UseVisualStyleBackColor = true;
            this.btn_Year.Click += new System.EventHandler(this.btn_Year_Click);
            // 
            // pl_indicator
            // 
            this.pl_indicator.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.pl_indicator.Location = new System.Drawing.Point(178, 137);
            this.pl_indicator.Name = "pl_indicator";
            this.pl_indicator.Size = new System.Drawing.Size(7, 95);
            this.pl_indicator.TabIndex = 7;
            // 
            // btn_type
            // 
            this.btn_type.FlatAppearance.BorderSize = 0;
            this.btn_type.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_type.Location = new System.Drawing.Point(6, 51);
            this.btn_type.Name = "btn_type";
            this.btn_type.Size = new System.Drawing.Size(75, 39);
            this.btn_type.TabIndex = 8;
            this.btn_type.Text = "Type";
            this.btn_type.UseVisualStyleBackColor = true;
            this.btn_type.Click += new System.EventHandler(this.btn_type_Click);
            // 
            // btn_region
            // 
            this.btn_region.FlatAppearance.BorderSize = 0;
            this.btn_region.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_region.Location = new System.Drawing.Point(6, 6);
            this.btn_region.Name = "btn_region";
            this.btn_region.Size = new System.Drawing.Size(75, 39);
            this.btn_region.TabIndex = 9;
            this.btn_region.Text = "Region";
            this.btn_region.UseVisualStyleBackColor = true;
            this.btn_region.Click += new System.EventHandler(this.btn_region_Click);
            // 
            // Form1
            // 
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.None;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(41)))), ((int)(((byte)(44)))), ((int)(((byte)(51)))));
            this.ClientSize = new System.Drawing.Size(974, 538);
            this.Controls.Add(this.pl_indicator);
            this.Controls.Add(this.btn_Year);
            this.Controls.Add(this.btn_month);
            this.Controls.Add(this.btn_Week);
            this.Controls.Add(this.btn_day);
            this.Controls.Add(this.pb_graph);
            this.Controls.Add(this.lbl_expenses);
            this.Controls.Add(this.pl_bottom);
            this.Controls.Add(this.pl_left);
            this.Font = new System.Drawing.Font("Century Gothic", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(161)));
            this.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(62)))), ((int)(((byte)(120)))), ((int)(((byte)(138)))));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.pl_left.ResumeLayout(false);
            this.pl_left_up.ResumeLayout(false);
            this.pl_left_up.PerformLayout();
            this.pl_bottom.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pb_graph)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel pl_left;
        private System.Windows.Forms.Panel pl_bottom;
        private System.Windows.Forms.Button btn_home;
        private System.Windows.Forms.Panel pl_left_up;
        private System.Windows.Forms.Label lbl_logo;
        private System.Windows.Forms.Label lbl_expenses;
        private System.Windows.Forms.Button btn_userGroup;
        private System.Windows.Forms.Button btn_calendar;
        private System.Windows.Forms.Button btn_pin;
        private System.Windows.Forms.PictureBox pb_graph;
        private System.Windows.Forms.Button btn_day;
        private System.Windows.Forms.Button btn_Week;
        private System.Windows.Forms.Button btn_month;
        private System.Windows.Forms.Button btn_Year;
        private System.Windows.Forms.Panel pl_indicator;
        private System.Windows.Forms.Button btn_type;
        private System.Windows.Forms.Button btn_region;
    }
}

