import BackendCheck from "@/components/BackendCheck";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import NavBarHome from "@/components/NavBarHome";

export default function Home() {
  return (
    <>
    <NavBarHome/>
    <HeroSection/>
    <BackendCheck/>
    <Footer/>
    </>
  );
}