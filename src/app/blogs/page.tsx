import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Hình Ảnh Hoạt Động - Bất Động Sản Dịch Vụ",
  description:
    "Hình ảnh về các hoạt động, sự kiện của công ty Bất Động Sản Dịch Vụ",
};

export default function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      image: "./images/image1.png",
      //quote: "Thành công trong kinh doanh bất động sản không phải là về việc bán được bao nhiêu căn nhà, mà là về việc giúp được bao nhiêu gia đình có được tổ ấm của họ."
    },
    {
      id: 2,
      image: "./images/image2.png",
      quote: "sinh nhật sếp",
    },
    {
      id: 3,
      image: "./images/image-blogs.png",
      //   quote:
      //     "Đoàn kết là sức mạnh, khi chúng ta cùng nhau hợp tác, không có mục tiêu nào là không thể đạt được.",
    },
    {
      id: 4,
      image: "./images/image-blogs-1.png",
      //   quote:
      //     "Thiết kế nội thất không chỉ là về vẻ đẹp, mà còn là về cách không gian ảnh hưởng đến cảm xúc và cuộc sống của chúng ta.",
    },
    // {
    //     id: 5,
    //     image: "https://source.unsplash.com/random/800x600/?nature,home",
    //     quote: "Ngôi nhà hoàn hảo không phải là nơi có đồ nội thất đắt tiền, mà là nơi chứa đựng những kỷ niệm đáng giá."
    // },
    // {
    //     id: 6,
    //     image: "https://source.unsplash.com/random/800x600/?celebration,success",
    //     quote: "Hãy ăn mừng mỗi thành công nhỏ, vì đó là những bước đi vững chắc trên con đường đi đến thành công lớn."
    // },
    // {
    //     id: 7,
    //     image: "https://source.unsplash.com/random/800x600/?client,meeting",
    //     quote: "Lắng nghe khách hàng là chìa khóa để hiểu nhu cầu thực sự của họ và mang đến giải pháp tốt nhất."
    // },
    // {
    //     id: 8,
    //     image: "https://source.unsplash.com/random/800x600/?innovation,creative",
    //     quote: "Đổi mới là điều cần thiết để tồn tại và phát triển trong thị trường luôn biến động."
    // },
    // {
    //     id: 9,
    //     image: "https://source.unsplash.com/random/800x600/?training,learning",
    //     quote: "Học hỏi không bao giờ kết thúc, mỗi ngày là một cơ hội để trở nên tốt hơn."
    // }
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      <div className="max-w-4xl mb-10">
        <p className="text-gray-600">
          Chào mừng bạn đến với Blogs của chúng tôi - nơi chia sẻ những hình ảnh
          đẹp và câu châm ngôn ý nghĩa về công ty, về cuộc sống và công việc. Hy
          vọng những chia sẻ này sẽ mang đến cho bạn cảm hứng và động lực mỗi
          ngày.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-md transition-all"
          >
            <div className="relative h-64">
              <Image
                src={post.image}
                alt={`Blog post ${post.id}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
                <p className="text-white text-center font-medium italic">
                  {post.quote}
                </p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {/* <span className="text-gray-500 text-sm">21/03/2025</span> */}
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
