using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SQLite;

namespace SQLite
{
    class Program
    {
        static void Main(string[] args)
        {
            //In case I want to built a database from the beginning
            string createTable = @"CREATE TABLE IF NOT EXIST
                                 [NameOfTable] (
                                 [Id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                 [Name] NVARCHAR(2048) NULL,
                                 [Gender] NVARCHAR(2048) NULL)";

            Console.WriteLine("Please enter database path");
            string path = Console.ReadLine();
            Console.WriteLine("Please enter amount of cost");
            string amount = Console.ReadLine();
            Console.WriteLine("Please enter type of cost");
            string type = Console.ReadLine();
            Console.WriteLine("Please enter date of cost");
            string date = Console.ReadLine();
            Console.WriteLine("Please enter description of cost");
            string description = Console.ReadLine();
            Console.WriteLine("Please enter user status");
            string userStatus = Console.ReadLine();
            Console.WriteLine("Please enter mood level");
            string moodLevel = Console.ReadLine();
            Console.WriteLine("Please enter location of cost");
            string location = Console.ReadLine();
            //C:/Users/eas/Desktop/git/Financial-Organization/DataBase/costs.sqlite

            //Algorithms.Dbmanipulation.insertToDatabase(path, amount, type, date, description, userStatus, moodLevel, location, "null");


            using (SQLiteConnection connection = new SQLiteConnection("data source = " + path))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(connection))
                {
                    connection.Open();
                    cmd.CommandText = "SELECT* from costs ";
                    using (SQLiteDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Console.WriteLine(Algorithms.Date.Day(reader["date"].ToString()));
                        }
                        connection.Close();
                    }
                }
            }
            Console.ReadLine();

        }
    }
}
