import HeroSection from "./HeroSection";
import InvitationSection from "./InvitationSection";
import DateSection from "./DateSection";
import "./ScrollFlow.css";
import Footer from "./Footer";

export default function ScrollFlow() {
  return (
    <div className="scroll-flow">
      <HeroSection />
      <InvitationSection />
      <DateSection />
      <Footer/>
    </div>
  );
}
