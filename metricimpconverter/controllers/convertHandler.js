function ConvertHandler() {
    // Regex patterns for input validation
    const unitPattern = /[a-zA-Z]+$/;
    const numPattern = /^(\d+(\.\d*)?|\.\d+)(\/(\d+(\.\d*)?|\.\d+))?$/;

    this.getNum = function (input) {
        let result;
        // Extract the numerical part and check if it's valid
        const numMatch = input.match(
            /^(\d+(\.\d*)?|\.\d+)(\/(\d+(\.\d*)?|\.\d+))?/
        );
        if (numMatch) {
            const num = numMatch[0];
            result = eval(num); // Evaluate the fraction/decimal
        }
        return result || 1; // Default to 1 if no number is provided
    };

    this.getUnit = function (input) {
        let result;
        // Extract the unit part and validate
        const unitMatch = input.match(unitPattern);
        if (unitMatch) {
            result = unitMatch[0].toLowerCase();
            const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            if (validUnits.indexOf(result) === -1) {
                result = 'invalid unit';
            }
        } else {
            result = 'invalid unit';
        }
        return result;
    };

    this.getReturnUnit = function (initUnit) {
        const units = {
            gal: 'L',
            L: 'gal',
            mi: 'km',
            km: 'mi',
            lbs: 'kg',
            kg: 'lbs',
        };
        return units[initUnit] || 'invalid unit';
    };

    this.spellOutUnit = function (unit) {
        const spellings = {
            gal: 'gallons',
            L: 'liters',
            mi: 'miles',
            km: 'kilometers',
            lbs: 'pounds',
            kg: 'kilograms',
        };
        return spellings[unit] || 'invalid unit';
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        let result;
        switch (initUnit) {
            case 'gal':
                result = initNum * galToL;
                break;
            case 'l':
                result = initNum / galToL;
                break;
            case 'mi':
                result = initNum * miToKm;
                break;
            case 'km':
                result = initNum / miToKm;
                break;
            case 'lbs':
                result = initNum * lbsToKg;
                break;
            case 'kg':
                result = initNum / lbsToKg;
                break;
            default:
                result = 'invalid unit';
        }
        return result;
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        return `${initNum} ${this.spellOutUnit(
            initUnit
        )} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(
            returnUnit
        )}`;
    };
}

module.exports = ConvertHandler;
