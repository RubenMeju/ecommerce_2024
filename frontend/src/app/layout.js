import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar/NavBar";
import Providers from "@/providers/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tienda online",
  description: "Tienda online dedicada a la venta de equipos informáticos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToastContainer />

          <NavBar />

          <div className="mt-20">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
