module.exports = (app) => {

    const extension = require('../controller/extension.controller');

    app.post('/api/download', extension.download);
};