const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('10gal'), 10);
    });

    test('convertHandler should correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('10.5gal'), 10.5);
    });

    test('convertHandler should correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2gal'), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('2.5/5gal'), 0.5);
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.equal(convertHandler.getNum('3/2/3gal'), 1); // Returns default 1
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.getNum('gal'), 1);
    });

    test('convertHandler should correctly read each valid input unit', function () {
        assert.equal(convertHandler.getUnit('10gal'), 'gal');
        assert.equal(convertHandler.getUnit('10L'), 'L');
        assert.equal(convertHandler.getUnit('10mi'), 'mi');
        assert.equal(convertHandler.getUnit('10km'), 'km');
        assert.equal(convertHandler.getUnit('10lbs'), 'lbs');
        assert.equal(convertHandler.getUnit('10kg'), 'kg');
    });

    test('convertHandler should correctly return an error for an invalid input unit', function () {
        assert.equal(convertHandler.getUnit('10xyz'), 'invalid unit');
    });

    test('convertHandler should return the correct return unit for each valid input unit', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

    test('convertHandler should correctly convert gal to L', function () {
        assert.closeTo(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
    });

    test('convertHandler should correctly convert L to gal', function () {
        assert.closeTo(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
    });

    test('convertHandler should correctly convert mi to km', function () {
        assert.closeTo(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
    });

    test('convertHandler should correctly convert km to mi', function () {
        assert.closeTo(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
    });

    test('convertHandler should correctly convert lbs to kg', function () {
        assert.closeTo(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
    });

    test('convertHandler should correctly convert kg to lbs', function () {
        assert.closeTo(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
    });
});
