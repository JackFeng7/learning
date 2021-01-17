//part1 模拟传统语言

// 1. 定义Strategy
var performanceS = function(){};
// 2. 定义ConcreteStrategy
performanceS.prototype.calculate = function( salary ){
	return salary * 4;
};
var performanceA = function(){};
performanceA.prototype.calculate = function( salary ){
	return salary * 3;
};
var performanceB = function(){};
performanceB.prototype.calculate = function( salary ){
	return salary * 2;
};
// 3. 定义Context：
var Bonus = function(){
	this.salary = null; // 原始工资
	this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function( salary ){
	this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function( strategy ){
	this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function(){ // 取得奖金数额
	return this.strategy.calculate( this.salary ); // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus();
bonus.setSalary( 10000 );

bonus.setStrategy( new performanceS() ); // 设置策略对象
console.log('传统', bonus.getBonus() ); // 输出：40000
bonus.setStrategy( new performanceA() ); // 设置策略对象
console.log('传统', bonus.getBonus() ); // 输出：30000


// javascript实现
var strategies = {
	A: (salary) => {
		return salary *4;
	},
	B: (salary) => {
		return salary *3;
	},
	C: (salary) => {
		return salary *2;
	},
};

function calculateBonus( level, salary ){
	return strategies[level](salary);
};

console.log('javascript', calculateBonus( 'A', 20000 ) );        // 输出： 80000
console.log('javascript', calculateBonus( 'B', 10000 ) );        // 输出： 30000