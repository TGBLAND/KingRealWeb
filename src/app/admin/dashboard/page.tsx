"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideUser, Package, ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { AuthProvider } from "@/app/lib/auth";
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    jobPositions: 0,
    categories: 0,
    producst: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postRes = await fetch("/api/post");
        const jobRes = await fetch("/api/jobPosition");
        const categoriesRes = await fetch("/api/categories");
        const productsRes = await fetch("/api/products");
        const usersRes = await fetch("/api/contact");
        if (!postRes.ok || !jobRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const postData = await postRes.json();
        const jobData = await jobRes.json();
        const categories = await categoriesRes.json();
        const productsData = await productsRes.json();
        const usersData = await usersRes.json();
        setStats({
          posts: postData.data.length,
          jobPositions: jobData.data.length,
          categories: categories.data.length,
          producst: productsData.data.length,
          users: usersData.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardItems = [
    {
      title: "Posts",
      value: stats.posts,
      icon: Package,
      href: "/admin/Post",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Job Positions",
      value: stats.jobPositions,
      icon: Tag,
      href: "/admin/JobPosition",
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Tag,
      href: "/admin/categories",
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Products",
      value: stats.producst,
      icon: Tag,
      href: "/admin/products",
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Users",
      value: stats.users,
      icon: LucideUser,
      href: "/admin/users",
      color: "bg-orange-50 text-orange-700",
    },
  ];

  return (
    <AuthProvider>
      <AdminLayout title="Dashboard">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dashboardItems.map((item) => (
            <Link href={item.href} key={item.title}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <div className={`rounded-full p-2 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading ? (
                      <div className="h-8 w-16 animate-pulse rounded-md bg-slate-100"></div>
                    ) : (
                      item.value
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    Total {item.title.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </AdminLayout>
    </AuthProvider>
  );
}
