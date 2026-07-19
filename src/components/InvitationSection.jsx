import { motion } from "framer-motion";
import Divider from "./Divider";
import { weddingContent } from "../content/weddingContent";
import "./InvitationSection.css";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function InvitationSection() {
  const { eyebrow, paragraphs, signature } = weddingContent.invitation;

  return (
    <section className="invitation-section" aria-label="Taklifnoma matni">
      <motion.div
        className="invitation-section__inner"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={item}>
          <Divider className="invitation-section__divider" />
        </motion.div>

        <motion.p variants={item} className="invitation-section__eyebrow">
          {eyebrow}
        </motion.p>

        {paragraphs.map((p, i) => (
          <motion.p key={i} variants={item} className="invitation-section__text">
            {p}
          </motion.p>
        ))}

        <motion.p variants={item} className="invitation-section__signature">
          {signature}
        </motion.p>
      </motion.div>
    </section>
  );
}
