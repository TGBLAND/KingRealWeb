import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Tag, Home, ShoppingCart, LucideUser } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const items = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Post",
      href: "/admin/Post",
      icon: Package,
    },
    {
      name: "JobPosition",
      href: "/admin/JobPosition",
      icon: Tag,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Tag,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: LucideUser,
    },
  ];

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-slate-50 border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-slate-200 text-slate-900"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
