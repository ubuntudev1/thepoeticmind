const poem = require("../models/poem")


const index = async(req,res)=>{
  await  res.render('index')
}

const about = async(req,res)=>{
   await res.render('about')
}

const contact = async(req,res)=>{
    res.render('contact')
}

const blog = async(req,res)=>{
    res.render('blog')
}

const element = async(req,res)=>{
    res.render('elements')
}

const detail = async(req,res)=>{
    res.render('details')
}

const upload = async(req,res)=>{
    res.render('upload')
}

const thank = async (req, res) => {
  // or however you stored it
  res.render("thankyou");
};


const success = (req, res) => {
  res.render('success', { name: req.body.name });
};

module.exports={
    index, contact,blog, detail, element,about,upload,success,thank
}