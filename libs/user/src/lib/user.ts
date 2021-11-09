export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarPictureUrl: string;
  coverPictureUrl: string;
  summary: string;
  type: string;
}

export interface IUserId {
  id: Record<string, unknown>;
}
