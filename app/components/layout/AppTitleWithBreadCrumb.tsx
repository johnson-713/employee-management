import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import AppText from "../AppText/AppText";

interface BreadcrumbItem {
  label?: string;
  href?: string;
}

const AppTitleWithBackButton = ({
  breadcrumbs,
  title,
  description,
  asideComp,
  hideBreadcrumbs = false,
}: {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  asideComp?: React.ReactNode;
  hideBreadcrumbs?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="">
        {/* Breadcrumb Navigation */}
        {!hideBreadcrumbs && (
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.href && index < breadcrumbs.length - 1 ? (
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href} className="capitalize">
                            {crumb.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="capitalize">
                          {crumb.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        <div className="flex items-center mb-2">
          <div>
            <AppText type="h1" className="text-2xl font-bold text-primary">
              {title}
            </AppText>
            {description && (
              <AppText type="p" className="text-[#504849] text-sm">
                {description}
              </AppText>
            )}
          </div>
        </div>
      </div>
      {asideComp}
    </div>
  );
};

export default AppTitleWithBackButton;
