export interface ExecutorSelectedProps {
  executorSelected: {
    username: string;
    email: string;
    id: number;
  } | null;
  setExecutorSelected: (value: number) => void;
}
