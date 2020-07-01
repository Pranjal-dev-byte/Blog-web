const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

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

app.get('/blogs', (req, res) => {
	Blog.find()
		.sort({ created: -1 })
		.then((result) => {
			res.render('index', { name: 'All blogs', blogs: result });
		})
		.catch((err) => {
			res.send(err);
		});
});

app.post('/blogs', (req, res) => {
	const blog = new Blog(req.body);
	// console.log(blog);
	blog
		.save()
		.then((result) => {
			res.redirect('/blogs');
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/blogs/create', (req, res) => {
	res.render('create', { name: 'Create' });
});

app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render('details', { blog: result, name: result.title });
		})
		.catch((err) => {
			console.log(err);
		});
});

app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: '/blogs' });
		})
		.catch((err) => {
			console.log(err);
		});
});

//404 error
app.use((req, res) => {
	res.status(404).render('404', { name: '404' });
});
