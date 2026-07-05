import { useState } from "react";
import { O, DK, MU, BR, F } from "./tokens";
import { STYLES_DATA } from "./data";

export function StylesView() {
  const [open, setOpen] = useState<string|null>(null);
  return (
    <div style={{ padding:"28px 20px", display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.3em", marginBottom:18 }}>CLASSICAL TRADITIONS</div>
        <div style={{ fontFamily:F.display, lineHeight:0.86, marginBottom:20 }}>
          <div style={{ fontSize:"clamp(52px,14vw,76px)", fontWeight:700, color:DK }}>SIX</div>
          <div style={{ fontSize:"clamp(52px,14vw,76px)", fontWeight:700, fontStyle:"italic", color:"#4a5568" }}>SCRIPTS</div>
        </div>
        <p style={{ fontFamily:F.ui, fontSize:14, color:MU, lineHeight:1.6 }}>Six classical Arabic scripts, each with its own origin, rules, and aesthetic character.</p>
      </div>
      <div style={{ height:1, background:BR }} />
      {STYLES_DATA.map((s) => {
        const isOpen = open===s.name;
        return (
          <div key={s.name} onClick={() => setOpen(isOpen?null:s.name)} style={{ border:`1px solid ${isOpen?s.color:BR}`, cursor:"pointer", transition:"border-color 0.15s" }}>
            <div style={{ fontFamily:F.mono, fontSize:10, color:s.color, letterSpacing:"0.2em", padding:"12px 16px 0" }}>{s.origin.toUpperCase()}</div>
            <div style={{ padding:"10px 16px 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
              <div>
                <div style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:DK, lineHeight:1, marginBottom:4 }}>{s.name.toUpperCase()}</div>
                <div style={{ fontFamily:F.arabic, fontSize:18, color:s.color, direction:"rtl", lineHeight:1.4 }}>{s.arabic}</div>
                {isOpen && <p style={{ fontFamily:F.ui, fontSize:13, color:MU, marginTop:12, lineHeight:1.65, maxWidth:340 }}>{s.desc}</p>}
              </div>
              <div style={{ fontFamily:F.arabic, fontSize:isOpen?48:32, color:s.color, direction:"rtl", lineHeight:1.4, flexShrink:0, opacity:isOpen?1:0.5 }}>{s.sample}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
