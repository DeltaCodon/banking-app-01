"use client";

import CountUp from "react-countup";
import React from "react";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <p className="w-full">
      <CountUp
        duration={1.75}
        end={amount}
        decimal="."
        decimals={2}
        prefix="$"
      />
    </p>
  );
};

export default AnimatedCounter;
