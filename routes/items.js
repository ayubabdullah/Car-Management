var express = require("express");
var router = express.Router();

const Item = require("../models/Item");

/* GET items listing. */
router.get("/", async function (req, res, next) {
  const items = await Item.find();
  res.render("index", { items });
});

/* GET add form. */
router.get("/additem", async function (req, res, next) {
  res.render("addForm");
});

/* GET edit form . */
router.get("/edititem/:id", async function (req, res, next) {
  const item = await Item.findById(req.params.id);

  res.render("editForm", {item});
});

/* Create item. */
router.post("/", async function (req, res, next) {
  const item = new Item(req.body);
  await item.save();
  res.redirect("/items");
});

/* Update item. */
router.post("/:id", async function (req, res, next) {
  const item = await Item.findById(req.params.id);

  item.name = req.body.name;
  item.manufacturer = req.body.manufacturer;
  item.model = req.body.model;
  item.price = req.body.price;

  await item.save();

  res.redirect("/items");
});

/* Delete item. */
router.get("/:id", async function (req, res, next) {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/items");
});

module.exports = router;
