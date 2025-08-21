const express = require('express');
const path = require('path');
const layOut = require('express-ejs-layouts');
require('dotenv').config();
const formRoutes = require('./routes/formRoutes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/poeticMind', {
 
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(layOut);

// Define a basic route
app.use('/uploads', express.static('uploads'));

app.use('/', formRoutes);
const adminRoutes = require('./routes/adminRoutes');

app.use('/', adminRoutes);
const donationRoutes = require('./routes/donationRoutes');
app.use('/donate' , express.static(path.join(__dirname, 'public')));
app.use('/donate', donationRoutes);

// After payment success
app.post("/payment/success", async (req, res) => {
  const payment = {
    amount: req.body.amount,
    currency: req.body.currency
  };
  
  res.render("thankyou", { payment });
});


// Define the port
const PORT = process.env.PORT || 3008;
app.use('/api/poems' , express.static(path.join(__dirname, 'public')));
const poemRoutes=require('./routes/poemRoutes')

app.use("/api/poems", poemRoutes);



// category page (renders EJS view)


const router=require('./routes/pageRoutes')
app.use('/',router)
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});