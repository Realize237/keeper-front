import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const PriceRangeSlider = ({
  minPrice = 0,
  maxPrice = 1000,
  onChange,
}: {
  minPrice: number;
  maxPrice: number;
  onChange: (range: [number, number]) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(300);

  const leftX = useMotionValue(0);
  const rightX = useMotionValue(300);

  const springLeftX = useSpring(leftX, { stiffness: 400, damping: 40 });
  const springRightX = useSpring(rightX, { stiffness: 400, damping: 40 });

  const minDisplay = useTransform(
    leftX,
    [0, containerWidth],
    [minPrice, maxPrice]
  );
  const maxDisplay = useTransform(
    rightX,
    [0, containerWidth],
    [minPrice, maxPrice]
  );

  const [currentRange, setCurrentRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      rightX.set(width);
    }
  }, [rightX]);

  const handleLeftDrag = () => {
    const currentLeft = leftX.get();
    const currentRight = rightX.get();
    const minGap = 24;

    if (currentLeft >= currentRight - minGap) {
      leftX.set(currentRight - minGap);
    }

    const min = Math.round(minDisplay.get());
    const max = Math.round(maxDisplay.get());
    setCurrentRange([min, max]);
    if (onChange) {
      onChange([min, max]);
    }
  };

  const handleRightDrag = () => {
    const currentLeft = leftX.get();
    const currentRight = rightX.get();
    const minGap = 24;

    if (currentRight <= currentLeft + minGap) {
      rightX.set(currentLeft + minGap);
    }

    const min = Math.round(minDisplay.get());
    const max = Math.round(maxDisplay.get());
    setCurrentRange([min, max]);
    if (onChange) {
      onChange([min, max]);
    }
  };

  return (
    <div className="w-full max-w-md rounded-xl px-4 shadow-sm">
      <div className="flex justify-between mb-4 font-mono text-lg font-bold">
        <span>${currentRange[0]}</span>
        <span>${currentRange[1]}</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-2 bg-surface/50 rounded-full"
      >
        <motion.div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: springLeftX,
            width: useTransform(
              [springLeftX, springRightX],
              (values: number[]) => Math.max(0, values[1] - values[0])
            ),
          }}
        />

        <motion.div
          drag="x"
          dragMomentum={false}
          dragConstraints={{
            left: 0,
            right: containerWidth,
          }}
          dragElastic={0}
          onDrag={handleLeftDrag}
          onDragEnd={handleLeftDrag}
          style={{ x: leftX }}
          className="absolute top-1/2 -mt-3 -ml-3 w-6 h-6 bg-primary rounded-full cursor-grab active:cursor-grabbing z-20 shadow-md"
        />

        <motion.div
          drag="x"
          dragMomentum={false}
          dragConstraints={{
            left: 0,
            right: containerWidth,
          }}
          dragElastic={0}
          onDrag={handleRightDrag}
          onDragEnd={handleRightDrag}
          style={{ x: rightX }}
          className="absolute top-1/2 -mt-3 -ml-3 w-6 h-6 bg-primary rounded-full cursor-grab active:cursor-grabbing z-10 shadow-md"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
