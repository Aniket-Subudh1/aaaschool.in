import AboutHero from "@/components/about/about-hero";
import OurHistory from "@/components/about/our-history";
import TopSchool from "@/components/about/top-school";
import MissionVision from "@/components/about/mission-vision";

import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";
import HeaderAcademyLogo from "@/components/ui/header-academylogo";

export const metadata = {
  title: "About Us | Aryavart Ancient Academy",
  description:
    "Learn about Aryavart Ancient Academy, a premier CBSE school in Bhubaneswar, Odisha with a focus on holistic education and Indian cultural values.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f3e9] overflow-x-hidden">
      <NavBar />
      <AboutHero />
      <HeaderAcademyLogo />
      <OurHistory />
      <TopSchool />
      <MissionVision />
      <Footer />
    </main>
  );
}
