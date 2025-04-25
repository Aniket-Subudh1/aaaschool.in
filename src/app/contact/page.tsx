import ContactHero from "@/components/contact/contact-hero";
import ContactInfo from "@/components/contact/contact-info";
import InteractiveMap from "@/components/contact/interactive-map";
import FeedbackSection from "@/components/ui/feedback-section";
import FAQ from "@/components/contact/faq";
import Footer from "@/components/ui/footer";

export const metadata = {
  title: "Contact Us | Aryavart Ancient Academy",
  description:
    "Get in touch with Aryavart Ancient Academy. We're here to answer your questions and provide information about admissions, academics, and more.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f3e9]">
      <ContactHero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <ContactInfo />
          <InteractiveMap />
        </div>
        <FeedbackSection />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
