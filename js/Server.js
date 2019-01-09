// JavaScript Document
const express = require('express');
const mssql = require('mssql').verbose();
const bodyParser = require('body-parser')

// Create Connection
const db =
// Connect
const db = new mssql.Database('./db/shoutbox.db', (err) => { //Ordner: db; Dateiname: shoutbox.db; muss angepasst werden bei anderen namen.
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the shoutbox database.'); // "shoutbox" ändern mit entsprechenden database namen.
});

const port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs'); 

//------------------------------------------------------
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 
//------------------------------------------------------

app.get('/', function(req, res) { 

  const pageTitle = 'This is a title'; //?
  const anArrayOfData = ['This', 'is', 'something', 'to', 'loop']; //?

// [Von der Datenbank Lesen]	
  db.all('SELECT * FROM shouts',(err, rows ) => { //"shouts" ersetzen mit Datenbank Tabellen namen

	  
  console.log(err);
  console.log(rows);

    res.render('pages/index', {
      title: pageTitle,
      data: anArrayOfData,
      shouts: rows

  });

  });


});

app.post('/pricing_table', function(req, res){
  console.log(req.body);

// [In die Datenbank Schreiben]	
  db.run('INSERT INTO shouts (username, message) VALUES (?,?);',[req.body.username, req.body.message], error => {
    console.log(error);
    res.redirect('/');

  })

})

app.get('/pricing_table', function(req, res) {
  res.render('pages/pricing_table');

});

const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)

});

module.exports = server;