import Image from "next/image";
import { Check, Users, Award, Clock, Target } from "lucide-react";
import AnimatedCounter from "@/components/Animation/AnimatedCounter";
import AboutSection from "@/components/Animation/AnimationAboutSection";
export const metadata = {
  title: "Giới Thiệu",
  description:
    "Giới thiệu về công ty Bất Động Sản Dịch Vụ - đơn vị uy tín trong lĩnh vực bất động sản",
};

export default function GioiThieuPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1920&auto=format&fit=crop"
            alt="Giới thiệu"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Giới Thiệu
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>
      {/* <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src="./images/about-us.png"
                alt="Văn phòng công ty"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Về Chúng Tôi</h2>
              <p className="text-muted-foreground mb-5">
                Công ty King Real được thành lập vào năm 2011, với sứ mệnh cung
                cấp các dịch vụ bất động sản chất lượng cao, đáp ứng mọi nhu cầu
                của khách hàng. Trải qua hơn 14 năm phát triển, chúng tôi đã trở
                thành đơn vị uy tín hàng đầu trong lĩnh vực bất động sản tại
                Việt Nam.
              </p>
              <p className="text-muted-foreground mb-5">
                Chúng tôi tự hào cung cấp các dịch vụ đa dạng từ mua bán, cho
                thuê bất động sản, đến tư vấn thiết kế và cung cấp nội thất. Với
                đội ngũ chuyên viên giàu kinh nghiệm và am hiểu sâu sắc về thị
                trường, chúng tôi cam kết mang đến cho khách hàng những giải
                pháp tối ưu và hiệu quả nhất.
              </p>
              <p className="text-muted-foreground mb-5 italic ">
                "Khát khao lớn nhất của đời người là được sở hữu một mái ấm -
                một nơi gọi là Nhà. Để hiện thực hóa khát khao thiêng liêng ấy,
                chúng tôi ra đời với sứ mệnh trở thành chiếc cầu nối vững chắc,
                mang ngôi nhà từ người có đến người cần. Chúng tôi cam kết mang
                đến trải nghiệm nhanh chóng - gọn gàng - tiện lợi, với tinh thần
                vui vẻ và nhẹ nhàng nhất có thể."
              </p>
              <p className="text-muted-foreground">
                Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.
                Chúng tôi luôn nỗ lực không ngừng để cải thiện chất lượng dịch
                vụ và mang đến trải nghiệm tốt nhất cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <AboutSection />
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Tầm Nhìn</h3>
              <p className="text-muted-foreground mb-5">
                Trở thành công ty hàng đầu trong lĩnh vực cung cấp dịch vụ bất
                động sản tại Việt Nam, mang đến cho khách hàng những giải pháp
                toàn diện và chất lượng nhất.
              </p>
              <p className="text-muted-foreground">
                Chúng tôi mong muốn tạo ra một thương hiệu uy tín, đáng tin cậy,
                là địa chỉ lý tưởng cho mọi nhu cầu về bất động sản của khách
                hàng.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sứ Mệnh</h3>
              <p className="text-muted-foreground mb-5">
                Cung cấp các dịch vụ bất động sản chất lượng cao, đáp ứng mọi
                nhu cầu của khách hàng với sự chuyên nghiệp, tận tâm và hiệu
                quả.
              </p>
              <p className="text-muted-foreground">
                Chúng tôi cam kết mang đến những giải pháp tối ưu, góp phần nâng
                cao chất lượng cuộc sống và xây dựng môi trường sống tốt đẹp hơn
                cho cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Giá Trị Cốt Lõi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Những giá trị cốt lõi định hướng mọi hoạt động của công ty chúng
              tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Chất Lượng</h3>
              <p className="text-muted-foreground">
                Chúng tôi cam kết mang đến dịch vụ chất lượng cao nhất, đảm bảo
                sự hài lòng tuyệt đối của khách hàng.
              </p>
            </div>

            <div className="p-6 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Chuyên Nghiệp</h3>
              <p className="text-muted-foreground">
                Đội ngũ nhân viên chuyên nghiệp, am hiểu thị trường và luôn nỗ
                lực mang đến dịch vụ tốt nhất.
              </p>
            </div>

            <div className="p-6 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Tin Cậy</h3>
              <p className="text-muted-foreground">
                Xây dựng mối quan hệ lâu dài dựa trên sự tin cậy và minh bạch
                trong mọi giao dịch.
                <br />
                Sự hài lòng của khách hàng là niềm hạnh phúc của chúng tôi
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Thành Tựu</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Những con số ấn tượng đánh dấu chặng đường phát triển của chúng
              tôi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <AnimatedCounter
                end={14}
                className="text-4xl font-bold text-primary mb-2"
              />
              <p className="text-muted-foreground">Năm kinh nghiệm</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <AnimatedCounter
                end={999}
                className="text-4xl font-bold text-primary mb-2"
              />
              <p className="text-muted-foreground">Khách hàng</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <AnimatedCounter
                end={50}
                className="text-4xl font-bold text-primary mb-2"
              />
              <p className="text-muted-foreground">Dự án thành công</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-sm">
              <AnimatedCounter
                end={50}
                className="text-4xl font-bold text-primary mb-2"
              />
              <p className="text-muted-foreground">Nhân viên</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
