import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import DovesOverlay from "./DovesOverlay";
import Divider from "./Divider";
import { weddingContent } from "../content/weddingContent";
import "./DateSection.css";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function DateSection() {
  const { day, month, year, weekday, time, venue, address } = weddingContent.event;

  return (
    <section className="date-section" aria-label="To'y sanasi">
      <DovesOverlay />

      <motion.div
        className="date-section__inner"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={item} className="date-section__medallion">
          <span className="date-section__day">{day}</span>
          <span className="date-section__month">
            {month} {year}
          </span>
        </motion.div>

        <motion.p variants={item} className="date-section__weekday">
          {weekday}
        </motion.p>

        <motion.div variants={item}>
          <Divider className="date-section__divider" />
        </motion.div>

        <motion.div variants={item} className="date-section__details">
          <span className="date-section__detail">
            <Clock size={16} strokeWidth={1.5} />
            {time}
          </span>
          <span className="date-section__detail">
            <MapPin size={16} strokeWidth={1.5} />
            {venue}
          </span>
          <span className="date-section__address">{address}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
