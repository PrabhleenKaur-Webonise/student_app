const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'newEra2019_',
  database: 'students',
});
// LOGIN --------------------------------------------------------------------------------------------------------

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.send('We need a token, please give it next time ');
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'U failed to authenticate' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  session({
    key: 'userId',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db2 = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'newEra2019_',
  database: 'TEST_DB',
});

db2.connect((err) => {
  if (!err) console.log('DB2 connection success');
  else console.log('DB2 connection fail /n Error: ' + JSON.stringify(err, undefined, 2));
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const role = req.body.role;

  const newPassword = bcrypt.hash(req.body.password, saltRounds, (err, newPassword) => {
    if (err) {
      console.log(err);
    }
    db2.query(
      'INSERT INTO Users (username, password, role) VALUES (?, ?, ?)',
      [username, newPassword, role],
      (err, row) => {
        console.log(err);
      }
    );
  });
});

app.get('/userAuth', verifyJWT, (req, res) => {
  res.send('You are authenticated!');
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db2.query('SELECT * FROM Users WHERE username = ?', username, (err, row) => {
    if (err) {
      res.send({ err: err });
    }
    if (row.length > 0) {
      bcrypt.compare(password, row[0].password, (err, result) => {
        if (result) {
          req.session.user = row;

          const id = row[0].id;
          const token = jwt.sign({ id }, 'jwtSecret', {
            expiresIn: 300,
          });

          req.session.user = row;

          res.json({ auth: true, token: token, row: row });
        } else {
          res.json({ auth: false, message: 'Wrong password!' });
        }
      });
    } else {
      res.json({ auth: false, message: 'User does not exist' });
    }
  });
});

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

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  db.query('UPDATE student SET name = ? WHERE id = ?', [name, id], (err, row) => {
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
