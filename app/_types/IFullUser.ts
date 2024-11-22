import { IRole } from "./IRole";

export interface IFullUser {
  username: string;
  password: string;
  authorities: IRole[];
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}
