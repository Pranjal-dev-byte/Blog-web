const Blog = require('../models/blog');

const blog_index = (req, res) => {
	Blog.find()
		.sort({ created: -1 })
		.then((result) => {
			res.render('./blog/index', { name: 'All blogs', blogs: result });
		})
		.catch((err) => {
			res.send(err);
		});
};

const blog_details = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render('./blog/details', { blog: result, name: result.title });
		})
		.catch((err) => {
			console.log(err);
			res.status(404).render('404', { name: '404' });
		});
};

const blog_create_get = (req, res) => {
	res.render('./blog/create', { name: 'Create' });
};

const blog_create_post = (req, res) => {
	const blog = new Blog(req.body);
	blog
		.save()
		.then((result) => {
			res.redirect('/blogs');
		})
		.catch((err) => {
			console.log(err);
		});
};

const blog_delete = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: '/blogs' });
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = { blog_index, blog_details, blog_create_get, blog_create_post, blog_delete };
