require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//express app
const app = express();

//middleware to accept json payload
app.use(express.json());
//Not necessary
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome to the app" });

// });

app.use("/api/workouts", workoutRoutes);

//connect to mongoDb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    //var PORT = process.env.PORT || 5001;
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db and listening on port",
        process.env.PORT + "......."
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
