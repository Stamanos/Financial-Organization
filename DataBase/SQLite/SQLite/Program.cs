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

            //In case I want to add some values to my Table
            string insertToTable = "INSERT INTO costs(amount, type, date, description, userStatus, moodLevel, weather, location) values('1.2', 'food-drink', '9/1/2018 12:00:00 AM', 'PIPA', 'inRelationship', '5', 'Peristeri', 'Peristeri')";

            using (SQLiteConnection connection = new SQLiteConnection("data source = C:/Users/eas/Desktop/Financial-Organization/DataBase/costs.sqlite"))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(connection))
                {
                    connection.Open();

                    //If I want to add values
                    cmd.CommandText = insertToTable;
                    cmd.ExecuteNonQuery();

                    cmd.CommandText = "SELECT* from costs ";
                    using(SQLiteDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Console.WriteLine(reader["amount"].ToString() + " : " + reader["type"] + " : " + reader["description"]);
                        }
                        connection.Close();
                    }

                }
            }
            Console.ReadLine();

        }
    }
}
