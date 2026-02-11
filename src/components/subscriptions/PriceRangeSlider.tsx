import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const PriceRangeSlider = ({
  minPrice = 0,
  maxPrice = 1000,
  onChange,
  initialRange,
}: {
  minPrice: number;
  maxPrice: number;
  onChange: (range: [number, number]) => void;
  initialRange?: [number, number];
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

  const [currentRange, setCurrentRange] = useState(
    initialRange || [minPrice, maxPrice]
  );

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);

      if (initialRange) {
        const leftPos =
          ((initialRange[0] - minPrice) / (maxPrice - minPrice)) * width;
        const rightPos =
          ((initialRange[1] - minPrice) / (maxPrice - minPrice)) * width;
        leftX.set(leftPos);
        rightX.set(rightPos);
        setCurrentRange(initialRange);
      } else {
        rightX.set(width);
      }
    }
  }, [rightX, leftX, initialRange, minPrice, maxPrice]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const oldWidth = containerWidth;

        if (newWidth !== oldWidth) {
          const currentMin = Math.round(minDisplay.get());
          const currentMax = Math.round(maxDisplay.get());

          setContainerWidth(newWidth);

          const leftPos =
            ((currentMin - minPrice) / (maxPrice - minPrice)) * newWidth;
          const rightPos =
            ((currentMax - minPrice) / (maxPrice - minPrice)) * newWidth;

          leftX.set(leftPos);
          rightX.set(rightPos);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [
    containerWidth,
    leftX,
    rightX,
    minPrice,
    maxPrice,
    minDisplay,
    maxDisplay,
  ]);

  const handleLeftDrag = () => {
    const currentLeft = leftX.get();
    const currentRight = rightX.get();
    const minGap = 1;

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
    const minGap = 1;

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

      <div ref={containerRef} className="relative h-2 bg-white/50 rounded-full">
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
          className="absolute top-1/2 -mt-3 -ml-3 w-6 h-6 bg-primary rounded-full cursor-grab active:cursor-grabbing shadow-md hover:z-30 active:z-30"
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2 }}
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
          className="absolute top-1/2 -mt-3 -ml-3 w-6 h-6 bg-primary rounded-full cursor-grab active:cursor-grabbing shadow-md hover:z-30 active:z-30"
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2 }}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
