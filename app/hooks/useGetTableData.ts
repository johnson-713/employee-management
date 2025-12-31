"use client";

import makeGetRequest from "@/api/makeGetRequest";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "./useDebounce";

const useGetTableData = ({
  endpoint,
  queryFunc,
}: {
  endpoint: string;
  metaEndpoint?: string;
  queryFunc?: UseQueryOptions<unknown, unknown, unknown, unknown[]>;
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: tableData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tableData", endpoint],
    queryFn: () => makeGetRequest(endpoint, { page, search: debouncedSearch }),
    retry: 2,
    ...queryFunc,
  });

  useEffect(() => {
    refetch();
  }, [page, debouncedSearch]);

  return {
    tableData,
    isLoading,
    isFetching,
    error,
    refetch,
    page,
    setPage,
    setSearch,
    search,
    debouncedSearch,
  };
};

export default useGetTableData;
