import admin from '../config/firebaseConfig.js';

const authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split("Bearer ")[1];
    if (!token) {
        return res.status(401)
            .send({ error: "Please, login!" });
    }
    try {
        req.user = await admin.auth().verifyIdToken(token);
        next();
    } catch (error) {
        console.error("Error verifying Firebase Token: " + token, error);
        return res.status(403)
            .send({ error: "Invalid Firebase Token: " + token });
    }
};

export default authUser;