// Create express app
const express = require('express');
const app = express();

//Hacemos la referencia al archivo de conexion,
//Donde se encuentra la configuracion para conectar
//Con la base de datos.
var db = require("./conexion.js")


const morgan = require('morgan');

//Indicamos que se requiere bodyParser para manejar archivos json
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

////Indicamos el puerto por el que se trabajara.
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

//-------------------------------------------------------[*******Rutas********]-------------------------------------------------

//////////////////////////////////////////[*********Ruras para el manejo de la tabla Recompensas**********]
app.get("/Persuhabit/recompensas", (req, res, next) => {

    var sql = "SELECT * FROM Recompensas"
    var params = []

      db.all(sql, params, (err, rows) => {

          if (err) {
             res.status(400).json({"error":err.message});
             return;
          }
          res.json({
             "message":"success",
             "data":rows
          })

      });
});
///////////////////////[Insertar una recompensa nueva]
app.post("/Persuhabit/recompensas", (req, res, next) => {

  var data = {
       descrip: req.body.descrip,
       valor: req.body.valor
   }

     var sql = "INSERT INTO Recompensas (descrip, valor) VALUES (?,?)"
     var params =[data.descrip, data.valor]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});



////////////////////////////////////////[eliminar recompensa]
app.post("/Persuhabit/recompensas/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Recompensas WHERE idrecom=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Recompensas]



//////////////////////////////////////////// [********Ruras para el manejo de USUARIOS**********]
////////////////////[Consulta general de todos los usuarios]
app.get("/Persuhabit/usuarios", (req, res, next) => {

var sql = "SELECT * FROM Usuario"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar un usuario nuevo]
app.post("/Persuhabit/usuarios", (req, res, next) => {

  var data = {
       nomu: req.body.nomu,
       apmu: req.body.apmu,
       appu: req.body.appu,
       correo: req.body.correo,
       pwdu: req.body.pwdu,
       nivel: req.body.nivel,
       experiencia: req.body.experiencia
   }

     var sql = "INSERT INTO Usuario (nomu, apmu, appu, correo, pwdu, nivel, experiencia) VALUES (?,?,?,?,?,?,?);"
     var params =[data.nomu, data.apmu, data.appu, data.correo, data.pwdu, data.nivel, data.experiencia]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }else{
            res.json({
               "message":"success",
               "data": this.lastID
            })
          }

      });
});
////////////////////////[Actualizar Correo del Usuario]
app.put("/Persuhabit/usuarios/correo", (req, res, next) => {

  var data = {
       correo: req.body.correo,
       id: req.body.id
   }

var sql = "UPDATE Usuario SET correo = ? WHERE idusu = ?"
var params = [data.correo, data.id]

  db.run(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data": "correcto"
      })

  });
});
////////////////////////[Actualizar Contraseña del Usuario]
app.put("/Persuhabit/usuarios/password", (req, res, next) => {

  var data = {
       pwdu: req.body.pwdu,
       id: req.body.id
   }

var sql = "UPDATE Usuario SET pwdu = ? WHERE idusu = ?"
var params = [data.pwdu, data.id]

  db.run(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data": "correcto"
      })

  });
});



////////////////////////////////////////[eliminar usuarios]
app.post("/Persuhabit/usuarios/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Usuario WHERE idusu=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas del usuario]


////////////////////////////////////////[*************Inician rutas de la tabla Niño**************]
////////////////////[Consulta general de todos los Niños]
app.get("/Persuhabit/nino", (req, res, next) => {

var sql = "SELECT * FROM Nino"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
//////////////////////////////////[Insertar un nuevo niño]
app.post("/Persuhabit/nino", (req, res, next) => {

  var data = {
       idusu: req.body.idusu,
       genero: req.body.genero,
       nomn: req.body.nomn,
       appn: req.body.appn,
       apmn: req.body.apmn,
       edad: req.body.edad,
       peso: req.body.peso,
       estat: req.body.estat,
       medi: req.body.medi,
       lineabultra: req.body.lineabultra,
       lineabv: req.body.lineabv,
       leneabf: req.body.leneabf,
       totfich: req.body.totfich,
       esfuerzoultra: req.body.esfuerzoultra,
       esfuerzof: req.body.esfuerzof,
       esfuerzov: req.body.esfuerzov
   }

     var sql = "INSERT INTO Nino (idusu, genero, nomn, appn, apmn, edad, peso, estat, medi, lineabultra, lineabv, leneabf, totfich, esfuerzoultra, esfuerzof, esfuerzov) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
     var params =[data.idusu, data.genero, data.nomn, data.appn, data.apmn, data.edad, data.peso, data.estat, data.medi, data.lineabultra, data.lineabv, data.leneabf, data.totfich, data.esfuerzoultra, data.esfuerzof, data.esfuerzov]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});
////////////////////////[Actualizar linea base de ultra procesados, frutas y verduras del niño]
app.put("/Persuhabit/nino/LineaBase", (req, res, next) => {

  var data = {
       lineabultra: req.body.lineabultra,
       lineabv: req.body.lineabv,
       lineabf: req.body.lineabf,
       id: req.body.id
   }

var sql = "UPDATE Nino SET lineabultra = ?, lineabv = ?, leneabf = ? WHERE idNino = ?"
var params = [data.lineabultra, data.lineabv, data.lineabf, data.id]

  db.run(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data": "correcto"
      })

  });
});
////////////////////////[Actualizar Esfuerzo de ultra procesados, frutas y verduras del niño]
app.put("/Persuhabit/nino/esfuerzo", (req, res, next) => {

  var data = {
       esfuerzoultra: req.body.esfuerzoultra,
       esfuerzof: req.body.esfuerzof,
       esfuerzov: req.body.esfuerzov,
       id: req.body.id
   }

var sql = "UPDATE Nino SET esfuerzoultra = ?, esfuerzof = ?, esfuerzov = ? WHERE idNino = ?"
var params = [data.esfuerzoultra, data.esfuerzof, data.esfuerzov, data.id]

  db.run(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data": "correcto"
      })

  });
});



////////////////////////////////////////[eliminar niño]
app.post("/Persuhabit/nino/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Nino WHERE idNino=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas del NIño]



////////////////////////////////////////[*************Inician rutas de la tabla Registro**************]
////////////////////[Consulta general de todos los Registros]
app.get("/Persuhabit/registro", (req, res, next) => {

var sql = "SELECT * FROM Registro"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
//////////////////////////////////[Insertar un nuevo registro]
app.post("/Persuhabit/registro", (req, res, next) => {

  var data = {
       idNino: req.body.idNino,
       fechar: req.body.fechar
   }

     var sql = "INSERT INTO Registro (idNino, fechar) VALUES (?,?)"
     var params =[data.idNino, data.fechar]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});



////////////////////////////////////////[eliminar registro]
app.post("/Persuhabit/registro/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Registro WHERE idreg=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas del registro]



////////////////////////////////////////[*************Inician rutas de la tabla Mensajes_Persuasivos**************]
////////////////////[Consulta general de todos los Mensajes_Persuasivos]
app.get("/Persuhabit/MsgPersuasivo", (req, res, next) => {

var sql = "SELECT * FROM Mensajes_Persuasivos"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar un Mensaje Persuasivo nuevo]
app.post("/Persuhabit/MsgPersuasivo", (req, res, next) => {

  var data = {
       tipo: req.body.tipo,
       msg: req.body.msg
   }

     var sql = "INSERT INTO Mensajes_Persuasivos (tipo, msg) VALUES (?,?)"
     var params =[data.tipo, data.msg]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar Mensaje Persuasivo]
app.post("/Persuhabit/MsgPersuasivo/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Mensajes_Persuasivos WHERE idmsg=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Mensajes_Persuasivos]



////////////////////////////////////////[*************Inician rutas de la tabla Historial_Nutricion**************]
////////////////////[Consulta general de Historial_Nutricion]
app.get("/Persuhabit/HistorialNutri", (req, res, next) => {

var sql = "SELECT * FROM Historial_Nutricion"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar Historial_Nutricion nuevo]
app.post("/Persuhabit/HistorialNutri", (req, res, next) => {

  var data = {
       idusu: req.body.idusu,
       Respuesta_Nutri: req.body.Respuesta_Nutri
   }

     var sql = "INSERT INTO Historial_Nutricion (idusu, Respuesta_Nutri) VALUES (?,?)"
     var params =[data.idusu, data.Respuesta_Nutri]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar Historial_Nutricion]
app.post("/Persuhabit/HistorialNutri/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Historial_Nutricion WHERE idHistoNutri=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Historial_Nutricion]



////////////////////////////////////////[*************Inician rutas de la tabla Historial_Autoeficacia**************]
////////////////////[Consulta general de Historial_Autoeficacia]
app.get("/Persuhabit/HistorialAuto", (req, res, next) => {

var sql = "SELECT * FROM Historial_Autoeficacia"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar Historial_Autoeficacia nuevo]
app.post("/Persuhabit/HistorialAuto", (req, res, next) => {

  var data = {
       idusu: req.body.idusu,
       RespuestaAuto: req.body.RespuestaAuto
   }

     var sql = "INSERT INTO Historial_Autoeficacia (idusu, RespuestaAuto) VALUES (?,?)"
     var params =[data.idusu, data.RespuestaAuto]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar Historial_Autoeficacia]
app.post("/Persuhabit/HistorialAuto/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Historial_Autoeficacia WHERE idHistoAutoeficacia=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Historial_Autoeficacia]



////////////////////////////////////////[*************Inician rutas de la tabla GustoVerdura**************]
////////////////////[Consulta general de GustoVerdura]
app.get("/Persuhabit/GustoVerdura", (req, res, next) => {

var sql = "SELECT * FROM GustoVerdura"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar GustoVerdura nuevo]
app.post("/Persuhabit/GustoVerdura", (req, res, next) => {

  var data = {
       nombreV: req.body.nombreV,
       siGustaV: req.body.siGustaV,
       noGustaV: req.body.noGustaV,
       conoscoV: req.body.conoscoV,
       idNino: req.body.idNino
   }

     var sql = "INSERT INTO GustoVerdura (nombreV, siGustaV, noGustaV, conoscoV, idNino) VALUES (?,?,?,?,?)"
     var params =[data.nombreV, data.siGustaV, data.noGustaV, data.conoscoV, data.idNino]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar GustoVerdura]
app.post("/Persuhabit/GustoVerdura/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM GustoVerdura WHERE idGustos=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de GustoVerdura]



////////////////////////////////////////[*************Inician rutas de la tabla GustoFrutas**************]
////////////////////[Consulta general de GustoFrutas]
app.get("/Persuhabit/GustoFrutas", (req, res, next) => {

var sql = "SELECT * FROM GustoFrutas"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar GustoFrutas nuevo]
app.post("/Persuhabit/GustoFrutas", (req, res, next) => {

  var data = {
       idNino: req.body.idNino,
       nombreF: req.body.nombreF,
       siGustaF: req.body.siGustaF,
       noGustaF: req.body.noGustaF,
       conoscoF: req.body.conoscoF
   }

     var sql = "INSERT INTO GustoFrutas (idNino, nombreF, siGustaF, noGustaF, conoscoF) VALUES (?,?,?,?,?)"
     var params =[data.idNino, data.nombreF, data.siGustaF, data.noGustaF, data.conoscoF]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar GustoFrutas]
app.post("/Persuhabit/GustoFrutas/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM GustoFrutas WHERE idGustoF=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de GustoFrutas]



////////////////////////////////////////[*************Inician rutas de la tabla Envia_Msg**************]
////////////////////[Consulta general de Envia_Msg]
app.get("/Persuhabit/EnviaMsg", (req, res, next) => {

var sql = "SELECT * FROM Envia_Msg"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar Envia_Msg nuevo]
app.post("/Persuhabit/EnviaMsg", (req, res, next) => {

  var data = {
       idusu: req.body.idusu,
       idmsg: req.body.idmsg,
       horame: req.body.horame,
       Fechame: req.body.Fechame
   }

     var sql = "INSERT INTO Envia_Msg (idusu, idmsg, horame, Fechame) VALUES (?,?,?,?)"
     var params =[data.idusu, data.idmsg, data.horame, data.Fechame]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});
////////////////////////////////////////[eliminar Envia_Msg]
app.post("/Persuhabit/EnviaMsg/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Envia_Msg WHERE idenvmdg=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Envia_Msg]



////////////////////////////////////////[*************Inician rutas de la tabla DetalleReg**************]
////////////////////[Consulta general de DetalleReg]
app.get("/Persuhabit/DetalleReg", (req, res, next) => {

var sql = "SELECT * FROM DetalleReg"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })

  });
});
///////////////////////[Insertar DetalleReg nuevo]
app.post("/Persuhabit/DetalleReg", (req, res, next) => {

  var data = {
       idNino: req.body.idNino,
       idalimento: req.body.idalimento,
       equi: req.body.equi,
       cad: req.body.cad,
       umedr: req.body.umedr,
       hora: req.body.hora,
       tipo: req.body.tipo
   }

     var sql = "INSERT INTO DetalleReg (idNino, idalimento, equi, cad, umedr, hora, tipo) VALUES (?,?,?,?,?,?,?)"
     var params =[data.idNino, data.idalimento, data.equi, data.cad, data.umedr, data.hora, data.tipo]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar DetalleReg]
app.post("/Persuhabit/DetalleReg/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM DetalleReg WHERE idreg=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de DetalleReg]



////////////////////////////////////////[*************Inician rutas de la tabla Cuestionario_Nutricion**************]
////////////////////[Consulta general de Cuestionario_Nutricion]
app.get("/Persuhabit/CuestionarioNutri", (req, res, next) => {

var sql = "SELECT * FROM Cuestionario_Nutricion"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })
  });
});
///////////////////////[Insertar Cuestionario_Nutricion nuevo]
app.post("/Persuhabit/CuestionarioNutri", (req, res, next) => {

  var data = {
       idHistoNutri: req.body.idHistoNutri,
       Preg_Nutri: req.body.Preg_Nutri,
       Res_Pre_Nutri: req.body.Res_Pre_Nutri,
       Msg: req.body.Msg,
   }

     var sql = "INSERT INTO Cuestionario_Nutricion (idHistoNutri, Preg_Nutri, Res_Pre_Nutri, Msg) VALUES (?,?,?,?)"
     var params =[data.idHistoNutri, data.Preg_Nutri, data.Res_Pre_Nutri, data.Msg]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar Cuestionario_Nutricion]
app.post("/Persuhabit/CuestionarioNutri/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Cuestionario_Nutricion WHERE idCuesNutri=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Cuestionario_Nutricion]



////////////////////////////////////////[*************Inician rutas de la tabla CanjeFi**************]
////////////////////[Consulta general de CanjeFi]
app.get("/Persuhabit/CanjeFi", (req, res, next) => {

var sql = "SELECT * FROM CanjeFi"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })
  });
});
///////////////////////[Insertar CanjeFi nuevo]
app.post("/Persuhabit/CanjeFi", (req, res, next) => {

  var data = {
       idNino: req.body.idNino,
       idrecom: req.body.idrecom,
       fechacanje: req.body.fechacanje,
       Activo: req.body.Activo
   }

     var sql = "INSERT INTO CanjeFi (idNino, idrecom, fechacanje, Activo) VALUES (?,?,?,?)"
     var params =[data.idNino, data.idrecom, data.fechacanje, data.Activo]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar CanjeFi]
app.post("/Persuhabit/CanjeFi/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM CanjeFi WHERE idcanjefi=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de CanjeFi]



////////////////////////////////////////[*************Inician rutas de la tabla Tutor**************]
////////////////////[Consulta general de Tutor]
app.get("/Persuhabit/tutor", (req, res, next) => {

var sql = "SELECT * FROM Tutor"
var params = []

  db.all(sql, params, (err, rows) => {

      if (err) {
         res.status(400).json({"error":err.message});
         return;
      }
      res.json({
         "message":"success",
         "data":rows
      })
  });
});



///////////////////////[Insertar Tutor nuevo]
app.post("/Persuhabit/tutor", (req, res, next) => {

  var data = {
       idusu: req.body.idusu,
       nomt: req.body.nomt,
       appt: req.body.appt,
       appmt: req.body.appmt,
       parent: req.body.parent,
       msg: req.body.msg,
       correo: req.body.correo,
       pwdt: req.body.pwdt
   }

     var sql = "INSERT INTO Tutor (idusu, nomt, appt, appmt, parent, msg, correo, pwdt) VALUES (?,?,?,?,?,?,?,?)"
     var params =[data.idusu, data.nomt, data.appt, data.appmt, data.parent, data.msg, data.correo, data.pwdt]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });

});



////////////////////////////////////////[eliminar Tutor]
app.post("/Persuhabit/tutor/eliminar", (req, res, next) => {

  var data = {
       id: req.body.id
   }

     var sql = "DELETE FROM Tutor WHERE idtutor=?"
     var params =[data.id]

     db.run(sql, params, function (err, result) {
          if (err){
              res.status(400).json({"error": err.message})
              return;
          }
          res.json({
              "message": "success",
              "data": "correcto"
          })
      });
});
////////////////////////////////////////[Fin de rutas de Tutor]



//---------------------------------------------------------[*********END Rutas*********]----------------------------------

app.listen(app.get('port'), function () {
  console.log('SERVER ON PORT', app.get('port'));
});
