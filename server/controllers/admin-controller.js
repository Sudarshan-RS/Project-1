const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req,res)=>{
  try {
    const id = req.params.id;
    const data = await User.findOne({_id:id},{password:0});
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

const updateUsersById = async (req,res)=>{
  try {
    const id = req.params.id;
    const updatedUserData = req.body; 
    await User.updateOne({_id:id}, {$set :updatedUserData,});
    return res.status(200).json({message:"User updated successfully"});
  } catch (error) {
    next(error);
  }
}
// delete user logic
const deleteUsersById = async (req,res)=>{
  try {
    const id = req.params.id;
    await User.deleteOne({_id:id});
    return res.status(200).json({message:"User deleted successfully"});
  } catch (error) {
    next(error);
  }
}

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts) {
      return res.status(404).json({ message: "no contacts found" });
    }
    // Sending back the requested data
    console.log(contacts);
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const deleteContactById = async (req,res)=>{
  try {
    const id = req.params.id;
    await Contact.deleteOne({_id:id});
    return res.status(200).json({message:"contact deleted successfully"});
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllUsers, getAllContacts, updateUsersById, deleteUsersById, getUserById, deleteContactById};
