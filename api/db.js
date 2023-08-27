import mysql from "mysql"

export const db = mysql.createConnection({
  host:"us-cdbr-east-06.cleardb.net",
  user:"b12d58d1d827b8",
  password: "bd6af01c",
  database:"heroku_9c381a962076a24"
})