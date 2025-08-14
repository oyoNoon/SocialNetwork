import { da } from "@faker-js/faker";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    // console.log(data)
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

export const getSuggestions = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      SELECT DISTINCT u.id as userId, u.name, u.profilePic, COUNT(*) as mutual_connections
      FROM users u
      INNER JOIN relationships r1 ON u.id = r1.followedUserId
      INNER JOIN relationships r2 ON r1.followerUserId = r2.followedUserId
      WHERE r2.followerUserId = ?
      AND u.id != ?
      AND u.id NOT IN (
        SELECT followedUserId 
        FROM relationships 
        WHERE followerUserId = ?
      )
      GROUP BY u.id, u.name, u.profilePic
      ORDER BY mutual_connections DESC, u.id ASC
      LIMIT 5
    `;

    db.query(q, [userInfo.id, userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getLatestActivities = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
    SELECT u.id AS userId, u.profilePic, u.name, p.createdAt, p.id as postId
    FROM users u
    JOIN posts p 
      ON p.userId = u.id
    WHERE p.createdAt >= NOW() - INTERVAL 7 DAY
      AND EXISTS (
        SELECT DISTINCT r.followedUserId
        FROM relationships r
        WHERE r.followerUserId = ?
        AND r.followedUserId = p.userId
      )
    ORDER BY p.createdAt DESC;`

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      // console.log(data)
      return res.status(200).json(data);
    });
  });
};

export const getUserStats = (req, res) => {
  const userId = req.params.userId;
  
  // 获取关注者数量、关注数量、帖子数量、被点赞总数
  const q = `
    SELECT 
      (SELECT COUNT(*) FROM relationships WHERE followedUserId = ?) as followers,
      (SELECT COUNT(*) FROM relationships WHERE followerUserId = ?) as following,
      (SELECT COUNT(*) FROM posts WHERE userId = ?) as posts,
      (SELECT COUNT(*) FROM likes l JOIN posts p ON l.postId = p.id WHERE p.userId = ?) as totalLikes
  `;
  
  db.query(q, [userId, userId, userId, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

