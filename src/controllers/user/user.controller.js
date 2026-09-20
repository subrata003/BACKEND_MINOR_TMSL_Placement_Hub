import userModal from "../../models/user/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
 try {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const userExist = await userModal.findOne({ email });

  if (userExist) {
   return res.status(400).json({
    success: false,
    message: "User already exists"
   });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = new userModal({
   name,
   email,
   password: hashPassword,
   role
  });

  // Save user
  const newUser = await user.save();

  // Don't send password
  const userResponse = {
   id: newUser._id,
   name: newUser.name,
   email: newUser.email,
   role: newUser.role
  };

  return res.status(201).json({
   success: true,
   message: "User created successfully",
   data: userResponse
  });

 } catch (error) {
  return res.status(500).json({
   success: false,
   message: "Something went wrong",
   error: error.message
  });
 }
};

export const login = async (req, res) => {
 try {
  const { email, password } = req.body;
  const user = await userModal.findOne({ email: email });
  if (!user) {
   res.status(400).json({ message: "user not found" })
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   res.status(400).json({ message: "invalid data" })
  }
  const token = jwt.sign({
   id: user._id,
   name: user.name,
   email: user.email
  },
   process.env.SERECT_KEY,
   { expiresIn: "1h" }
  );
  res.status(200).json({ success: true, message: "login successfully", data: user, token: token })

 } catch (error) {

 }

}

export const getAllUser = async (req, res) => {
 try {
  const user = await userModal.find();
  res.status(200).json({ success: true, message: "user get successfully", data: user })
 } catch (error) {

 }
}