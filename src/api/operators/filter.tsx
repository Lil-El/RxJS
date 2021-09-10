// 过滤操作符
import {interval, timer, take, map, of, first, last, single, fromEvent, takeUntil, Subject, sample, sampleTime, auditTime, takeWhile, debounce,  distinctUntilKeyChanged, from} from 'rxjs'


export default () => {
    
    const promise: Promise<number> = new Promise<number>((resolve)=>{
        console.log('run promise');
        setTimeout(()=>{
            resolve(1)
        }, 3000)
    })

    //#region first、last、single接收一个条件函数
    // 只接受第一个值
    of(1, 2, 3).pipe(first()) // 1
    // 只接受最后一个值，需要complete
    of(1, 2, 3).pipe(last()) // 3
    // 只接受一个值，多了就error
    of(1, 2, 3).pipe(single()).subscribe({
        error: error => console.log(error)
    });

    //#region 
    // take 前n次的值；
    // takeLast 后n次的值； 
    // takeUtil 事件一直执行，直到发生点击事件，然后complete
    const click = fromEvent(document.getElementsByTagName("body"), 'click'); 
    interval(1000).pipe(map(data => data + 1)).pipe(takeUntil(click)).subscribe({
        next: data => console.log(` ${data}`),
        complete: () => console.log('takeUntil complete')
    });
    // takeWhile 过滤满足添加的值，不满足直接结束complete
    interval(1000).pipe(takeWhile(data => data < 10)).subscribe({
        next: data => console.log(` ${data}`),
        complete: () => console.log('takeUntil complete')
    });
    // skip 跳过前n个值
    // skipLast
    // skipUntil 持续忽略，直到触发新的事件
    // skipWhile 符合条件会一直忽而略，直到不符合条件为止
    
    // [1 2 3 3 2 4 5]
    // distinct  去重  1 2 3 4 5
    // distinctUntilChanged  事件值和上次不一样就展示，否则过滤掉 1 2 3 2 4 5
    // distinctUntilKeyChanged
    from([
        { id: 1, score: 70 },
        { id: 1, score: 80 },
        { id: 2, score: 90 },
        { id: 3, score: 100 }
    ]).pipe(distinctUntilKeyChanged("id")); // 70 90 100

    // sample: 每次事件触发时，去源数据中最近的值，不会重复获取
    const notifier = new Subject();
    interval(1000).pipe(sample(notifier)).subscribe(data => {
        console.log(`${data}`);
    });
    setTimeout(() => notifier.next(1), 1500); // 0
    setTimeout(() => notifier.next(2), 1600); // nothing
    setTimeout(() => notifier.next(3), 5000); // 4

    // sampleTime：定期取样，每经过这个时间段就获取最近的值
    const source$ = new Subject();
    source$.pipe(sampleTime(1500)).subscribe(data => {
        console.log(` ${data}`);
    });
    setTimeout(() => source$.next(1), 0);
    setTimeout(() => source$.next(2), 500);
    setTimeout(() => source$.next(3), 1000);
    setTimeout(() => source$.next(4), 4000);
    setTimeout(() => source$.next(5), 5000);
    setTimeout(() => source$.complete(), 5500);
    // 3 4

    // auditTime；事件发生时，等待1500ms才去获取值；然后等待下一个事件发生
    interval(1000).pipe(
        auditTime(1500)
    ).subscribe(data => {
        console.log(`${data}`);
    }) 
    // 1 3 5 7
    // -----0-----1-----2-----3-----4....
    // auditTime(1500)
    // --------------1-----------3---....
    //      ^ 发生事件后，等待 1500 ms
    //               ^ 1500 ms后，取來源 Observable 最近一次事件值


    // debounceTime 事件发生后，等待n毫秒，如果没有新的事件发生就返回值
    // debounce 依次debounce （0 1000 2000 3000）；由于每隔3s发生一个事件，使debounce不会再触发
    const source = interval(3000);
    const durationSelector = (value: number) => interval(value * 1000);

    source.pipe(
        debounce(durationSelector)
    ).subscribe(data => {
        console.log(`${data}`);
    });
    // 0 1 2

    return <>Hello RxJS</>
}