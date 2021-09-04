// 创建新操作符
import {interval, take, timer, of, range, concat, from, fromEventPattern, defer} from 'rxjs'
import {} from 'rxjs/operators'

/**
 * interval: 输入：时间 - 毫秒；输出：数字              ----0----1----2----3----.......
 * timer：
 *        输入：等待时间，间隔； 输出：数字              0----1----2----3----.......
 *        输入：等待时间；      输出：数字              --------0|
 * of、range
 */

export default () => {
    
    const promise: Promise<number> = new Promise<number>((resolve)=>{
        console.log('run promise');
        setTimeout(()=>{
            resolve(1)
        }, 3000)
    })

    let observable1 = interval(1000).pipe(take(10));
    let timer1 = timer(1000); // timer(0, 1000)
    let of1 = of(1);
    let range1 = range(5, 10); // 5,6,7,...,14
    let from1 = from([1, 3, 5, 2])
    let fromPromise = from(promise)
    // fromEvent
    let addHandler = (handler: EventListener)=>{
        document.addEventListener("click", handler)
    }
    let removeHandler = (handler: EventListener)=>{
        document.removeEventListener("click", handler);
    }
    let subscription = fromEventPattern(addHandler, removeHandler)
    .subscribe(data => {
        console.log(data);
    })
    setTimeout(()=>{subscription.unsubscribe()}, 3000)

    // promise本身3s后输出结果；defer只有在subscribe的时候才会输出结果，defer就是为了不让promise立即执行
    let deferPromise = defer(()=>promise);
    setTimeout(()=>{
        console.log('2s 后执行promise');
        deferPromise.subscribe(data => {
            console.log(data);
        })
    }, 1000)

    return <>Hello RxJS</>
}