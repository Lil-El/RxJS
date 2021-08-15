// import { fromEvent, Observable } from "rxjs";
const RxJS = rxjs;
import { Element } from "./js/dom.js";
const {
    Observable,
    Subject,
    of,
    fromEvent,
    fetch,
    delay,
    buffer,
    lift,
    last,
    concat,
    merge,
    filter,
    map,
    catchError,
    debounce,
    ajax,
    repeat,
    interval,
    scan,
} = RxJS;
console.log(RxJS);

const myAjax = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve([9, 9, 3]);
        }, 300);
    });
const addTodo = (value) => {
    console.log(value);
    const ul = Element.select("ul");
    ul.append(new Element("li", value));
};

const submit = fromEvent(Element.select("#button"), "click").pipe(delay(200));

// 输入框：输入时的校验
const input = fromEvent(Element.select("input"), "input");
const getLocalStorageTodoBtn = fromEvent(Element.select("#getLocalStorageTodo"), "click");

const setLocalStorage = (value) => {
    localStorage.setItem("KEY", value);
    return new Observable((subscriber) => {
        subscriber.next(value);
    });
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
    buffer(submit),
    map((value) => {
        return value.pop();
    }),
    // setLocalStorage((value) => {
    //     console.log(value);
    // }),
    catchError((err) => {
        console.log(err);
    })
);
inputObservable.subscribe({
    next: (value)=>addTodo(value),
    error() {},
    complete() {
        console.log("over");
    },
});
// inputObservable.subscribe((value) => {
//     console.log("你加入了新的事项：" + value);
// });

// fromPromise
myAjax().then((value) => {
    of(...value).subscribe(addTodo);
});
