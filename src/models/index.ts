export * from "./Category";

export type Response<T> = {
  data: T;
  status: number;
};
