// 转换操作符
import {switchMap, interval, concatMap, map, timer, take, scan, of, pairwise, mergeMap} from 'rxjs'


export default () => {
    
    const promise: Promise<number> = new Promise<number>((resolve)=>{
        console.log('run promise');
        setTimeout(()=>{
            resolve(1)
        }, 3000)
    })

    let map1 = of(1, 2, 3, 4).pipe(map(data => (data + 1)));
    // scan 累加器
    let scan1 = of(1, 2, 3, 4).pipe(scan((prev, data, index) => {
        return prev + data;
    }, 0));
    // pairwise 成对输出
    let pairwise1 = of(1, 2, 3, 4).pipe(pairwise());
    // switchMap 会退订源Observable，返回新的Observable；循环输出 0 1 2 0 1 2
    // 每秒输出timer，每隔3s就会退订timer，重新返回timer
    let switchMap1 = interval(3000).pipe(
        switchMap(() => timer(0, 1000))
    );
    // concatMap 等待源Observable结束，返回新的Observable； 循环输出 concat 0 ~ 6
    // take致使timer结束，进入下一次interval；如果没有timer，那么concat只执行一次，一直向后相加
    let concatMap1 = interval(3000).pipe(concatMap((value) => {
        console.log('concat');
        return timer(0, 1000).pipe(take(7));
    }));
    // mergeMap 不会退订上次的Observable，也不会等待上次结束；
    // 会并行处理  
    // mergeMapx 0 1 2 （3s了创建新的timer）
    //                mergeMapy 0（mergeMapx的3） 1（mergeMapx的4） 2（mergeMapx的5）（3s了创建新的timer）
    let mergeMap1 = interval(3000).pipe(mergeMap((value) => {
        console.log('mergeMap');
        return timer(0, 1000).pipe(take(7));
    }));

    mergeMap1.subscribe(data => {
        console.log(data);
    })

    return <>Hello RxJS</>
}