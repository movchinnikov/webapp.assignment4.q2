const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/airbnbController");

// API routes
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

// HANDLEBARS pages:
router.get("/view/all", async (req, res) => {
  const Airbnb = require("../models/airbnb");
  const items = await Airbnb.find().limit(200).lean();
  res.render("index", { items });
});

router.get("/view/new", (req, res) => {
  res.render("insert");
});

router.post("/view/new", async (req, res) => {
  const Airbnb = require("../models/airbnb");
  await Airbnb.create(req.body);
  res.redirect("/airbnb/view/all");
});

router.get("/search/advanced", async (req, res) => {
  const Airbnb = require("../models/airbnb");

  const { min=0, max=9999, hood="" } = req.query;

  const items = await Airbnb.find({
    price: { $gte: Number(min), $lte: Number(max) },
    neighborhood: { $regex: hood, $options: "i" }
  }).lean();

  res.json({ count: items.length, items });
});

module.exports = router;
