# vue-scroll-view

> 一个基于 Vue2.0 和meScroll 的滚动组件，支持下拉刷新，上滑加载更多，滚动使用的是原生滚动，给你带来丝滑的体验。

## 安装

``` bash
 npm install @tao/vue-scroll-view --save
```

## 全局注册

```javascript
 import Vue from 'vue';
 import * as ScrollView from '@jacker_tao/vue-scroll-view';  
 Vue.use(ScrollView);
```

## 局部注册

```javascript
 import ScrollView from '@jacker_tao/vue-scroll-view';  
 export default {
    components:{
      ScrollView
    }
 }
```

## 使用方法
```vue
<template>
  <div id="app">
    <ScrollView
      :limit="12"
      :lazy-load="true"
      :enabled-up="true"
      :enabled-down="true"
      @refresh="onRefresh"
      @loadMore="onLoadMore"
      @init="scrollInit"
      @scroll="onScroll"
    >
      <div v-for="(item,i) in list" :key="i">
        <img img-url="http://static.yutao2012.com/4e68544292e72254f831c7e8e7a9de5a.jpg?w=5000&h=2830"/>
      </div>
    </ScrollView>
  </div>
</template>

<script>
  import ScrollView from '@jacker_tao/vue-scroll-view';

  export default {
    name: 'app',
    components: {
      ScrollView
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.instance = null;
    },
    methods: {
      scrollInit(instance) {
        this.instance = instance;
      },
      onLoadMore(done) {
        setTimeout(() => {
          const list = Array.from({
            length: 13
          });
          done(list);
          this.list = this.list.concat(list);
        }, 2000)
      },
      onRefresh(done) {
        setTimeout(() => {
          done();
          this.list = [1, 2, 3];
        }, 2000)
      },
      onScroll(y) {
         console.log(y)
      }
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;

    img {
      width: 100%;
    }
  }
</style>

```
