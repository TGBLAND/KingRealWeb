import { Metadata } from "next";
import TuyenDungPage from "./RecruitmentPage"; // client wrapper

export const metadata = {
  title: "Tuyển Dụng",
  description: "Thông tin tuyển dụng và cơ hội nghề nghiệp tại King Real",
};

export default function Page() {
  return <TuyenDungPage />;
}
