"use client";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">
          Access the world of
        </h1>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mt-2" style={{ fontFamily: 'var(--font-noto-serif)' }}>
          Artificial Intelligence.
        </h1>
        <p className="text-lg text-muted-foreground font-light mt-6">
          Access brings visibility to the systems you rely on every day.
        </p>
      </div>
    </div>
  );
}