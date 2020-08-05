<template>
  <div
    ref="element"
    class="mescroll scroll-view"
  >
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import meScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css';

  export default {
    props: {
      /*启用上拉加载*/
      enabledUp: {
        default: false,
        type: Boolean
      },
      /*启用下拉刷新*/
      enabledDown: {
        default: false,
        type: Boolean
      },
      /*分页数量*/
      limit: {
        default: 40,
        type: Number
      },
      /*是否开启图片懒加载*/
      lazyLoad: {
        default: false,
        type: Boolean
      }
    },
    created() {
      /*滚动实列*/
      this.scroll = null;

      /*滚动条位置*/
      this.scrollY = 0;

      this.onLoadMoreHand = (
        this.onLoadMoreHand.bind(this)
      );
    },
    mounted() {
      const config = {};
      const lazyLoad = {
        attr: `img-url`,
        use: this.lazyLoad
      };

      /*下拉刷新配置*/
      config.down = {
        auto: false,
        isBoth: false,
        use: this.enabledDown,
        callback: this.onDownRefresh
      };

      config.up = {
        use: true,
        isBoth: false,
        lazyLoad: lazyLoad,
        auto: this.enabledUp,
        onScroll: this.onScroll
      }

      /*上拉加载配置*/
      if (this.enabledUp) {
        config.up.callback = (
          this.onUpLoadMore
        )
      }

      /*实例化scroll*/
      this.scroll = (
        new meScroll(
          this.element, config
        )
      );

      this.$emit(`init`, this.scroll);

      /*主动触发图片懒加载*/
      this.onLazyLoad();
    },
    computed: {
      element() {
        const {
          element
        } = this.$refs;
        return element;
      }
    },
    /*销毁*/
    beforeDestroy() {
      if (this.scroll) {
        this.scroll.destroy();
      }
    },
    methods: {
      /*触发懒加载*/
      onLazyLoad() {
        if (this.lazyLoad) {
          this.$nextTick(() => (
            this.scroll.lazyLoad()
          ))
        }
      },

      /*滚动事件*/
      onScroll(e, y) {
        this.scrollY = y;
        this.$emit(`scroll`,y);
      },

      /*触发下拉加载*/
      onDownRefresh() {
        this.$emit(`refresh`, () => (
          this.onRefreshEnd()
        ))
      },

      /*刷新完成回调*/
      onRefreshEnd() {
        this.scroll.hideUpScroll();
        this.scroll.endDownScroll();
      },

      /*加载更多*/
      onUpLoadMore() {
        this.scroll.lockDownScroll(true);
        this.$emit(`loadMore`, this.onLoadMoreHand);
      },

      /*处理*/
      onLoadMoreHand(list, success, page) {
        const {
          length = 0
        } = list || [];
        this.onUpLoadMoreEnd(
          length, success, page
        );
      },

      /*加载更多完成回调*/
      onUpLoadMoreEnd(length = 0, success = true) {
        this.onLazyLoad();

        const isLastPage = (
          success && length < this.limit
        );

        if (isLastPage) {
          this.scroll.showNoMore();
        }
        else {
          this.scroll.endUpScroll();
        }
        this.scroll.lockDownScroll(false);
      }
    },

    /*keep-alive 进入*/
    activated() {
      this.scroll.scrollTo(
        this.scrollY, 0
      );
    },

    /*keep-alive 退出*/
    deactivated() {
      console.log(`退出`);
    }
  }
</script>

<style scoped lang="scss">
  .scroll-view {
    background-color: #f6f6f6;
  }

  .scroll-content {
    overflow: hidden;
  }
</style>
