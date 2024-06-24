export interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: {
    name: string;
    color: string;
  };
  date: string;
  image: string;
}
