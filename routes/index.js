import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({success:true})
  // res.render('index', { title: 'Express' });
});

export default  router;
