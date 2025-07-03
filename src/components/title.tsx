import { motion } from "motion/react";

const Title = () => {
  return (
    <motion.div
      transition={{
        duration: 0.4,
      }}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-title my-10 text-4xl md:text-8xl"
    >
      CHAOSIFY
    </motion.div>
  );
};

export default Title;
