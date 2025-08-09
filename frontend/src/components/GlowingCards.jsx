// src/components/GlowingCards.jsx
import React, { useEffect, useRef, useState } from 'react';

// Color palette for glow effects
export const colorPalette = [
  '#FF6B6B', // Coral
  '#4ECDC4', // Tiffany Blue
  '#45B7D1', // Sky Blue
  '#FFBE0B', // Amber
  '#FB5607', // Orange
  '#8338EC', // Purple
  '#3A86FF', // Azure
  '#FF006E'  // Pink
];

// Glowing Card Component
export const GlowingCard = ({ 
  children, 
  className = "", 
  glowColor = colorPalette[Math.floor(Math.random() * colorPalette.length)],
  ...props 
}) => {
  return (
    <div
      className={`relative flex-1 min-w-[16rem] p-8 rounded-3xl text-white transition-all duration-500 ease-out hover:scale-105 ${className}`}
      style={{ 
        backgroundColor: `${glowColor}20`,
        border: `1px solid ${glowColor}50`,
        boxShadow: `0 4px 30px ${glowColor}20`,
        backdropFilter: 'blur(8px)'
      }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at center, ${glowColor}30, transparent 70%)`
        }}
      />
      {children}
    </div>
  );
};

// Glowing Cards Wrapper
export const GlowingCards = ({
  children,
  className = "",
  enableGlow = true,
  glowRadius = 25,
  glowOpacity = 0.6,
  animationDuration = 600,
  gap = "2rem",
  maxWidth = "80rem",
  padding = "2rem",
  responsive = true,
}) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableGlow || !containerRef.current || !overlayRef.current) return;

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableGlow]);

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        '--gap': gap,
        '--max-width': maxWidth,
        '--padding': padding,
        '--glow-radius': `${glowRadius}px`,
        '--animation-duration': `${animationDuration}ms`,
      }}
    >
      <div
        ref={containerRef}
        className="relative max-w-[var(--max-width)] mx-auto"
        style={{ padding: 'var(--padding)' }}
      >
        <div className={`flex items-stretch justify-center flex-wrap gap-[var(--gap)] ${responsive ? 'flex-col md:flex-row' : ''}`}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                glowColor: colorPalette[index % colorPalette.length]
              });
            }
            return child;
          })}
        </div>

        {enableGlow && (
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(var(--glow-radius) at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 80%)`,
              mask: 'linear-gradient(black, transparent)'
            }}
          />
        )}
      </div>
    </div>
  );
};
