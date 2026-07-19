import HeroSection from "./HeroSection";
import InvitationSection from "./InvitationSection";
import DateSection from "./DateSection";
import "./ScrollFlow.css";

export default function ScrollFlow() {
  return (
    <div className="scroll-flow">
      <HeroSection />
      <InvitationSection />
      <DateSection />
    </div>
  );
}
