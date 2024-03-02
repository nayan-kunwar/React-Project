import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDb.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//Middleware 
app.use(express.json()); // Middleware parses the req body which is in JSON string data and makes it available in the [req.body] object. 
app.use(cookieParser()); // Middleware parses the Cookie header from the incoming request and populates [req.cookies] with an object.

//For Routes: This means that all routes defined in authRoutes will be accessible under the "/api/auth" path.
app.use("/api/auth", authRoutes); // Contain Authentication Routes.
app.use("/api/messages", messageRoutes); // Contain Messages Routes.
app.use("/api/users", userRoutes) // Contain Users Routes.

app.listen(PORT, () => {
  connectToMongoDB(); 
	console.log(`Server Running on port ${PORT}`);
});