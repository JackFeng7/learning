const array = `1000510
19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,x,x,x,x,x,x,x,x,x,x,29,x,853,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`.split(/\n/);

// part1
function formatData(array) {
    const earliestTime = Number(array[0]);
    const buses = array[1].split(',').filter((item) => {
        if (isNaN(Number(item))) {
            return false;
        }
        return true;
    }).map((item) => Number(item));
    return {earliestTime, buses};
}

function part1(array) {
    const {earliestTime, buses} = formatData(array);
    const times = {};
    for(let i = 0; i < buses.length; i++) {
        if (!earliestTime % buses[i]) {
            times[earliestTime]= buses[i];
            continue;
        }
        times[buses[i] * Math.ceil(earliestTime / buses[i])] = buses[i];
    }
    const keys = Object.keys(times);
    return (Number(keys[0]) - earliestTime) * times[keys[0]];
}

console.log('part1', part1(array));

// part2
function part2(array) {
    const trueBuses = array.filter((item) => item !== 'x');

    let temp = Number(trueBuses[0]); // 初始化第一次最小公倍数单位为第一个元素
    let num = Number(trueBuses[0]); // 初始化最小公倍数
    for (let i = 1; i < trueBuses.length; i++) {
        while ((num + array.indexOf(trueBuses[i])) % Number(trueBuses[i]) !== 0) {
            // 在原最小公倍数的基础上增加一个单位的临时最小公倍数
            num += temp;
        }
        // 更新单位最小公倍数，上次单位公倍数和当前元素的最小公倍数就是下一次单位最小公倍数
        temp = getLeastCommonMultiple(temp, Number(trueBuses[i]));
    }
    console.log('part2', num)
}

// 获取最小公倍数
function getLeastCommonMultiple(a, b) {
    if(b === 0) {
        return 0;
    }
    return (a * b) / gcd(a, b);
}
// 获取最大公约数
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    if (b > a) {
        let temp = a;
        a = b;
        b = temp;
    }

    while (true) {
        a %= b;
        if (a === 0) {
            return b;
        }
        b %= a;
        if (b === 0) {
            return a;
        }
    }
}

part2(array[1].split(','))
