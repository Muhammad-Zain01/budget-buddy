export * from "./Category";
export * from "./Transaction";
export * from "./Account";

export type Response<T> = {
  data: T;
  status: number;
};
