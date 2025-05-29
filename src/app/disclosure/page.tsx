import ModernDisclosureHeader from "@/components/disclosure/modern-disclosure-header";
import DisclosureContent from "@/components/disclosure/disclosure-content";


export const metadata = {
  title: "Mandatory Disclosure | Aryavart Ancient Academy",
  description:
    "Mandatory public disclosure of Aryavart Ancient Academy as per CBSE requirements, including general information, documents, academic results, staff details, and infrastructure.",
};

export default function MandatoryDisclosurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f3e9] to-[#f0e6d2]">
      <ModernDisclosureHeader />
      <DisclosureContent />
    </main>
  );
}
