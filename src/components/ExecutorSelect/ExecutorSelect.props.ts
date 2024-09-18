import { ProfileAll } from "../../interfaces/userForTask.interface";

export interface ExecutorSelectedProps {
  executorSelected: ProfileAll | null;
  setExecutorSelected: (value: ProfileAll) => void;
  error?: string | undefined;
}


