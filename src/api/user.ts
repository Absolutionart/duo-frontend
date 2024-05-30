import myAxios from "../utils/myAxios";
import { getCurrentUserState, setCurrentUserState } from "./state";

export const getCurrentUser = async () => {
  // const currentUser = getCurrentUserState();
  // if (currentUser) {
  //   return currentUser;
  // }
  // 不使用currentUser缓存，每次请求都从后端获取以获取最新信息
  const res = await myAxios.get("/user/current");
  if (res.code === 0) {
    setCurrentUserState(res.data);
    return res.data;
  }
  return null;
};

export const userLogin = (data: {
  userAccount: string;
  userPassword: string;
}) => {
  return myAxios.post("/user/login", data);
};

export const userEdit = (data: { id: number; [key: string]: any }) => {
  return myAxios.post("/user/update", data);
};
