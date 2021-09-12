/**
 * @description 操作符处理流程
 * @author Mino
 * @date 2021-8-17
 */

// SafeSubscriber -》Subscriber -》Subscription 
 class Subscription{
    constructor(nextFn){
        this.nextFn = nextFn;
    }
    add(subscription){ // 可能是subscription实例，也可能是函数，也可能是void
        this.fns.push(subscription)
    }
    next(data){
        this.nextFn(data)
    }
    unsubscribe(){
        this.fns.forEach(fn=>{
            if(fn instanceof Subscription)
                fn.unsubscribe();
            else fn();
        })
        this.fns = [];
    }
 }

class Observable{
    constructor(subscribe){
        this._subscribe = subscribe;
    }
    pipe(...fns){ // 给每个操作符传入上一个source，执行一遍
        return fns.reduce((prev, operator)=>{
            return operator(prev)
        }, this)
    }
    lift(operator){
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
    subscribe(observerOrNext){
        const subscriber = new Subscription(observerOrNext);
        const {operator, source} = this;
        subscriber.add(operator ? operator.call(subscriber, source) : this._subscribe(subscriber))
        return subscriber;
    }
}

const observable = new Observable((observer)=>{
    setTimeout(()=>{
        observer.next(123)
    }, 5000)
    // return function unsubscribe(){ console.log("cancel") }
});
let subscription = observable.pipe(map(), map()).subscribe((result)=>{ result === 123 }); 
setTimeout(()=>{subscription.unsubscribe()}, 1000)
/**
 * 1. 每个map执行返回一个函数接收observable对象，即上一个source
 *      observable.pipe((source) => (observable), (source) => (observable), (source) => (observable)).subscribe(()=>{}); 
 * 2. pipe执行，将observable传入第一个操作符，第一个操作符返回一个observable对象，这个对象再传入第二个操作符，一直下去
 * 3. pipe返回的是最后一个操作符的observable，它执行subscribe的时候
 *    调用operator.call，将source传入执行source.subscribe，去让上一个操作符进行订阅
 *    上一个操作符订阅的时候，又执行operator.call，不断往上
 * 4. 最后到了observable了，他不是操作符，他被订阅的时候，就会去执行subscribe，将结果next到第一个操作符
 *    第一个操作符已经在第三步被订阅了，所以第一个操作符结果又被传入第二个，一直到最后
 */