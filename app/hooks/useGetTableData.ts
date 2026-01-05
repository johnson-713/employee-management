"use client";

import makeGetRequest from "@/api/makeGetRequest";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import useDebounce from "./useDebounce";

const useGetTableData = ({
  endpoint,
  queryFunc,
  perPage = 5,
}: {
  endpoint: string;
  metaEndpoint?: string;
  queryFunc?: UseQueryOptions<unknown, unknown, unknown, unknown[]>;
  perPage?: number;
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const prevSearchRef = useState(debouncedSearch)[0];

  const {
    data: rawData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tableData", endpoint],
    queryFn: () => makeGetRequest(endpoint, {}),
    retry: 2,
    ...queryFunc,
  });

  // Frontend filtering and pagination
  const { filteredData, total } = useMemo(() => {
    const allUsers = ((rawData as { users?: unknown[] })?.users ||
      []) as Record<string, unknown>[];

    if (!debouncedSearch) {
      return {
        filteredData: allUsers,
        total: allUsers.length,
      };
    }

    // Search across multiple fields
    const searchLower = debouncedSearch.toLowerCase();
    const filtered = allUsers.filter((user) => {
      const firstName = String(user.firstName || "").toLowerCase();
      const lastName = String(user.lastName || "").toLowerCase();
      const email = String(user.email || "").toLowerCase();
      const phone = String(user.phone || "").toLowerCase();
      const company = String(
        (user.company as { name?: string })?.name || ""
      ).toLowerCase();

      return (
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        email.includes(searchLower) ||
        phone.includes(searchLower) ||
        company.includes(searchLower)
      );
    });

    return {
      filteredData: filtered,
      total: filtered.length,
    };
  }, [rawData, debouncedSearch]);

  // Paginate the filtered data with auto-reset on search change
  const { paginatedData, currentPage } = useMemo(() => {
    // Reset to page 1 when search changes
    const activePage = debouncedSearch !== prevSearchRef ? 1 : page;
    const startIndex = (activePage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return {
      paginatedData: filteredData.slice(startIndex, endIndex),
      currentPage: activePage,
    };
  }, [filteredData, page, perPage, debouncedSearch, prevSearchRef]);

  return {
    tableData: { users: paginatedData, total },
    isLoading,
    isFetching,
    error,
    refetch,
    page: currentPage,
    setPage,
    setSearch,
    search,
    debouncedSearch,
  };
};

export default useGetTableData;
