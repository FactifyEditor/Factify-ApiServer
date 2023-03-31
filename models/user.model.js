import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import authConfig from './../config/auth.config.js';
import jwt from "jsonwebtoken";
let Schema = mongoose.Schema;
var UserSchema =  new Schema({
  firstName: {
      required: true,
      type: String
  },
  lastName: {
      required: true,
      type: String
  },
  phone: {
      required: true,
      type: String,
      unique: true
  },
  email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
  },
  password: {
      required: false,
      type: String
  },
  lastLogin: {
      required: false,
      type: String
  },
  isDisabled: {
      required: false,
      type: Boolean
  },
  created: {
      type: Date,
      default: Date.now
  },
  status: {
      required: false,
      type: Number,
      default: 0
  },
  roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
  }]
})
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateToken=function(user){
return jwt.sign({ id: user._id }, authConfig.secret, {
    expiresIn: 86400 // 24 hours
  });

}
const User = mongoose.model(
  "User",
  UserSchema
 
);
export default User;