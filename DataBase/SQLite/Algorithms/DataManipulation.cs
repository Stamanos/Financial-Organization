using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Mono.Data.Sqlite;

namespace MorganApp
{
    public class DataManipulation
    {
        /// <summary>
        /// Take tha distinct data from tha database is in the "path" from the given "coloumn"
        /// </summary>
        /// <param name="path">path of the SQLite database</param>
        /// <param name="column">the column we want tha data</param>
        /// <returns></returns>
        public static List<string> takeDistinct(string column)
        {
            string path = "Data Source = C:/Users/eas/source/repos/MorganApp/MorganApp/Database/costs.sqlite;Version=3;";
            List<string> items = new List<string>();
            using (SqliteConnection connection = new SqliteConnection(path))
            {
                connection.Open();
                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT DISTINCT " + column + " from costs ORDER BY " + column;
                    using (SqliteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            items.Add(reader.ToString());
                        }
                    }
                }
                connection.Close();
                return items;
            }
        }
    }
}