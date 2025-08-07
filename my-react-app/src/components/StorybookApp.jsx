import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Interactive story‑book with page‑turn animations.
 * Clicking the right half of a page flips forward; the left half flips back.
 */
export default function StorybookApp() {
  // 👉 1. Define your pages. Update paths / narrative as needed.
  const pages = [
    {
      id: 0,
      title: "Piraye and the City of Numbers – Cover",
      image: "/images/cover.png", // replace with actual file in /public/images
      text: "", // cover has no text
    },
    {
      id: 1,
      title: "Chapter 1 – A Boring Afternoon",
      image: "/images/ch1.png", // first chapter illustration
      text: `Piraye slumped into her favourite arm‑chair, bored of her math homework and the cartoons looping on TV. She longed for something—anything—to make numbers feel alive…`,
    },
    // 🚀 Add further chapters here
  ];

  // 👉 2. State for current page & direction of the turn (forward = 1, back = -1)
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  /**
   * Turn the page with a given direction.
   * Safely clamps to the first/last page.
   */
  const paginate = (dir) => {
    setDirection(dir);
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return 0;
      if (next >= pages.length) return pages.length - 1;
      return next;
    });
  };

  // 👉 3. Framer‑motion page‑turn variants.
  const flipVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: dir > 0 ? "left center" : "right center",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "center center",
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: dir > 0 ? "right center" : "left center",
    }),
  };

  const page = pages[index];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 p-4 select-none">
      <AnimatePresence custom={direction} mode="wait" initial={false}>
        <motion.div
          key={page.id}
          custom={direction}
          variants={flipVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full max-w-xl aspect-w-3 aspect-h-4 max-h-screen"
        >
          {/* Actual page */}
          {/* Actual page */}
          <div className="overflow-hidden rounded-none shadow-2xl bg-white aspect-w-3 aspect-h-4 border-4 border-green-500">
            {/* Illustration */}
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-full object-cover z-0"
            />
            {/* Narrative text (if any) */}
            {page.text && (
              <div className="p-6 space-y-4 font-serif leading-relaxed">
                {page.text.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Invisible click‑zones for page navigation */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10 bg-red-500 opacity-50"
            onClick={() => paginate(-1)}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10 bg-blue-500 opacity-50"
            onClick={() => paginate(1)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}