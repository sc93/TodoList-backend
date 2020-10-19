import pool from '../../lib/connection';

export const list = (req, res) => {
    const { _id } = req.query;
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const query = `select * from todo where writer_id = ?`;
        await con.query(query, [_id], (err, result) => {
            con.release();
            if (err) {
                res.status(500);
                res.send({ msg: '실패' });
                return;
            }
            const todos = result.map(
                ({ todo_id, title, body, todo_date, writer_date }) => ({
                    todo_id,
                    title,
                    body,
                    todo_date,
                    writer_date,
                }),
            );
            res.send({ todos });
        });
    });
    // res.send('list');
};
export const write = (req, res) => {
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const { _id } = res.locals.user;
        const { title, body, todo_date } = req.body;
        const query = `insert into todo(title,body,todo_date,writer_id) values(?,?,?,?);`;
        await con.query(query, [title, body, todo_date, _id], (err, result) => {
            con.release();
            if (err) {
                console.log(err);
                res.status(500);
                res.send({ msg: '실패' });
                return;
            }
            res.send({ msg: 'todo작성 성공' });
        });
    });
};
export const read = (req, res) => {
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const { id } = req.params;
        const query = `select * from todo where todo_id = ?`;

        await con.query(query, [id], (err, result) => {
            con.release();
            if (err) {
                console.log(err);
                res.status(500);
                res.send({ msg: '글쓰기실패' });
                return;
            }
            res.send({ todo: result[0] });
        });
    });
};

export const remove = (req, res) => {
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const { id } = req.params;
        const query = `delete from todo where todo_id = ?`;

        await con.query(query, [id], (err, result) => {
            con.release();
            if (err) {
                console.log(err);
                res.status(500);
                res.send({ msg: '삭제실패' });
                return;
            }
            res.send({ msg: '삭제성공' });
        });
    });
};
export const update = (req, res) => {
    pool.getConnection(async (err, con) => {
        if (err) {
            throw err;
        }
        const { id } = req.params;
        const { title, body, todo_date } = req.body;
        const query = `update todo set title=?,body=?,todo_date=? where todo_id = ?`;

        await con.query(query, [title, body, todo_date, id], (err, result) => {
            con.release();
            if (err) {
                console.log(err);
                res.status(500);
                res.send({ msg: '수정실패' });
                return;
            }
            res.send({ msg: '수정성공' });
        });
    });
};
