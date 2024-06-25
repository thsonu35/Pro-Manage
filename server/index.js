const express = require('express'); // Importing the Express.js framework
const port = 3000; // Defining the port number for the server
const bodyParser = require("body-parser"); // Importing the body-parser middleware
const app = express(); // Creating an instance of the Express.js app
const fs = require("fs"); // Importing the File System module
const path = require("path"); // Importing the Path module
const authRoutes = require("./routes/auth"); // Importing the authentication routes
// const jobRoutes = require("./routes/job"); // Importing the job routes (commented out)
const mongoose = require('mongoose'); // Importing the Mongoose library
const cors = require('cors'); // Importing the CORS middleware

// Creating a write stream for logging requests
const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a", // Flag to append to the file
});

// Creating a write stream for logging errors
const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
  flags: "a", // Flag to append to the file
});

// Using body-parser middleware to parse JSON and URL-encoded requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enabling CORS for all routes

// Mounting the authentication routes at /auth
app.use("/auth", authRoutes);

// Mounting the job routes at /job (commented out)
// app.use("/job", jobRoutes);

// Middleware to log requests
app.use((req, res, next) => {
  const now = new Date(); // Getting the current date and time
  const time = ` ${now.toLocaleTimeString()}`; // Formatting the time
  const log = `${req.method} ${req.originalUrl} ${time}`; // Creating the log message
  logStream.write(log + "\n"); // Writing the log message to the log file
  console.log(log); // Logging the message to the console
  next(); // Calling the next middleware
});

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your React app's origin
}));

// Root route to return a "Hello World!" message
app.get("/", (req, res) => {
  res.status(200).send('Hello World!'); // Sending a 200 OK response with the message
});

// Middleware to catch 404 errors and log them
app.use((req, res, next) => {
  try {
    const now = new Date(); // Getting the current date and time
    const time = ` ${now.toLocaleTimeString()}`; // Formatting the time
    const error = `${req.method} ${req.originalUrl} ${time}`; // Creating the error message
    errorStream.write(error + "\n"); // Writing the error message to the error file
    res.status(404).send("Route not found"); // Sending a 404 Not Found response
  } catch (err) {
    next(err); // Passing the error to the next middleware
  }
});

// Connecting to MongoDB
mongoose
  .connect("mongodb+srv://caps:Password@cluster1.9xljwe4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
    // Add any additional options for the MongoDB connection here
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Logging a message to the console
});
