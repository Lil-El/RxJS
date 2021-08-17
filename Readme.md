# A TodoList By RxJS

# Q&A

- fromEvent：如何调用complete去结束
  - 通过操作符（中间件）调用subscriber.complete()
  - take(1)