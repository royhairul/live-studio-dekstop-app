import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  IconSearch,
  IconHistory,
  IconBell,
  IconLogout,
} from "@tabler/icons-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ breadcrumbs, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="p-4 flex-1 flex-col gap-4 bg-gray-100 overflow-auto transition-[width] duration-300 ease-in-out">
        {/* Topbar */}
        <div className="w-full bg-white py-3 px-4 flex items-center rounded-md shadow-sm mb-4 gap-2">
          <SidebarTrigger className="inline-flex bg-transparent hover:bg-accent/10" />

          {/* Breadcrumbs */}
          <Breadcrumb className="flex-1">
            <BreadcrumbList className="flex flex-wrap items-center gap-1">
              <div className="flex md:hidden items-center gap-1">
                {breadcrumbs.length > 0 && (() => {
                  const last = breadcrumbs[breadcrumbs.length - 1];
                  const Icon = last.icon;
                  return (
                    <BreadcrumbItem>
                      <BreadcrumbPage className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                        {Icon && <Icon className="mr-1 inline" />}
                        {last.label}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  );
                })()}
              </div>

              <div className="hidden md:flex flex-wrap items-center gap-1">
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                            {item.icon && <item.icon className="mr-1 inline" />}
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            to={item.url}
                            className="flex items-center gap-1.5 font-medium text-xs"
                          >
                            {item.icon && <item.icon className="mr-1 inline" />}
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </div>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Search hanya di desktop */}
            <div className="hidden lg:block">
              <Input
                icon={<IconSearch className="w-4 h-4" />}
                id="keyword"
                type="text"
                placeholder="Cari.."
                className="bg-gray-300/40 border-none h-8 text-sm"
              />
            </div>

            <Button
              size="icon"
              className="h-8 w-8 bg-transparent hover:bg-accent/10"
            >
              <IconHistory className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 bg-transparent hover:bg-accent/10"
            >
              <IconBell className="w-4 h-4 text-gray-700" />
            </Button>

            {/* Logout */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  className="h-8 w-8 bg-transparent hover:bg-rose-500/10"
                  variant="ghost"
                >
                  <IconLogout className="w-4 h-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah kamu yakin ingin logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Setelah logout, kamu perlu login kembali untuk mengakses dashboard.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-rose-500 hover:bg-rose-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

        </div>

        {/* Content */}
        <div className="min-h-[calc(100vh-100px)]">{children}</div>
      </main>
    </SidebarProvider>
  );
}

