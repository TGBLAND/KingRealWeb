import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  Home,
  Briefcase,
  PenTool,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedSection from "@/components/Animation/AnimationNganhNghePage";

export const metadata = {
  title: "Ngành Nghề",
  description:
    "Các ngành nghề và dịch vụ mà công ty chúng tôi cung cấp trong lĩnh vực bất động sản",
};

const services = [
  {
    id: 1,
    icon: <Building className="h-8 w-8" />,
    title: "Mua Bán Bất Động Sản",
    description:
      "Dịch vụ mua bán bất động sản với danh mục đa dạng từ nhà ở, căn hộ, đất nền đến bất động sản thương mại.",
    image:
      "https://image.tienphong.vn/w645/Uploaded/2024/wpxlldxwp/2024_07_14/vaymunha-1660-2851.jpeg",
    features: [
      "Tư vấn mua bán nhà phổ, đất nền, căn hộ",
      "Hỗ trợ thủ tục pháp lý",
      "Cung cấp thông tin thị trường",
      "Môi giới bất động sản",
    ],
  },
  {
    id: 2,
    icon: <Home className="h-8 w-8" />,
    title: "Cho Thuê Bất Động Sản",
    description:
      "Dịch vụ cho thuê bất động sản đa dạng từ căn hộ, nhà ở đến văn phòng và mặt bằng thương mại.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Cho thuê căn hộ, nhà ở",
      "Cho thuê văn phòng",
      "Cho thuê mặt bằng thương mại",
      "Quản lý tài sản cho thuê",
      "Tư vấn giá thuê hợp lý",
    ],
  },
  {
    id: 3,
    icon: <Briefcase className="h-8 w-8" />,
    title: "Tư Vấn Đầu Tư",
    description:
      "Dịch vụ tư vấn đầu tư bất động sản giúp khách hàng đưa ra quyết định đầu tư hiệu quả.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Phân tích thị trường",
      "Đánh giá tiềm năng đầu tư",
      "Lập kế hoạch đầu tư",
      "Tư vấn dòng tiền và lợi nhuận",
      "Quản lý danh mục đầu tư",
    ],
  },
  {
    id: 4,
    icon: <PenTool className="h-8 w-8" />,
    title: "Tư Vấn Thiết Kế",
    description:
      "Dịch vụ tư vấn thiết kế nội - ngoại thất theo yêu cầu của khách hàng.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Thiết kế nội thất nhà ở",
      "Thiết kế nội thất văn phòng",
      "Thiết kế ngoại thất",
      "Tư vấn vật liệu và màu sắc",
      "Giám sát thi công",
    ],
  },
  {
    id: 5,
    icon: <DollarSign className="h-8 w-8" />,
    title: "Tư Vấn Mua Bán Nội Thất",
    description: "Dịch vụ tư vấn và cung cấp nội thất theo nhu cầu khách hàng.",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Tư vấn lựa chọn nội thất",
      "Cung cấp nội thất theo yêu cầu",
      "Đánh giá chất lượng nội thất",
      "Tư vấn phong cách nội thất",
      "Bảo hành và bảo trì nội thất",
    ],
  },
  {
    id: 6,
    icon: <Users className="h-8 w-8" />,
    title: "Quản Lý Bất Động Sản",
    description:
      "Dịch vụ quản lý bất động sản toàn diện, giúp tối ưu hóa giá trị tài sản.",
    image:
      "https://static1.cafeland.vn/cafelandnew/hinh-anh/2020/11/09/154/property-management4.jpg",
    features: [
      "Quản lý tòa nhà",
      "Quản lý cho thuê",
      "Bảo trì và sửa chữa",
      "Quản lý hóa đơn",
      "Báo cáo định kỳ",
    ],
  },
];

export default function NganhNghePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop"
            alt="Ngành Nghề"
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
            Ngành Nghề
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
            <p className="text-muted-foreground">
              Chúng tôi cung cấp đa dạng các dịch vụ bất động sản chất lượng
              cao, đáp ứng mọi nhu cầu của khách hàng từ mua bán, cho thuê, đến
              tư vấn thiết kế và cung cấp nội thất.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container px-4 md:px-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`mb-16 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } flex flex-col lg:flex-row gap-12 items-center`}
            >
              <AnimatedSection
                direction={index % 2 === 0 ? "left" : "right"}
                className="w-full lg:w-1/2"
              >
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>

              {/* Text side */}
              <AnimatedSection
                direction={index % 2 === 0 ? "right" : "left"}
                className="lg:w-1/2"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ArrowRight size={16} className="mt-1 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.id === 4 && (
                    <Button asChild>
                      <Link href="/goc-tu-van/thiet-ke">Tìm hiểu thêm</Link>
                    </Button>
                  )}
                  {service.id === 5 && (
                    <Button asChild>
                      <Link href="/goc-tu-van/mua-ban-noi-that">
                        Tìm hiểu thêm
                      </Link>
                    </Button>
                  )}
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-primary-foreground"
        style={{ borderTop: "1px solid #e5e7eb" }}
      >
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Cần Hỗ Trợ?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và tìm
            hiểu thêm về các dịch vụ của chúng tôi.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/lien-he">Liên hệ ngay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
