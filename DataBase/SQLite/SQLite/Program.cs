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


            using (SQLiteConnection connection = new SQLiteConnection("data source = C:/Users/eas/Desktop/Financial-Organization/DataBase/costs.sqlite"))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(connection))
                {
                    connection.Open();


                    //__________TKE INPUTS FROM THE USER______________
                    Console.WriteLine("Please incert amount of cost!");
                    var amount = Console.ReadLine();
                    Console.WriteLine("Please incert type of cost!");
                    var type = Console.ReadLine();
                    Console.WriteLine("Please incert date of cost!");
                    var date = Console.ReadLine();
                    Console.WriteLine("Please incert description of cost!");
                    var description = Console.ReadLine();
                    Console.WriteLine("Please incert user status!");
                    var userStatus = Console.ReadLine();
                    Console.WriteLine("Please incert mood level!");
                    var moodLevel = Console.ReadLine();
                    var weather = "NULL";
                    Console.WriteLine("Please incert location of cost!");
                    var location = Console.ReadLine();
                    
                    string results = "Amount : " + amount.ToString() + ", " +
                                      "Type : " + type.ToString() + ", " +
                                      "Date : " + date.ToString() + ", " +
                                      "Description : " + description.ToString() + ", " +
                                      "User Status : " + userStatus.ToString() + ", " +
                                      "Mood Level : " + moodLevel.ToString() + ", " +
                                      "Weather : " + weather.ToString() + ", " +
                                      "Location : " + location.ToString();
                    
                    //In case I want to add some values to my Table
                    string insertToTable = "INSERT INTO costs(amount, type, date, description, userStatus, moodLevel, weather, location) values(" +
                        "'" + amount + 
                        "', '" + type +
                        "', '" + date + 
                        "', '" + description + 
                        "', '" + userStatus + 
                        "', '" + moodLevel + 
                        "', '" + weather + 
                        "', '" + location + 
                        "')";
                    
                    //cmd.CommandText = insertToTable;
                    //cmd.ExecuteNonQuery();

                    Console.WriteLine(results);




                    //cmd.CommandText = "SELECT* from costs ";
                    //using(SQLiteDataReader reader = cmd.ExecuteReader())
                    //{
                    //    while (reader.Read())
                    //    {
                    //        Console.WriteLine(reader["amount"].ToString() + " : " + reader["type"] + " : " + reader["description"]);
                    //    }
                    //    connection.Close();
                    //}

                }
            }
            Console.ReadLine();

        }
    }
}
