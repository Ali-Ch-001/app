const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Users = require("./models/Users");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");
const config = require('./config/config.json');

const env = process.env.NODE_ENV || 'development';
const mongoURI = config[env].uri;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connected to MongoDB: ${env} database`);
}).catch((err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

app.use(express.json());
app.use(cookieParser());
// Enable CORS for all origins (not recommended for production)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.post("/", (req, res) => {
  console.log("Server running");
  res.send("Server is up and running");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new Users({
      username: username,
      password: hash,
    });
   
    const token = createTokens
    res.json("USER REGISTERED");
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "User Doesn't Exist" });
    }
  
    const dbPassword = user.password;
    const match = await bcrypt.compare(password, dbPassword);
    if (!match) {
      return res.status(400).json({ error: "Wrong Username and Password Combination!" });
    }

    const accessToken = createTokens;
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
      httpOnly: true,
    });

    res.json({"accesstoken": accessToken, 
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
      httpOnly: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/profile", validateToken, (req, res) => {
  // Assuming validateToken middleware verifies and decodes JWT from access-token cookie
  res.json("profile");
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});