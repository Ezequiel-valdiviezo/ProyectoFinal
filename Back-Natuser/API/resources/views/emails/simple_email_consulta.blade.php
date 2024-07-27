<!DOCTYPE html>
<html>
<head>
    <title>Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #056cbb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            background-color: #e0eaf3;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .content ul li{
            list-style: none;
        }
        .header img {
            max-width: 85%;
            height: auto;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            {{-- <h1>NatUser</h1> --}}
            <img src="cid:imagen.jpg" alt="Imagen">
        </div>
        <div class="content">
            <h1>Respuesta a tu consulta</h1>
            <p>Hola,</p>
            <p>Hemos recibido tu consulta y aquí tienes nuestra respuesta:</p>
            <p>{{ $respuesta }}</p>
            <p>Saludos,</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 NatUser. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
