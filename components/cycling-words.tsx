"use client";

const words = [
  "worlds",
  "products",
  "videos",
  "photos",
  "brands",
  "experiences",
  "strange ideas",
];

export function CyclingWords() {
  return (
    <span className="cycling-window" aria-label={words.join(", ")}>
      <span className="cycling-list" aria-hidden="true">
        {[...words, words[0]].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </span>
    </span>
  );
}
