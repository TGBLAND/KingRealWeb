export interface Property {
  id: string;
  title: string;
  price: number; // in billion VND
  priceUnit: string;
  area: string; // m2
  address: string;
  createdAt: string;
  legal: string;
  type: string;
  balconies: number;
  bedrooms: number;
  bathrooms: number;
  directionBalcony: string;
  direction: string;
  pricePerM2: number;
  floors: number;
  images: string[];
  description: string;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "CHO THUÊ BIỆT THỰ CAO CẤP - VỪA HOÀN THIỆN - FULL NỘI THẤT",
    price: 12,
    priceUnit: "tỷ",
    area: "7 x 20",
    address:
      "Khu biệt thự The Park Garden, Phường Phú Mỹ, Quận 7 – khu vực an ninh, yên tĩnh, dân trí cao.",
    createdAt: "1 giờ trước",
    legal: "Đã đăng tải",
    type: "Nhà mặt tiền",
    balconies: 3,
    bedrooms: 4,
    bathrooms: 5,
    directionBalcony: "Đông nam",
    direction: "Đông nam",
    pricePerM2: 53.33,
    floors: 4,
    images: [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/7.jpg",
    ],
    description: `Bán nhà đường Liên Phường Quận 9 giá mềm nhất thị trường.

* Căn 1: Nhà KDC Xây Dựng 5 đường Liên Phường PLB.

- Diện tích đất: 90m (5m x 18m).

- Hướng ĐN. Đường thông 12m.

- Kết cấu: 1 trệt 2 lầu sân thượng DTSD 220m2.

- Gồm 1 sân đậu xe, PK, bếp, 4PN, 5WC.

- Đang làm hoàn công nhà.

- View Công Viên dự án, gần Siêu thị, cách Khu Công Nghệ Cao chỉ 1km.

- Giá bán: 12 tỷ thương lượng.

* Hiện tại công ty đang có nhiều sản phẩm đất nền, nhà phố, biệt thự sân vườn, shophouse tại TP Thủ Đức giá tốt.

* Quý khách hàng có nhu cầu xin liên hệ Mr Tuấn.

* Hotline: 0982.303.868 - 0902.232.268.`,
  },
];
