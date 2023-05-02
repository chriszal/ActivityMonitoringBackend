import { useEffect } from 'react';
import { Gradient } from './Gradient.js';

export const GradientCanvas = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  return null;
};
