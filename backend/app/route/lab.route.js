module.exports = (app) => {

    const lab = require('../controller/lab.controller');

    app.get('/api/getLabs', lab.getLabs);

    app.post('/api/deleteLab/:id', lab.geleteLab);

    app.post('/api/addLab', lab.addLab);

    app.post('/api/updateLab/:id', lab.updateLab);
};