<template>
  <div id="team">
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
    <team-card-list :team-list="teamList" />
    <van-empty
      image="search"
      description="暂无队伍数据"
      v-if="!teamList || teamList.length < 1"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import { onMounted, ref } from "vue";
import myAxios from "../utils/myAxios";
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";

const router = useRouter();

const doJoinTeam = () => {
  router.push({
    path: "/team/add",
  });
};

const teamList = ref([]);
onMounted(async () => {
  const res = await myAxios.get("/team/list");
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("加载队伍失败，请刷新重试");
  }
});
</script>

<style scoped></style>
