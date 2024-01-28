import axiosInstance from "../config/axiosInstance";

const getTodos = async () => {
  try {
    const response = await axiosInstance.get(
      "https://jsonplaceholder.typicode.com/todos",
    ); // ToDoのエンドポイント
    return response.data;
  } catch (error) {
    // エラー処理
    console.error(error);
    throw error;
  }
};

export { getTodos };
