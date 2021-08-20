/**
 * @description 操作符创建、调用流程
 * @author Mino
 * @date 2021-8-17
 */

// 1. 使用
const observable = new Observable();
observable.pipe(map(value => {
    return value + 2;
})).subscribe(data => console.log(data))

// 2. 实现RxJS的 map operator
function map(handler){
    /**
     * @param {Observable} source 上一个传入的Observable实例对象
     * @return {Observable} operator 通过Observable.lift返回一个新的Observable对象
     */
    return (source)=>{
        // lift 返回一个新的Observable对象，将operator和source保存起来
        // 在它被subscribe的时候执行operator函数，并给subscriber下一个observable对象next发送数据
        return source.lift({
            call(subscriber, source){
                source.subscribe((data)=>{
                    subscriber.next(handler(data))
                })
            }
        })
    }
}