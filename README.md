本项目 主要实现 vue1 核心原理

# vue1 响应式介绍

## Vue1.x 中响应式数据对象的所有属性（key）和 dep 是一一对应对应关系，一个 key 对应一个 dep；响应式数据在页面中每引用一次就会产生一个 watcher，所以在 Vue1.0 中 dep 和 watcher 是一对多的关系

# 目标

## [x]数据响应式拦截

### [x] 原始值

### [x] 普通对象

### [x]数组

## [x]数据响应式更新

### [x] 依赖收集，Dep

### [x] 依赖通知 Watcher 更新

### [x] 编译器，compiler

### [x]methods + 事件 + 数据响应式更新

### [x]v-bind 指令

### [x]v-model 双向绑定

#### [x]input 输入框

#### [x]   checkbox

#### [x]   select
