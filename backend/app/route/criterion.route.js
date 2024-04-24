module.exports = (app) => {

    const criterion = require('../controller/criterion.controller');

    app.get('/api/getCriteria', criterion.getCriteria);

    app.post('/api/deleteCriterion/:id', criterion.deleteCriterion);

    app.post('/api/addCriterion', criterion.addCriterion);

    app.post('/api/updateCriterion/:id', criterion.updateCriterion);

    app.get('/api/getCriterion/:id', criterion.getCriterionById);
};