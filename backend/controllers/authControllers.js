
const User = require('../models/User');

const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');





module.exports = {
	createUser: async(req, res) => {
		var Username = req.body.username;
var Email = req.body.email;
var Password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
var Location = req.body.location;
		const newUser= new User({
			username: Username,
			email: Email,
			password: Password ,
			location: Location,
		});

		try{
         await newUser.save();
		 res.status(201).json({ message: "User successfully created"});
		}catch(e){
        res.status(500).json({message: e})
		}
	
	},

	loginUser: async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    console.log("User:", user);

    // Check if the user exists
    if (!user) {
      console.log("User not found");
      return res.status(401).json("Could not find the user");
    }

    // Decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const thePassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

    console.log("Decrypted Password:", thePassword);

    // Temporary password comparison check
    console.log("Password Match:", thePassword === password);

    // Compare the decrypted password with the provided password
    if (thePassword !== password) {
      console.log("Wrong password");
      return res.status(401).json("Wrong password");
    }

    // Create a JWT token
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: "21d" });

    // Exclude sensitive information from the response
    const { password: excludedPassword, __v, createdAt, ...userData } = user._doc;

    // Respond with the user data and token
    return res.status(200).json({ ...userData, token: userToken });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json("Failed to login, check your credentials");
  }
},
}