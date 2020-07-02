const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//Create an express app
const app = express();

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Mongodb connection
const dbURI =
	'mongodb+srv://pranjal12:dQE941wERXAnYOeV@cluster0.iraym.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) =>
		app.listen(3000, () => {
			console.log('Listening...');
		})
	)
	.catch((err) => console.log(err));

//Register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { name: 'About' });
});

app.use('/blogs', blogRoutes);

//404 error
app.use((req, res) => {
	res.status(404).render('404', { name: '404' });
});
