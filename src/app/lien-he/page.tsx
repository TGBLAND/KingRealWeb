import { Metadata } from "next";
import LienHePage from "./LienHePage";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất về dịch vụ của chúng tôi.",
};

export default function Page() {
  return <LienHePage />;
}
