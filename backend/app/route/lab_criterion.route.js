module.exports = (app) => {

    const lab_criterion = require('../controller/lab_criterion.controller');

    app.get('/api/getCriteriaForLab/:id', lab_criterion.getCriteriaForLab);

    app.post(`/api/updateLabCriterion/:id`, lab_criterion.updateLabCriterion);

    app.post('/api/addLabCriteria/:id', lab_criterion.addLabCriteria);

    app.get('/api/getCriteriaNotForLab/:param', lab_criterion.getCriteriaNotForLab);
};