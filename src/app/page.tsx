import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, Users, Award, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "./lib/db";
import AnimatedTitle from "@/components/Animation/AnimatedTitle";

const slogan = "Đầu tư sinh lãi, an cư phát tài";
export default async function Home() {
  const news = await prisma.post.findMany({
    where: { isLatest: true },
  });
  // const newsData = [
  //   {
  //     id: 1,
  //     date: "03/01/2025",
  //     title: "KHÔNG KHÍ ĐÓN NĂM MỚI 2025 TẠI THÀNH PHỐ HỒ CHÍ MINH",
  //     image: "https://daiphuc.com.vn/uploads/z6160550143725_8cb5d910281717f4cb07bc26345225e3.jpg",
  //   },
  //   {
  //     id: 2,
  //     date: "03/01/2025",
  //     title: "NGƯỜI DÂN, DU KHÁCH NÔ NỨC CHECK-IN VƯỜN HOA HƯỚNG DƯƠNG LỚN NHẤT TPHCM",
  //     image: "https://daiphuc.com.vn/uploads/img-3508-9883-2918.jpg",
  //   },
  //   {
  //     id: 3,
  //     date: "31/12/2024",
  //     title: "VƯỜN HOA HƯỚNG DƯƠNG ĐẸP MÊ GIỮA LÒNG SÀI GÒN, DU KHÁCH NÁO NỨC CHECK-IN",
  //     image: "https://daiphuc.com.vn/uploads/htv9.jpg",
  //   },
  // ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[500px] md:h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920&auto=format&fit=crop"
            alt="Bất động sản"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            {/* <h1 className="text-3xl md:text-5xl font-bold text-white">
              Giải Pháp Bất Động Sản Toàn Diện
            </h1> */}
            <AnimatedTitle />
            <p className="text-lg text-white/90">
              Chúng tôi cung cấp các dịch vụ bất động sản chuyên nghiệp, từ mua
              bán đến tư vấn thiết kế xây dựng và bán nội thất cao cấp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/lien-he">
                  Liên hệ ngay
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Link href="/nganh-nghe">Khám phá dịch vụ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Về Chúng Tôi</h2>
              <p className="text-muted-foreground mb-4">
                Ngày 15/10/2011 Công ty cổ phần King real ra đời. Với sứ mệnh là
                cầu nối tuyệt vời nhất cho những sản phẩm bất động sản của quý
                khách hàng. Chúng tôi hoạt động với phương châm:Uy tín-Tận
                Tâm-Trung Thực & Đầy trách nhiệm...!!! Hy vọng sẽ đem đến cho
                quý khách hàng những sản phẩm để: Đầu tư sinh lãi!!! An cứ phát
                tài..!!
              </p>
              <p className="text-muted-foreground mb-6">
                Với đội ngũ nhân viên chuyên nghiệp và am hiểu thị trường, chúng
                tôi cam kết mang đến giải pháp bất động sản tối ưu cho từng
                khách hàng.
              </p>
              <Button asChild size="lg" className="bg-[#DDB52F]">
                <Link href="/gioi-thieu">Tìm hiểu thêm</Link>
              </Button>
            </div>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6LZpdzZikQ_iG7PXW2BTX7F4TqE8ApRhhXA&s"
                alt="Về chúng tôi"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dịch Vụ Nổi Bật</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ bất động sản chất lượng cao, đáp
              ứng mọi nhu cầu của khách hàng.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Building size={24} />
                </div>
                <CardTitle>Mua Bán Bất Động Sản</CardTitle>
                <CardDescription>
                  Dịch vụ mua bán bất động sản chuyên nghiệp với danh mục đa
                  dạng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi hỗ trợ khách hàng tìm kiếm, đánh giá và mua bán bất
                  động sản phù hợp với nhu cầu và ngân sách.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="gap-2 px-0 text-primary"
                >
                  <Link href="/nganh-nghe">
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Award size={24} />
                </div>
                <CardTitle>Tư Vấn Thiết Kế</CardTitle>
                <CardDescription>
                  Dịch vụ tư vấn thiết kế nội thất theo yêu cầu của khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Đội ngũ kiến trúc sư giàu kinh nghiệm sẽ giúp bạn thiết kế
                  không gian sống hoặc làm việc đẹp và tiện nghi.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="gap-2 px-0 text-primary"
                >
                  <Link href="/goc-tu-van/thiet-ke">
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Users size={24} />
                </div>
                <CardTitle>Tư Vấn Mua Bán Nội Thất</CardTitle>
                <CardDescription>
                  Dịch vụ tư vấn và cung cấp nội thất theo nhu cầu khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi giúp bạn lựa chọn nội thất phù hợp với không gian và
                  phong cách sống, đảm bảo chất lượng và giá trị.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="gap-2 px-0 text-primary"
                >
                  <Link href="/goc-tu-van/mua-ban-noi-that">
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Tin Tức Mới Nhất</h2>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/tin-tuc-su-kien">
                Xem tất cả
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((i) => (
              <Card key={i.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={` ${i.image}`}
                    alt={`Bài viết ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Newspaper size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      10/03/2024
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{`${i.title}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-sm text-muted-foreground line-clamp-2"
                    style={{ color: "black" }}
                  >
                    {`${i.description}`}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="ghost"
                    className="gap-2 px-0 text-primary"
                  >
                    <Link href={`/tin-tuc-su-kien/${i.slug}`}>
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

      <section
        className="py-16 text-primary-foreground"
        style={{ borderTop: "1px solid #e5e7eb" }}
      >
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Bạn Cần Tư Vấn?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Chúng tôi sẵn sàng hỗ trợ bạn mọi lúc mọi nơi. Liên hệ ngay để nhận
            tư vấn miễn phí!
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/lien-he">Liên hệ ngay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
