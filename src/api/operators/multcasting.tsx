// 多播操作符
import {interval, take, multicast, Observable, Subscription, map, shareReplay, Subject, of} from 'rxjs'
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
    // source.subscribe(x => console.log('subscription 1: ', x));
    // source.subscribe(x => console.log('subscription 1: ', x));






    // const response = new Subject<Observable<Number>>();
    // const startSendRequest = new Observable(observer => {
    //     // Subscription 是在订阅Observable时返回的对象，同时我们也可以使用它作为多个订阅的容器，当它被取消订阅时，其中的所有订阅也将被取消
    //     // subscriptions 收集 subscribe的返回值（subscription）；
    //     const subscriptions: Subscription = new Subscription()
        
    //     subscriptions.add(
    //       // 获取响应流
    //       response.subscribe(result => {
    //         subscriptions.add(result.subscribe(observer))
    //       })
    //     )
    //     setTimeout(()=>{
    //         response.next(of(123))
    //     }, 3000)
  
    //     // 当 fetch<T>这个函数返回的Observable发生unsubscribed/errored/completed/canceled,这个返回函数将会被调用取消订阅
    //     return function unsubscribe() {
    //         console.log('cancel');
    //         subscriptions.unsubscribe()
    //     }
    // })
    // let subscription = startSendRequest.subscribe(data => {
    //     console.log(data);
    // })
    // setTimeout(()=>{
    //     subscription.unsubscribe();
    // }, 1000)

    return <>Hello RxJS</>
}