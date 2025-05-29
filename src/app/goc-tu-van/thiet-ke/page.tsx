import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  PenTool,
  Home,
  Building,
  Brush,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Tư Vấn Thiết Kế",
  description:
    "Dịch vụ tư vấn thiết kế nội thất chuyên nghiệp tại Bất Động Sản Dịch Vụ",
};

const designStyles = [
  {
    id: "hien-dai",
    title: "Hiện Đại",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
    description:
      "Phong cách thiết kế nội thất hiện đại với những đường nét đơn giản, tinh tế, sử dụng vật liệu và màu sắc hiện đại, tạo không gian sống tiện nghi và thoải mái.",
  },
  {
    id: "co-dien",
    title: "Cổ Điển",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop",
    description:
      "Phong cách thiết kế nội thất cổ điển với những đường nét tinh xảo, hoa văn phức tạp, sử dụng vật liệu cao cấp như gỗ, đá marble, mang đến không gian sống sang trọng và đẳng cấp.",
  },
  {
    id: "scandinavian",
    title: "Scandinavian",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop",
    description:
      "Phong cách thiết kế nội thất Scandinavian với tông màu sáng, chủ yếu là trắng, kết hợp với các vật liệu tự nhiên như gỗ, tạo không gian sống ấm áp, gần gũi với thiên nhiên.",
  },
  {
    id: "industrial",
    title: "Industrial",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1000&auto=format&fit=crop",
    description:
      "Phong cách thiết kế nội thất Industrial với việc sử dụng các vật liệu thô như bê tông, sắt, thép, tạo không gian sống mạnh mẽ, phá cách và đầy cá tính.",
  },
];

const designServices = [
  {
    icon: <Home className="h-8 w-8" />,
    title: "Thiết Kế Nội Thất Nhà Ở",
    description:
      "Dịch vụ thiết kế nội thất cho nhà ở, căn hộ, biệt thự với phong cách và không gian sống phù hợp với nhu cầu và sở thích của từng gia đình.",
    features: [
      "Tư vấn phong cách thiết kế",
      "Thiết kế mặt bằng, layout không gian",
      "Tư vấn màu sắc, vật liệu",
      "Thiết kế đồ nội thất theo yêu cầu",
      "Giám sát thi công",
    ],
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Thiết Kế Nội Thất Văn Phòng",
    description:
      "Dịch vụ thiết kế nội thất cho văn phòng, công ty với không gian làm việc chuyên nghiệp, hiện đại và tối ưu hóa hiệu quả công việc.",
    features: [
      "Tư vấn layout văn phòng",
      "Thiết kế không gian làm việc",
      "Thiết kế phòng họp, phòng giám đốc",
      "Tư vấn nội thất văn phòng",
      "Giám sát thi công",
    ],
  },
  {
    icon: <Brush className="h-8 w-8" />,
    title: "Thiết Kế Ngoại Thất",
    description:
      "Dịch vụ thiết kế ngoại thất cho nhà ở, công trình với kiến trúc đẹp, hiện đại và phù hợp với phong cách của chủ nhà.",
    features: [
      "Thiết kế mặt tiền, mặt đứng",
      "Thiết kế sân vườn, tiểu cảnh",
      "Tư vấn vật liệu hoàn thiện mặt ngoài",
      "Thiết kế chiếu sáng ngoại thất",
      "Giám sát thi công",
    ],
  },
];

const designProcess = [
  {
    icon: "01",
    title: "Tư Vấn & Khảo Sát",
    description:
      "Gặp gỡ, tư vấn và khảo sát hiện trạng để nắm bắt nhu cầu và mong muốn của khách hàng.",
  },
  {
    icon: "02",
    title: "Ý Tưởng Thiết Kế",
    description:
      "Đề xuất ý tưởng thiết kế, phong cách và layout không gian dựa trên nhu cầu của khách hàng.",
  },
  {
    icon: "03",
    title: "Thiết Kế Chi Tiết",
    description:
      "Thiết kế chi tiết các hạng mục nội thất, màu sắc, vật liệu và ánh sáng.",
  },
  {
    icon: "04",
    title: "Dự Toán Chi Phí",
    description:
      "Lập dự toán chi phí chi tiết cho toàn bộ công trình theo thiết kế đã được phê duyệt.",
  },
  {
    icon: "05",
    title: "Thi Công & Giám Sát",
    description:
      "Thi công và giám sát chất lượng, tiến độ công trình theo đúng thiết kế đã được phê duyệt.",
  },
  {
    icon: "06",
    title: "Nghiệm Thu & Bàn Giao",
    description:
      "Nghiệm thu và bàn giao công trình, đảm bảo chất lượng và sự hài lòng của khách hàng.",
  },
];

export default function ThietKePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1920&auto=format&fit=crop"
            alt="Tư Vấn Thiết Kế"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Tư Vấn Thiết Kế
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Dịch Vụ Tư Vấn Thiết Kế
              </h2>
              <p className="text-muted-foreground mb-4">
                Chúng tôi cung cấp dịch vụ tư vấn thiết kế nội - ngoại thất
                chuyên nghiệp, với đội ngũ kiến trúc sư giàu kinh nghiệm và đam
                mê. Chúng tôi cam kết mang đến không gian sống và làm việc đẹp,
                tiện nghi và phù hợp với nhu cầu của từng khách hàng.
              </p>
              <p className="text-muted-foreground mb-6">
                Với sự sáng tạo và am hiểu sâu sắc về thiết kế, chúng tôi sẽ
                biến ý tưởng của bạn thành hiện thực, tạo nên không gian sống và
                làm việc lý tưởng.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Đội ngũ kiến trúc sư giàu kinh nghiệm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Thiết kế sáng tạo, phù hợp với xu hướng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Tư vấn chi tiết, tận tâm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Giám sát thi công chuyên nghiệp</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/lien-he">Liên hệ tư vấn</Link>
              </Button>
            </div>
            <div className="relative h-[480px] rounded-lg overflow-hidden">
              <Image
                src="https://dogonoithathta.com/uploads/details/2021/02/images/1448351722-tu-van-thiet-ke-noi-that-tron-goi.png"
                alt="Tư vấn thiết kế"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Phong Cách Thiết Kế</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đa dạng các phong cách thiết kế, đáp ứng mọi
              nhu cầu và sở thích của khách hàng
            </p>
          </div>

          <Tabs defaultValue="hien-dai" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {designStyles.map((style) => (
                <TabsTrigger key={style.id} value={style.id}>
                  {style.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {designStyles.map((style) => (
              <TabsContent key={style.id} value={style.id} className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={style.image}
                      alt={style.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      Phong Cách {style.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {style.description}
                    </p>
                    <Button asChild>
                      <Link href="/lien-he">Tư vấn ngay</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Dịch vụ thiết kế */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dịch Vụ Thiết Kế</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đa dạng các dịch vụ thiết kế, từ nội thất nhà ở
              đến văn phòng và ngoại thất
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {designServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ArrowRight size={16} className="mt-1 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/lien-he">Tư vấn chi tiết</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình làm việc */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quy Trình Làm Việc</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quy trình làm việc chuyên nghiệp, minh bạch, đảm bảo sự hài lòng
              của khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designProcess.map((process, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {process.icon}
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{process.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-primary-foreground"
        style={{ borderTop: "1px solid #e5e7eb" }}
      >
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white mx-auto mb-6">
              <PenTool size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Bạn Cần Tư Vấn Thiết Kế?
            </h2>
            <p className="mb-8">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết và
              miễn phí về dịch vụ thiết kế. Chúng tôi cam kết mang đến không
              gian sống và làm việc đẹp, tiện nghi và phù hợp với nhu cầu của
              bạn.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/lien-he">Liên hệ ngay</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
