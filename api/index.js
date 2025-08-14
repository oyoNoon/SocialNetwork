import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import storiesRoutes from "./routes/stories.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import FormData from "form-data";
import axios from "axios"

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend from localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow DELETE and other methods
    credentials: true, // Allow cookies and credentials
  })
);
// used to automatically parse JSON formatted request bodies.
app.use(express.json());
// easily read and manage cookie using Express (cookies can be sented as a part of header in request)
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../client/public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
const upload = multer({ storage: multer.memoryStorage() }); // 内存接收后转发

app.post('/api/upload', upload.single('file'), async (req, res) => {
  // console.log(req)
  try {
    const form = new FormData();
    form.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      knownLength: req.file.size
    });

    const resp = await axios.post('http://milanet.homes/upload', form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    });
    // console.log(resp.data.filename)
    res.json(resp.data);
  } catch (e) {
    console.log(e)
    res.status(500).json({ ok:false, error: e.message });
  }
});




app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/stories", storiesRoutes);

app.listen(8800, () => {
  console.log("API working");
});
