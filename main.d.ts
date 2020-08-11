declare module "@jacker_tao/vue-scroll-view" {
  import Vue from 'vue';

  class Component extends Vue {
    static install(vue: typeof Vue): void
  }
  export default class ScrollView extends Component {
    limit: number;
    enabledUp: boolean;
    enabledDown: boolean;
    lazyLoad: boolean;
  }
}
