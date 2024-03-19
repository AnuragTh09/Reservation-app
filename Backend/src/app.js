import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js"
import AuthRoute from "./routes/userAuth.routes.js"
import userLogoutRoute from "./routes/userLogout.routes.js"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/auth", AuthRoute)
app.use("/api/logout", userLogoutRoute)

app.get("/", (req, res) => {
  res.send("Welcome to MERN hotel reservation application");
});
export default app;
