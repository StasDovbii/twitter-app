import axios from 'axios';
import config from '../config';
import { IPostsParams } from '../ts/interfaces/postsInterfaces';

interface IConfig {
  API_URL: string;
}

const currentConfig: IConfig = config[process.env.NODE_ENV];

export default class PostsService {
  static async getAllPosts(params: IPostsParams) {
    const { data } = await axios.get(`${currentConfig.API_URL}/posts`, { params });
    return data;
  }

  static async getPost(id: string) {
    const { data } = await axios.get(`${currentConfig.API_URL}/posts/${id}`);
    return data;
  }
}
