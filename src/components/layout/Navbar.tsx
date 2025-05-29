"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/gioi-thieu" },
  { name: "Ngành nghề", href: "/nganh-nghe" },
  { name: "Tin tức-sự kiện", href: "/tin-tuc-su-kien" },
  { name: "Tuyển dụng", href: "/tuyen-dung" },
  {
    name: "Góc tư vấn",
    href: "/goc-tu-van",
    dropdown: [
      { name: "Tư vấn mua bán nội thất", href: "/goc-tu-van/mua-ban-noi-that" },
      { name: "Tư vấn thiết kế", href: "/goc-tu-van/thiet-ke" },
    ],
  },

  { name: "Liên hệ", href: "/lien-he" },
  { name: "Blogs", href: "/blogs" },
  // { name: "BĐS giá tốt", href: "/bat-dong-san" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  if (
    pathname === "/admin" ||
    pathname === "/admin/Post" ||
    pathname === "/admin/JobPosition" ||
    pathname === "/admin/categories" ||
    pathname === "/admin/product" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/products" ||
    pathname === "/admin/users"
  )
    return null;
  return (
    <header className="w-full">
      {/* <div className="bg-[#DDB52F] py-2">
        <div className="container flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Bạn muốn tìm gì"
              className="w-full py-1 px-3 rounded-md border border-gray-300 text-sm"
            />
            <button className="absolute right-0 top-0 bg-gray-800 text-white py-1 px-3 rounded-r-md h-full">
              Tìm kiếm
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61575260083118"
                aria-label="Facebook"
                className="bg-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#DDB52F"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="bg-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#DDB52F"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@TGBLand"
                aria-label="Youtube"
                className="bg-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#DDB52F"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
              </a>
            </div>
            <a
              href="mailto:KingReal@gmail.com"
              className="text-black text-sm hidden md:block"
            >
              <Mail size={16} className="inline mr-1" /> KingReal@gmail.com
            </a>
          </div>
        </div>
      </div> */}

      <div
        className={cn(
          "bg-white shadow-sm transition-all duration-300 z-50 border-t border-b border-gray-200 transition-all",
          scrolled && "fixed top-0 left-0 right-0 shadow-md"
        )}
      >
        <div className="container flex h-16 items-center justify-between border-t border-b border-gray-200 transition-all">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <div
                className="relative w-14 h-14 -mt-1"
                style={{ width: "100px", height: "auto" }}
              >
                <Image
                  src="./images/logo.png"
                  alt="King Real"
                  width={56}
                  height={56}
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-gray-800">
                  CÔNG TY CỔ PHẦN KING REAL
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex flex-col ">
            <div className="flex gap-3 mt-1">
              <a
                href="https://www.facebook.com/profile.php?id=61575260083118"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full w-5 h-5 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#DDB52F"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@TGBLand"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full w-5 h-5 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#DDB52F"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black rounded-full w-5 h-5 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#DDB52F"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.75 0h2a4.75 4.75 0 0 0 4.75 4.75v2a6.75 6.75 0 0 1-6.75-6.75h0v9.5A2.75 2.75 0 1 1 7 6.75V5A4.75 4.75 0 1 0 9.75 14V0Z" />
                </svg>
              </a>
              <div className="flex items-center gap-1 text-sm">
                <Mail size={15} className="text-gray-600" />
                <span>tgbland198@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={14} className="text-gray-600" />
              <span>88 Hoàng Quốc Việt, Phường Phú Mỹ, Quận 7, TPHCM</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Phone size={14} className="text-gray-600" />
              <span>SĐT: 0947394466</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-gray-100 border-t border-b border-gray-200 transition-all duration-300 z-40",
          scrolled && "fixed top-16 left-0 right-0 shadow-sm"
        )}
      >
        <div className="container">
          <nav className="hidden md:flex items-center">
            {navigationItems.map((item) => {
              if (item.dropdown) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center gap-1 px-4 h-12 rounded-none",
                          isActive(item.href) && "text-[#DDB52F] font-medium"
                        )}
                      >
                        {item.name}
                        <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link href={subItem.href} className="w-full">
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex h-12 items-center px-4 text-sm font-medium transition-colors hover:text-[#DDB52F]",
                    isActive(item.href) ? "text-[#DDB52F]" : "text-gray-700"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex md:hidden justify-between items-center h-12">
            <div className="flex gap-2">
              <div className="relative w-8 h-8"></div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className={cn(
            "md:hidden p-4 space-y-4 border-t bg-white z-30 shadow-md",
            scrolled &&
              "fixed top-28 left-0 right-0 max-h-[calc(100vh-7rem)] overflow-y-auto"
          )}
        >
          {navigationItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.name} className="space-y-2">
                  <div className="font-medium">{item.name}</div>
                  <div className="pl-4 space-y-2 border-l-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block text-sm transition-colors hover:text-[#DDB52F]",
                          isActive(subItem.href)
                            ? "text-[#DDB52F]"
                            : "text-gray-600"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-[#DDB52F]",
                  isActive(item.href) ? "text-[#DDB52F]" : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
