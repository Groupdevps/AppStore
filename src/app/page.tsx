import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductList from "@/components/ProductList";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection />
      <FeaturesSection />
      <ProductList />
    </main>
  );
}

