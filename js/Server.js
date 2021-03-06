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
// ----Tabelle Personen & Personen ---->
app.get('/', async (req, res) => {
  db.all('SELECT * FROM Personen', (err, Personen) => {
    db.all('SELECT * FROM Produkte', (err, Produkte) => {
      res.render('pages/index', {
        Personen,
        Produkte
      })
    });
  });
});
// ----Tabelle Personen !!---->
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
  db.run('INSERT INTO Produkte(Pname, Mbeitrag, d1, d2, d3, d4) VALUES (?, ?, ?, ?, ?, ?);', [req.body.Pname, req.body.Mbeitrag, req.body.d1, req.body.d2, req.body.d3, req.body.d4 ], function(err) {
    if(err) {
      console.log('Save error');
    } else {
      res.json( { "id": this.lastID, "Pname": req.body.Pname, "Mbeitrag": req.body.Mbeitrag, "d1": req.body.d1, "d2": req.body.d2, "d3": req.body.d3, "d4": req.body.d4 });
      console.log('Post Save');
    }
  });
});
//------------------------------------<
//-------------Test Login------------->
app.get('/login', function(req, res) {
  res.render('pages/login')
});


// app.get('/login-list', function(req, res) {
//   if (req.body.Lname === 'admin' && req.body.Lpw === '123456') 
//   {
//     res.render('/pages/login-list')
//   }
//   res.render('pages/login');

// });


//-------------Login Seite-------------<
//-------------ProbeKunden------------->
// app.post('/login-list', async (req, res) => {
//   console.log(req.body.Lname, req.body.Lpw,)    
// })

app.get('/login-list', async(req, res) => {
  db.all('SELECT * FROM ProbeKunden', (err, ProbeKunden) => {
    const datenDieWirAnDieViewAlsJsonUebergeben = {
      ProbeKunden
    }
    if (req.query.Lname === 'admin' && req.query.Lpw === '123456'){
    res.render('pages/login-list', datenDieWirAnDieViewAlsJsonUebergeben) 
    console.log(req.query.Lname, req.query.Lpw)
  }
  res.render('pages/login');
  console.log(req.query.Lname, req.query.Lpw)
  });
  console.log(req.query.Lname, req.query.Lpw)
  });

//---schreiben--->

app.post('/empfangen', (req, res) => {
  db.run('INSERT INTO ProbeKunden(PKVname, PKNname, PKmail, PKdatum, PKzeit) VALUES (?, ?, ?, ?, ?);', [req.body.PKVname, req.body.PKNname, req.body.PKmail, req.body.PKdatum, req.body.PKzeit], (err) => {
    if(err) {
      // Im Errorfall z.B. die gleiche Seite nochmals anzeigen
      res.render('pages/index');
    } else {
      // Ansonsten redirect auf die Index Route
      res.redirect('/');
    }
  });
  console.log(req.body)
});
//---schreiben---<

app.get('/api/ProbeKunden', (req, res) => {
  db.all('SELECT * FROM ProbeKunden', (err, rows) => {
    if(err) {
      throw err;
    }
    res.json(rows);
  });
});
app.get('/product-order', function(req, res) {
  res.render('pages/product_order')
});
//-------------ProbeKunden--------------<

const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server