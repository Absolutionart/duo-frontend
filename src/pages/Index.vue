<template>
  <user-card-list :userList="userList" />
  <van-empty
    image="search"
    description="暂无用户数据"
    v-if="!userList || userList.length < 1"
  />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";
import { onMounted } from "vue";
import myAxios from "../utils/myAxios";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const router = useRouter();
const route = useRoute();
const { tags } = route.query;
const userList = ref([]);

onMounted(async () => {
  await myAxios
    .get("/user/recommend", {
      params: {
        pageNum: 1,
        pageSize: 10,
        // tagNameList: tags,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    })
    .then((res) => {
      const userListData = res?.data?.records;
      if (userListData.length === 0) {
        showFailToast("没有找到相关用户");
        return;
      }
      userListData.forEach((user) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = userListData;
      showSuccessToast("搜索成功");
    })
    .catch((err) => {
      showFailToast(err.response.data.message);
    });
});

const mockUser = {
  id: 1,
  username: "ikun",
  userAccount: "ikun",
  avatarUrl: "http://inews.gtimg.com/newsapp_match/0/15103659616/0",
  gender: 0,
  phone: "123456",
  email: "123456@123.com",
  profile: "我是一个程序员阿巴阿巴阿巴阿巴巴巴巴",
  authCode: "1",
  tags: ["java", "emo", "打工仔"],
  createTime: new Date(),
};
</script>

<style lang="scss" scoped></style>
