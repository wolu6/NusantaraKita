"use client";

import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function NavSourceCode() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="bg-sidebar-primary hover:bg-sidebar-primary/90">
              <div className="flex items-center justify-center text-center gap-3 text-white flex-1">
                <span className="font-medium text-2xl truncate">
                  <FaGithub />
                </span>
                <span className={cn("text-sm truncate transition-all", !open && "hidden")}>SOURCE CODE</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
