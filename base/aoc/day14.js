const path = require('path');
const fs = require('fs');

function getArray() {
        return fs.readFileSync(path.join(__dirname, 'day14.txt'), 'utf8')
        .toString()
        .trim().split('mask = ').filter((item) => item).map((item) => {
            const simpleGroup = item.trim().split(/\n/);
            const mask = simpleGroup[0];
            const data = [];
            for (let i = 1; i < simpleGroup.length; i++) {
                data.push({
                    bit: Number(simpleGroup[i].split('=')[0].trim().split('[')[1].split(']')[0]),
                    value: Number(simpleGroup[i].split('=')[1].trim()),
                });
            }
            return {mask, data};
        });

}

// part1
function part1(array) {
    let totalRes = {};
    for (let i = 0; i < array.length; i++) {
        totalRes = {...totalRes, ...searchGroup(array[i])};
    }
    let totalCount = 0;
    Object.values(totalRes).forEach((item) => {
        totalCount += item;
    });
    return totalCount;
}

function searchGroup(group) {
    const {mask, data} = group;
    const dataRes = {};
    for (let i = 0; i < data.length; i++) {
        const {bit, value} = data[i];
        const bitValue = value.toString(2);
        let trueValue = '0'.repeat(36 - bitValue.length) + bitValue;
        dataRes[bit] = parseInt(search(trueValue, mask), 2);
    }

    let currentGroupCount = 0;
    Object.values(dataRes).forEach((value) => {
        currentGroupCount += value;
    });
    return dataRes;
}

function search(value, mask) {
    let res = '';
    for (let i = mask.length - 1; i >= 0; i--) {
        if (mask[i] === 'X') {
            res = value[i] + res;
            continue;
        }
        res = mask[i] + res;
    }
    return res;
}

console.log('part1', part1(getArray()));

// part2
function part2(array) {
    let address = {};
    for (let i = 0; i < array.length; i++) {
        address = {...address, ...searchGroup2(array[i])};
    }
    let count = 0;
    Object.values(address).forEach((item) => count += item);
    return count;
}

function searchGroup2(group) {
    const {mask, data} = group;
    const currentGroupAddress = {};
    for (let i = 0; i < data.length; i++) {
        const {bit, value} = data[i];
        const addresses = search2(bit, mask);
        addresses.forEach((address) => currentGroupAddress[address] = value)
    }
    return currentGroupAddress;
}

function search2(bit, mask) {
    let value = bit.toString(2);
    value = '0'.repeat(36 - value.length) + value;
    const arr = [];
    for (let i = mask.length - 1; i >= 0 ; i--) {
        if (mask[i] === 'X') {
            arr.unshift('X');
        } else if (mask[i] === '1') {
            arr.unshift('1');
        } else {
            arr.unshift(value[i]);
        }
    }
    const array = floatingToPossibilites([arr.join('')]).map((item) => parseInt(item, 2));
    return array;
}

function floatingToPossibilites(vals) {
    let pushed = false;
    let new_vals = [];
    for (let val of vals) {
        let x = val.indexOf('X');
        if (x > -1) {
            let a = `${val.slice(0, x)}0${val.slice(x + 1)}`;
            let b = `${val.slice(0, x)}1${val.slice(x + 1)}`;
            new_vals.push(a, b);
            pushed = true;
        }
    }

    if (pushed) {
        return floatingToPossibilites(new_vals);
    } else {
        return vals;
    }
}

console.log('part2', part2(getArray()))