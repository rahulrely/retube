import { Home, Settings, FileVideo2 , Video } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home ,
  },
  {
    title: "Raw Videos",
    url: "/dashboard/rawvideos",
    icon: FileVideo2,
  },
  {
    title: "Videos",
    url: "/dashboard/videos",
    icon: Video,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            {/* Application */}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-4">
              {/* Move SidebarTrigger inside menu as a button */}


              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    className="[&>svg]:size-6 group-data-[collapsible=icon]:[&>svg]:ml-1"
                  >
                    <a href={item.url} className="flex items-center gap-5">
                      <item.icon className="h-6 w-6" />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-10 group-data-[collapsible=icon]:hidden">
            <strong className="text-[#0F7173] text-2xl">Retube</strong>
          <span className="text-gray-400">
            Collaborate, Approve, Publish Seamlessly to YouTube!
          </span>
          <span className='text-gray-300 text-sm pt-4'>Handcrafted by <a href='https://www.linkedin.com/in/rahulrely'  target='_blank' className='text-[#107678]'>@rahulrely</a></span>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}