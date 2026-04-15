function AnimatedLinesBackground() {
  return (
    <div className="bg-lines pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: 15 }).map((_, idx) => (
        <span
          key={idx}
          className="bg-line absolute top-0 h-full"
          style={{ left: `${(idx + 1) * 6.25}%` }}
        />
      ))}
      <div className="bg-noise absolute inset-0" />
    </div>
  )
}

export default AnimatedLinesBackground
