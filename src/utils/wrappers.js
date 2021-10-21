export const convertThousands = (number, decimals) => {
    if (isNaN(number)) return null; // will only work value is a number
    if (number === null) return null;
    if (number === 0) return null;
    // let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0; // will also work for Negetive numbers
    let key = '';
    const powers = [
        { key: ' Q', value: Math.pow(10, 15) },
        { key: ' T', value: Math.pow(10, 12) },
        { key: ' B', value: Math.pow(10, 9) },
        // { key: ' M', value: Math.pow(10, 6) },
        // { key: ' K', value: 1000 },
    ];
    for (let i = 0; i < powers.length; i++) {
        let reduced = number / powers[i].value;
        // reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
            number = reduced;
            key = powers[i].key;

            break;
        }
    }

    let ins = parseFloat(number);

    ins = ins.toFixed(decimals);
    // let f = ins.toLocaleString(undefined, {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2
    // });
    if (!key) {
        var str = ins.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        ins = str.join(".");
    }

    // ins = ins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (isNegative ? '-' : '') + ins + key;
};

export const twoFractions = (input, decimals) => {
    let ins = parseFloat(input);
    ins = ins.toFixed(decimals);

    // let f = ins.toLocaleString(undefined, {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2
    // });

    return ins;
};

export const commaSeperator = (x, decimals) => {
    x = x.toString();
    if (x.includes('.')) {
        x = parseFloat(x);
        x = x.toFixed(decimals);
    } else x = parseInt(x);
    x = x.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    var res =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

    return res;
};

export const formatValue = (error, value, decimals) => {
    if (error != null) {
        return '--';
    } else {
        if (value === '0' || value === '--') {
            return '--';
        } else {
            return convertThousands(value, decimals);
        }
    }
}
