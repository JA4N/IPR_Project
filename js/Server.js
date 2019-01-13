// JavaScript Document
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')

// Create Connection
const db = new sqlite3.Database('./db/IprogDB.db');

const port = process.env.PORT || 3000;
const app = express();
app.use('/public', express.static(process.cwd() + '/public'));


app.set('view engine', 'ejs'); 

//------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));
//------------------------------------------------------
// ----Tabelle Personen !!---->
app.get('/', async (req, res) => {
  db.all('SELECT * FROM Personen', (err, Personen) => {
    const datenDieWirAnDieViewAlsJsonUebergeben = {
      Personen
    }

    res.render('pages/index', datenDieWirAnDieViewAlsJsonUebergeben) // wohin schreiben?
  });
});

app.get('/api/Personen', (req, res) => {
  db.all('SELECT * FROM Personen', (err, rows) => {
    if(err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/api/Personen', async (req, res) => {
  console.log("Request");
  db.run('INSERT INTO Personen(Name, position) VALUES (?, ?);', [req.body.Name, req.body.position], function(err) {
    if(err) {
      console.log('Save error');
    } else {
      res.json( { "Name": this.lastID, "Name": req.body.Name, "position": req.body.position });
      console.log('Post Save');
    }
  });
});
//------------------------------------<
// ----Tabelle Produkte !!---->
app.get('/', async (req, res) => {
  db.all('SELECT * FROM Produkte', (err, Produkte) => {
    const success = {};
    res.render('pages/index', { Produkte, success }) //wohin schreiben?
  });
});

app.get('/api/Produkte', (req, res) => {
  db.all('SELECT * FROM Produkte', (err, rows) => {
    if(err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/api/Produkte', async (req, res) => {
  console.log("Request");
  db.run('INSERT INTO Produkte(Pname, Mbetrag, d1, d2, d3, d4) VALUES (?, ?, ?, ?, ?, ?);', [req.body.Pname, req.body.Mbetrag, req.body.d1, req.body.d2, req.body.d3, req.body.d4 ], function(err) {
    if(err) {
      console.log('Save error');
    } else {
      res.json( { "id": this.lastID, "Pname": req.body.Pname, "Mbetrag": req.body.Mbetrag, "d1": req.body.d1, "d2": req.body.d2, "d3": req.body.d3, "d4": req.body.d4 });
      console.log('Post Save');
    }
  });
});
//------------------------------------<
//-------------Test Login------------->


app.get('/login', function(req, res) {
  res.render('pages/login');

});

//-------------Test Login-------------<
const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server