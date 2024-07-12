const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 4000;

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el envío de correo electrónico
app.post('/send-email', (req, res) => {
    const { name, email, date, time } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu_correo@gmail.com',
            pass: 'tu_contraseña'
        }
    });

    let mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Confirmación de cita',
        text: `Hola ${name},\n\nHas agendado una cita para el día ${date} a las ${time}.\n\nGracias.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false });
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).json({ success: true });
        }
    });
});

// Ruta de prueba para la URL raíz
app.get('/', (req, res) => {
    res.send('¡La aplicación de agendamiento de citas está funcionando correctamente!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
