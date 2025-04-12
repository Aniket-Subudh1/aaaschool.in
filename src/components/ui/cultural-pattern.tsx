"use client";

import { useEffect, useRef } from "react";

export default function CulturalPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Draw Odisha cultural patterns
    const drawPattern = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#f8f3e9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw temple-inspired patterns
      const patternSize = 60;
      const rows = Math.ceil(canvas.height / patternSize) + 1;
      const cols = Math.ceil(canvas.width / patternSize) + 1;

      // Draw subtle grid pattern
      ctx.globalAlpha = 0.05;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const offsetX = x * patternSize - patternSize / 2;
          const offsetY = y * patternSize - patternSize / 2;

          // Alternate between temple dome and lotus patterns
          if ((x + y) % 2 === 0) {
            drawTempleDome(ctx, offsetX, offsetY, patternSize * 0.8);
          } else {
            drawLotusPattern(ctx, offsetX, offsetY, patternSize * 0.8);
          }
        }
      }

      // Draw larger decorative elements
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 200 + 100;

        if (i % 2 === 0) {
          drawOdishaWheel(ctx, x, y, size);
        } else {
          drawTempleDome(ctx, x, y, size);
        }
      }
    };

    // Draw temple dome pattern
    const drawTempleDome = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      ctx.fillStyle = "#8b1a1a";
      ctx.beginPath();

      // Base of dome
      ctx.moveTo(x - size / 2, y + size / 4);
      ctx.lineTo(x + size / 2, y + size / 4);

      // Dome curve
      ctx.quadraticCurveTo(x, y - size / 2, x - size / 2, y + size / 4);

      ctx.fill();

      // Top ornament
      ctx.beginPath();
      ctx.arc(x, y - size / 4, size / 10, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw lotus pattern (common in Odisha art)
    const drawLotusPattern = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      const petalCount = 8;
      const innerRadius = size / 4;
      const outerRadius = size / 2;

      ctx.fillStyle = "#d4b483";

      // Draw petals
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const nextAngle = ((i + 1) / petalCount) * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, innerRadius, angle, nextAngle);
        ctx.arc(x, y, outerRadius, nextAngle, angle, true);
        ctx.closePath();
        ctx.fill();
      }

      // Center circle
      ctx.beginPath();
      ctx.arc(x, y, innerRadius / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#8b1a1a";
      ctx.fill();
    };

    // Draw Konark wheel inspired pattern
    const drawOdishaWheel = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      const spokes = 12;
      const outerRadius = size / 2;
      const innerRadius = size / 4;

      ctx.strokeStyle = "#8b1a1a";
      ctx.lineWidth = size / 30;

      // Outer circle
      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.beginPath();
      ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Spokes
      for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        const startX = x + Math.cos(angle) * innerRadius;
        const startY = y + Math.sin(angle) * innerRadius;
        const endX = x + Math.cos(angle) * outerRadius;
        const endY = y + Math.sin(angle) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    drawPattern();

    // Redraw on resize
    window.addEventListener("resize", drawPattern);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("resize", drawPattern);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
