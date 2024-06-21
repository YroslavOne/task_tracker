export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: {
    name: string;
    color: string;
  };
  date: string;
  image: string;
}
