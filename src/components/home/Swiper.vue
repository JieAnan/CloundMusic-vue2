<template>
  <div class="swiper-top">

    <!-- 开始轮播图组件 -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in images" :key="item.targetId">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>

  </div>
</template>



<script>
import { mapState, mapGetters } from "vuex"
export default {
  name: 'Swiper',

  setup () {
    // const images = [
    //   'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    //   'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    // ];
    // return { images };
  },

  // 1.在挂载阶段请求数据，然后释放到本地。
  mounted () {
    this.$store.dispatch('getBannerList', 2);
  },

  // 2.使用计算属性进行取state中的值
  computed: {
    // 1.使用mapState进行属性解析, 对象中使用键值对的形式取数据。key：value。
    // 右侧需要的是一个函数，当时用这个计算属性的时候，右侧函数会执行一次
    ...mapState({
      // || [] 防止数据没有返回，出现undefine
      images: state => state.home.bannerList || [],
    }),
  }
};

</script>


<style lang="less">
.swiper-top {
  .van-swipe {
    width: 100%;
    // padding: 0.1rem;
    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 3rem;
        }
      }
    }

    // 小圆点样式
    .van-swipe__indicators {
      bottom: 0.25rem;
      .van-swipe__indicator--active {
        background-color: tomato;
      }
    }
  }
}
</style>