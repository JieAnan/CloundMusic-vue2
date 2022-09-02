<template>
  <div class="iconlsit">

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianshixuanchuan"></use>
      </svg>
      <span>私人FM</span>
    </div>

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>

    <div class="iconitem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>

  </div>
</template>


<script>
export default {
  name: 'IconList'
}
</script>

<style lang="less">
.iconlsit {
  width: 100%;
  height: 1.6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.2rem;

  .iconitem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>