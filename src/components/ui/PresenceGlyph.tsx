type PresenceGlyphProps = {
  label?: string;
};

export function PresenceGlyph({ label = "Shekinah" }: PresenceGlyphProps) {
  return (
    <div className="presence-glyph" aria-label={label} role="img">
      <span className="presence-glyph__ring" />
      <span className="presence-glyph__trunk" />
      <span className="presence-glyph__branch one" />
      <span className="presence-glyph__branch two" />
      <span className="presence-glyph__branch three" />
      <span className="presence-glyph__flame" />
    </div>
  );
}
