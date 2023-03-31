import  services from './../services/index.js'

const {authService}=services;

const login= async( req, res, next )=> {
    try {
        console.log(req.body);
        const response = await authService.login( req.body.email, req.body.password );
        await res.status( response.statusCode ).json( response );
    } catch ( e ) {
        next( e );
    }
}

const  register= async( req, res, next )=> {
    try {
        const registeredUserData = await authService.register( req.body );

        await res.status( 200 ).json( registeredUserData );
    } catch ( e ) {
        next( e );
    }
}
const  changePassword=( req, res, next )=> {
    try {
        const id = req.user._id;

        bcrypt.genSalt( SALT_WORK_FACTOR, async( err, salt ) => {
            if ( err ) {
                return next( err );
            }
            bcrypt.hash( req.body.password, salt, async( hashErr, hash ) => {
                if ( hashErr ) {
                    return next( hashErr );
                }
                const data = { 'password': hash },
                    response = await authService.changePassword( id, data );
                await res.status( response.statusCode ).json( response );
            } );
        } );
    } catch ( e ) {
        next( e );
    }
}

const  logout= async( req, res, next )=> {
    try {
        const response = await authService.logout( req.token );
        await res.status( response.statusCode ).json( response );
    } catch ( e ) {
        next( e );
    }
}

const checkLogin= async( req, res, next )=> {
    try {
        const token = this.extractToken( req );

        req.user = await authService.checkLogin( token );
        req.authorized = true;
        req.token = token;
        next();
    } catch ( e ) {
        next( e );
    }
}

const extractToken=( req )=> {
    if ( req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer' ) {
        return req.headers.authorization.split( ' ' )[ 1 ];
    } else if ( req.query && req.query.token ) {
        return req.query.token;
    }
    return null;
}

export default {
    login,
    register,
    changePassword,
    logout,
    checkLogin,
    extractToken
}
