const path = require('path');
const fs = require('fs');

const [fields, myTicket, nearbyTickets] = fs.readFileSync(path.join(__dirname, 'day16.txt'), 'utf8')
    .toString()
    .trim()
    .split(/\n\n/);

// part1 寻找不满足座位的特征，求这些数字的和
function part1(fields, nearbyTickets) {
    const valid = fields.match(/\d+-\d+/g).reduce((a, v) => {
        let [start, end] = v.split('-').map(a=>parseInt(a));
        for (let j = start; j <= end; j++) {
            a.add(j);
        }
        return a;
    }, new Set())

    const nums = nearbyTickets.match(/\d+/g).map(v => parseInt(v))

    return nums.filter(num => !valid.has(num)).reduce((a,b)=>a+b,0);
}
console.log('part1', part1(fields, nearbyTickets))


// part2 找到座位，以单词开头departure的6个字段数字乘积

// 格式化规则
function formatFields(fields) {
    const allValid = new Set(); // 存储规则中所有有效的数字
    const allFieldNames = [];  // 存储规则中规则字段名称
    const fieldsValid = fields // 存储每个字段范围内的所有的值，也就是每个规则均生成一个有效范围数组
        .split('\n')
        .map(f => {
            allFieldNames.push(f.split(':')[0])
            return f.match(/\d+-\d+/g)
                .reduce((a, v) => {
                    let [start, end] = v.split('-').map(a=>parseInt(a));
                    for (let j = start; j <= end; j++) {
                        a.add(j);
                        allValid.add(j);
                    }
                    return a;
                }, new Set())
        });
    return {allValid, allFieldNames, fieldsValid};
}

// 获取有效的临近的票
function getValidNearbyTicket(allValid, nearbyTickets, fieldsValid, allFieldNames) {
    const tickets =  nearbyTickets
        .split('\n')
        .slice(1)
        .map(t => t.split(',').map(v => parseInt(v)))
        .filter(ticket =>
            ticket.every(e => allValid.has(e))
        );

    let entrysOptions = [];
    for (let entryNum = 0; entryNum < tickets[0].length; entryNum++) {
        let couldBe = new Set(allFieldNames);
        for (let ticketNum = 0; ticketNum < tickets.length; ticketNum++) {
            fieldsValid.forEach((field,i)=> {
                if (!field.has(tickets[ticketNum][entryNum])) {
                    couldBe.delete(allFieldNames[i]);
                }
            })
        }
        entrysOptions.push(couldBe);
    }

    return entrysOptions;
}

function getMyTicket(allFieldNames, entrysOptions) {
    let found = []
    let amtFound = 0;
    while (amtFound < allFieldNames.length) {
        entrysOptions.forEach((options, i) => {
            if (options.size == 1) {
                let fieldName = options.values().next().value;
                entrysOptions.forEach(allOptions => {allOptions.delete(fieldName)});
                found[i] = fieldName;
                amtFound++;
            }
        })
    }
    const myTicketValues = myTicket.split('\n')[1].split(',').map(e => parseInt(e));

    return {found, myTicketValues};
}

function part2(fields, myTicket, nearbyTickets) {
    const {allValid, allFieldNames, fieldsValid} = formatFields(fields);
    const entrysOptions = getValidNearbyTicket(allValid, nearbyTickets, fieldsValid, allFieldNames);
    const {found, myTicketValues} = getMyTicket(allFieldNames, entrysOptions);

    let departures = 1;
    found.forEach((name, i) => {
        if (name.split(' ')[0] == 'departure') {
            departures *= myTicketValues[i]
        }
    })
    return departures;
}

console.log('part2', part2 (fields, myTicket, nearbyTickets))