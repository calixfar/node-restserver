// Servidor http con express
const express = require('express');
//Encriptar contraseña
const bcrypt = require('bcrypt');
//JSON web token
const jwt = require('jsonwebtoken');

//Importamos esquema Usuario
const Usuario = require('../models/usuario');

//Objeto app
const app = express();

app.post('/login', (req, res) =>{

let body = req.body;

Usuario.findOne({email: body.email}, (err, usuarioDB) => {
    if(err){
        return res.status(500).json({
            ok: true,
            err
        });
    }
    if(!usuarioDB){
        return res.status(400).json({
            ok: false,
            error:{
                message: 'Usuario o contraseña incorrectos'
                }
        });
    }

    if( !bcrypt.compareSync( body.password, usuarioDB.password ) ){
        return res.status(400).json({
            ok: false,
            error:{
                message: 'Usuario o contraseña incorrectos'
                }
        });
    }

    let token = jwt.sign({
        usuario: usuarioDB
        //expira en 30 dias
    }, process.env.SEED ,{ expiresIn: process.env.caducidad_TOKEN })
    res.json({
        ok: true,
        usuario: usuarioDB,
        token
    });
});
});

module.exports = app;