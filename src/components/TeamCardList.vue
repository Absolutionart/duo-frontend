<template>
  <div id="teamCardList">
    <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      :title="`${team.teamName}`"
      :thumb="team.createUser.avatarUrl"
    >
      <template #title>
        <div>
          {{ team.teamName }}
          <van-tag
            plain
            type="primary"
            style="margin-left: 8px; margin-top: 8px"
            >{{ teamStatusEnum[team.status] }}</van-tag
          >
        </div>
      </template>
      <template #price>
        {{ "最大人数：" + team.maxNum }}
      </template>
      <template #bottom>
        <div>
          {{ "创建时间：" + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small">详细信息</van-button>
        <van-button size="small" type="primary" @click="doJoinTeam(team.id)"
          >加入队伍</van-button
        >
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusEnum } from "../models/teamConstants";
import myAxios from "../utils/myAxios";
import { showFailToast, showSuccessToast } from "vant";

interface TeamCardListProps {
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: () => [],
});
/**
 * 加入队伍
 * @param id 队伍id
 */
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post("/team/join", { id });
  if (res?.code === 0) {
    showSuccessToast("加入成功");
  } else {
    showFailToast("加入失败" + (res.description ? `, ${res.description}` : ''));
  }
};
</script>

<style scoped>
/* :deep() 用于将样式作用于子元素 */
#teamCardList :deep(.van-image__img) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
