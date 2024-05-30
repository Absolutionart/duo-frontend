<template>
  <template v-if="user">
    <van-cell-group>
      <van-cell
        title="用户名"
        is-link
        to="/user/edit"
        :value="user.username"
        @click="toEdit('username', '用户名', user.username)"
      />
      <van-cell title="账号" :value="user.userAccount" />
      <van-cell
        title="头像"
        is-link
        @click="toEdit('avatarUrl', '头像', user.avatarUrl)"
      >
        <img style="height: 48px" :src="user.avatarUrl" />
      </van-cell>
      <van-cell
        title="性别"
        is-link
        :value="handleGender(user.gender)"
        @click="toEdit('gender', '性别', user.gender)"
      />
      <van-cell
        title="电话"
        is-link
        to="/user/edit"
        :value="user.phone"
        @click="toEdit('phone', '电话', user.phone)"
      />
      <van-cell
        title="邮箱"
        is-link
        to="/user/edit"
        :value="user.email"
        @click="toEdit('email', '邮箱', user.email)"
      />
      <van-cell title="授权编号" :value="user.authCode" />
      <!-- <van-cell title="注册时间" :value="user.createTime.toISOString()"/> -->
      <van-cell title="注册时间" :value="user.createTime" />
    </van-cell-group>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { showFailToast } from "vant";
import { getCurrentUser } from "../api/user";
// const user = {
//   id: 1,
//   username: "ikun",
//   userAccount: "ikun",
//   avatarUrl: "http://inews.gtimg.com/newsapp_match/0/15103659616/0",
//   gender: "男",
//   phone: "123456",
//   email: "123456",
//   authCode: "1",
//   createTime: new Date(),
// };

const user = ref();
const router = useRouter();

onMounted(async () => {
  user.value = await getCurrentUser();
});

const handleGender = (gender: number) => {
  if (gender === 1) {
    return "男";
  } else {
    return "女";
  }
};

const toEdit = (
  editKey: string,
  editName: string,
  currentVal: any
) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentVal,
    },
  });
};
</script>

<style scoped></style>
