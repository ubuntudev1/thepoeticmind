const express = require('express');
const router = express.Router();
const adminController = require('../controllers/poemController');


const Poem = require('../models/poem')



// 🔹 Get poems by category
router.get("/category/:category", async (req, res) => {
  try {
    const poems = await Poem.find({ category: req.params.category });
    res.json(poems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Search poems (title/content/category)
router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const poems = await Poem.find({
      $or: [
        { title: new RegExp(query, "i") },
        { content: new RegExp(query, "i") },
        { category: new RegExp(query, "i") }
      ]
    });
    res.json(poems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/api/poems/:id", async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ error: "Poem not found" });
    res.json(poem);
  } catch (error) {
    res.status(500).json({ error: "Error fetching poem" });
  }
});

// in poemRoutes.js


router.get("/category", async (req, res) => {
  const category = req.query.category;
  if (!category) {
    return res.status(400).send("Category is required");
  }

  const poems = await Poem.find({ category });
  res.render("category", { category, poems });
});
router.get("/:id", async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).send("Poem not found");
    }
    res.render("poem", { poem });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/poemDetail/:id", async (req, res) => {
  const poem = await Poem.findById(req.params.id);
  res.render("poemDetail", { poem });
});


module.exports= router;

