import pool from '../../lib/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = ({ seq, user_id }) => {
    const token = jwt.sign(
        {
            _id: seq,
            userid: user_id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '3d',
        },
    );

    return token;
};
export const register = (req, res) => {
    const { userid, userpw, username } = req.body;
    try {
        pool.getConnection(async (err, con) => {
            if (err) {
                throw err;
            }

            const hashPw = await bcrypt.hash(userpw, 10);
            const selectQuery = `select seq from user where user_id = ?`;
            const insertQuery = `insert into user (user_id, user_pw, user_name) values (?,?,?)`;

            con.query(selectQuery, [userid], (err, result) => {
                // con.release();
                if (err) {
                    con.release();
                    res.status(500);
                    res.send({ msg: '회원가입실패' });
                    return;
                }
                if (result.length) {
                    res.status(409);
                    res.send({ msg: '존재하는 아이디' });
                    return;
                } else {
                    console.log(userid, hashPw, username);
                    con.query(
                        insertQuery,
                        [userid, hashPw, username],
                        (err, result) => {
                            con.release();
                            if (err) {
                                res.status(500);
                                res.send({ msg: '회원가입실패' });
                                return;
                            }
                            res.send({ msg: '회원가입성공' });
                        },
                    );
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
};
export const login = (req, res) => {
    const { userid, userpw } = req.body;
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const query = `select * from user where user_id = ?`;
        await con.query(query, [userid], async (err, result) => {
            con.release();
            if (err) {
                res.status(500);
                res.send({ msg: '로그인실패' });
                return;
            }
            if (!result.length) {
                res.status(401);
                res.send({ msg: '해당 아이디 없음' });
                return;
            }

            const { seq, user_id, user_pw, user_name } = result[0];

            const checkPw = await bcrypt.compare(userpw, user_pw);
            if (!checkPw) {
                res.send({ msg: '비밀번호가 다릅니다.' });
                return;
            }
            const user = {
                seq,
                user_id,
            };
            const token = generateToken(user);
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
            res.send({ msg: '로그인성공', user });
        });
    });
};
export const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(204);
    res.send({ msg: '로그아웃' });
};
export const check = (req, res) => {
    const { user } = res.locals;
    if (!user) {
        res.status(401);
        return;
    }
    res.send({ user });
};
