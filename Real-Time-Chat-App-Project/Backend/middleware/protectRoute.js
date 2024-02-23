import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next)=> {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unathenticated User - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //Verify that the token is valid and not expired
        console.log(`decoded: ${decoded}`);

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password"); // Make it await as fetching data from db.

        if(!user){
            return res.status(404).json({error: "User not found!"});
        }

        req.user = user;
        next(); // Call the next function in the middleware chain which is sendMessage in message.routes.js
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({error: "Internal Server Errro!"});
    }
}

export default protectRoute;