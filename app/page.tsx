import Hero from "@/components/home/Hero";
import ProductShowcase from "@/components/home/ProductShowcase";
import FeaturedComponents from "@/components/home/FeaturedComponents";
import FeaturedApis from "@/components/home/FeaturedApis";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <FeaturedComponents />
      <FeaturedApis />
      <Categories />
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
