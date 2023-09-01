import { MemberInfo, UserInfo } from "../@types/datatypes";

class Member implements MemberInfo {
     private token: string;
     nick: any;
     pending: boolean;
     permissions: string;
     premium_since: any;
     roles: string[];
     avatar: string;
     communication_disabled_until: any;
     flags: number;
     unusual_dm_activity_util: any;
     user: UserInfo;
     joined_at: string;
     mute: boolean;
     deaf: boolean;
     private memberInfo: MemberInfo
     constructor(token: string, memberInfo: MemberInfo) {
          this.token = token
          this.memberInfo = memberInfo
     }
}