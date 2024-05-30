/**
 * 队伍
 */
export type TeamType = {
  id: number;
  teamName: string;
  description: string;
  maxNum: number;
  expireTime?: Date;
  userId: number;
  // status为枚举
  status: number;
  teamPassword?: string;
  createTime: Date;
  updateTime: Date;
  createUser?: UserType;
};
