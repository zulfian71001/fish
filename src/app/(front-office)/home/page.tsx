import dynamic from "next/dynamic";
const Banner = dynamic(()=>import("@/components/front-office/Banner"))
import Navbar from "@/components/front-office/Navbar";
const Products = dynamic(()=>import("@/components/front-office/Products"))
const Footer = dynamic(()=>import("@/components/front-office/Footer"))

const Page = () => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full px-2 lg:px-10 flex flex-col">
        <Banner />
        <div>
          <div className="w-full flex flex-col items-center md:items-start">
            <h2 className="font-semibold text-4xl my-10">FEATURED PRODUCTS</h2>

            <Products />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
