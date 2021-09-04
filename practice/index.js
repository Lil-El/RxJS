// import { fromEvent, Observable } from "rxjs";
const RxJS = rxjs;
import {Element} from './dom.js';

const { Observable, Subject, of, EMPTY, fromEvent, bufferWhen, first, fetch, delay, buffer, lift, last, concat, merge, filter, map, catchError, debounce, ajax, repeat, interval, scan, } = RxJS;
console.log(RxJS);

const myAjax = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve([9, 9, 3]);
        }, 300);
    });
const addTodo = (value) => {
    const ul = Element.select("ul");
    ul.append(new Element("li", value));
};

const submit = fromEvent(Element.select("#button"), "click").pipe(delay(200));

// 输入框：输入时的校验
const input = fromEvent(Element.select("input"), "input");

const setLocalStorage = () => {
    return (source) => {
        return source.lift({
            call(subscriber, source){
                source.subscribe((value)=>{
                    localStorage.setItem("TODO", value);
                    subscriber.next(value);
                })
            }
        })
    }
};

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
    buffer(submit), // bufferWhen(()=>submit)
    map((buffer) => {
        Element.select("input").value = '';
        return buffer.pop();
    }),
    setLocalStorage(),
    catchError((err) => {
        console.log(err);
    })
);

inputObservable.subscribe({
    next: (value) => value && addTodo(value),
    error() {},
    complete() {},
});

// fromPromise
myAjax().then((value) => {
    of(...value).subscribe(addTodo);
});
