// Import the `jsonwebtoken` library for creating JWTs
import jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) and sets it as a cookie in the response.
 *
 * @param {number} userId - The ID of the user for whom to generate the token.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
const generateTokenAndSetCookie = (userId, res) => {
  // Generate a JWT using the jwt.sign() method.
  // The payload of the token is an object with a single key-value pair,
  // where the key is "userId" and the value is the user ID passed to the function.
  // The secret used to sign the token is taken from the process.env.JWT_SECRET environment variable.
  // The token will expire in 15 days, as specified by the expiresIn option.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });


  // Set the token in an HTTP-only cookie using the res.cookie() method.
  // The cookie is named "jwt", and its value is the token.
  // The maxAge option sets the life of the cookie to 15 days in milliseconds.
  // The httpOnly option is set to true, which means that the cookie cannot be accessed by client-side scripts.
  // This can help prevent certain cross-site scripting (XSS) attacks.
  // The sameSite option is set to "strict", which means that the cookie will only be sent with requests that originate from the same site as the cookie.
  // This can help prevent cross-site request forgery (CSRF) attacks.
  // The secure option is set to process.env.NODE_ENV != "development", which means that the cookie will only be sent over HTTPS in production.
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Life of cookie 15 days in milliseconds
    httpOnly: true, // User cannot access this cookie using js | prevent XSS attacks also known as cross-site scripting attacks.
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks.
    secure: process.env.NODE_ENV != "development", // secure: process.env.NODE_ENV === "production"
  });
};

export default generateTokenAndSetCookie;
