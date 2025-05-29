"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center" ref={ref}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[16/9] rounded-lg overflow-hidden"
          >
            <Image
              src="/images/about-us.png"
              alt="Văn phòng công ty"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Về Chúng Tôi</h2>
            <p className="text-muted-foreground mb-5">
              Công ty King Real được thành lập vào năm 2011, với sứ mệnh cung
              cấp các dịch vụ bất động sản chất lượng cao, đáp ứng mọi nhu cầu
              của khách hàng. Trải qua hơn 14 năm phát triển, chúng tôi đã trở
              thành đơn vị uy tín hàng đầu trong lĩnh vực bất động sản tại Việt
              Nam.
            </p>
            <p className="text-muted-foreground mb-5">
              Chúng tôi tự hào cung cấp các dịch vụ đa dạng từ mua bán, cho thuê
              bất động sản, đến tư vấn thiết kế và cung cấp nội thất. Với đội
              ngũ chuyên viên giàu kinh nghiệm và am hiểu sâu sắc về thị trường,
              chúng tôi cam kết mang đến cho khách hàng những giải pháp tối ưu
              và hiệu quả nhất.
            </p>
            <p className="text-muted-foreground mb-5 italic">
              "Khát khao lớn nhất của đời người là được sở hữu một mái ấm - một
              nơi gọi là Nhà. Để hiện thực hóa khát khao thiêng liêng ấy, chúng
              tôi ra đời với sứ mệnh trở thành chiếc cầu nối vững chắc, mang
              ngôi nhà từ người có đến người cần. Chúng tôi cam kết mang đến
              trải nghiệm nhanh chóng - gọn gàng - tiện lợi, với tinh thần vui
              vẻ và nhẹ nhàng nhất có thể."
            </p>
            <p className="text-muted-foreground">
              Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi.
              Chúng tôi luôn nỗ lực không ngừng để cải thiện chất lượng dịch vụ
              và mang đến trải nghiệm tốt nhất cho khách hàng.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
