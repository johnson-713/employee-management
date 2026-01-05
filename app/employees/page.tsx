"use client";
import { useRouter } from "next/navigation";
import AppPageWrapper from "@/components/layout/AppPageWrapper";
// import { Button } from "@/components/ui/button";
import useGetTableData from "@/hooks/useGetTableData";
// import { Download } from "lucide-react";
import AppTitleWithBreadCrumb from "@/components/layout/AppTitleWithBreadCrumb";
import { employeesEndpoints } from "@/api/endpoints/endpoints";
import AppTableWithSearchAndFilter from "@/components/AppTable/AppTableWithSearch";
import type { IAppTableBody } from "@/types/types";

const EmployeesPage = () => {
  const router = useRouter();
  const { setPage, setSearch, page, tableData, isLoading, isFetching } =
    useGetTableData({
      endpoint: employeesEndpoints.list,
    });

  const handleRowClick = (row: IAppTableBody) => {
    const id = (row as { id?: number })?.id;
    if (id) {
      router.push(`/employees/${id}`);
    }
  };

  const headers = {
    id: "ID",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    age: "Age",
    gender: "Gender",
    role: "Role",
    "company.name": "Company",
    "address.city": "City",
    "address.state": "State",
  };

  const customValueRender = {
    role: (row: { role?: string }) => {
      const roleColors: Record<string, string> = {
        admin: "bg-purple-100 text-purple-800",
        moderator: "bg-blue-100 text-blue-800",
        user: "bg-gray-100 text-gray-800",
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs capitalize font-medium ${
            roleColors[row.role || ""] || "bg-gray-100 text-gray-800"
          }`}
        >
          {row.role || "-"}
        </span>
      );
    },
    gender: (row: { gender?: string }) => {
      return <span className="text-sm capitalize">{row.gender || "-"}</span>;
    },
    "company.name": (row: { company?: { name?: string } }) => {
      return (
        <span className="text-sm capitalize">{row.company?.name || "-"}</span>
      );
    },
    "address.city": (row: { address?: { city?: string } }) => {
      return (
        <span className="text-sm capitalize">{row.address?.city || "-"}</span>
      );
    },
    "address.state": (row: { address?: { state?: string } }) => {
      return (
        <span className="text-sm capitalize">{row.address?.state || "-"}</span>
      );
    },
  };

  return (
    <AppPageWrapper>
      <div className="pb-6">
        {/* Header Section */}
        <AppTitleWithBreadCrumb
          breadcrumbs={[]}
          hideBreadcrumbs
          title="Employees"
          description=""
        />

        {/* Table with Search and Filters */}
        {/* Sidebar max width is 246px, so content width = viewport - 246px */}
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-full">
            <AppTableWithSearchAndFilter
              handleSearch={setSearch}
              headers={headers}
              body={
                ((tableData as { users?: unknown[]; total?: number })?.users ||
                  []) as unknown as IAppTableBody[]
              }
              page={page}
              total={(tableData as { total?: number })?.total || 0}
              setPage={setPage}
              customValueRender={customValueRender}
              searchPlaceholder="Search employees by name, email, phone..."
              isLoading={isLoading || isFetching}
              handleRowClick={handleRowClick}
              perPage={5}
            />
          </div>
        </div>
      </div>
    </AppPageWrapper>
  );
};

export default EmployeesPage;
