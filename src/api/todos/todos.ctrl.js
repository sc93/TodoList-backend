import connection from '../../lib/connection';

export const list = (req, res) => {
    console.log('list');
    res.send('list');
};
export const write = (req, res) => {
    console.log('write');
    res.send('write');
};
export const read = (req, res) => {
    console.log('read');
    res.send('read');
};

export const remove = (req, res) => {
    console.log('remove');
    res.send('remove');
};
export const update = (req, res) => {
    console.log('update');
    res.send('update');
};
