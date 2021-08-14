/**
 *  const test = new Observable((observer)=>{
        console.log('object');
        observer.next(12)
    })
    test.subscribe((d)=>{
        console.log(d);
    })
 */

class Observe{
    constructor(fn){
        this.fn = fn;
    }
    subscribe(observer){
        let obj = {
            next: observer
        }
        this.fn(obj)
    }
}
const Observable = new Observe((observer)=>{
    console.log('object');
    observer.next(0);
    setTimeout(()=>{
        observer.next(1000)
    }, 1000)
})
Observable.subscribe((data)=>{
    console.log(data);
})