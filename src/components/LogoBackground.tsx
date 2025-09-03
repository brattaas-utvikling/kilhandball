import React from "react";

type Props = {
  children?: React.ReactNode;
  imageUrl: string; // kan være .png, .jpg eller .svg
  opacity?: number;
  blur?: boolean;
  className?: string;
  tint?: string; // tailwind gradient classes, eks: "from-black/70 to-transparent"
};

export default function LogoBackground({
  children,
  imageUrl,
  opacity = 0.15,
  blur = false,
  className = "",
  tint,
}: Props) {
  return (
    <div className={`relative w-full h-screen ${className}`}>
      {/* Background image */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          blur ? "blur-sm" : ""
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity,
        }}
      />

      {/* Tint overlay */}
      {tint && (
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${tint}`}
          style={{ opacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}
