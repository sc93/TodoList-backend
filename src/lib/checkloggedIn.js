const checkloggedIn = (req, res, next) => {
    if (!res.locals.user) {
        res.status(401);
        res.send({ msg: '로그인이 필요합니다.' });
        return;
    }
    return next();
};

export default checkloggedIn;
