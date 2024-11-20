const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sin contraseña en XAMPP
    database: 'AppLogistica',
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Crear la aplicación Express
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Para procesar JSON en las peticiones

// Ruta para obtener todos los empleados
app.get('/api/empleados', (req, res) => {
    const query = 'SELECT * FROM empleados';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener empleados:', err);
            return res.status(500).send('Error al obtener empleados');
        }
        res.json(result);
    });
});

// Ruta para agregar un nuevo empleado
app.post('/api/empleados', (req, res) => {
    const { nombre, cedula } = req.body;
    const query = 'INSERT INTO empleados (nombre, cedula) VALUES (?, ?)';
    db.query(query, [nombre, cedula], (err, result) => {
        if (err) {
            console.error('Error al agregar empleado:', err);
            return res.status(500).send('Error al agregar empleado');
        }
        res.json({ message: 'Empleado agregado exitosamente', id: result.insertId });
    });
});

// Ruta para eliminar un empleado
app.delete('/api/empleados/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM empleados WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar empleado:', err);
            return res.status(500).send('Error al eliminar empleado');
        }
        res.json({ message: 'Empleado eliminado exitosamente' });
    });
});

// Ruta para actualizar un empleado
app.put('/api/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, cedula } = req.body;
    const query = 'UPDATE empleados SET nombre = ?, cedula = ? WHERE id = ?';
    db.query(query, [nombre, cedula, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar empleado:', err);
            return res.status(500).send('Error al actualizar empleado');
        }
        res.json({ message: 'Empleado actualizado exitosamente' });
    });
});


// ---- RUTAS DE EVENTOS ----

// Obtener eventos
app.get('/api/eventos', (req, res) => {
    const query = 'SELECT * FROM eventos';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener eventos:', err);
            return res.status(500).send('Error al obtener eventos');
        }
        res.json(result);
    });
});

// Agregar evento
app.post('/api/eventos', (req, res) => {
    const { nombre, fecha } = req.body;
    const query = 'INSERT INTO eventos (nombre, fecha) VALUES (?, ?)';
    db.query(query, [nombre, fecha], (err, result) => {
        if (err) {
            console.error('Error al agregar evento:', err);
            return res.status(500).send('Error al agregar evento');
        }
        res.status(201).json({ message: 'Evento creado exitosamente', id: result.insertId });
    });
});

// Eliminar evento
app.delete('/api/eventos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM eventos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar evento:', err);
            return res.status(500).send('Error al eliminar evento');
        }
        res.json({ message: 'Evento eliminado exitosamente' });
    });
});

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
