import pool from '../../lib/connection';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { userid, userpw, username } = req.body;
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }

        const hashPw = await bcrypt.hash(userpw, 10);

        const query = `insert into user (user_id, user_pw, user_name) values (?,?,?)`;

        try {
            await con.query(
                query,
                [userid, hashPw, username],
                (err, result) => {
                    if (err) {
                        res.status(500);
                        res.send({ msg: '회원가입실패' });
                        return;
                    }
                    console.log(result);
                    res.send({ msg: '회원가입성공' });
                },
            );
        } catch (e) {
            res.status(500);
            res.send({ msg: '회원가입실패' });
            console.log(e);
        } finally {
            con.release();
        }
    });
};
export const login = (req, res) => {
    const { userid, userpw } = req.body;
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const query = `select * from user where user_id = ?`;

        try {
            await con.query(query, [userid], async (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send({ msg: '로그인실패' });
                    return;
                }
                if (!result.length) {
                    res.send({ msg: '해당 아이디 없음' });
                    return;
                }

                const { user_id, user_pw, user_name } = result[0];

                const checkPw = await bcrypt.compare(userpw, user_pw);
                if (!checkPw) {
                    res.send({ msg: '비밀번호가 다릅니다.' });
                    return;
                }
                res.send({ msg: '로그인성공', user: { user_id, user_name } });
            });
        } catch (e) {
            res.status(500);
            res.send({ msg: '회원가입실패' });
            console.log(e);
        } finally {
            con.release();
        }
    });
};
export const logout = (req, res) => {
    console.log('logout');
    res.send('logout');
};
export const check = (req, res) => {
    console.log('check');
    res.send('check');
};
