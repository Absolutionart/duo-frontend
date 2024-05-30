<template>
  <van-nav-bar
    title="标题"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <!-- <template v-if="active=== 'index'">
      <Index/>
    </template>
    <template v-if="active=== 'team'">
      <Team/>
    </template> -->
    <router-view />
  </div>

  <!-- <van-tabbar v-model="active" @change="onChange"> -->
  <van-tabbar route @change="onChange">
    <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user"
      >个人</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { Toast } from 'vant';
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();

const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push("/search");
};

const active = ref("index");
const onChange = (index) => showSuccessToast(`标签 ${index}`);
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
