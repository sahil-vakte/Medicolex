/** The Medicolex mark as inline SVG, so it can be sized and coloured without extra requests. */
type Props = { uid: string; className?: string; variant?: "colour" | "white" | "navy"; title?: string; holes?: string };

const TEAL = "M0 261V54C0 9 49 -17 84 14L168 88V212L78 253Q67 261 51 261Z";
const CORAL = "M332 261V54C332 9 283 -17 248 14L168 88V212L254 253Q265 261 281 261Z";
const CROSS = "M148 93H188V132H225V172H188V223H148V172H110V132H148Z";
const SCALES = "M110 132L72 99L28 187M72 99L90 187M225 132L260 99L242 187M260 99L304 187";
const PANS = "M24 186H94Q89 212 59 213Q31 211 24 186ZM238 186H308Q301 211 273 213Q243 212 238 186Z";

export function Mark({ uid, className, variant = "colour", title, holes }: Props) {
  const id = `mlx-mark-${uid}`;
  const left = variant === "colour" ? "#00C2B8" : variant === "white" ? "#FFFFFF" : "#0B1F3A";
  const right = variant === "colour" ? "#FF6B5A" : variant === "white" ? "#FFFFFF" : "#0B1F3A";
  return (
    <svg viewBox="-4 -24 340 290" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="-10" y="-30" width="352" height="302">
          <rect x="-10" y="-30" width="352" height="302" fill="white" />
          <path d={CROSS} fill="black" />
          <path d={SCALES} fill="none" stroke="black" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
          <path d={PANS} fill="black" />
        </mask>
      </defs>
      {holes && (
        <g>
          <path d={CROSS} fill={holes} />
          <path d={SCALES} fill="none" stroke={holes} strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
          <path d={PANS} fill={holes} />
        </g>
      )}
      <g mask={`url(#${id})`}>
        <path fill={left} d={TEAL} />
        <path fill={right} d={CORAL} />
      </g>
    </svg>
  );
}
