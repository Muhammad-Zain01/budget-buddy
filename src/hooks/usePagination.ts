import { Dispatch, SetStateAction, useState } from "react";

type HookReturn = {
  page: number;
  items: [];
  changePage: Dispatch<SetStateAction<Number>>;
  next: () => void;
  prev: () => void;
  showPrev: boolean;
  showNext: boolean;
};

const usePagination = <T>(items: T, itemsPerPage: number) => {
  const [page, setPage] = useState<number>(1);
  // @ts-ignore
  const totalPages = Math.floor(items.length / itemsPerPage);
  // @ts-ignore
  const Items = items.filter(
    // @ts-ignore
    (_, index) =>
      (page - 1) * itemsPerPage <= index && page * itemsPerPage > index
  );
  const next = () => {
    setPage((prev) => prev + 1);
  };
  const prev = () => {
    setPage((prev) => prev - 1);
  };
  const showPrev = page != 1;
  // @ts-ignore
  const showNext = items.length != itemsPerPage && page <= totalPages;

  return {
    page,
    items: Items,
    changePage: setPage,
    next,
    prev,
    showPrev,
    showNext,
  } as HookReturn;
};

export default usePagination;
