import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDb.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();


//Middleware 
app.use(express.json());
app.use(cookieParser());

//For Routes: This means that all routes defined in authRoutes will be accessible under the "/api/auth" path.
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// app.get("/", (req, res) => {
//   res.send("Home route..");
// }); 



app.listen(PORT, () => {
  connectToMongoDB(); 
	console.log(`Server Running on port ${PORT}`);
});