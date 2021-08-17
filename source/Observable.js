
class Observable{
    constructor(subscribe){
        this._subscribe = subscribe;
    }
    subscribe(observerOrNext){
        const subscriber = observerOrNext.next ? observerOrNext : {next: observerOrNext};
        this._subscribe(subscriber)
    }
}

const observer = new Observable((subscriber)=>{
    subscriber.next(0);
    setTimeout(()=>{
        subscriber.next(1000)
    }, 1000)
})
observer.subscribe((data)=>{
    console.log(data);
})