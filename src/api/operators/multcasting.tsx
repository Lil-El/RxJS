// 多播操作符
import {interval, take, multicast, share, shareReplay, Subject} from 'rxjs'
import {} from 'rxjs/operators'


export default () => {

    // connectedObservable 必须手动调用connect才可以开始

    const tick$ = interval(1_000).pipe(take(5), share({connector: () => new Subject }))
    let subscription = tick$.subscribe((data)=>{
        console.log("A:", data);
    })
    setTimeout(()=>{
        tick$.subscribe((data)=>{
            console.log("B:", data);
        })
        subscription.unsubscribe();
    }, 2_500)

    return <>Hello RxJS</>
}