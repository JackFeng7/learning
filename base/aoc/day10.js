const array = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`.split(/\n/).map((item) => Number(item));

// part1 ，找适配器，差值1的数量乘以差值为3的数量
function search(array) {
    array.unshift(0);
    const max = Math.max(...array);
    let current = 0;
    const interpolations = {
        1: 0,
        2: 0,
        3: 0,
    };
    let lastInterpolation = 0;
    const map = {};
    while(current <= max) {
        for (let adapter = current + 1; adapter <= current + 3; adapter++ ) {
            if (array.includes(adapter)) {
                interpolations[adapter - current]++;
                lastInterpolation = adapter - current;
                map[current] = adapter - current;
                break;
            }
        }
        current += lastInterpolation;
    }

    interpolations[3]++;
    map[max] = 3;
    return {interpolations, map};
}

const {interpolations, map} = search(array);
console.log(interpolations[1] * interpolations[3]);


// part2
function searchStrategy(map) {
    const tree = {};
    const values = Object.values(map);
    createTree(values, tree, 0);
}
let length = 0;
function createTree(values, tree, index) {
    tree['node'] = values[index];
    tree['children'] = [];
    let tempIndex = index + 1;
    let pushIndex = [];
    while(values[tempIndex] <= 3) {  
        if (values[tempIndex] === 3) {
            if (!tree.children.length) {
                pushIndex.push(tempIndex);
                tree.children.push(values[tempIndex]);
            }
            break;
        }
        pushIndex.push(tempIndex);
        tree.children.push(values[tempIndex]);
        tempIndex++;
    }
    if (!tree.children.length) {
        length++;
        return;
    }

    for(let i = 0; i < tree.children.length; i++) {
        tree.children[i] = {};
        createTree(values, tree.children[i], pushIndex[i]);
    }
    
}

console.log(map)
const rr = searchStrategy(map);
console.log(length);