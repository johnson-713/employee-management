import { TableHead, TableRow } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { IAppTableAction } from "@/types/types";

const AppTableHeaders = ({
  headersToMap,
  selectedRows,
  actions,
  addIndex,
}: {
  headersToMap: string[];
  selectedRows?: object[];
  actions?: IAppTableAction[];
  addIndex?: boolean;
}) => {
  return (
    <TableHeader className={`bg-[#DAA14C33] rounded-t-xl ${""}`}>
      <TableRow>
        {addIndex && (
          <TableHead className="text-[#64748B] px-2.5">S.No</TableHead>
        )}
        {!!selectedRows && <TableHead className="px-2.5"></TableHead>}
        {headersToMap.map((header, ind) => (
          <TableHead
            className={`${
              ind == 0 ? "rounded-tl-" : ""
            } p-4.25 py-3 text-primary font-semibold`}
            key={header?.toString() + `${ind}`}
          >
            {header}
          </TableHead>
        ))}
        {!!actions && <TableHead className="px-2.5 rounded-tr-xl"></TableHead>}
      </TableRow>
    </TableHeader>
  );
};

export default AppTableHeaders;
