const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// =========================================
// CONEXIÓN MYSQL
// =========================================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cacao',
    database: 'tienda_barca'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }

    console.log('¡Conectado con éxito a MySQL Workbench!');
});


// MIDDLEWARES
// =========================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =========================================
// RUTAS GET
// =========================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});

app.get('/proyecto', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'proyecto.html'));
});

app.get('/equipaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'equipaciones.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'oferta.html'));
});

app.get('/museo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'museo.html'));
});

// =========================================
// REGISTRO
// =========================================
app.post('/api/registrar', (req, res) => {

    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.send(`
            <script>
                alert('Completa todos los campos');
                window.location.href='/registro';
            </script>
        `);
    }

    const verificarCorreo =
        'SELECT * FROM usuarios WHERE email = ?';

    db.query(verificarCorreo, [email], (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).send('Error en servidor');
        }

        if (results.length > 0) {
            return res.send(`
                <script>
                    alert('Ese correo ya está registrado');
                    window.location.href='/registro';
                </script>
            `);
        }

        const sql =
            'INSERT INTO usuarios(nombre,email,password) VALUES(?,?,?)';

        db.query(sql, [nombre, email, password], (err) => {

            if (err) {
                console.error(err);
                return res.status(500).send('Error al registrar');
            }

            res.send(`
                <script>
                    alert('Usuario registrado correctamente');
                    window.location.href='/';
                </script>
            `);
        });

    });
});


// LOGIN

app.post('/api/login', (req, res) => {

    const { email, password } = req.body;

    const sql =
        'SELECT * FROM usuarios WHERE email = ?';

    db.query(sql, [email], (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).send('Error en servidor');
        }

        if (results.length === 0) {
            return res.send(`
                <script>
                    alert('El correo no está registrado');
                    window.location.href='/';
                </script>
            `);
        }

        const usuario = results[0];

        if (password === usuario.password) {

            res.redirect('/proyecto');

        } else {

            res.send(`
                <script>
                    alert('Contraseña incorrecta');
                    window.location.href='/';
                </script>
            `);

        }

    });

});
  

// SERVIDOR

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});