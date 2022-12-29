// bring in express - since we are using node - the syntax is require NOT import
const express = require('express');
// bring in module to start mongodb through mongoose
const connectDB = require('./config/db.js');

// initialize app as the output of the express function - now app has all the methods that come with express
const app = express();

//connect data base
connectDB();

// middleware to allow json data and req.body
app.use(express.json({ extended: false }));

// define PORT for server to listen on - use environment variables first or port 5000
const PORT = process.env.PORT || 5000;

// define test route and style it inline (one up from just hello world !)
app.get('/test1', (req, res) =>
  res.send(
    '<h1 style="color:yellow; text-align:center; background-color:blue; padding: 3rem; border: 1rem solid black">hello Fizzo</h1>'
  )
);

// define 2nd test route and send json js object
app.get('/test2', (req, res) =>
  res.json({
    msg: 'yes we can send a simple js object and design it the way we want to....',
    msg_code: 'so fine',
    msg_addendum: ['string1', 'sting2', 'string3', 4, 5, 6, 7],
  })
);

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
