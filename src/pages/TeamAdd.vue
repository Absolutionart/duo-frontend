<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="addTeamData.teamName"
        name="name"
        label="队伍名"
        placeholder="请输入队伍名"
        :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
        v-model="addTeamData.description"
        rows="4"
        autosize
        label="队伍描述"
        type="textarea"
        placeholder="请输入队伍描述"
      />
      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="10" min="3" />
        </template>
      </van-field>
      <van-field
        v-model="addTeamData.expireTime"
        is-link
        readonly
        name="datePicker"
        label="过期日期"
        placeholder="点击选择过期日期"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
          title="选择过期日期"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </van-cell-group>
    <van-field name="radio" label="队伍状态">
      <template #input>
        <van-radio-group v-model="addTeamData.status" direction="horizontal">
          <van-radio name="0">公开</van-radio>
          <van-radio name="1">私有</van-radio>
          <van-radio name="2">加密</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field
      v-if="addTeamData.status === '2'"
      v-model="addTeamData.teamPassword"
      type="password"
      name="teamPassword"
      label="队伍密码"
      placeholder="请输入队伍密码"
      :rules="[{ required: true, message: '请填写队伍密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from "vue";
import myAxios from "../utils/myAxios";
import { showSuccessToast, showFailToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const initFormData = {
  teamName: "",
  description: "",
  maxNum: 3,
  expireTime: null,
  userId: 0,
  status: 0,
  teamPassword: "",
};
// 需要用户填写的表单数据
const addTeamData = ref({ ...initFormData });

const showPicker = ref(false);
const currentDate = ref(["2021", "01", "01"]);
const minDate = new Date();
const maxDate = new Date(2025, 5, 1);
const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join("/");
  showPicker.value = false;
};
const onSubmit = async () => {
  // 提交表单
  console.log(addTeamData.value);
  const postData = {
    ...addTeamData.value,
    expireTime: addTeamData.value.expireTime.replaceAll("/", "-"),
    status: Number(addTeamData.value.status)
  };
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("创建队伍成功");
    router.push({
      path: "/team",
      replace: true
    })
  } else {
    showFailToast("创建队伍失败");
  }
};
</script>

<style scoped></style>
