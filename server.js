

const express = require('express');
const hbs =require('hbs');
const fs = require('fs');


const port = process.env.PORT||3000;

var app = express();

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
})


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{

	var now = new Date().toString();

	var log =`${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n' ,(err)=>{
		if (err){
			console.log('unable to append to server.log');
		}
	});
	next();
})


//during maintainance
// app.use((req,res,next)=>{
// 	res.render('maintainance.hbs');


// 	var now = new Date().toString();

// 	var log =`${now}: ${req.method} ${req.url}`;
// 	fs.appendFile('server.log',' Maintenance '+ log + '\n' ,(err)=>{
// 		if (err){
// 			console.log('unable to append to server.log');
// 		}
// 	});
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})

app.get('/',(req, res)=>{

	// res.send('<h1>hello Express!</h1>')
	res.render('home.hbs',{
		pageTitle: 'Homepage',
		welcomeMessage:'there is no place like 127.0.0.0'
	});

});

app.get('/about', (req,res)=>{

	res.render('about.hbs',{
		pageTitle: 'About page'
	});

});

app.get('/bad',(req,res)=>{
	res.send({
		status:'403',
		errorMessage:'this is blocked by TRAI'
	})
})

app.listen(port,()=>{
	console.log(`server is up on ${port}`)
});