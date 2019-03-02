
// Servidor http con express
const express = require('express');
//Encriptar contraseña
const bcrypt = require('bcrypt');
const _ = require('underscore');

//Importamos esquema Usuario
const Usuario = require('../models/usuario');

//Objeto app
const app = express();

//respuesta get a la ruta {url}/usuario
app.get('/usuario', function (req, res) {

        let desde = Number(req.query.desde) || 0;
        let limite = Number(req.query.limite) || 0;
        Usuario.find({estado: true}, 'nombre email role img estado google')//Buscar todos, el segundo argumento es para filtrar propiedades
               .skip(desde) // Salta los primeros 5
               .limit(limite) // Limite de la consulta
               .exec(( err, usuarios ) => {
                    if (err){
                        return res.status(400).json({
                            ok: false,
                            err
                        })
                    }
                    
                    Usuario.count({estado: true}, (err, cantidad) =>{
                       
                        res.json({
                            ok: true,
                            usuarios,
                            cantidad
                            
                        })
                    })
               });
  })
  
//respuesta post a la ruta {url}/usuario
  app.post('/usuario', function (req, res) {
        //keys se pasan
      let body = req.body;
        //crear instancia modelo usuario
      let usuario = new Usuario({
          nombre: body.nombre,
          email: body.email,
          //encriptando contraseña
          password: bcrypt.hashSync( body.password, 10 ), 
          role: body.role
      });
      //guardar usuario
      usuario.save((err, UsuarioDB)  => {
          if(err){
              return res.status(400).json({
                  ok: false,
                  mensaje: 'Error inesperado',
                  err
              });
          }
          res.json({
              ok: true,
              usuario: UsuarioDB
          })
      } )
    
  })
   
  app.put('/usuario/:id', function (req, res) {
      let id =  req.params.id;
      //parametros que solo serán actualizados
      let body = _.pick(req.body, [ 'nombre','email','img','role','estado']);

        //funcion buscar y actualizar (id, objeto, opciones, callback)
      Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, UsuarioDB) =>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: `Error inespereado`,
                    err
                });

            }
                res.json({
                    ok: true,
                    usuario: UsuarioDB
                })
        })
  })
  
  app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    let cambioEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambioEstado, {new: true}, (err, usuarioActualizado) => {
        if(err){
                  return res.status(400).json({
                     ok: false,
                     err
                    });
             }
        res.json({
            ok: true,
            usuarioActualizado
        })
        

    });
//    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
//         if(err){
//             res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         if( !usuarioEliminado ){
//             res.status(400).json({
//                 ok: false,
//                 error: {
//                     message: 'Usuario no encontrado'
//                 }
//             });   
//         }

//         res.json({
//             ok: true,
//              usuario: usuarioEliminado
//         });
//     })
})
  

    module.exports = app;