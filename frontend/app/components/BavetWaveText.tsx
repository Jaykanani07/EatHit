"use client";

import React, { useRef, useEffect } from "react";

interface BavetWaveTextProps {
  className?: string;
  style?: React.CSSProperties;
  line1?: string;
  line2?: string;
}

export default function BavetWaveText({
  className = "",
  style = {},
  line1 = "THE ULTIMATE",
  line2 = "CRUNCH",
}: BavetWaveTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fixed high-resolution canvas coordinates
    const CANVAS_WIDTH = 2000;
    const CANVAS_HEIGHT = 900;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Offscreen buffer canvas to hold unwarped crisp vector text
    if (!bufferRef.current) {
      bufferRef.current = document.createElement("canvas");
    }
    const buffer = bufferRef.current;
    buffer.width = CANVAS_WIDTH;
    buffer.height = CANVAS_HEIGHT;

    const bCtx = buffer.getContext("2d", { alpha: true });
    if (!bCtx) return;

    function drawSourceText() {
      if (!bCtx) return;
      bCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      bCtx.textAlign = "center";
      bCtx.textBaseline = "middle";

      // Authentic tall condensed display font matching Bavet
      bCtx.font = 'normal 280px "Bebas Neue", "Anton", Impact, sans-serif';

      const cx = CANVAS_WIDTH / 2;
      const yTop = 330;
      const yBottom = 570;

      // Top Line: Hollow Outline ("THE ULTIMATE") with fine, crisp border
      bCtx.lineWidth = 3.6;
      bCtx.strokeStyle = "#C33130";
      bCtx.strokeText(line1, cx, yTop);

      // Bottom Line: Solid Fill ("CRUNCH")
      bCtx.fillStyle = "#C33130";
      bCtx.fillText(line2, cx, yBottom);
    }

    // Initial draw (falls back to Impact if web font is downloading)
    drawSourceText();

    // Redraw as soon as Bebas Neue or Anton finishes loading
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.load('280px "Bebas Neue"').then(() => {
        drawSourceText();
      });
      document.fonts.ready.then(() => {
        drawSourceText();
      });
    }

    // Continuous Sine-Wave (Flag-Ripple) Text Distortion Parameters
    let time = 0;
    const sliceWidth = 2; // Width of each vertical strip in px
    const amplitudeY = 18; // Vertical wave displacement (flag ripple)
    const amplitudeScale = 0.038; // 3D depth expansion/contraction
    const frequency = 0.005; // Wave width across the letters
    const speed = 0.03; // Smooth continuous waving banner motion

    function renderWave() {
      if (!canvas || !buffer) return;
      const renderCtx = canvas.getContext("2d");
      if (!renderCtx) return;

      renderCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (let x = 0; x < CANVAS_WIDTH; x += sliceWidth) {
        const wave = Math.sin(x * frequency + time);
        const yOffset = wave * amplitudeY;
        const scaleY = 1 + Math.cos(x * frequency + time) * amplitudeScale;

        const destHeight = CANVAS_HEIGHT * scaleY;
        const destY = (CANVAS_HEIGHT - destHeight) / 2 + yOffset;

        renderCtx.drawImage(
          buffer,
          x,
          0,
          sliceWidth,
          CANVAS_HEIGHT, // Source vertical slice
          x,
          destY,
          sliceWidth,
          destHeight // Warped destination slice
        );
      }

      time += speed;
      animRef.current = requestAnimationFrame(renderWave);
    }

    renderWave();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [line1, line2]);

  return (
    <div
      className={`relative w-full flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{
        ...style,
        perspective: "1000px",
      }}
    >
      {/* Screen reader & SEO accessibility */}
      <h2 className="sr-only">
        {line1} {line2}
      </h2>

      {/* 2D Canvas with continuous Sine-Wave flag ripple and subtle 3D poster tilt */}
      <canvas
        ref={canvasRef}
        className="w-full max-w-[1200px] h-auto drop-shadow-[0_16px_32px_rgba(195,49,48,0.12)]"
        style={{
          aspectRatio: "2000 / 900",
          transform: "perspective(1000px) rotateX(4deg) rotateY(-6deg) rotateZ(-1.5deg)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      />
    </div>
  );
}
