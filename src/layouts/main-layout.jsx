import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  IconSearch,
  IconLayoutGridFilled,
  IconHistory,
  IconBell,
  IconLogout,
  IconCheck,
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
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

export default function MainLayout({ breadcrumbs, children }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className={cn(isSidebarOpen? "w-4/5" : "w-full","p-4 flex flex-col gap-4 bg-gray-100 overflow-auto")}>
        <div className="w-full bg-white py-4 px-4 flex items-center rounded-md shadow-sm">
          <SidebarTrigger
              className="bg-transparent hover:bg-accent/10 mr-3"
              onClick={() => setIsSidebarOpen(prev => !prev)}
            />

            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage
                            className={
                              "flex items-center gap-1.5 font-semibold text-primary"
                            }
                          >
                            {item.icon && <item.icon className="mr-1 inline" />}
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            to={item.url}
                            className={"flex items-center gap-1.5 font-medium"}
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
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex-1" />

            <div className="self-end flex justify-end items-center gap-2">
              <Input
                icon={<IconSearch className="w-4" />}
                id="keyword"
                type="text"
                placeholder="Cari.."
                className={"bg-gray-300/40 border-none"}
              />
              <Button
                size="icon"
                className={cn("bg-transparent hover:bg-accent/10")}
              >
                <IconHistory color="#333" />
              </Button>
              <Button
                size="icon"
                className={cn("bg-transparent hover:bg-accent/10")}
              >
                <IconBell color="#333" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="bg-transparent hover:bg-rose-500/10"
                    variant="ghost"
                  >
                    <IconLogout className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah kamu yakin ingin logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Setelah logout, kamu perlu login kembali untuk mengakses
                      dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      className={cn("bg-rose-500 hover:bg-rose-700")}
                      onClick={handleLogout}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
