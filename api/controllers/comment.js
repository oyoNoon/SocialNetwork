import moment from "moment";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getComments = (req, res) => {
  const q =
    "SELECT c.id, c.desc, c.createdAt, c.userId, u.name, u.profilePic FROM comments AS c JOIN posts AS p ON (p.id = c.postId) LEFT JOIN users AS u ON (u.id = c.userId) WHERE p.id=? ORDER BY c.createdAt DESC";
  db.query(q, [req.query.postId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];
    db.query(q, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Comment has been created!");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.commentId;
    const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";

    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        return res.status(200).json("Comment has been deleted!");
      }
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
