import userService from './userService.js';
import model from './../models/index.js'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {userModel} = model;
/**
     *
     * @param email: String
     * @param password: String
     * @returns {Promise<any>}
     */
const  login= async( email, password ) =>{
    const user = await userService.findByEmail( email, true );
    if ( !user ) {
        // User not found
        const error = new Error( 'Invalid Email' );
        error.statusCode = 422;
        return error;
    } else {
        // Process Login
        try {
            // Check Password
            const passwordMatched = await user.comparePassword( password );

            if ( !passwordMatched ) {
                const error = new Error( 'Invalid Password' );

                error.statusCode = 422;
                return error;
            }
            const token = await user.generateToken( user );
              var authorities = [];
        
              for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
              }
              return {
                statusCode:200,
                id: user._id,
                firstName: user.firstName,
                lastName:user.lastName,
                email: user.email,
                roles: authorities,
                accessToken: token
              };
        } catch ( e ) {
            throw e;
        }

    }
}
/**
 * 
 * @param {*} data 
 * @returns 
 */
const register= async( data )=> {
    try {
        return await userService.insert( data );
    } catch ( error ) {
        throw error;
    }
}
/**
 * 
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
const changePassword= async( id, data )=> {
    try {
        const updatedPassword = await userService.updatePassword( id, data );

        return new HttpResponse( updatedPassword );
    } catch ( error ) {
        throw error;
    }
}
/**
 * 
 * @param {*} token 
 * @returns 
 */
const logout= async( token )=> {
    try {
        await userModel.deleteOne( { token } );
        return new HttpResponse( { 'logout': true } );
    } catch ( error ) {
        throw error;
    }
}
/**
 * 
 * @param {*} token 
 * @returns 
 */
const checkLogin= async( token )=> {
    try {
        // Check if the token is in the Database
        const tokenInDB = await userModel.countDocuments( { token } );

        if ( !tokenInDB ) {
            const error = new Error( 'Invalid Token' );

            error.statusCode = 401;
            throw error;
        }
        // Check the token is a valid JWT
        const user = await userModel.decodeToken( token );

        if ( !user ) {
            const error = new Error( 'Invalid Token' );

            error.statusCode = 401;
            throw error;
        }
        // Check the Extracted user is active in DB
        const userFromDb = await userService.get( user._id );

        if ( userFromDb.data && userFromDb.data.status ) {
            return userFromDb.data;
        }
        const error = new Error( 'Invalid Token' );

        error.statusCode = 401;
        throw error;
        
    } catch ( e ) {
        const error = new Error( 'Invalid Token' );

        error.statusCode = 401;
        throw error;
    }
}

export default {
    login,
    register,
    changePassword,
    logout,
    checkLogin
}