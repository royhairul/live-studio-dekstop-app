import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  IconLayoutGridFilled,
  IconUsersGroup,
  IconChevronDown,
  IconId,
  IconShoppingBag,
  IconIdBadge,
  IconSettings,
  IconReportMoney,
  IconTemperatureSnow,
} from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/auth/AuthContext";
import { PERMISSIONS } from "@/helpers/permission";
import { hasPermission } from "@/helpers/hasPermissions";

const items = [
  {
    icon: IconUsersGroup,
    title: "Host",
    url: "/host/all",
    children: [
      {
        title: "Daftar Host",
        url: "/host/all",
        permission: PERMISSIONS.HOST.VIEW,
      },
      {
        title: "Buat Host",
        url: "/host/create",
        permission: PERMISSIONS.HOST.CREATE,
      },
      {
        title: "Jadwal Host",
        url: "/host/schedule",
        permission: PERMISSIONS.SCHEDULE_HOST.VIEW,
      },
      {
        title: "Presensi Host",
        url: "/host/attendance/all",
        permission: PERMISSIONS.SCHEDULE_HOST.VIEW,
      },
    ],
  },
  {
    icon: IconId,
    title: "Akun",
    url: "/account/all",
    children: [
      {
        title: "Daftar Akun",
        url: "/account/all",
        permission: PERMISSIONS.ACCOUNT.VIEW,
      },
      {
        title: "Tambah Akun",
        url: "/account/create",
        permission: PERMISSIONS.ACCOUNT.CREATE,
      },
    ],
  },
  {
    icon: IconShoppingBag,
    title: "Transaksi",
    url: "/product/all",
    children: [
      {
        title: "Daftar Produk",
        url: "/product/list",
        permission: PERMISSIONS.FINANCE.VIEW,
      },
      {
        title: "Transaksi Produk",
        url: "/product/orders",
        permission: PERMISSIONS.FINANCE.VIEW,
      },
    ],
  },
  {
    icon: IconReportMoney,
    title: "Keuangan",
    url: "/finance/all",
    children: [
      {
        title: "Laporan Harian",
        url: "/finance/daily-report",
        permission: PERMISSIONS.FINANCE.RESEARCH_VIEW,
      },
      {
        title: "Laporan Komisi",
        url: "/finance/commission-report",
        permission: PERMISSIONS.FINANCE.RESEARCH_VIEW,
      },
      {
        title: "Laporan Hasil",
        url: "/finance/result-report",
        permission: PERMISSIONS.FINANCE.RESEARCH_VIEW,
      }
    ],
  },
  {
    icon: IconIdBadge,
    title: "Live",
    url: "/live/preview",
    children: [
      {
        title: "Preview",
        url: "/live/preview",
        permission: PERMISSIONS.LIVE.VIEW,
      },
      {
        title: "Laporan",
        url: "/live/report",
        permission: PERMISSIONS.LIVE.REPORT,
      },
      {
        title: "Grafik Laporan",
        url: "/live/report/graph",
        permission: PERMISSIONS.LIVE.REPORT,
      },
    ],
  },
  {
    icon: IconSettings,
    title: "Setting",
    url: "/setting/all",
    children: [
      {
        title: "Management User",
        url: "/setting/user-management",
        permission: PERMISSIONS.USER.VIEW,
      },
      {
        title: "Management Studio",
        url: "/setting/studio-management",
        permission: PERMISSIONS.STUDIO.VIEW,
      },
      {
        title: "Management Role",
        url: "/setting/role-management",
        permission: PERMISSIONS.ROLE.VIEW,
      },
    ],
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const filteredItems = useMemo(() => {
    return items
      .map((item) => ({
        ...item,
        // children: item.children.filter((child) =>
        //   hasPermission(user, child.permission)
        // ),
      }))
      .filter((item) => item.children.length > 0);
  }, []);

  const initialActiveMenu = useMemo(() => {
    const newMenus = {};
    filteredItems.forEach((item) => {
      newMenus[item.title] = item.children.some((child) =>
        location.pathname.startsWith(child.url)
      );
    });
    return newMenus;
  }, [location.pathname, filteredItems]);

  const [activeMenu, setActiveMenu] = useState(initialActiveMenu);

  useEffect(() => {
    const newOpenMenus = {};
    filteredItems.forEach((item) => {
      newOpenMenus[item.title] = item.children.some((child) =>
        location.pathname.startsWith(child.url)
      );
    });
    setActiveMenu((prev) => ({ ...prev, ...newOpenMenus }));
  }, [location.pathname, filteredItems]);

  return (
    <Sidebar className={"fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg"}>
      <SidebarHeader>
        <div className="flex items-center space-x-4 p-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">Welcome,</p>
            <p className="text-lg font-medium">{user?.name || "Guest"}</p>
            <p className="text-xs font-semibold text-primary">
              @{user?.username || "Guest"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <SidebarMenuItem className="list-none">
          <SidebarMenuButton
            isActive={location.pathname === "/dashboard"}
            asChild
          >
            <Link to="/dashboard">
              <IconLayoutGridFilled />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <Collapsible
                  key={item.title}
                  className="group/collapsible"
                  open={!!activeMenu[item.title]}
                  onOpenChange={(isOpen) =>
                    setActiveMenu((prev) => ({
                      ...prev,
                      [item.title]: isOpen,
                    }))
                  }
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction>
                        <IconChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.url}>
                          <SidebarMenuButton
                            size="sm"
                            asChild
                            isActive={location.pathname === child.url}
                          >
                            <Link to={child.url}>{child.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
