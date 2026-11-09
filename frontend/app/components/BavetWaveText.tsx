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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Offscreen buffer canvas to hold unwarped crisp vector text
    if (!bufferRef.current) {
      bufferRef.current = document.createElement("canvas");
    }
    const buffer = bufferRef.current;
    buffer.width = 1800;
    buffer.height = 850;
    canvas.width = 1800;
    canvas.height = 850;

    const bCtx = buffer.getContext("2d", { alpha: true });
    if (!bCtx) return;

    function drawSourceText() {
      if (!bCtx) return;
      bCtx.clearRect(0, 0, buffer.width, buffer.height);
      bCtx.textAlign = "center";
      bCtx.textBaseline = "middle";

      // Authentic tall condensed display font matching Bavet
      bCtx.font = 'normal 260px "Bebas Neue", var(--font-bebas), "Anton", Impact, sans-serif';

      const cx = buffer.width / 2;
      const yTop = 330;
      const yBottom = 525;

      // Top Line: Hollow Outline ("THE ULTIMATE") with fine, crisp border
      bCtx.lineWidth = 3.2;
      bCtx.strokeStyle = "#C33130";
      bCtx.strokeText(line1, cx, yTop);

      // Bottom Line: Solid Fill ("CRUNCH")
      bCtx.fillStyle = "#C33130";
      bCtx.fillText(line2, cx, yBottom);
    }

    // Initial draw
    drawSourceText();

    // Redraw once Google Fonts finish loading to ensure Bebas Neue renders
    if (typeof document !== "undefined" && document.fonts) {
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
    const speed = 0.028; // Lazy, continuous floating banner wave motion

    function renderWave() {
      if (!canvas || !buffer) return;
      const renderCtx = canvas.getContext("2d");
      if (!renderCtx) return;

      renderCtx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < canvas.width; x += sliceWidth) {
        const wave = Math.sin(x * frequency + time);
        const yOffset = wave * amplitudeY;
        const scaleY = 1 + Math.cos(x * frequency + time) * amplitudeScale;

        const destHeight = canvas.height * scaleY;
        const destY = (canvas.height - destHeight) / 2 + yOffset;

        renderCtx.drawImage(
          buffer,
          x,
          0,
          sliceWidth,
          buffer.height, // Source vertical slice
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
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
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
        className="w-full max-w-[1180px] h-auto drop-shadow-[0_12px_24px_rgba(195,49,48,0.12)]"
        style={{
          aspectRatio: "1800 / 850",
          transform: "perspective(1000px) rotateX(4.5deg) rotateY(-6.5deg) rotateZ(-1.8deg)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      />
    </div>
  );
}

