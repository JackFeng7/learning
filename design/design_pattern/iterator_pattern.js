/**
 * 内部迭代器
 */

// 内部迭代器函数
function each1(ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    callback.call(ary[i], i, ary[i]); // 把下标和元素当作参数传给 callback 函数
  }
}
// 比较函数，因为each 函数内部已经定义了迭代规则
// 如要实现比较，只能在迭代器函数的回调上做文章
function compare1(ary1, ary2) {
  if (ary1.length !== ary2.length) {
    return false;
  }
  each1(ary1, function (i, n) {
    if (n !== ary2[i]) {
      return false;
    }
  });
  return true;
}
const compareRes1 = compare1([1, 2, 3], [1, 2, 4]);
console.log('内部迭代器', compareRes1);

/**
 * 外部迭代器
 */

// 外部迭代器函数，接受一个对象，使用闭包实现每个元素的迭代，
//并提供三个方法,分别是迭代到下一个元素，判断是否已经迭代完毕，最后一个是获取当前迭代元素
function Iterator(obj) {
  let current = 0;
  let next = function () {
    current += 1;
  };
  let isDone = function () {
    return current >= obj.length;
  };
  let getCurrItem = function () {
    return obj[current];
  };
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem,
  };
}

// 由于外部迭代器，并没有实际实现迭代过程，但是，提供了迭代需要的方法，外部需要显示调用实现迭代
function compare2(iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      return false;
    }
    iterator1.next();
    iterator2.next();
  }
  return true;
}

const compareRes2 = compare2(Iterator([1, 2, 3]), Iterator([1, 2, 3]));
console.log('外部迭代器', compareRes2);

/**
 * 倒序迭代器
 */
function reverseEach(ary, callback) {
  for (let l = ary.length - 1; l >= 0; l--) {
    callback(l, ary[l]);
  }
}
reverseEach([0, 1, 2], function (i, n) {
  console.log('倒序迭代器', n); // 分别输出：2, 1 ,0
});

/**
 * 中止迭代器
 */
function each(ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    if (callback(i, ary[i]) === false) {
      // callback 的执行结果返回 false，提前终止迭代
      break;
    }
  }
}
each([1, 2, 3, 4, 5], function (i, n) {
  if (n > 3) {
    // n 大于 3 的时候终止循环
    return false;
  }
  console.log('中止迭代器', n); // 分别输出：1, 2, 3
});
