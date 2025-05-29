"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function LienHePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (!result.success) {
        throw new Error(result.error || "Failed");
      }

      setTimeout(() => {
        toast.success(
          "Thông tin của bạn đã được gửi thành công chúng tôi sẽ liên hệ trong thời gian sớm nhất!"
        );
        reset();
        setIsSubmitting(false);
      }, 1500);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
    setIsSubmitting(true);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Địa chỉ",
      content: "88 Hoàng Quốc Việt, Phường Phú Mỹ, Quận 7, TPHCM",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Điện thoại",
      content: "0947 394 466",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "KingReal@gmail.com",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Giờ làm việc",
      content: "Thứ Hai - Thứ Bảy: 7:30 - 17:30",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[300px] md:h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="./images/contact.png"
            alt="Liên Hệ"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Liên Hệ
          </h1>
          <div className="w-20 h-1 bg-[#DDB52F]"></div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h2>
              <p className="text-muted-foreground mb-7">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
                chúng tôi qua các thông tin bên dưới hoặc điền vào form liên hệ.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Gửi Tin Nhắn</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Họ và tên
                        </label>
                        <Input
                          id="name"
                          placeholder="Nguyễn Văn A"
                          {...register("name", {
                            required: "Vui lòng nhập họ tên",
                          })}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@gmail.com"
                          {...register("email", {
                            required: "Vui lòng nhập email",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email không hợp lệ",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Số điện thoại
                        </label>
                        <Input
                          id="phone"
                          placeholder="0987 654 321"
                          {...register("phone", {
                            required: "Vui lòng nhập số điện thoại",
                          })}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Chủ đề
                        </label>
                        <Input
                          id="subject"
                          placeholder="Tư vấn bất động sản"
                          {...register("subject", {
                            required: "Vui lòng nhập chủ đề",
                          })}
                        />
                        {errors.subject && (
                          <p className="text-xs text-red-500">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Nội dung
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Nhập nội dung tin nhắn của bạn"
                        rows={5}
                        {...register("message", {
                          required: "Vui lòng nhập nội dung",
                        })}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="h-[600px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.271692424313!2d106.73028307583802!3d10.713515060349376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175259a78ca7af3%3A0x1e04b432ca07847a!2zODggSG_DoG5nIFF14buRYyBWaeG7h3QsIFBow7ogTeG7uSwgUXXhuq1uIDcsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1744076654607!5m2!1svi!2s"
                width="600"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
