// 多播操作符
import {interval, take, multicast, map, shareReplay, Subject} from 'rxjs'
import {share} from 'rxjs/operators'


export default () => {

    // connectedObservable 必须手动调用connect才可以开始

    // const tick$ = interval(1_000).pipe(take(5), share({connector: () => new Subject }))
    // let subscription = tick$.subscribe((data)=>{
    //     console.log("A:", data);
    // })
    // setTimeout(()=>{
    //     tick$.subscribe((data)=>{
    //         console.log("B:", data);
    //     })
    //     subscription.unsubscribe();
    // }, 2_500)

    const source = interval(1000)
        .pipe(
                map((x: number) => {
                    console.log('Processing: ', x);
                    return x*x;
                }),
                share()
        );
    /** noShare
     *  Processing:  0
            subscription 1:  0
        Processing:  0
            subscription 1:  0
        Processing:  1
            subscription 1:  1
        Processing:  1
            subscription 1:  1
        Processing:  2
            subscription 1:  4
        Processing:  2
            subscription 1:  4
     */
    /** share
     *  Processing:  0
            subscription 1:  0
            subscription 1:  0
        Processing:  1
            subscription 1:  1
            subscription 1:  1
        Processing:  2
            subscription 1:  4
            subscription 1:  4
     */
    source.subscribe(x => console.log('subscription 1: ', x));
    source.subscribe(x => console.log('subscription 1: ', x));

    return <>Hello RxJS</>
}