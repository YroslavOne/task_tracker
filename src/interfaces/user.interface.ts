export interface Profile {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  userName: string;
  email: string;
  password: string;
  phone: string | undefined;
  token: string;
  image: string | undefined;
}
