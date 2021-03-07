let Event = (function(){
    let clientList = {},
        listen,
        trigger,
        remove;
    listen = function( key, fn ){
        if ( !clientList[ key ] ){
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };
    trigger = function(){
        let key = Array.prototype.shift.call( arguments ),
            fns = clientList[ key ];
        if ( !fns || fns.length === 0 ){
            return false;
        }
        for( let i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments );
        }
    };
    remove = function( key, fn ){
        let fns = clientList[ key ];
        if ( !fns ){
            return false;
        }
        if ( !fn ){
            fns && ( fns.length = 0 );
        }else{
            for ( let l = fns.length - 1; l >=0; l-- ){
                let _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 );
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();
Event.listen( 'squareMeter88', function( price ){
    console.log( '订阅者 价格= ' + price );
});
Event.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息


// 设计-延伸订阅发布模式极端场景解决方案
let Event = (function(){
    let clientList = {},
        listen,
        trigger,
        remove;
    queue = [], // 触发队列
        queueWork = false, // 触发锁
        lock = false; // 执行锁

    // 添加监听者
    listen = function( key, fn ){
        if ( !clientList[ key ] ){
            clientList[ key ] = [];
        }
        clientList[ key ].push( fn );
    };

    // 添加触发操作
    trigger = function(){
        queue.push(arguments);
        if (!queueWork) {
            queueWork = true; // 给触发上锁
            queueTrigger();
        }
    };

    // 执行触发操作动作
    queueTrigger = () => {
        if (lock || queue.length === 0) {
            if (queue.length === 0) {
                // 恢复触发锁
                queueWork = false;
            }
            return;
        }
        lock = true; // 给执行上锁
        const currentArguments = queue.shift();
        let key = Array.prototype.shift.call(currentArguments),
            fns = clientList[ key ];
        if ( !fns || fns.length === 0 ){
            return false;
        }
        for( let i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, currentArguments);
        }
    };

    // 解开执行锁
    resetLock = () => {
        lock = false;
        queueTrigger();
    }

    // 删除监听者
    remove = function( key, fn ){
        let fns = clientList[ key ];
        if ( !fns ){
            return false;
        }
        if ( !fn ){
            fns && ( fns.length = 0 );
        }else{
            for ( let l = fns.length - 1; l >=0; l-- ){
                let _fn = fns[ l ];
                if ( _fn === fn ){
                    fns.splice( l, 1 );
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove,
        resetLock: resetLock,
    }
})();
Event.listen( 'squareMeter88', function( price ){
    setTimeout(() => {
        console.log( '订阅者 价格= ' + price);
        Event.resetLock(); // 解开执行锁
    }, 2000);
});

let num = 0;
setInterval(() => Event.trigger( 'squareMeter88', ++num ), 10);
