<template>
  <div id="app">
    <ScrollView
      :limit="12"
      :lazy-load="true"
      :enabled-up="true"
      :enabled-down="true"
      @refresh="onRefresh"
      @loadMore="onLoadMore"
    >
      <div v-for="(item,i) in list" :key="i">
        <img img-url="http://static.yutao2012.com/4e68544292e72254f831c7e8e7a9de5a.jpg?w=5000&h=2830" />
      </div>
    </ScrollView>
  </div>
</template>

<script>
  import ScrollView from './../dist/main';

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
    methods: {
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
