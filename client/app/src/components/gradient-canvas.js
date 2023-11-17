import { useEffect, useRef } from 'react';
import { Gradient } from './Gradient.js';

export const GradientCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new Gradient();
      gradient.initGradient(canvasRef.current);
    }
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      id="gradient-canvas" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1 
      }}
    ></canvas>
  );
};
