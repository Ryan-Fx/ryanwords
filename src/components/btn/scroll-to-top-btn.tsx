"use client";

import { Button } from "@/components/ui/button";
import { FaCircleUp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import useScrollToTop from "./use-scroll-to-top";
export default function ScrollToTopButton() {
  const { visible, scrollToTop } = useScrollToTop(300);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-7 right-6 lg:bottom-14 lg:right-10 animate-bounce z-50"
        >
          <Button
            className="rounded-full size-9 border border-white bg-pink-500 hover:bg-pink-600 flex items-center justify-center cursor-pointer"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaCircleUp className="text-white" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
