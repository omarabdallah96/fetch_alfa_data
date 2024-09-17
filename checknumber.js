const { isAlfa } = require("./alfa_package/checkAlfa");

const checkNumberMiddleware = (req, res, next) => {
  const number = req.query.number || req.body.number; 

  const password = req.query.password || req.body.password;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!number) {
    return res.status(400).json({ message: "Number is required" });
  }

  // Ensure the number is a string and has exactly 8 characters
  if (typeof number !== 'string' || number.length !== 8) {
    return res.status(400).json({ message: "Invalid number format" });
  }

  // Check if the number is a valid number
  if (isNaN(number)) {
    return res.status(400).json({ message: "Invalid number" });
  }

  // Check if the number is of the type 'Alfa'
  const alfaNumber = isAlfa(number);

  if (!alfaNumber) {
    return res.status(400).json({ message: "Number should be Alfa" });
  }

  next(); // Proceed if number is valid
};

module.exports = checkNumberMiddleware;
