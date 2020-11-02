import pool from '../../lib/connection';
import _ from 'lodash';
const getDateString = (d) => {
    const year = d.getFullYear();
    const tMonth = d.getMonth() + 1;
    const month = tMonth < 10 ? '0' + tMonth : tMonth;
    const date = d.getDate();
    return year + '' + month + '' + date;
};
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
                ({
                    todo_id,
                    title,
                    body,
                    todo_date,
                    writer_date,
                    thumbnail,
                }) => ({
                    todo_id,
                    title,
                    body,
                    thumbnail,
                    todo_date: getDateString(todo_date),
                    writer_date: getDateString(writer_date),
                    _month: getDateString(todo_date).slice(0, 6),
                }),
            );
            const data = _.chain(todos)
                .groupBy('_month')
                .map((v, key) => ({
                    date: key,
                    list: v,
                }))
                .value();

            res.send(_.orderBy(data, 'date', 'desc'));
        });
    });
    // res.send('list');
};
export const write = (req, res) => {
    pool.getConnection(async (err, con) => {
        if (err) {
            console.log(err);
            throw err;
        }
        const { _id } = res.locals.user;
        const { title, body, todo_date } = req.body;
        const { filename } = req.file;
        const query = `insert into todo(title,body,todo_date,writer_id,thumbnail) values(?,?,?,?,?);`;
        await con.query(
            query,
            [title, body, todo_date, _id, filename],
            (err, result) => {
                con.release();
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send({ msg: '실패' });
                    return;
                }
                res.send({ msg: 'todo작성 성공' });
            },
        );
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
                res.send({ msg: '읽기실패' });
                return;
            }
            res.send({
                ...result[0],
                writer_date: getDateString(result[0].writer_date),
                todo_date: getDateString(result[0].todo_date),
            });
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
