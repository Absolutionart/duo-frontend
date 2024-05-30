<template>
  <van-form @submit="onSubmit">
    <van-field name="radio" label="性别" v-if="editUser.editKey === 'gender'">
      <template #input>
        <van-radio-group v-model="editUser.currentVal" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="0">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      name="uploader"
      label="头像"
      v-else-if="editUser.editKey === 'avatarUrl'"
    >
      <template #input>
        <van-uploader
          v-model="avatarFile"
          :max-count="1"
          :after-read="afterUpload"
        >
          <van-button icon="plus" type="primary">上传文件</van-button>
        </van-uploader>
      </template>
    </van-field>
    <van-field
      v-else
      v-model="editUser.currentVal"
      :name="editUser.editKey"
      :label="editUser.editName"
      :placeholder="`请输入${editUser.editName}`"
      :rules="[{ required: true, message: `请填写${editUser.editName}` }]"
    />

    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "../utils/myAxios";
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";
import { userEdit, getCurrentUser } from "../api/user";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentVal: route.query.currentVal,
});

const avatarFile = ref([{ url: editUser.value.currentVal, isImage: true }]);
const afterUpload = (file) => {
  console.log("file", file.objectUrl);
  editUser.value.currentVal = file.objectUrl;
};

const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    showFailToast("请先登录");
    return;
  }
  console.log("currentUseridididiid", currentUser);
  const res = await userEdit({
    id: currentUser.id,
    [editUser.value.editKey]: editUser.value.currentVal,
  });
  if (res.code === 0 && res.data !== null) {
    showSuccessToast("修改成功");
    router.back();
  } else {
    showFailToast(res.message);
  }
};
</script>

<style scoped></style>
