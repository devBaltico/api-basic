const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());


// My SQL
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'pruebas',
  user: 'root',
  password: '123456',
});

// Routes
app.get('/', (req, res)=>{
    res.send('Hola');
});
    

// All Usuarios
app.get('/usuarios', (req, res)=>{
    const sql = `SELECT * FROM usuarios`;

    connection.query(sql, (error, results)=>{
        if (error) throw error;            
        if (results.length > 0) {
                res.json(results);
            }else{
             res.send('No hay resultados')
        }
    });
});

app.get("/usuarios/:id", (req, res) => {
 const {id }= req.params
 const sql = `SELECT * FROM usuarios WHERE id = ${id}`;
 connection.query(sql, (error, result) => {
   if (error) throw error;
   if (result.length > 0) {
     res.json(result);
   } else {
     res.send("No hay resultado");
   }
 });
});

app.post('/add', (req, res) => {
  const sql = `INSERT INTO usuarios SET ?`;
  const usuariosObj = {
    nombre: req.body.nombre,
    email: req.body.email,
    pass: req.body.pass,
  }
  connection.query(sql, usuariosObj, error =>{
    if(error) throw error;
    res.send('Usuario creado')
  });
});

app.put('/update/:id', (req, res) => {
  const {id } = req.params;
  const {nombre, email, pass} = req.body;
  const sql = `UPDATE usuarios SET nombre = '${nombre}', email = '${email}', pass = '${pass}' 
  WHERE id  =${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Usuario update");
  });
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM usuarios WHERE id= ${id}`;

    connection.query(sql, (error) => {
      if (error) throw error;
      res.send("Usuario eliminado");
    });
});


// Check Connect
connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('Conectado a la BD');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});