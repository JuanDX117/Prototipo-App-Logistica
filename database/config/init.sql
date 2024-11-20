-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS AppLogistica;

-- Seleccionar la base de datos recién creada
USE AppLogistica;

-- Crear las tablas necesarias
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100), -- Renombrado desde "lugar" para consistencia
    fecha DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT,
    empleado_id INT,
    turnos INT,
    pago DECIMAL(10, 2),
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id) ON DELETE CASCADE
);

-- Insertar un usuario admin con contraseña encriptada (bcrypt)
INSERT INTO usuarios (username, password) 
VALUES ('admin', '$2y$10$DwJPOqWrm8GfyTczM6Uie.WvHbQ3c6J65bBP/TV90EQOQWIm4YmPu');

-- Insertar empleados de prueba
INSERT INTO empleados (nombre, cedula) 
VALUES 
('Juan Pérez', '1234567890'),
('María López', '0987654321');

-- Insertar eventos de prueba
INSERT INTO eventos (nombre, fecha) 
VALUES 
('Centro de Convenciones', '2024-11-20'),
('Parque Principal', '2024-12-01');

-- Insertar turnos de prueba
INSERT INTO turnos (evento_id, empleado_id, turnos, pago) 
VALUES 
(1, 1, 5, 250000.00),
(2, 2, 3, 150000.00);
