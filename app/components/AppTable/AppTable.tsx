import { Table } from "@/components/ui/table";
import type { IAppTable } from "@/types/types";
import AppTableBody from "./AppTableBody";
import AppTableHeaders from "./AppTableHeaders";
import AppPagination from "./AppPagination";
import SkeletonTable from "../loaders/SkeletonTable";

const AppTable = ({
  headers,
  body,
  selectedRows,
  actions,
  page,
  perPage = 24,
  total,
  setPage,
  isLoading,
  customValueRender,
  hidePagination,
  addIndex = false,
  handleRowClick,
}: IAppTable) => {
  if (isLoading) {
    return <SkeletonTable columns={5} rows={10} />;
  }

  const headersToMap = Object.values(headers || {});
  const keysToAccessObjects = Object.keys(headers || {});
  // Calculate colSpan: selection + data columns + actions
  let colSpan = headersToMap.length;
  if (selectedRows) colSpan += 1;
  if (actions) colSpan += 1;

  return (
    <div className="rounded-xl border">
      <div className="w-full overflow-x-auto no-scrollbar">
        <Table className="min-w-full rounded-xl clean-scrollbar">
          <AppTableHeaders
            selectedRows={selectedRows}
            actions={actions}
            headersToMap={headersToMap}
            addIndex={addIndex}
          />
          <AppTableBody
            keysToAccessObjects={keysToAccessObjects}
            body={body}
            actions={actions}
            colSpan={colSpan}
            customValueRender={customValueRender}
            addIndex={addIndex}
            handleRowClick={handleRowClick}
          />
        </Table>
      </div>

      {!hidePagination && (
        <div className=" w-full">
          <AppPagination
            page={page}
            perPage={perPage}
            total={total}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AppTable;
