import express from "express";
import cors from "cors";
import "dotenv/config";
import chatRouter from "./routes/chatRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// ---------------- Allowed Origins -----------------
const allowedOrigins = [
  process.env.FRONTEND_URL,                        // deployed frontend URL
  "http://localhost:8080",                         // local dev
];

// ---------------- CORS Middleware -----------------
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  exposedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
}));

app.options("*", cors()); // handle preflight

// ---------------- Middleware -----------------
app.use(express.json());

// ---------------- Routes -----------------
app.use("/api", chatRouter);

app.get("/", (req, res) => res.send("API Working"));

// ---------------- Error Handling -----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// ---------------- Start Server -----------------
app.listen(port, () => console.log(`Server running on port ${port}`));
