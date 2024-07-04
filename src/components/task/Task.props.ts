export interface TaskProps {
  key: number;
  id: number;
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
  date: {
    $D: number;
    $M: number;
    $Y: number;
  };
  image: string;
  activeLink: boolean;
}
