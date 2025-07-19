const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
//connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.tk1cbhn.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

const path = require('path');
const morgan = require('morgan');
const { title } = require('process');





// register view engine
app.set('view engine', 'ejs');



// middle ware and statistc files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog', 
//         snippet: 'About my new blog',
//         body: 'This is the body of my new blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('687b75a79e83ebed024a215a')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

app.get('/', (req, res) => {
    res.redirect('/blogs');
    // const blogs = [
    //     { title: 'Blog 1', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
    //     { title: 'Blog 2', snippet: 'Quisquam, voluptatum. Quasi, cumque! Quod, doloribus.' },
    //     { title: 'Blog 3', snippet: 'Nihil, asperiores. Doloribus, voluptates. Quisquam, voluptatum.' },
    //     { title: 'Blog 4', snippet: 'Quasi, cumque! Quod, doloribus. Nihil, asperiores.' }
    // ]
    // res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})


app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404 Not Found' });
});
