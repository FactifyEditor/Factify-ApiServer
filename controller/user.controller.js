import  service  from "./../services/index.js";
const {userService} =service
const getAllUsers = async (req, res) => {
  try {
    console.log("getting userList")
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.createUser(req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updatedPassword = async (req,res)=>{
    try {
        const user = await userService.updatePassword(req.params.id, req.body);
        res.json({ data: user, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      } 
}
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    console.log("getting Roles");
    const roles = await userService.getUserRoles();
    console.log(roles);
    res.json({ data: roles, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export default {
getAllUsers,
createUser,
updateUser,
deleteUser,
getUserById,
updatedPassword,
getRoles
}