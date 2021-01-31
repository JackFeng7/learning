const array = `105
124
42
52
71
41
1
85
148
90
155
112
35
134
145
39
161
160
34
54
15
165
8
20
46
49
108
151
60
7
48
154
63
147
132
98
158
33
137
45
140
121
22
62
111
141
167
131
74
93
2
142
113
21
162
61
3
19
101
9
102
115
70
12
84
6
114
107
97
133
64
80
78
91
79
14
168
87
159
30
94
77
40
125
47
27
38
166
86
26
23
67
127
28
16
169
13
92
106
57
118
126
83
146
29
130
53`.split(/\n/).map((item) => Number(item));

// part1 ，找适配器，差值1的数量乘以差值为3的数量
function search(arr) {
    let array = [...arr];
    array.unshift(0);
    let max = Math.max(...array);
    array.push(max + 3);
    max = Math.max(...array);

    let current = 0;
    let lastInterpolation = 0;
    const interpolations = {
        1: 0,
        2: 0,
        3: 0,
    };
    const map = {};
    while(current <= max) {
        for (let adapter = current + 1; adapter <= current + 3; adapter++ ) {
            if (array.includes(adapter)) {
                interpolations[adapter - current]++;
                lastInterpolation = adapter - current;
                break;
            }
        }
        current += lastInterpolation;
    }

    return {interpolations, map};
}

const {interpolations, map} = search(array);
console.log('part1', interpolations[1] * interpolations[3]);


// part2
// function searchStrategy(map) {
//     const tree = {};
//     const values = Object.values(map);
//     createTree(values, tree, 0);
// }
// let length = 0;
// function createTree(values, tree, index) {
//     tree['node'] = values[index];
//     tree['children'] = [];
//     let tempIndex = index + 1;
//     let pushIndex = [];
//     while(values[tempIndex] <= 3) {  
//         if (values[tempIndex] === 3) {
//             if (!tree.children.length) {
//                 pushIndex.push(tempIndex);
//                 tree.children.push(values[tempIndex]);
//             }
//             break;
//         }
//         pushIndex.push(tempIndex);
//         tree.children.push(values[tempIndex]);
//         tempIndex++;
//     }
//     if (!tree.children.length) {
//         length++;
//         return;
//     }

//     for(let i = 0; i < tree.children.length; i++) {
//         tree.children[i] = {};
//         createTree(values, tree.children[i], pushIndex[i]);
//     }
    
// }

// const rr = searchStrategy(map);
// console.log(length);

/**
 * {
 *     0: [1,2,3],
 *     1: [2,3]
 *     ....
 *     99: [],
 * }
 */
function search2(arr) {
    let array = [...arr].sort((a, b) => a - b);
    array.unshift(0);
    array.push(Math.max(...array) + 3);
    const map = {};
    for(let index = 0; index < array.length; index++) {
        const item = array[index];
        map[item] = [];
        for (let nextIndex = index + 1; array[nextIndex] - item <= 3; nextIndex++) {
            map[item].push(array[nextIndex]);
        }
    }
   return graph(map);
}


function graph(map) {

    /// 对map进行替换删除，规则为子小于等于1的且孩子为空数组，替换，子大于1的，直接用子替换
    while(Object.keys(map).length > 1) {
        const keys = Object.keys(map);
        const lastKey = keys[keys.length - 1];
        if (map[lastKey].length === 0) {
            keys.forEach((key) => {
                if (map[key].includes(Number[lastKey]) && map[key].length === 1) {
                    map[key] = [];
                }
            });
            delete map[lastKey];
        } else {
            keys.forEach((key) => {
                const index = map[key].indexOf(Number(lastKey));
                if (index > -1) {

                    // 替换，数组太长内存溢出，用字符串进行替换实际数组
                    let spliceLength = typeof map[lastKey][0] === 'string' ? parseInt(map[lastKey][0]) : map[lastKey].length;
                    map[key].splice(index, 1, `${spliceLength}个`);

                    let totalSpliceLength = 0;
                    for (let currentIndex = 0; currentIndex < map[key].length; currentIndex++) {
                        if (typeof map[key][currentIndex] === 'string') {
                            totalSpliceLength += parseInt(map[key][currentIndex]);
                        }
                    }

                    const currentArray = map[key].filter((item) => typeof item !== 'string');
                    if (totalSpliceLength, totalSpliceLength) {
                        currentArray.push(`${totalSpliceLength}个`);
                    }
                    map[key] = currentArray;

                }
            });
            delete map[lastKey];
        }
    }
    const length = Object.values(map)[0][0];
    return length;
}

console.log('part2', search2(array));
