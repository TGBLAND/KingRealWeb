"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, Tag, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import prisma from "../lib/db";
import { toast } from "sonner";

// export const metadata = {
//   title: "Tin Tức - Sự Kiện",
//   description:
//     "Tin tức, bài viết và kiến thức về bất động sản từ Bất Động Sản Dịch Vụ",
// };

const blogPosts = [
  {
    id: 1,
    title: "Xu hướng bất động sản nổi bật năm 2024",
    description:
      "Các xu hướng bất động sản đang phát triển mạnh mẽ trong năm 2024, mang đến nhiều cơ hội và thách thức cho nhà đầu tư.",
    image: "https://daiphuc.com.vn/uploads/1-2.jpg",
    category: "Thị trường",
    author: "Nguyễn Văn A",
    date: "10/03/2024",
    slug: "xu-huong-bat-dong-san-noi-bat-nam-2024",
  },
  {
    id: 2,
    title: "Các yếu tố ảnh hưởng đến giá bất động sản",
    description:
      "Phân tích chi tiết các yếu tố có ảnh hưởng đến giá bất động sản và những biến động trên thị trường hiện nay.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    category: "Phân tích",
    author: "Trần Thị B",
    date: "05/03/2024",
    slug: "cac-yeu-to-anh-huong-den-gia-bat-dong-san",
  },
  {
    id: 3,
    title: "Kinh nghiệm mua nhà lần đầu cho người trẻ",
    description:
      "Những lời khuyên và kinh nghiệm hữu ích dành cho người trẻ khi mua nhà lần đầu, giúp tránh những sai lầm thường gặp.",
    image:
      "https://images.unsplash.com/photo-1560518883-729dec18a6ea?q=80&w=1000&auto=format&fit=crop",
    category: "Hướng dẫn",
    author: "Lê Văn C",
    date: "28/02/2024",
    slug: "kinh-nghiem-mua-nha-lan-dau-cho-nguoi-tre",
  },
  {
    id: 4,
    title: "Căn hộ thông minh - Tương lai của bất động sản",
    description:
      "Tìm hiểu về xu hướng căn hộ thông minh, ứng dụng công nghệ trong không gian sống và tương lai của bất động sản.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    category: "Công nghệ",
    author: "Phạm Văn D",
    date: "20/02/2024",
    slug: "can-ho-thong-minh-tuong-lai-cua-bat-dong-san",
  },
  {
    id: 5,
    title: "Những lưu ý khi đầu tư bất động sản nghỉ dưỡng",
    description:
      "Các yếu tố cần cân nhắc khi đầu tư vào bất động sản nghỉ dưỡng và những rủi ro tiềm ẩn cần lưu ý.",
    image:
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1000&auto=format&fit=crop",
    category: "Đầu tư",
    author: "Hoàng Thị E",
    date: "15/02/2024",
    slug: "nhung-luu-y-khi-dau-tu-bat-dong-san-nghi-duong",
  },
  {
    id: 6,
    title: "Thiết kế nội thất phong cách Scandinavian",
    description:
      "Tìm hiểu về phong cách thiết kế nội thất Scandinavian, đặc điểm và cách áp dụng vào không gian sống.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    category: "Thiết kế",
    author: "Nguyễn Thị F",
    date: "10/02/2024",
    slug: "thiet-ke-noi-that-phong-cach-scandinavian",
  },
  {
    id: 7,
    title: "Quy hoạch đô thị và ảnh hưởng đến bất động sản",
    description:
      "Phân tích mối quan hệ giữa quy hoạch đô thị và sự phát triển của thị trường bất động sản.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop",
    category: "Quy hoạch",
    author: "Trần Văn G",
    date: "05/02/2024",
    slug: "quy-hoach-do-thi-va-anh-huong-den-bat-dong-san",
  },
  {
    id: 8,
    title: "Cách tiết kiệm chi phí khi xây nhà",
    description:
      "Những mẹo và lời khuyên giúp tiết kiệm chi phí khi xây nhà mà vẫn đảm bảo chất lượng và thẩm mỹ.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop",
    category: "Xây dựng",
    author: "Lê Thị H",
    date: "01/02/2024",
    slug: "cach-tiet-kiem-chi-phi-khi-xay-nha",
  },
];

const categories = [
  { value: "all", label: "Tất cả" },
  { value: "thi-truong", label: "Thị trường" },
  { value: "phan-tich", label: "Phân tích" },
  { value: "dau-tu", label: "Đầu tư" },
  { value: "huong-dan", label: "Hướng dẫn" },
  { value: "thiet-ke", label: "Thiết kế" },
  { value: "cong-nghe", label: "Công nghệ" },
];

type Posts = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  slug: string;
  content: string;
  isLatest: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch("/api/post");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch post");
      }

      setPosts(result.data);
      console.log(result.data);
    } catch (err) {
      toast.error("Failed to fetch post");
    }
  };
  console.log(posts);
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://media.istockphoto.com/id/1219980553/vi/anh/tin-t%E1%BB%A9c-tr%E1%BB%B1c-tuy%E1%BA%BFn-tr%C3%AAn-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-th%C3%B4ng-minh-v%C3%A0-m%C3%A1y-t%C3%ADnh-x%C3%A1ch-tay-ng%C6%B0%E1%BB%9Di-ph%E1%BB%A5-n%E1%BB%AF-%C4%91%E1%BB%8Dc-tin-t%E1%BB%A9c.jpg?s=612x612&w=0&k=20&c=7zwIy8EXu2ftiu05ypMCqtoljr4YPRAd4k76KyYqwso="
            alt="Blogs"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ color: "#fff" }}
          >
            Tin tức - sự kiện
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {post.createdAt}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/tin-tuc-su-kien-detail/${post.slug}`}
                    className="hover:underline"
                  >
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {post.author}
                    </span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="gap-2 px-0 text-primary"
                  >
                    <Link href={`/tin-tuc-su-kien/${post.slug}`}>
                      Đọc tiếp
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-[#DDB52F] text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white mx-auto mb-6">
              <Newspaper size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Đăng Ký Nhận Tin</h2>
            <p className="mb-8">
              Đăng ký nhận bản tin định kỳ từ chúng tôi để cập nhật những thông tin mới nhất về thị trường bất động sản,
              xu hướng thiết kế và những bài viết hữu ích.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/60"
                />
              </div>
              <Button variant="secondary">Đăng ký</Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
