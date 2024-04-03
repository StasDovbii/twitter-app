// common interfaces that are used in several files

export interface IPostsParams {
  limit: number;
  skip: number;
}

export interface IPost {
  id: number | string;
  body: string;
}
