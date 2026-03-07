import React from "react";

export default function StatCard({ title, value, color, setCardsToShow }) {
  return (
    <div
      className={[
        "card",
        color,
        "rounded-2xl",
        "shadow-md hover:shadow-lg",
        "transition-all duration-300",
        "min-h-[96px]",
      ].join(" ")}
    >
      <div className="card-body items-center text-center p-4 cursor-pointer" onClick={() => setCardsToShow(title)}>
        <p className="text-xs sm:text-sm uppercase tracking-wider opacity-70">
          {title}
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold leading-none mt-1">
          {value ?? 0}
        </h2>
      </div>
    </div>
  );
}