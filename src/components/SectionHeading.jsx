function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-soft md:text-lg">{description}</p>
    </div>
  )
}

export default SectionHeading
