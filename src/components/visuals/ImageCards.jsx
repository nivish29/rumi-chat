import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCards({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {title && <h2 className="text-xl mb-4">{title}</h2>}

      <div className="relative flex justify-center items-center sm:h-[400px] h-[240px]">
        <AnimatePresence initial={false}>
          {[0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % images.length;
            const isCenter = offset === 1;
            const isLeft = offset === 0;
            const isRight = offset === 2;

            return (
              <motion.div
                key={index}
                initial={{
                  scale: isCenter ? 1 : 0.8,
                  x: isLeft ? '-30%' : isRight ? '30%' : 0,
                  zIndex: isCenter ? 10 : 1,
                  rotate: isLeft ? -10 : isRight ? 10 : 0,
                }}
                animate={{
                  scale: isCenter ? 1 : 0.8,
                  x: isLeft ? '-30%' : isRight ? '30%' : 0,
                  zIndex: isCenter ? 10 : 1,
                  rotate: isLeft ? -10 : isRight ? 10 : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className={`
                  absolute
                  ${isCenter ? "md:w-64 sm:w-56 w-48 md:h-96 sm:h-80 h-60" : "md:w-64 sm:w-56 w-48 md:h-80 sm:h-72 h-60"}

                  rounded-2xl
                  overflow-hidden
                  shadow-2xl
                  shadow-black
                   group
                  
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={images[index]?.url || "/placeholder.svg"}
                  alt={images[index]?.alt || ""}
                  className="w-full h-full object-cover transition-all duration-300"
                  loading="lazy"
                />
                 {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-start p-4"
                  >
                    <p className="text-white text-lg font-semibold">
                      {images[index]?.caption}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={prevImage} 
          className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <button 
          onClick={nextImage} 
          className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

