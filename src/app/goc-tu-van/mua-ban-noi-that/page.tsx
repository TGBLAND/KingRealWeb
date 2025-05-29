import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ShoppingBag,
  BadgeCheck,
  Award,
  Sofa,
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
  title: "Tư Vấn Mua Bán Nội Thất",
  description:
    "Dịch vụ tư vấn mua bán nội thất chuyên nghiệp tại Bất Động Sản Dịch Vụ",
};

const furnitureCategories = [
  {
    id: "phong-khach",
    title: "Nội Thất Phòng Khách",
    image: "https://v-italy.vn/pictures/catalog/news/sofa-cuborosso-libeco.jpg",
    description:
      "Các sản phẩm nội thất cho phòng khách như sofa, bàn trà, kệ tivi, tủ trang trí,...",
  },
  {
    id: "phong-ngu",
    title: "Nội Thất Phòng Ngủ",
    image:
      "https://www.lanha.vn/wp-content/uploads/2023/07/thiet-ke-noi-that-phong-ngu-bs5.jpeg.webp",
    description:
      "Các sản phẩm nội thất cho phòng ngủ như giường, tủ quần áo, bàn trang điểm, kệ đầu giường,...",
  },
  {
    id: "phong-bep",
    title: "Nội Thất Phòng Bếp",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop",
    description:
      "Các sản phẩm nội thất cho phòng bếp như tủ bếp, bàn ăn, ghế ăn, kệ bếp,...",
  },
  {
    id: "phong-lam-viec",
    title: "Nội Thất Phòng Làm Việc",
    image:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000&auto=format&fit=crop",
    description:
      "Các sản phẩm nội thất cho phòng làm việc như bàn làm việc, ghế văn phòng, kệ sách,...",
  },
];

const furnitureServices = [
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "Tư Vấn Mua Sắm Nội Thất",
    description:
      "Dịch vụ tư vấn mua sắm nội thất phù hợp với không gian sống và ngân sách của khách hàng.",
    features: [
      "Tư vấn lựa chọn nội thất phù hợp",
      "Tư vấn phối màu, phối cảnh",
      "Tư vấn về chất liệu, độ bền",
      "Tư vấn thương hiệu uy tín",
      "Hỗ trợ mua sắm trực tiếp",
    ],
  },
  {
    icon: <BadgeCheck className="h-8 w-8" />,
    title: "Cung Cấp Nội Thất",
    description:
      "Dịch vụ cung cấp nội thất chất lượng cao, đa dạng mẫu mã và phong cách.",
    features: [
      "Cung cấp nội thất nhập khẩu",
      "Cung cấp nội thất nội địa chất lượng",
      "Đa dạng mẫu mã, phong cách",
      "Giá cả cạnh tranh",
      "Bảo hành sản phẩm",
    ],
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Đánh Giá Chất Lượng Nội Thất",
    description:
      "Dịch vụ đánh giá chất lượng nội thất giúp khách hàng lựa chọn sản phẩm tốt nhất.",
    features: [
      "Đánh giá chất lượng vật liệu",
      "Đánh giá độ bền, tuổi thọ",
      "Đánh giá tính thẩm mỹ",
      "Tư vấn giá trị sản phẩm",
      "Tư vấn bảo dưỡng, bảo trì",
    ],
  },
];

const furnitureAdvantages = [
  {
    title: "Chất Lượng Đảm Bảo",
    description:
      "Chúng tôi cung cấp các sản phẩm nội thất chất lượng cao, đảm bảo độ bền và tính thẩm mỹ.",
  },
  {
    title: "Đa Dạng Mẫu Mã",
    description:
      "Đa dạng mẫu mã, phong cách nội thất đáp ứng mọi nhu cầu và sở thích của khách hàng.",
  },
  {
    title: "Giá Cả Cạnh Tranh",
    description:
      "Chúng tôi cam kết cung cấp sản phẩm với giá cả cạnh tranh, phù hợp với ngân sách của khách hàng.",
  },
  {
    title: "Dịch Vụ Chuyên Nghiệp",
    description:
      "Đội ngũ tư vấn viên chuyên nghiệp, tận tâm, hỗ trợ khách hàng lựa chọn sản phẩm phù hợp nhất.",
  },
  {
    title: "Bảo Hành Uy Tín",
    description:
      "Chế độ bảo hành uy tín, hỗ trợ khách hàng xử lý các vấn đề về sản phẩm nhanh chóng, hiệu quả.",
  },
  {
    title: "Giao Hàng Tận Nơi",
    description:
      "Dịch vụ giao hàng tận nơi, lắp đặt tại nhà, giúp khách hàng tiết kiệm thời gian và công sức.",
  },
];

export default async function MuaBanNoiThatPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1920&auto=format&fit=crop"
            alt="Tư Vấn Mua Bán Nội Thất"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Tư Vấn Mua Bán Nội Thất
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Dịch Vụ Tư Vấn Mua Bán Nội Thất
              </h2>
              <p className="text-muted-foreground mb-5">
                Chúng tôi cung cấp dịch vụ tư vấn và cung cấp nội thất chất
                lượng cao, đáp ứng mọi nhu cầu của khách hàng. Với đội ngũ tư
                vấn viên chuyên nghiệp, chúng tôi sẽ giúp bạn lựa chọn những sản
                phẩm nội thất phù hợp với không gian sống và ngân sách.
              </p>
              <p className="text-muted-foreground mb-5">
                Chúng tôi cam kết mang đến những sản phẩm nội thất chất lượng
                cao, đa dạng mẫu mã và phong cách, giúp tô điểm cho không gian
                sống của bạn.
              </p>
              <ul className="space-y-2 mb-7">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Tư vấn chuyên nghiệp, tận tâm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Cung cấp nội thất chất lượng cao</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Đa dạng mẫu mã, phong cách</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="mt-1 text-primary" />
                  <span>Giá cả cạnh tranh, hợp lý</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/lien-he">Liên hệ tư vấn</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop"
                alt="Tư vấn mua bán nội thất"
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
            <h2 className="text-3xl font-bold mb-4">Danh Mục Nội Thất</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đa dạng các sản phẩm nội thất cho mọi không
              gian sống từ phòng khách, phòng ngủ, phòng bếp đến phòng làm việc.
            </p>
          </div>

          <Tabs defaultValue="phong-khach" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {furnitureCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.title}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {furnitureCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.title}
                className="mt-0"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                    <a href="#">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    </a>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {category.description}
                    </p>
                    <Button asChild>
                      <Link href={"/lien-he"}>Liên hệ tư vấn</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đa dạng các dịch vụ liên quan đến nội thất, từ
              tư vấn mua sắm đến cung cấp và đánh giá chất lượng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {furnitureServices.map((service, index) => (
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

      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại Sao Chọn Chúng Tôi?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Những ưu điểm vượt trội của dịch vụ tư vấn và cung cấp nội thất
              của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furnitureAdvantages.map((advantage, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{advantage.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
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
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white mx-auto mb-6">
              <Sofa size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Bạn Cần Tư Vấn Nội Thất?
            </h2>
            <p className="mb-8">
              Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn chi tiết và
              miễn phí về các sản phẩm nội thất. Chúng tôi cam kết mang đến
              những sản phẩm chất lượng cao, phù hợp với không gian sống và ngân
              sách của bạn.
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
