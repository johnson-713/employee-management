"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesEndpoints } from "@/api/endpoints/endpoints";
import makeGetRequest from "@/api/makeGetRequest";
import AppPageWrapper from "@/components/layout/AppPageWrapper";
import AppTitleWithBreadCrumb from "@/components/layout/AppTitleWithBreadCrumb";
import AppText from "@/components/AppText/AppText";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal/AppModal";
import AppForm from "@/components/form/AppForm";
import { useForm, type UseFormReturn, type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import type { InputType } from "@/types/types";
import makePutRequest from "@/api/makePutRequest";

const EmployeeDetailPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => makeGetRequest(employeesEndpoints.detail(id)),
  });

  const updateForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
    },
  });

  // Populate form when employee data loads
  useEffect(() => {
    if (employee) {
      updateForm.reset({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        age: employee.age?.toString() || "",
        gender: employee.gender || "",
      });
    }
  }, [employee, updateForm]);

  const updateMutation = useMutation({
    mutationFn: (data: unknown) =>
      makePutRequest(employeesEndpoints.detail(id), data),
    onSuccess: () => {
      toast.success("Employee updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
      queryClient.invalidateQueries({ queryKey: ["tableData"] });
      setIsUpdateModalOpen(false);
    },
    onError: (error: unknown) => {
      let errMsg = "Failed to update employee";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errMsg = axiosError.response?.data?.message || errMsg;
      } else if (error instanceof Error) {
        errMsg = error.message;
      }
      toast.error(errMsg);
    },
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const updateInputs = [
    {
      render: [
        {
          name: "firstName",
          label: "First Name",
          placeholder: "Enter first name",
          type: "text" as InputType,
          required: true,
        },
        {
          name: "lastName",
          label: "Last Name",
          placeholder: "Enter last name",
          type: "text" as InputType,
          required: true,
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Enter email",
          type: "text" as InputType,
          required: true,
        },
        {
          name: "phone",
          label: "Phone",
          placeholder: "Enter phone number",
          type: "text" as InputType,
          required: true,
        },
        {
          name: "age",
          label: "Age",
          placeholder: "Enter age",
          type: "number" as InputType,
          required: true,
        },
        {
          name: "gender",
          label: "Gender",
          placeholder: "Select gender",
          type: "select" as InputType,
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
          required: true,
        },
      ],
    },
  ];

  const handleUpdateSubmit = (data: unknown) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <AppPageWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <AppText>Loading...</AppText>
        </div>
      </AppPageWrapper>
    );
  }

  if (!employee) {
    return (
      <AppPageWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <AppText>Employee not found</AppText>
        </div>
      </AppPageWrapper>
    );
  }

  return (
    <AppPageWrapper>
      <div className="pb-6">
        <AppTitleWithBreadCrumb
          breadcrumbs={[
            { label: "Employees", href: "/employees" },
            { label: employee.firstName || "Employee" },
          ]}
          title={`${employee.firstName} ${employee.lastName}`}
          description={employee.email}
        />

        <div className="mt-6 bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <AppText className="text-xl font-semibold">
              Employee Details
            </AppText>
            <Button onClick={() => setIsUpdateModalOpen(true)}>
              Update Employee
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AppText className="text-sm text-gray-500 mb-1">ID</AppText>
              <AppText className="text-base font-medium">{employee.id}</AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">
                First Name
              </AppText>
              <AppText className="text-base font-medium">
                {employee.firstName}
              </AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">
                Last Name
              </AppText>
              <AppText className="text-base font-medium">
                {employee.lastName}
              </AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">Email</AppText>
              <AppText className="text-base font-medium">
                {employee.email}
              </AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">Phone</AppText>
              <AppText className="text-base font-medium">
                {employee.phone}
              </AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">Age</AppText>
              <AppText className="text-base font-medium">
                {employee.age}
              </AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">Gender</AppText>
              <AppText className="text-base font-medium capitalize">
                {employee.gender}
              </AppText>
            </div>
            <div>
              <AppText className="text-sm text-gray-500 mb-1">Role</AppText>
              <span
                className={`px-2 py-1 rounded-full text-xs capitalize font-medium ${
                  employee.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : employee.role === "moderator"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {employee.role}
              </span>
            </div>
            {employee.company && (
              <>
                <div>
                  <AppText className="text-sm text-gray-500 mb-1">
                    Company
                  </AppText>
                  <AppText className="text-base font-medium">
                    {employee.company.name}
                  </AppText>
                </div>
                <div>
                  <AppText className="text-sm text-gray-500 mb-1">
                    Title
                  </AppText>
                  <AppText className="text-base font-medium">
                    {employee.company.title}
                  </AppText>
                </div>
              </>
            )}
            {employee.address && (
              <>
                <div>
                  <AppText className="text-sm text-gray-500 mb-1">City</AppText>
                  <AppText className="text-base font-medium">
                    {employee.address.city}
                  </AppText>
                </div>
                <div>
                  <AppText className="text-sm text-gray-500 mb-1">
                    State
                  </AppText>
                  <AppText className="text-base font-medium">
                    {employee.address.state}
                  </AppText>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Update Modal */}
        <AppModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title="Update Employee"
          description="Update employee information"
          size="lg"
          footer={
            <div className="flex gap-3 justify-end w-full">
              <Button
                variant="outline"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={updateForm.handleSubmit(handleUpdateSubmit)}
                loading={updateMutation.isPending}
              >
                Update
              </Button>
            </div>
          }
        >
          <AppForm
            inputArr={updateInputs}
            formUtils={updateForm as unknown as UseFormReturn<FieldValues>}
            onSubmit={handleUpdateSubmit}
            noDefaultButtons
            formClassName="space-y-4"
          />
        </AppModal>
      </div>
    </AppPageWrapper>
  );
};

export default EmployeeDetailPage;
