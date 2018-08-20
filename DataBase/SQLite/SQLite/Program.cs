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

            using (SQLiteConnection connection = new SQLiteConnection("data source = C:/Users/eas/Desktop/Financial-Organization/DataBase/costs.sqlite"))
            {
                using (SQLiteCommand cmd = new SQLiteCommand(connection))
                {
                    connection.Open();
                    cmd.CommandText = "SELECT* from costs ";
                    //cmd.ExecuteNonQuery();
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
