"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TOTAL_SPOTS = 1000;
const BASE_COUNT = 289; // starting point

function ProgressBar() {
  const [count, setCount] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // motion value for animating the number
  const motionCount = useMotionValue(0);
  const roundedCount = useTransform(motionCount, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wait list"),
      (snapshot) => {
        const userCount = snapshot.size;
        setCount(BASE_COUNT + userCount);
      },
      (error) => console.error("Error fetching users:", error)
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (count !== null && inView) {
      const controls = animate(motionCount, count, {
        duration: 1.2,
        ease: "easeInOut",
      });
      return controls.stop;
    }
  }, [count, inView, motionCount]);

  const percentage =
    count !== null ? Math.min((count / TOTAL_SPOTS) * 100, 100) : 0;

  return (
    <div style={{ width: "100%" }} ref={ref}>
      <h3 className="progress-title">Founding Member Progress</h3>

      {/* Progress Bar */}
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </div>

      {/* Count animation */}
      <p className="progress-text">
        <motion.span>{roundedCount}</motion.span>/{TOTAL_SPOTS} claimed
      </p>
    </div>
  );
}

export default ProgressBar;
