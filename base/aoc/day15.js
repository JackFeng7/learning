function part(array, num) {
    const obj = new Map();
    for (let i = 0; i < array.length; i++) {
        obj.set(array[i], i + 1);
    }
    let last = array[array.length - 1];
    for (let i = array.length; i < num; i++) {
        if(!obj.get(last)) {
            obj.set(last, i);
            last = 0;
        } else {
            let last_spoke_position = obj.get(last);
            obj.set(last, i);
            last = i - last_spoke_position;
        }
    }
    return last;
}

console.log('part1', part([0,13,1,8,6,15], 2020))
console.log('part2', part([0,13,1,8,6,15], 30000000))