import type { IAppTableWithSearchAndFilter } from "@/types/types";
import AppTable from "./AppTable";
import AppSearchInput from "../form/AppSearchInput";

const AppTableWithSearchAndFilter = ({
  headers,
  body,
  page,
  perPage,
  total,
  setPage,
  isLoading,
  handleSearch,
  searchPlaceholder = "Search...",
  actions,
  customValueRender,
  handleRowClick,
}: IAppTableWithSearchAndFilter) => {
  return (
    <div className="flex-1">
      <div className="flex justify-between mb-3.25">
        <AppSearchInput
          handleSearch={handleSearch}
          placeholder={searchPlaceholder}
        />
      </div>
      <AppTable
        headers={headers}
        body={body}
        page={page}
        perPage={perPage}
        total={total}
        setPage={setPage}
        isLoading={isLoading}
        actions={actions}
        customValueRender={customValueRender}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default AppTableWithSearchAndFilter;
