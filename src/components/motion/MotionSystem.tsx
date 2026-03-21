"use client";

import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface FadeInProps {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export function FadeIn({ delay = 0, duration = 300, children, className }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: shouldReduceMotion ? 0 : duration / 1000, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function SlideIn({ direction = 'up', distance = 'md', children, delay = 0, className }: SlideInProps) {
  const shouldReduceMotion = useReducedMotion();
  const distances = { sm: 8, md: 16, lg: 24, xl: 32 };
  
  const directions = {
    left: { x: -distances[distance], y: 0 },
    right: { x: distances[distance], y: 0 },
    up: { x: 0, y: distances[distance] },
    down: { x: 0, y: -distances[distance] },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...(shouldReduceMotion ? {} : directions[direction]) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 100, className }: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay / 1000
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface NumberCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function NumberCounter({ value, duration = 2000, prefix = '', suffix = '', className }: NumberCounterProps) {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrent(value);
      return;
    }
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCurrent(value * easeProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCurrent(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, shouldReduceMotion]);

  // Format based on whether natural value is an integer or float
  const displayValue = value % 1 === 0 ? Math.round(current) : current.toFixed(1);

  return <span className={className}>{prefix}{displayValue}{suffix}</span>;
}

export function LoadingSkeleton({ width = '100%', height = '20px', className }: { width?: string, height?: string, className?: string }) {
  return (
    <motion.div
      style={{ width, height }}
      className={`bg-gray-200 rounded ${className || ''}`}
      animate={{
        background: [
          'rgb(229, 231, 235)',
          'rgb(243, 244, 246)',
          'rgb(229, 231, 235)'
        ]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
