// import { fromEvent, Observable } from "rxjs";
const RxJS = rxjs;
import { Element } from "./js/dom.js";
const { Observable, fromEvent, delay, buffer, last, concat, merge, filter, map, catchError, debounce, ajax, repeat, Subject, interval, scan } = RxJS;
console.log(RxJS);

const submit = fromEvent(Element.select("button"), "click").pipe(delay(200));

// 输入框：输入时的校验
const input = fromEvent(Element.select("input"), "input");
const inputObservable = input.pipe(
    // debounceTime(1000)
    // 返回Observable或者Promise，等待next时执行下一步
    debounce((event) => {
        return new Promise((next) => {
            setTimeout(() => {
                next();
            }, 200);
        });
        return new Observable(({ next }) => {
            setTimeout(() => {
                next();
            }, 500);
        });
    }),
    map((event) => event.target.value.toString()),
    filter((value) => {
        if (value.length < 3) {
            hint.innerText = "长度不能小于3";
            return false;
        } else {
            hint.innerText = "";
            return true;
        }
    }),
    buffer(submit),
    // scan((value)=>{
    //     return num + 1
    // }, 0),
    map((value) => {
        return value.pop();
    }),
    catchError((err) => {
        console.log(err);
    })
);
inputObservable.subscribe({
    next: (value) => {
        const ul = Element.select("ul");
        ul.append(`
            <li>${value}</li>
        `)
    },
    error() {},
    complete() {
        console.log("over");
    },
});