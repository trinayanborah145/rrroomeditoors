import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  start = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [value, setValue] = useState(start);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const countRef = useRef({ start, value: start, end, duration });

  useEffect(() => {
    countRef.current = { start, value, end, duration };
  }, [start, value, end, duration]);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (countRef.current.duration * 1000), 1);
      
      const currentValue = progress * (countRef.current.end - countRef.current.start) + countRef.current.start;
      setValue(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(updateCount);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {suffix}
    </span>
  );
};

export default CountUp;