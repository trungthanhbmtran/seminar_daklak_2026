import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "Đăng Ký Tham Dự Hội Thảo - Tỉnh Đắk Lắk",
  description: "Hệ thống đăng ký đại biểu tham dự hội thảo: Chuyển đổi số và phát triển hệ sinh thái doanh nghiệp bền vững tỉnh Đắk Lắk.",
  keywords: ["Hội thảo", "Đắk Lắk", "Chuyển đổi số", "Đăng ký đại biểu", "Doanh nghiệp bền vững"],
  openGraph: {
    title: "Đăng Ký Tham Dự Hội Thảo - Tỉnh Đắk Lắk",
    description: "Hệ thống đăng ký đại biểu tham dự hội thảo: Chuyển đổi số và phát triển hệ sinh thái doanh nghiệp bền vững tỉnh Đắk Lắk.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
