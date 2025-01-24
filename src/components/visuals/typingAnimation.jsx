import { motion } from "framer-motion";
import { useTypingEffect } from "./useTypingEffect";

export const TypingAnimation = ({ text, typingSpeed = 50, className = "" }) => {
  const displayedText = useTypingEffect(text, typingSpeed);

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="inline-block w-0.5 h-5 ml-0.5 bg-current align-middle"
      />
    </div>
  );
};
