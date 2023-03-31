
import model from './../models/index.js'
import bcrypt from 'bcrypt';
const {userModel,roleModel} = model;
/**
 * 
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
const  updatePassword=async( id, data )=> {
    let password= bcrypt.hashSync(data.password, 10);
   
    try {
        await userModel.findByIdAndUpdate( id, {password}, { 'new': true } );
        return { 'passwordChanged': true };
    } catch ( errors ) {
        throw errors;
    }
}
/**
 *
 * @param email : string
 * @param includePassword : boolean
 * @returns {Promise<*>}
 */
const  findByEmail= async( email, includePassword = false )=> {
    return  userModel.findOne( {email} ).populate("roles", "-__v") 
}

const getAllUsers = async () => {
    return await userModel.find().populate('roles');
  };
  
  const createUser = async (user) => {
    return await userModel.create(user);
  };
  const getUserById = async (id) => {
    return await userModel.findById(id);
  };
  
  const updateUser = async (id, user) => {
    return await userModel.findByIdAndUpdate(id, user);
  };
  
  const deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };
  const getUserRoles= async ()=>{
    return await roleModel.find();
  }
export default {
    findByEmail,
    updatePassword,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getUserRoles
}
