import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import {
  IconLayoutGrid,
  IconUsers,
  IconId,
  IconShoppingBag,
  IconReportAnalytics,
  IconIdBadge,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const [isHovered, setIsHovered] = useState(false);

// Menu items dengan subitem dalam bentuk collapsible
const items = [
  {
    icon: IconUsers,
    title: "Host",
    url: "/host",
    children: [
      { title: "Daftar Host", url: "/host/all" },
      { title: "Buat Host", url: "/host/create" },
      { title: "Jadwal Host", url: "/host/schedule" },
    ],
  },
  {
    icon: IconId,
    title: "Akun",
    url: "/account",
    children: [
      { title: "Daftar Akun ", url: "/account/all" },
      { title: "Tambah Akun ", url: "/account/create" },
    ],
  },
  {
    icon: IconShoppingBag,
    title: "Produk",
    url: "/product",
    children: [
      { title: "Daftar Produk", url: "/product/all" },
      { title: "Transaksi Produk", url: "/product/orders" },
    ],
  },
  {
    icon: IconReportAnalytics,
    title: "Riset",
    url: "/riset",
    children: [
      { title: "Riset Produk", url: "/riset/product" },
      { title: "Riset Keuangan", url: "/riset/finance" },
      { title: "Listing Produk", url: "/riset/listing" },
    ],
  },
  {
    icon: IconReportAnalytics,
    title: "Riset",
    url: "/riset",
    children: [
      { title: "Riset Produk", url: "/riset/product" },
      { title: "Riset Keuangan", url: "/riset/finance" },
      { title: "Listing Produk", url: "/riset/listing" },
    ],
  },
  {
    icon: IconIdBadge,
    title: "Live",
    url: "/live",
    children: [
      { title: "Preview", url: "/live/preview" },
      { title: "Laporan", url: "/live/report" },
      { title: "Grafik Laporan", url: "/live/report/graph" },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation(); // Mendapatkan path URL saat ini

  return (
    <Sidebar className={cn("bg-dark text-white p-5")}>
      {/* Header Sidebar */}
      <SidebarHeader className="bg-dark">
        <div className="my-4">
          <p className="text-xs">Welcome</p>
          <p className="font-semibold">Smilling</p>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="bg-dark scrollbar-hide">
        <SidebarMenu>
          <SidebarMenuItem key="Dashboard">
            <SidebarMenuButton
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-appPrimary/10 hover:text-appPrimary active:bg-appPrimary/10 active:text-appPrimary",
                location.pathname === "/"
                  ? "bg-appPrimary/10 text-appPrimary"
                  : ""
              )}
            >
              <a href="/" className="flex gap-2 items-center">
                <IconLayoutGrid className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Group Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Managements</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Collapsible
                    key={item.title}
                    open={isHovered}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-appPrimary/10 hover:text-appPrimary active:bg-appPrimary/10 active:text-appPrimary",
                            isActive ? "bg-appPrimary text-white" : ""
                          )}
                        >
                          <a
                            href={item.url}
                            className="flex gap-2 items-center"
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>

                    {/* Subitems dalam collapsible */}
                    {item.children && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((subItem) => {
                            const isSubActive =
                              location.pathname === subItem.url;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuButton
                                  asChild
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-appPrimary/10 hover:text-appPrimary active:bg-appPrimary/10 active:text-appPrimary",
                                    isSubActive
                                      ? "bg-appPrimary text-white"
                                      : ""
                                  )}
                                >
                                  <a href={subItem.url}>{subItem.title}</a>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
