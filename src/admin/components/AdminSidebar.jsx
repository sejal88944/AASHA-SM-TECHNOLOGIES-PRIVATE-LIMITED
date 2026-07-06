import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Briefcase,
  FileText,
  PenTool,
  BarChart,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { lockAdminPortal } from "../../utils/adminAccess";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/aashasm-portal",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/aashasm-portal/services",
      label: "Services",
      icon: <Briefcase size={20} />,
    },
    {
      path: "/aashasm-portal/blogs",
      label: "Blogs",
      icon: <FileText size={20} />,
    },
    {
      path: "/aashasm-portal/reviews",
      label: "Reviews",
      icon: <BarChart size={20} />,
    },
    {
      path: "/aashasm-portal/settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  // Separate module with its own login/session — intentionally not part of
  // the `menuItems` active-state logic above, just a doorway into it.
  const testPortalLink = {
    path: "/aashasm-portal/test-portal",
    label: "Internship Test Portal",
    icon: <GraduationCap size={20} />,
  };

  const sidebarStyle = {
    width: "260px",
    backgroundColor: "#fff",
    borderRight: "1px solid #e1e4e8",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
  };

  const linkStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    color: isActive ? "var(--primary)" : "#555",
    textDecoration: "none",
    backgroundColor: isActive ? "#FFF5F0" : "transparent",
    borderRight: isActive
      ? "3px solid var(--primary)"
      : "3px solid transparent",
    transition: "all 0.2s",
    gap: "12px",
    fontWeight: isActive ? "600" : "400",
  });

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    lockAdminPortal();
    navigate("/");
  };

  return (
    <aside style={sidebarStyle}>
      <nav style={{ flex: 1, padding: "20px 0" }}>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/aashasm-portal" &&
              location.pathname.startsWith(item.path));
          return (
            <Link key={item.path} to={item.path} style={linkStyle(isActive)}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div style={{ margin: "12px 20px", borderTop: "1px solid #eee" }} />
        <Link
          to={testPortalLink.path}
          style={linkStyle(location.pathname.startsWith(testPortalLink.path))}
        >
          {testPortalLink.icon}
          <span>{testPortalLink.label}</span>
        </Link>
      </nav>
      <div style={{ padding: "20px", borderTop: "1px solid #eee" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "10px",
            border: "none",
            background: "transparent",
            color: "#dc3545",
            cursor: "pointer",
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
