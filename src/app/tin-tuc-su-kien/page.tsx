import { Metadata } from "next";
import BlogsPage from "./BlogsPage"; // client wrapper

export const metadata: Metadata = {
  title: "Tin Tức - Sự Kiện",
  description:
    "Tin tức, bài viết và kiến thức về bất động sản từ Bất Động Sản Dịch Vụ",
};

export default function Page() {
  return <BlogsPage />;
}
