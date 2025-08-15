import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    let user = null;
    let q = "";
    if (req.query.userId !== "undefined") {
      q =
        "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId=? ORDER BY p.createdAt DESC;";
      user = [req.query.userId];
    } else {
      q =
        "SELECT DISTINCT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (r.followedUserId = p.userId ) WHERE (p.userId = ? or r.followerUserId = ?) ORDER BY p.createdAt DESC;";
      user = [userInfo.id, userInfo.id];
    }
    db.query(q, user, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  });
};

export const getPost = (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");
  // jwt.verify(token, "secretkey", (err, userInfo) => {
  // if (err) return res.status(403).json("Token is not valid");
  const q =
    "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.id=?";
  db.query(q, [req.params.postId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("Post not found");
    }
    // console.log(data);
    return res.status(200).json(data[0]);
  });
  // });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO `social`.`posts` (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "DELETE FROM `posts` WHERE (`id`=?)";

    db.query(q, [req.params.postId], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Post has been canceled!");
    });
  });
};
