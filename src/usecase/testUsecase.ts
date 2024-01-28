import * as TestRepository from "../repository/testRepository";

const getTodos = async () => {
  return await TestRepository.getTodos();
};

export { getTodos };
