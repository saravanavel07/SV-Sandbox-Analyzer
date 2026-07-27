import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulseFactor: number;
  type: 'molecule' | 'star' | 'dust';
}

interface MoleculeBond {
  p1Idx: number;
  p2Idx: number;
  length: number;
}

export const SpaceMoleculeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color Palette for Multi-Spectrum Space Molecules
    const colors = [
      { fill: '#10B981', glow: 'rgba(16, 185, 129, 0.6)' }, // Emerald
      { fill: '#06B6D4', glow: 'rgba(6, 182, 212, 0.6)' },  // Cyan
      { fill: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.6)' }, // Purple
      { fill: '#EC4899', glow: 'rgba(236, 72, 153, 0.6)' }, // Pink
      { fill: '#F59E0B', glow: 'rgba(245, 158, 11, 0.6)' }, // Amber
      { fill: '#3B82F6', glow: 'rgba(59, 130, 246, 0.6)' }, // Blue
    ];

    // Spawn Particles & Molecule Nodes
    const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorObj = colors[Math.floor(Math.random() * colors.length)];
      const typeRand = Math.random();
      const type = typeRand > 0.4 ? 'molecule' : typeRand > 0.15 ? 'star' : 'dust';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: type === 'molecule' ? Math.random() * 3.5 + 2 : type === 'star' ? Math.random() * 2 + 1 : Math.random() * 1.2 + 0.5,
        color: colorObj.fill,
        glowColor: colorObj.glow,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseFactor: Math.random() * Math.PI * 2,
        type,
      });
    }

    // Pre-calculate molecule clusters / bonds
    const bonds: MoleculeBond[] = [];
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].type !== 'molecule') continue;
      for (let j = i + 1; j < particles.length; j++) {
        if (particles[j].type !== 'molecule') continue;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && Math.random() > 0.5) {
          bonds.push({ p1Idx: i, p2Idx: j, length: dist });
        }
      }
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep Space Galactic Gradient Background
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0C0E17');
      bgGrad.addColorStop(0.5, '#080A12');
      bgGrad.addColorStop(1, '#040508');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Molecular Bonds (Connected lines with glowing gradient)
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].type !== 'molecule') continue;

        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].type !== 'molecule') continue;

          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 140;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            
            // Multi-color molecular bond line
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Render Floating Space Particles & Molecules
      particles.forEach((p, idx) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        p.pulseFactor += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulseFactor) * 0.8;

        // Outer Glow for Molecules and Major Stars
        if (p.type === 'molecule') {
          ctx.save();
          ctx.shadowColor = p.glowColor;
          ctx.shadowBlur = 12;

          // Draw Outer Orbit Ring for select molecules
          if (idx % 3 === 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, currentRadius * 3.2, 0, Math.PI * 2);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.25;
            ctx.setLineDash([3, 3]);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1.0;

            // Electron orbiting atom
            const orbitAngle = time * 1.5 + idx;
            const orbitX = p.x + Math.cos(orbitAngle) * currentRadius * 3.2;
            const orbitY = p.y + Math.sin(orbitAngle) * currentRadius * 3.2;

            ctx.beginPath();
            ctx.arc(orbitX, orbitY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
          }

          // Atom Nucleus / Molecule Node
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, currentRadius), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          ctx.restore();
        } else if (p.type === 'star') {
          // Twinkling Space Star
          const starAlpha = 0.3 + Math.sin(p.pulseFactor * 2) * 0.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.8, p.radius), 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.max(0.1, Math.min(1, starAlpha));
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else {
          // Floating Space Dust
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.25;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ background: 'transparent' }}
    />
  );
};
