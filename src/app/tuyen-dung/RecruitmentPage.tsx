"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Clock,
  MapPin,
  Building,
  DollarSign,
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
import prisma from "../lib/db";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// const jobPositions = [
//   {
//     id: 1,
//     title: 'Chuyên Viên Tư Vấn Bất Động Sản',
//     location: 'TP. Hồ Chí Minh',
//     type: 'Toàn thời gian',
//     level: 'Nhân viên',
//     salary: '15 - 30 triệu',
//     description: 'Tư vấn, môi giới và hỗ trợ khách hàng trong quá trình mua bán, cho thuê bất động sản.',
//     requirements: [
//       'Tốt nghiệp Đại học/Cao đẳng',
//       'Có kỹ năng giao tiếp và thuyết phục tốt',
//       'Năng động, nhiệt tình và chịu được áp lực công việc',
//       'Ưu tiên có kinh nghiệm trong lĩnh vực bất động sản',
//     ],
//     benefits: [
//       'Mức lương cạnh tranh + hoa hồng không giới hạn',
//       'Môi trường làm việc chuyên nghiệp, năng động',
//       'Cơ hội thăng tiến và phát triển bản thân',
//       'Chế độ bảo hiểm đầy đủ theo quy định',
//     ]
//   },
//   {
//     id: 2,
//     title: 'Kiến Trúc Sư Nội Thất',
//     location: 'TP. Hồ Chí Minh',
//     type: 'Toàn thời gian',
//     level: 'Nhân viên',
//     salary: '20 - 35 triệu',
//     description: 'Thiết kế và tư vấn nội thất cho các dự án bất động sản và khách hàng cá nhân.',
//     requirements: [
//       'Tốt nghiệp Đại học chuyên ngành Kiến trúc, Thiết kế nội thất',
//       'Thành thạo các phần mềm thiết kế: AutoCAD, SketchUp, 3Ds Max, V-ray, Photoshop',
//       'Có khả năng sáng tạo và thẩm mỹ tốt',
//       'Ít nhất 2 năm kinh nghiệm trong lĩnh vực thiết kế nội thất',
//     ],
//     benefits: [
//       'Môi trường làm việc sáng tạo, hiện đại',
//       'Được đào tạo và nâng cao trình độ chuyên môn',
//       'Lương thưởng cạnh tranh theo năng lực',
//       'Cơ hội tham gia các dự án lớn',
//     ]
//   },
//   {
//     id: 3,
//     title: 'Nhân Viên Marketing Online',
//     location: 'TP. Hồ Chí Minh',
//     type: 'Toàn thời gian',
//     level: 'Nhân viên',
//     salary: '12 - 18 triệu',
//     description: 'Lên kế hoạch và triển khai các chiến dịch marketing online cho công ty.',
//     requirements: [
//       'Tốt nghiệp Đại học chuyên ngành Marketing, Truyền thông',
//       'Có kiến thức về SEO, Google Ads, Facebook Ads',
//       'Kỹ năng viết content marketing tốt',
//       'Ưu tiên có kinh nghiệm trong lĩnh vực bất động sản',
//     ],
//     benefits: [
//       'Môi trường làm việc năng động, sáng tạo',
//       'Cơ hội học hỏi và phát triển kỹ năng marketing',
//       'Lương thưởng cạnh tranh theo năng lực',
//       'Được hưởng đầy đủ chế độ theo quy định',
//     ]
//   },
//   {
//     id: 4,
//     title: 'Chuyên Viên Pháp Lý Bất Động Sản',
//     location: 'TP. Hồ Chí Minh',
//     type: 'Toàn thời gian',
//     level: 'Chuyên viên',
//     salary: '25 - 40 triệu',
//     description: 'Tư vấn và xử lý các vấn đề pháp lý liên quan đến bất động sản.',
//     requirements: [
//       'Tốt nghiệp Đại học chuyên ngành Luật',
//       'Có kiến thức chuyên sâu về luật đất đai, bất động sản',
//       'Ít nhất 3 năm kinh nghiệm trong lĩnh vực pháp lý bất động sản',
//       'Kỹ năng đàm phán, giải quyết vấn đề tốt',
//     ],
//     benefits: [
//       'Mức lương cạnh tranh theo năng lực',
//       'Môi trường làm việc chuyên nghiệp',
//       'Cơ hội thăng tiến cao',
//       'Chế độ phúc lợi đầy đủ',
//     ]
//   },
// ];
type JobPosition = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  level: string;
  requirements: string;
  benefits: string;
  salary: string;
  createdAt: string;
  updatedAt: string;
};
export default function TuyenDungPage() {
  const [JobPositions, setJobPositions] = useState<JobPosition[]>([]);
  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await fetch("/api/jobPosition");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch post");
      }

      setJobPositions(result.data);
      console.log(result.data);
    } catch (err) {
      toast.error("Failed to fetch post");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop"
            alt="Tuyển Dụng"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Tuyển Dụng
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Cơ Hội Nghề Nghiệp</h2>
              <p className="text-muted-foreground mb-4">
                Tại King Real, chúng tôi luôn tìm kiếm những nhân tài để cùng
                phát triển và đóng góp vào sự thành công của công ty. Chúng tôi
                cung cấp môi trường làm việc chuyên nghiệp, năng động và nhiều
                cơ hội thăng tiến.
              </p>
              <p className="text-muted-foreground mb-6">
                Nếu bạn đam mê lĩnh vực bất động sản, marketing muốn phát triển
                sự nghiệp trong một môi trường năng động và chuyên nghiệp, hãy
                tham gia cùng chúng tôi.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building size={20} className="text-primary" />
                    <h3 className="font-medium">Môi Trường Làm Việc</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Chuyên nghiệp, năng động và cơ hội phát triển
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-primary" />
                    <h3 className="font-medium">Phúc lợi</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <p>
                        Mức lương cạnh tranh, thưởng theo hiệu quả công việc
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <p>
                        Bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp
                        theo quy định
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <p>Bảo hiểm sức khỏe, khám sức khỏe định kỳ</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <p>Du lịch, team building hàng năm</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <p>Đào tạo và phát triển năng lực chuyên môn</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      <p>Cơ hội thăng tiến rõ ràng</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://careers.langgo.edu.vn/storage/images/2022/10/05/moi-truong-lam-viec-ly-tuong.webp"
                alt="Môi trường làm việc"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vị trí đang tuyển */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vị Trí Đang Tuyển</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi đang tìm kiếm những ứng viên tài năng cho các vị trí sau
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {JobPositions.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <BriefcaseBusiness size={18} className="text-primary" />
                    <CardTitle>{job.title}</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap size={14} />
                      <span>{job.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Mô tả công việc:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Yêu cầu:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="mt-1.5 text-primary" />
                        <span>{job.requirements}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Quyền lợi:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-start gap-2">
                        <ArrowRight size={12} className="mt-1.5 text-primary" />
                        <span>{job.benefits}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/lien-he">Ứng tuyển ngay</Link>
                  </Button>
                </CardFooter>
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
          <h2 className="text-3xl font-bold mb-4">Tham Gia Cùng Chúng Tôi</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Nếu bạn không tìm thấy vị trí phù hợp, hãy gửi hồ sơ của bạn cho
            chúng tôi. Chúng tôi luôn tìm kiếm những người tài năng để gia nhập
            đội ngũ.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/lien-he">Gửi hồ sơ</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
