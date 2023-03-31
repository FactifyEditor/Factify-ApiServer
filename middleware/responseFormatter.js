// import errorMessage from './../constants/messages'

export default (req, res, next) => { 
  res.sendSuccessResponse = function (data) {
    return res.status(200).send({
      status: "success",
      data: data || {},
    });
  }

  res.sendErrorResponse = function (message="",code=400) {
    return res.status(code).send({
      status: 'error',
      message : message
    });
  }
  next();
}