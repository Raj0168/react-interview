import { useState } from "react";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => {
      if (prev === images.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handlePrev = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return images.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  if (images.length < 1) return <div>No Images Passed!</div>;

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "600px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 1,
        }}
        onClick={handlePrev}
      >
        ⏮️
      </button>
      <img
        loading="lazy"
        alt={images[index].alt}
        src={images[index].src}
        width="100%"
      />
      <button
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          zIndex: 1,
        }}
        onClick={handleNext}
      >
        ⏭️
      </button>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: "1px solid #fff",
              background: idx === index ? "#fff" : "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
