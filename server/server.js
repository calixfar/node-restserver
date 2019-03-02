require('./config/config');
const express = require('express')
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

  mongoose.connect(process.env.URLDB, (err, res) => {
        if(err) throw err;
        console.log('Conectado a la BD');
  });
app.listen(process.env.PORT, () =>{
    console.log('escuchando puerto ',process.env.PORT)
}); 