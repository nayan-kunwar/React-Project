import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

//Authentication Controllers

//When creating new user or signup check for two things 1- if password and confirmPassword are equal or not | 2- If user alredy exists
//Make both of them true inside if() and send status accordingly.
export const signup = async (req, res) => {
  try {
    // Destructuring data from the request body
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Checking if passwords match
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Password don't match." });
    }

    // Checking if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User alredy exists." });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generating profile picture URLs based on gender
    //API for avatar- https://avatar-placeholder.iran.liara.run/document
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Creating a new User instance(and assign to newUser and save in database) -Created collection(users) in db but document is not saved.
    // newUser = { below value}
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    //newUser: {field: value } | field same as above and value is from client side.
    console.log(`newUser: ${newUser}`);

    //Check if newUser exists (truthy)
    if (newUser) {
      //Generate JWT token here.
      generateTokenAndSetCookie(newUser._id, res);

      // Saving the new user to the database | save newUser document.
      await newUser.save();

      // Sending a successful response with user details
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data!" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    // Log additional details if available
    if (error.stack) {
      console.error(error.stack);
    }
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    // console.log(`PASSWORD: -${typeof user}-`); -> user can be [null] or [undefine] but in this case | user = null if user is not find .
    // user?.password || "" -> if user is null and it match with empty string because  we can't access property of null. And bcrypt.compare
    // method compare password in string if one is string other is null then it will through error defined in catch section.

    //After applying "" we will get isPasswordMatch = false and try error will be thrown in response.
    const isPasswordMatch = await bcrypt.compare(
      password,
      user?.password || ""
    );

    // Checking if user already exists
    // In frontend: response.json() = {error: ""}
    // data = response.json() = {error: ""}
    // data = {error: ""}
    if (!user || !isPasswordMatch) {
      return res.status(400).json({
        error: "Authentication failed! Invalid Username or password.", //const data = await response.json(); and data.error = "Authentication failed! Invalid Username or password."
      });
    }

    generateTokenAndSetCookie(user._id, res);

    // Sending a successful response with user details.
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({message: "Logged out succesfully."});
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
