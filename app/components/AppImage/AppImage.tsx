import React from "react";
import Image from "next/image";

type AppImageProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
};

const AppImage: React.FC<AppImageProps> = ({
  src,
  alt = "",
  className = "",
  width,
  height,
  loading = "lazy",
}) => {
  // Convert width and height to numbers if provided as strings
  const widthNum = width
    ? typeof width === "string"
      ? parseInt(width, 10)
      : width
    : undefined;
  const heightNum = height
    ? typeof height === "string"
      ? parseInt(height, 10)
      : height
    : undefined;

  // If width/height not provided, use fill for responsive images
  if (!widthNum || !heightNum) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        loading={loading}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={widthNum}
      height={heightNum}
      className={`object-cover ${className}`}
      loading={loading}
    />
  );
};

export default AppImage;
