const psQlData = (object) => {
    const columns = [];
    const positions = [];
    const values = [];

    Object.entries(object).forEach(([column, value], index) => {
        columns.push(column);
        values.push(value);
        positions.push(`$${(index += 1)}`);
    });
    return [columns, positions, values];
};

const objectValues = (obj) => {
    const keys = Object.keys(obj);
    const values = keys.map((key) => obj[key]);

    return values;
};

module.exports = {
    objectValues,
    psQlData,
};
