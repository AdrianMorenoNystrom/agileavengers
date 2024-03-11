import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import crypto from "crypto";
import routes from "./routes/index.mjs";

const app = express();
const randomSecret = crypto.randomBytes(20).toString("hex");
const allowedOrigins = ["http://localhost:3000", "http://localhost:3500"]; // Dölj denna info?

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials:true,
  })
);

app.use(express.json());
app.use(cookieParser(randomSecret));
app.use(
  session({
    secret: randomSecret,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
    name: "agile-cookie",
  })
);

app.use(routes);

export default app;
