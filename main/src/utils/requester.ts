import axios from 'axios';

const requester = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
  });

  return instance;
};

export default requester;