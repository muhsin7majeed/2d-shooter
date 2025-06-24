import React, { useEffect, useRef } from 'react';

interface StarfieldBackgroundProps {
  starCount?: number;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
  starCount = 100,
  children,
  className,
  contentClassName,
}) => {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starfield = starfieldRef.current;
    if (!starfield) return;

    starfield.innerHTML = '';

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${2 + Math.random() * 20}s`;
      starfield.appendChild(star);
    }
  }, [starCount]);

  return (
    <div className={`starfield-wrapper ${className}`}>
      <div className="starfield" ref={starfieldRef} />
      <div className={`starfield-content ${contentClassName}`}>{children}</div>
    </div>
  );
};

export default StarfieldBackground;
