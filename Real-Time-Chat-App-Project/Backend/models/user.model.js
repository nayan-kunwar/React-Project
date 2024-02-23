import mongoose from "mongoose";

//Define Schema
//Data will be stored in databases like below mentioned structure.
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
   // createdAt and updatedAt field in db.
  { timestamps: true }
);

//Create model based on above schema.
//Models provide a [structured representation of the data] that will be stored in the database.
const User = mongoose.model("User", userSchema);

export default User;
