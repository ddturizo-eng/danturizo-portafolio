interface BackgroundEffectsProps {
  count?: number;
}

export function BackgroundEffects({ count = 2 }: BackgroundEffectsProps) {
  const positions = [
    { top: 'top-1/3', left: 'right-1/4', size: 'w-[500px] h-[500px]' },
    { top: 'bottom-1/3', left: 'left-1/4', size: 'w-[400px] h-[400px]' },
  ];

  return (
    <>
      {Array.from({ length: Math.min(count, positions.length) }).map((_, i) => (
        <div
          key={i}
          className={`absolute ${positions[i].top} ${positions[i].left} ${positions[i].size} bg-white/5 rounded-full blur-3xl pointer-events-none`}
        />
      ))}
    </>
  );
}
