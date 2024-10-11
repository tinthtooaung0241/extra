import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  useEffect(() => {
    const target = targetRef.current;
    const tooltip = tooltipRef.current;

    if (!target || !tooltip) return;

    const updatePosition = () => {
      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let x = 0;
      let y = 0;

      switch (position) {
        case "top":
          x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
          y = targetRect.top - tooltipRect.height - 10;
          break;
        case "bottom":
          x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
          y = targetRect.bottom + 10;
          break;
        case "left":
          x = targetRect.left - tooltipRect.width - 10;
          y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          break;
        case "right":
          x = targetRect.right + 10;
          y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
          break;
      }

      setCoords({ x, y });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [position, isVisible]);

  return (
    <div
      ref={targetRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onTouchStart={showTooltip}
      onTouchEnd={hideTooltip}
      className="inline-block"
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className="absolute z-10 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm dark:bg-gray-700"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
          }}
        >
          {text}
          <div
            className={`absolute h-2 w-2 rotate-45 transform bg-gray-900 dark:bg-gray-700 ${
              position === "top"
                ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                : position === "bottom"
                  ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  : position === "left"
                    ? "right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                    : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
}
