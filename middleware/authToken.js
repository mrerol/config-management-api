import CommonUtils from "../utils/CommonUtils.js";

const authToken = async (req, res, next) => {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split("Bearer ")[1];
   try {
      if (!token) {
         throw new Error("You must be logged in!");
      }
      if (process.env.ACCESS_TOKEN !== token) {
         throw new Error("Invalid token");
      }
      next();
   } catch (error) {
      CommonUtils.handleError(res, error);
   }
};

export default authToken;