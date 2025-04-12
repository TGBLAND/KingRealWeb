import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { marked } from "marked";
import prisma from "@/app/lib/db";

export const metadata = {
  title: "Chi tiết bài viết ",
  description: "Bài viết chi tiết về Xu hướng bất động sản nổi bật năm 2024",
};

// const relatedPosts = [
//     {
//         id: 3,
//         title: 'Kinh nghiệm mua nhà lần đầu cho người trẻ',
//         image: 'https://images.unsplash.com/photo-1560518883-729dec18a6ea?q=80&w=1000&auto=format&fit=crop',
//         category: 'Hướng dẫn',
//         date: '28/02/2024',
//     },
//     {
//         id: 4,
//         title: 'Căn hộ thông minh - Tương lai của bất động sản',
//         image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
//         category: 'Công nghệ',
//         date: '20/02/2024',
//     },
//     {
//         id: 5,
//         title: 'Những lưu ý khi đầu tư bất động sản nghỉ dưỡng',
//         image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=1000&auto=format&fit=crop',
//         category: 'Đầu tư',
//         date: '15/02/2024',
//     },
// ];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await prisma.post.findUnique({
    where: { slug: (await params).slug },
  });

  const contentHtml = marked(posts?.content || "");
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={posts?.image || "/default-image.jpg"}
            alt={posts?.title || ""}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <Link
            href="/tin-tuc-su-kien"
            className="inline-flex items-center gap-2 text-white mb-5 hover:underline"
          >
            <ArrowLeft size={16} />
            <span>Quay lại danh sách bài viết</span>
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            {posts?.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>{posts?.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{posts?.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{posts?.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium">Chia sẻ:</span>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook size={16} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter size={16} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin size={16} />
                </Button>
              </div>

              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </article>

              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  <span className="font-medium">Tags:</span>
                  <Link
                    href="#"
                    className="text-sm bg-muted rounded-full px-3 py-1 hover:bg-muted/80"
                  >
                    Bất động sản
                  </Link>
                  <Link
                    href="#"
                    className="text-sm bg-muted rounded-full px-3 py-1 hover:bg-muted/80"
                  >
                    {posts?.category}
                  </Link>
                  <Link
                    href="#"
                    className="text-sm bg-muted rounded-full px-3 py-1 hover:bg-muted/80"
                  >
                    Đầu tư
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Về tác giả</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <User size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{posts?.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        Chuyên gia bất động sản
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Chuyên gia với hơn 10 năm kinh nghiệm trong lĩnh vực bất
                    động sản. Tư vấn và phân tích thị trường cho nhiều khách
                    hàng và nhà đầu tư.
                  </p>
                </CardContent>
              </Card>

              {/* <div>
                                <h3 className="text-lg font-bold mb-4">Bài viết liên quan</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((post) => (
                                        <Card key={post.id} className="overflow-hidden">
                                            <div className="flex gap-4">
                                                <div className="relative w-24 h-24">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="py-2 pr-2">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Tag size={12} className="text-primary" />
                                                        <span className="text-xs text-muted-foreground">{post.category}</span>
                                                    </div>
                                                    <Link href="/blog-detail" className="font-medium line-clamp-2 hover:underline">
                                                        {post.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
