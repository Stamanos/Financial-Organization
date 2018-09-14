using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Text;

namespace Algorithms
{
    class Dbmanipulation
    {

        public static void insertToDatabase(string path, string amount, string type, string date, string description, string userStatus, string moodLevel, string location, string weather)
        {
            using (SQLiteConnection connection = new SQLiteConnection("data source = " + path))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(connection))
                {
                    connection.Open();
                    
                    string results = "Amount : " + amount + ", " +
                                      "Type : " + type + ", " +
                                      "Date : " + date + ", " +
                                      "Description : " + description + ", " +
                                      "User Status : " + userStatus + ", " +
                                      "Mood Level : " + moodLevel + ", " +
                                      "Weather : " + weather + ", " +
                                      "Location : " + location;

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

                    cmd.CommandText = insertToTable;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static void insertDateNames(string path)
        {
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
                            Console.WriteLine(reader["date"].ToString());
                        }
                        connection.Close();
                    }
                }
            }
        }
    }
}