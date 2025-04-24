import ModernDisclosureHeader from "@/components/disclosure/modern-disclosure-header";
import DisclosureContent from "@/components/disclosure/disclosure-content";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata = {
  title: "Mandatory Disclosure | Aryavart Ancient Academy",
  description:
    "Mandatory public disclosure of Aryavart Ancient Academy as per CBSE requirements, including general information, documents, academic results, staff details, and infrastructure.",
};

export default function MandatoryDisclosurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f3e9] to-[#f0e6d2]">
      <NavBar />
      <ModernDisclosureHeader />
      <DisclosureContent />
      <Footer />
    </main>
  );
}
