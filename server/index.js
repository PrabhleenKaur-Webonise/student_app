const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'newEra2019_',
  database: 'students',
});

// const db2 = require('./models');
// const usersRouter = require('./routes/Users');
// const bcrypt = require('bcrypt');
// const { Users } = require('./models');
// app.use('/auth', usersRouter);

// CRUD ---------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/departments', (req, res) => {
  db.query('SELECT * FROM department', (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send(row);
    }
  });
});

app.post('/createDepartment', (req, res) => {
  const dept = req.body.dept;
  db.query('INSERT INTO department (name) VALUES (?)', dept, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send(row);
    }
  });
});

app.post('/create', (req, res) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const dept = req.body.dept;
  const gender = req.body.gender;

  db.query('INSERT INTO student (name, dob, dept, gender) VALUES (?,?,?,?)', [name, dob, dept, gender], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Values Inserted');
    }
  });
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM student', (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send(row);
    }
  });
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  db.query('UPDATE student SET name = ? WHERE id = ?', [name, id], (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send(row);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM student WHERE id = ?', id, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      res.send(row);
    }
  });
});

app.listen(3001, () => {
  console.log('on port 3001!');
});
// db2.sequelize.sync().then(() => {
//   app.listen(3001, () => {
//     console.log('on port 3001!');
//   });
// });
