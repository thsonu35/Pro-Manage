const User = require("../models/user"); // Importing the User model
const bcrypt = require("bcrypt"); // Importing the bcrypt library for password hashing
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for generating JSON Web Tokens

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Destructuring the request body

    // Checking if any of the required fields are missing
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please enter all the fields" });
    }

    // Checking if a user with the same email or mobile number already exists
    const isUserExist = await User.findOne({ $or: [{ email }] });
    if (isUserExist) {
      return res.status(409).json({ error: "User already exists" }); // Use 409 Conflict status code
    }

    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Saving the new user to the database
    await user.save();

    // Sending a success response
    return res.status(201).json({ message: "User created successfully" }); // Use 201 Created status code
  } catch (err) {
    // Logging the error and sending a 500 response
    console.error("Error registering user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter email and password" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JSON Web Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "your_secret_key", { expiresIn: '1h' });

    // Return the token to the client
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const allUsers = async (req, res) => {
  try {
    // Check if the user is an admin
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter email and password" });
    }

    // Use environment variables for admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || "admin@backend.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (email === adminEmail && password === adminPassword) {
      // Find all users in the database
      const users = await User.find();

      // Return the list of users
      return res.status(200).json(users);
    } else {
      return res.status(403).json({ error: "You are not authorized to view all users" });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, loginUser, allUsers };
