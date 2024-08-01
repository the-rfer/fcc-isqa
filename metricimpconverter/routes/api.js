'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
    let convertHandler = new ConvertHandler();

    app.get('/api/convert', function (req, res) {
        const input = req.query.input;
        const initNum = convertHandler.getNum(input);
        const initUnit = convertHandler.getUnit(input);

        if (initUnit === 'invalid unit') {
            res.json({ error: 'invalid unit' });
            return;
        }

        const returnUnit = convertHandler.getReturnUnit(initUnit);

        if (returnUnit === 'invalid unit') {
            res.json({ error: 'invalid unit' });
            return;
        }

        const returnNum = convertHandler.convert(initNum, initUnit);

        if (returnNum === 'invalid unit') {
            res.json({ error: 'invalid unit' });
            return;
        }

        res.json({
            initNum,
            initUnit,
            returnNum,
            returnUnit,
            string: convertHandler.getString(
                initNum,
                initUnit,
                returnNum,
                returnUnit
            ),
        });
    });
};
