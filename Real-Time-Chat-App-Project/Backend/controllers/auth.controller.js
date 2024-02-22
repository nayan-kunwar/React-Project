import User from "../models/user.model.js";

//Authentication Controllers
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

    // Generating profile picture URLs based on gender
    //API for avatar- https://avatar-placeholder.iran.liara.run/document
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Creating a new User instance(and assign to newUser and save in database)
    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Saving the new user to the database
    await newUser.save();

    // Sending a successful response with user details
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName, 
      userName: newUser.username,
      profilePic: newUser.profilePic, 
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = (req, res) => { 
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
