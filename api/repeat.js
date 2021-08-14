const observable = new Observable((subscriber)=>{
    subscriber.next(1)
    subscriber.next(2)
    subscriber.complete()
})
observable.pipe(repeat(2)).subscribe((data)=>{
    console.log(data);
})