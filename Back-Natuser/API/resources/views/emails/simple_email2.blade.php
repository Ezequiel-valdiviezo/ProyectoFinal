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
            <p>¡Felicitaciones! Fuiste aceptado para ofrecer tus servicios de médico en nuestra web.</p>
            <p>Los planes a seguir son:
                <ul>
                    <li>1: Seleccionar su plan. <a href="http://127.0.0.1:5500/front-informativo/forms/index.html">Ver planes</a></li>
                    <li>2: Realizar el pago</li>
                    <li>3: Enviar el comprobante por este medio</li>
                    <li>Junto con el comprobante enviar los siguientes datos para cargar su servicio: Nombre, imagen de usd, descripción, especialidad, email, precio y teléfono.</li>
                    <li>5: Esperar hasta 48hs hábiles, en  ese plazo estaremos subiendo su servicio a nuestra web. En caso que pasadas las 48hs no haya sucedido, por favor comunicarse de vuelta. Muchas gracias</li>
                </ul>
            </p>
        </div>
        <div class="footer">
            <p>&copy; 2024 NatUser. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
