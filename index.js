const express = require('express')
const mysql = require('mysql2');
const ExcelJS = require('exceljs');
const app = express()
const port = 3000

const odbc = require('odbc');

app.get('/new', async (req, res) => {
    try {
        let totalExec = 0;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Durations');
        worksheet.columns = [
          { header: 'Iteration', key: 'iteration', width: 10 },
          { header: 'Duration', key: 'duration', width: 10 },
        ];
        
        

        for (let i = 0; i < 1000; i++) {
            const pre_query = new Date().getTime();
            

            const connectionString = 'DSN=MyDSN;UID=root;PWD=root';
            const connection = await odbc.connect(connectionString);

            const result = await connection.query('SELECT * FROM treatmentreport WHERE PCode=\'000000008\';');
            //if (i === 999) console.log(result); //check query result is true

            const post_query = new Date().getTime();
            const duration = (post_query - pre_query); //unit: mili-second
            console.log(duration);
            totalExec += duration;

            worksheet.addRow({ iteration: i, duration: duration });

            if (i == 999) {
              const ave = totalExec / 1000;
              workbook.xlsx.writeFile('durationsODBC.xlsx');
              connection.close();
              return res.send("Average = " + ave)
            }

            connection.close(); 
        }
    } catch (error) {
        console.log(">>> check error old: ", error)
    }

})

app.get('/old', async (req, res) => {
  try {
      let totalExec = 0;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Durations');
      worksheet.columns = [
        { header: 'Iteration', key: 'iteration', width: 10 },
        { header: 'Duration', key: 'duration', width: 10 },
      ];

    
      for (let i = 0; i < 1000; i++) {
          const pre_query = new Date().getTime();
          let con = null;
          con = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'testing',
            password: 'root',
            connectTimeout: 60000,
          })
          
          try {
          const result = await con.promise().query(
             'SELECT * FROM patient;'
          );
          } catch(err){console.error(err);}
          //if(i === 999) console.log(result); //check query result is true
          const post_query = new Date().getTime();
          const duration = (post_query - pre_query); //unit: mili second
          console.log(">>>", " i = ", i, " duration = ", duration);
          totalExec += duration;
            
          worksheet.addRow({ iteration: i, duration: duration });

          if (i == 999) {
              const ave = totalExec / 1000;
              workbook.xlsx.writeFile('durationsMysql2.xlsx');
              // try {
              //   await workbook.xlsx.writeFile('durationsMysql2.xlsx');
              // } catch (err) {
              //   // Handle error
              //   console.error(err);
              // }
              await con.promise().end();
              return res.send("Average = " + ave)
          }

          await con.promise().end();
      }
      //con.destroy();
  } catch (error) {
      console.log(">>> check error old: ", error)
  }

})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


/*
const express = require("express");
const app = express();
const flash = require("express-flash");

const router = require("./routes/index.router");
require("dotenv").config();
const db = require("./configs/database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
db.connect();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
router(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/