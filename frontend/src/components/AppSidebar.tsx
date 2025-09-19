import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import api from "@/api/axios"; 
import { useToast } from "@/hooks/use-toast";

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Metrics'
  },
  {
    title: 'User Activity',
    url: '/user-activity',
    icon: Users,
    description: 'Monitor User Actions'
  },
  {
    title: 'Alerts & Risks',
    url: '/alerts',
    icon: AlertTriangle,
    description: 'Threat Detection'
  },
  {
    title: 'Intent Detection',
    url: '/intent-detection',
    icon: MessageSquare,
    description: 'NLP Analysis'
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
    description: 'System Reports'
  },
];

const settingsItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    description: 'System Configuration'
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: LogOut,
    description: 'Sign out from system'
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("authToken");
      toast({
        title: "Logged out",
        description: "You have been signed out securely",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: "Something went wrong while logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        {/* Brand Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 cyber-glow">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold gradient-text">HawkEye</h2>
                <p className="text-xs text-muted-foreground">Threat Detection</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Security Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-2'>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => 
                        `flex items-center space-x-3 py-5 px-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary/10 text-primary border border-primary/20 cyber-glow' 
                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </p>
                        </div>
                      )}
                      {isActive(item.url) && (
                        <div className="w-2 h-2 bg-primary rounded-full pulse-ring" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-2'>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title === "Logout" ? (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 py-5 px-3 rounded-xl transition-all duration-200 ${
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/20 cyber-glow"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink 
                        to={item.url}
                        className={({ isActive }) => 
                          `flex items-center space-x-3 py-5 px-3 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? 'bg-primary/10 text-primary border border-primary/20 cyber-glow' 
                              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
