export default interface UserModel {
  userId: string;
  name: string | null;
  pictureUrl: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: string | null;
}