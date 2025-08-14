import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // CHECK USER IF EXISTS
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (err, data) => {
    // ERROR OPERATION
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    // USER ALREADY EXITS
    if (data.length) {
      console.log("User already exists!");
      return res.status(409).json("User already exists!");
    }
    // CREATE A NEW USER
    // HASH THE PASSWORD: 12314 => aasdfangaewo1239a9sfa3
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (username, email, password, name) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {
  // QUERY DATABASE INFORMATION
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    // ERROR QUERY
    if (err) return res.status(500).json(err);
    // NOT A USER
    if (data.length === 0) return res.status(404).json("User not found!");

    // CHACKE INFORMATION
    // COMPARE ENCRYPTED ONE WITH INPUT ONE
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    // NO MATCH
    if (!checkPassword)
      return res.status(400).json("Wrong password or username");

    // MATCHED & GET TOKEN FROM SERVER
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    // STORE TOKEN IN COOKIE
    const { password, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true, // Prevent access via JavaScript
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true, // Ensure cookie is only cleared over HTTPS
      sameSite: "none", // Allow cross-origin requests, if needed
    })
    .status(200)
    .json("User has been logout");
};
