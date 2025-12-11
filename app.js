require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error(err));

const airbnbRoutes = require("./routes/airbnb");
app.use("/airbnb", airbnbRoutes);

// Error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal error" });
});

app.listen(process.env.PORT || 8000, () =>
  console.log("Server running")
);
