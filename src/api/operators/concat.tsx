// 转换操作符
import {concat, interval, merge, zip, timer, take, combineLatest, of, forkJoin, race, partition, switchAll, mergeAll, concatAll, Subject, map, combineLatestAll} from 'rxjs'


export default () => {
    
    const promise: Promise<number> = new Promise<number>((resolve)=>{
        console.log('run promise');
        setTimeout(()=>{
            resolve(1)
        }, 3000)
    })
    //#region
    let sourceA = of(1, 2);
    let sourceB = of(3, 4);
    let sourceC = of(5, 6);
    // 1 ~ 6; 如果不用concat需要在sourceA的complete函数中去subscribe sourceB，B去sub C
    let concat1 = concat(sourceA, sourceB, sourceC);

    //#region
    sourceA = interval(1000)
    sourceB = interval(3000)
    sourceC = interval(5000)
    // 平行处理
    // A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11
    //       B0       B1       B2        B3
    //             C0             C1
    // 输出：0 1 2 0 3 4 0 5 1 6 7 8 2 9 1 10 11 3 ...
    let merge1 = merge(sourceA, sourceB, sourceC)

    //#region
    // A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11
    //       B0       B1       B2        B3
    //             C0             C1
    // 输出：[0 0 0] [1 1 1] [2 2 2] 每5s返回一次
    // zip会等待三个都各有一个值时返回结果，返回过的值不会再次返回
    let zip1 = zip(sourceA, sourceB, sourceC)

    //#region
    // A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11
    //       B0       B1       B2        B3
    //             C0             C1
    // 输出：[4 0 0] [5 0 0] [5 1 0] [6 1 0] [7 1 0] [8 1 0] [8 2 0] [9 2 0] [9 2 1]
    // combineLatest会等待三个都有一个值时返回结果，每当有事件发生时，获取其他事件的最后一个值
    // 废弃，使用combineLatestWith
    let combineLatest1 = combineLatest([sourceA, sourceB, sourceC]);

    //#region
    // A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11
    //       B0       B1       B2        B3
    //             C0             C1
    // 输出：[4 3 2]
    // combineLatest会等待三个事件都结束时返回结果；类似于Promise.all
    let sourceA1 = sourceA.pipe(take(5));
    let sourceB1 = sourceB.pipe(take(4));
    let sourceC1 = sourceC.pipe(take(3));
    let forkJoin1 = forkJoin([sourceA1, sourceB1, sourceC1]);

    //#region
    // A0 A1 A2 A3 A4 
    //       B0       
    //             C0 
    // 输出：0 ~ n 返回的都是sourceA的结果
    // race: 有一个事件到达，就会退订其他事件；类似于Promise.race
    let race1 = race([sourceA, sourceB, sourceC]);

    //#region
    // partition: 参数1: Observable 2: 拆分规则；返回两个Observable；
    // 将source的数据传入到函数中进行处理，满足条件的放一边，不满足的放一边
    // 常用于 状态管理中
    let [sourceEven, sourceOdd] = partition(of(1, 2, 3, 4, 5), (data) => data%2===0);

    //#region
    // A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11
    //       B0       B1       B2        B3
    //             C0             C1
    // switchAll: 有一个事件到达，就会退订上一个事件；类似于Promise.switchMap
    // 输出：
    //input1:  0  1  
    //input2:        0  1  
    //input3:              0  1  2  3  4  5
    let subject = new Subject();
    subject.pipe(map(value => {
        console.log("input:", value);
        return timer(0, 1000).pipe(take(5));
    }), combineLatestAll()).subscribe(data => {
        console.log(data);
    })
    timer(1000).pipe(take(1)).subscribe(()=>{subject.next(1)}); // 1s后发送数字1
    timer(3000).pipe(take(1)).subscribe(()=>{subject.next(2)});
    timer(5000).pipe(take(1)).subscribe(()=>{subject.next(3);subject.complete()});
    // concatAll：等上一个Observable结束，拼接下一个Observable
    //input1:  0  1
    //input2:       2  3
    //input3:             4  0~4 0~4

    // mergeAll：并行执行
    //input1:  0  1  2  3  4
    //input2:        0  1  2  3  4
    //input3:              0  1  2  3  4
    // 0 1 0 2 1 3 2 0 4 3 1 4 2 3 4

    // combineLatestAll：事件结束后才执行，类似于combineLastMap
    //input1:  0  1  2  3  4
    //input2:        0  1  2  3  4
    //input3:              0  1  2  3  4
    // complete

    return <>Hello RxJS</>
}