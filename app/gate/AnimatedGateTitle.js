"use client";

import { useEffect, useState } from "react";

export default function AnimatedGateTitle() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  useEffect(() => {
    const firstLineText = "Prepare Smart";
    const secondLineText = "Crack GATE 2027";

    let charIndex = 0;
    let charIndex2 = 0;
    let t1, t2;

    const typeFirstLine = () => {
      if (charIndex < firstLineText.length) {
        setLine1(firstLineText.substring(0, charIndex + 1));
        charIndex++;
        t1 = setTimeout(typeFirstLine, 75);
      } else {
        t2 = setTimeout(typeSecondLine, 200);
      }
    };

    const typeSecondLine = () => {
      if (charIndex2 < secondLineText.length) {
        setLine2(secondLineText.substring(0, charIndex2 + 1));
        charIndex2++;
        t2 = setTimeout(typeSecondLine, 75);
      }
    };

    const startTimer = setTimeout(typeFirstLine, 500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <h1 className="hero-title text-center">
      {line1 || "\u00A0"}<br />
      <span className="title-gradient text-orange-400 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
        {line2 || "\u00A0"}
      </span>
    </h1>
  );
}
