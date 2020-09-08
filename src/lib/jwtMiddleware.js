import jwt from 'jsonwebtoken';

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies['access_token'];
    if (!token) return next();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        return next();
    } catch (error) {
        console.log(error);
        return next();
    }
};

export default jwtMiddleware;
