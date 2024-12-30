import Task from "./Task";
interface DataMockContext {
  mock: Task[];
  setMock: React.Dispatch<React.SetStateAction<Task[]>> ;
  messageApi: {
    error: (msg: string) => void;
    success: (msg: string) => void
  };
}

export default DataMockContext;