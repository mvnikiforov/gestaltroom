const blobs = [
  {
    className: '-top-20 -right-20 w-64 h-64 bg-sage-200/30 blur-3xl',
    delay: '0s',
  },
  {
    className: 'top-1/3 -left-32 w-80 h-80 bg-warm-200/30 blur-3xl',
    delay: '2s',
  },
  {
    className: 'bottom-20 right-10 w-48 h-48 bg-sage-100/40 blur-2xl',
    delay: '4s',
  },
  {
    className: '-bottom-10 left-1/4 w-60 h-60 bg-warm-100/50 blur-3xl',
    delay: '3s',
  },
];

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {blobs.map((blob) => (
        <div
          key={blob.delay}
          className={`absolute rounded-full float-animation motion-reduce:animate-none ${blob.className}`}
          style={{ animationDelay: blob.delay }}
        />
      ))}
    </div>
  );
}