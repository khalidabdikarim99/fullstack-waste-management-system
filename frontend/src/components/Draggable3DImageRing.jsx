// src/components/Draggable3DImageRing.jsx
import React, { useState, useEffect, useRef } from 'react';

const Draggable3DImageRing = ({
  images,
  width = 300,
  imageDistance = 400,
  perspective = 1000,
  hoverOpacity = 0.8,
  animationDuration = 1,
  staggerDelay = 0.1,
  ringClassName = '',
  imageClassName = '',
  autoRotate = true,
  rotateSpeed = 1,
  imageWidth = 96,
  imageHeight = 96
}) => {
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const ringRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  const angleStep = (2 * Math.PI) / images.length;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setAngle(prevAngle => prevAngle + deltaX * 0.01);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const animateRotation = (timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isDragging && autoRotate) {
      setAngle(prevAngle => prevAngle + 0.002 * rotateSpeed * deltaTime);
    }
    animationRef.current = requestAnimationFrame(animateRotation);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateRotation);
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging, autoRotate, rotateSpeed]);

  return (
    <div
      className={`relative ${ringClassName}`}
      style={{
        perspective: `${perspective}px`,
        width: `${width}px`,
        height: `${width}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={ringRef}
    >
      {images.map((image, index) => {
        const imgAngle = angle + index * angleStep;
        const x = Math.sin(imgAngle) * imageDistance;
        const z = Math.cos(imgAngle) * imageDistance;
        const scale = 0.8 + (z / (imageDistance * 3)); // Reduced scaling effect

        return (
          <div
            key={index}
            className={`absolute ${imageClassName}`}
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
              transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
              opacity: hoverOpacity,
              transition: `transform ${animationDuration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * staggerDelay}s`,
              zIndex: Math.floor(z),
            }}
          >
            <img
              src={image}
              alt={`Transformation ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Draggable3DImageRing;