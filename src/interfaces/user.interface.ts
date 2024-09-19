export interface Profile {
  id?: number;
  firstName: string | undefined;
  lastName: string | undefined;
  userName: string | undefined;
  email: string | undefined;
  password?: string;
  phone: string | undefined;
  token?: string;
  image: string | { file: File }[] | undefined;
}
