<template>
  <form action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入要搜索的标签名"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
    v-model:active-id="activeIds"
    v-model:main-active-index="activeIndex"
    :items="tagList"
  />
  <van-divider content-position="left" v-if="activeIds.length !== 0"
    >已选标签</van-divider
  >
  <van-space wrap>
    <van-tag
      v-for="tag in activeIds"
      :show="true"
      closeable
      size="medium"
      type="primary"
      @close="doClose(tag)"
    >
      {{ tag }}
    </van-tag>
  </van-space>
  <div style="margin: 12px">
    <van-button block type="primary" @click="doSearch()">搜 索</van-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const searchText = ref("");
// const onSearch = (val) => showToast(val);
const onSearch = (val) => {
  tagList.value = originTagList.map((parentTag) => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildren.filter((item) =>
      item.text.includes(searchText.value)
    );
    return tempParentTag;
  });
};

// const onCancel = () => showToast("取消");
const onCancel = () => {
  activeIds.value = [];
  tagList.value = originTagList;
};

const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: "性别",
    children: [
      { text: "男", id: "男" },
      { text: "女", id: "女" },
    ],
  },
  {
    text: "年级",
    children: [
      { text: "大一", id: "大一" },
      { text: "大二", id: "大二" },
      { text: "大三", id: "大三" },
      { text: "大四", id: "大四" },
    ],
  },
  {
    text: "段位",
    children: [
      { text: "青铜", id: "青铜" },
      { text: "黄金", id: "黄金" },
      { text: "钻石", id: "钻石" },
      { text: "宗师", id: "宗师" },
    ],
  },
];
const tagList = ref(originTagList);

const doClose = (tag) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  });
};

const doSearch = () => {
  router.push({
    path: "/user/list",
    query: {
      tags: activeIds.value,
    },
  });
};
</script>

<style scoped></style>
