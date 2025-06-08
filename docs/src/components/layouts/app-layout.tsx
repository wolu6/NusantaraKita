import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { formatBreadcrumb } from "@/utils/formate-breadcrumb";
import React from "react";
import { Outlet, useLocation } from "react-router";

/** Render breadcrumb items based on current path segments. */
function RenderBreadcrumbItems(paths: string[]) {
  if (paths.length === 0) {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage>Overview</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return paths.map((path, index) => (
    <React.Fragment key={path}>
      {index > 0 && <BreadcrumbSeparator />}
      <BreadcrumbItem>
        <BreadcrumbPage>{formatBreadcrumb(path)}</BreadcrumbPage>
      </BreadcrumbItem>
    </React.Fragment>
  ));
}

/** Render the breadcrumb navigation. */
function BreadcrumbNavigation() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>{RenderBreadcrumbItems(paths)}</BreadcrumbList>
    </Breadcrumb>
  );
}

/** Application layout with sidebar and breadcrumb navigation. */
export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1">
        <header className="flex h-16 shrink-0 border-b items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4 mx-2" />
          <BreadcrumbNavigation />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
