import { O, BR, F } from "./tokens";

export function Card({ label, right, children }: { label: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${BR}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px 0" }}>
        <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.2em" }}>{label}</div>
        {right && <div style={{ fontFamily:F.mono, fontSize:10, color:O }}>{right}</div>}
      </div>
      <div style={{ padding:"12px 16px 16px" }}>{children}</div>
    </div>
  );
}

export function XpBadge({ xp }: { xp: number }) {
  return <span style={{ border:`1px solid ${O}`, color:O, fontFamily:F.mono, fontSize:11, fontWeight:700, padding:"3px 8px", display:"inline-block", whiteSpace:"nowrap" }}>+{xp}xp</span>;
}
