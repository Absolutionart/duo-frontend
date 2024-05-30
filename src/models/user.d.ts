/**
 * 用户
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    profile?: string;
    tags: string[];
    userStatus: number;
    userRole: number;
    authCode: string;
    createTime: Date;
};