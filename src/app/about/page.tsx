import AboutHero from "@/components/about/about-hero";
import OurHistory from "@/components/about/our-history";
import TopSchool from "@/components/about/top-school";
import OurFaculty from "@/components/about/our-faculty";
import MissionVision from "@/components/about/mission-vision";
import SchoolCommittee from "@/components/about/school-committee";
import OurApproach from "@/components/about/our-approach";
import OurDream from "@/components/about/our-dream";
import OurValues from "@/components/about/our-values";
import LocationMap from "@/components/about/location-map";
import SocialConnect from "@/components/about/social-connect";
import SectionConnector from "@/components/about/section-connector";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

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

      <OurHistory />
      <SectionConnector type="curve" />

      <TopSchool />
      <SectionConnector type="wave" />

      <OurFaculty />
      <SectionConnector type="zigzag" />

      <MissionVision />
      <SectionConnector type="curve" inverted />

      <SchoolCommittee />
      <SectionConnector type="wave" />

      <OurApproach />
      <SectionConnector type="temple" />

      <OurDream />
      <SectionConnector type="curve" />

      <OurValues />
      <SectionConnector type="zigzag" />

      <LocationMap />
      <SectionConnector type="temple" inverted />

      <SocialConnect />
      <Footer />
    </main>
  );
}
