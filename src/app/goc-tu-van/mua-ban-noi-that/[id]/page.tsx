import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/app/lib/db";

export const metadata = {
  title: "Tư Vấn Mua Bán Nội Thất",
  description:
    "Dịch vụ tư vấn mua bán nội thất chuyên nghiệp tại Bất Động Sản Dịch Vụ",
};

interface Params {
  id: string;
}

export default async function MuaBanNoiThatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const products = await prisma.product.findMany({
    where: { categoryId: (await params).id },
    include: { category: true },
  });

  const cate = await prisma.category.findMany({
    where: { id: (await params).id },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1920&auto=format&fit=crop"
            alt="Nội thất phòng khách"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {cate.map((i) => (
          <div className="container relative z-10 px-4 md:px-6" key={i.id}>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
              {i.name}
            </h1>
            <div className="w-20 h-1 bg-[#DDB52F]"></div>
          </div>
        ))}
      </section>
      <div className="container px-4 md:px-6 text-center">
        <h1 style={{ fontSize: "45px", fontWeight: "bold" }}>SẢN PHẨM</h1>
      </div>

      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ paddingTop: "2rem" }}
      >
        {products.map((pro) => (
          <Card key={pro.id}>
            <div className="relative h-64">
              <Image
                src={pro.image}
                alt={pro.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center font-bold">
                {pro.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
