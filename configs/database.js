const express = require("express");
const mysql2 = require("mysql2");
require("dotenv").config();
const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports.connect = async () => {
  await connection.connect((err) => {
    if (err) {
      console.error(err.sqlMessage);
      console.error("Database not connected");
    } else {
      console.log("Database connected");
    }
  });
};

module.exports.querySql = async (sql, data) => {
  return new Promise((resolve, reject) => {
    connection.execute(sql, data, (err, result) => {
      if (err) {
        console.error(err.sqlMessage);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports.queryOne=async(sql,data)=>{
  sql+=" LIMIT 1";
  const result=await this.querySql(sql,data);
  return result[0];
};
module.exports.getRowCount = async (sql,data) => {
  const result = await this.querySql(sql,data);
  return result.length;
};
