import Multer from "multer";
import path from "path"
import util from "util";
let processFile = Multer({
    storage: Multer.memoryStorage()
  }).any();
  
  let processFileMiddleware = util.promisify(processFile);
  export default processFileMiddleware;
