export interface Task {
  id: number;
  executor: {
    userName: string;
    email: string;
    id: string;
  };
  title: string;
  description: string;
  priority: {
    name: string;
    color: string;
  };
  status: {
    name: string;
    color: string;
  };
  date: string;
  image: string;
}
