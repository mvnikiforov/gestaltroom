import { useState } from 'react';
import type { Psychologist } from '../data/psychologists';

interface PsychologistPhotoProps {
  psychologist: Psychologist;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PsychologistPhoto({ psychologist }: PsychologistPhotoProps) {
  const [isBroken, setIsBroken] = useState(false);
  const { src, alt, width, height } = psychologist.photo;

  if (isBroken) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-warm-200 flex items-center justify-center"
      >
        <span className="font-serif text-6xl sm:text-7xl text-warm-600/60 select-none">
          {initialsOf(psychologist.name)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      width={width}
      height={height}
      onError={() => setIsBroken(true)}
      className="w-full h-full object-cover"
    />
  );
}