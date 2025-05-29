"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Youtube,
} from "lucide-react";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
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
    <footer className="bg-[#DDB52F] text-primary-foreground">
      <div className="container py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Về Chúng Tôi</h3>
            <p className="text-sm mb-4">
              Công ty dịch vụ bất động sản chuyên nghiệp cung cấp các giải pháp
              toàn diện về mua bán, cho thuê và tư vấn bất động sản.
            </p>
            <div className="flex space-x-4" style={{ color: "black" }}>
              <Link
                href="https://www.facebook.com/profile.php?id=61575260083118"
                className="hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@TGBLand"
                className="hover:text-white"
                aria-label="Instagram"
              >
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2" style={{ color: "black" }}>
              <li>
                <Link href="/" className="text-sm hover:text-white">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-sm hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/nganh-nghe" className="text-sm hover:text-white">
                  Ngành nghề
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm hover:text-white">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-sm hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Dịch Vụ</h3>
            <ul className="space-y-2 " style={{ color: "black" }}>
              <li>
                <Link
                  href="/goc-tu-van/mua-ban-noi-that"
                  className="text-sm hover:text-white"
                >
                  Tư vấn mua bán nội thất
                </Link>
              </li>
              <li>
                <Link
                  href="/goc-tu-van/thiet-ke"
                  className="text-sm hover:text-white"
                >
                  Tư vấn thiết kế
                </Link>
              </li>
              <li>
                <Link href="/tuyen-dung" className="text-sm hover:text-white">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Liên Hệ</h3>
            <ul className="space-y-2" style={{ color: "black" }}>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span className="text-sm">
                  88 Hoàng Quốc Việt, Phường Phú Mỹ, Quận 7, TPHCM
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span className="text-sm">0947 394 466</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span className="text-sm">KingReal@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm" style={{ color: "black" }}>
            &copy; {new Date().getFullYear()} King Real JSC, TGB LAND. All
            rights
          </p>
        </div>
      </div>
    </footer>
  );
}
