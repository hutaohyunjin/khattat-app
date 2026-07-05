import { Lock } from "lucide-react";
import { O, DK, MU, BR, F } from "./tokens";
import { RANKS } from "./data";
import { Card } from "./App";

export function RanksView({ curr }: { curr: typeof RANKS[0] }) {
  return (
    <div style={{ padding:"28px 20px", display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.3em", marginBottom:18 }}>PROGRESSION</div>
        <div style={{ fontFamily:F.display, lineHeight:0.86, marginBottom:20 }}>
          <div style={{ fontSize:"clamp(52px,14vw,76px)", fontWeight:700, color:DK }}>RANK</div>
          <div style={{ fontSize:"clamp(52px,14vw,76px)", fontWeight:700, fontStyle:"italic", color:"#4a5568" }}>SYSTEM</div>
        </div>
        <p style={{ fontFamily:F.ui, fontSize:14, color:MU, lineHeight:1.6 }}>Earn XP by completing lessons to rise through eleven ranks.</p>
      </div>
      <div style={{ height:1, background:BR }} />
      <Card label="ALL RANKS">
        <div style={{ display:"flex", alignItems:"center", paddingBottom:10, borderBottom:`1px solid ${BR}` }}>
          <div style={{ width:32, flexShrink:0 }}><span style={{ color:O, fontSize:12 }}>■</span></div>
          <div style={{ flex:1, fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.12em" }}>RANK</div>
          <div style={{ fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.12em" }}>REQUIRED XP</div>
        </div>
        {RANKS.map((r) => {
          const isCurr=r.level===curr.level, isPast=parseInt(r.level)<parseInt(curr.level), isLocked=!isCurr&&!isPast;
          return (
            <div key={r.level} style={{ display:"flex", alignItems:"center", padding:"13px 0", borderBottom:`1px solid ${BR}`, opacity:isLocked?0.38:1, background:isCurr?"rgba(232,80,32,0.04)":"transparent" }}>
              <div style={{ width:32, flexShrink:0 }}>
                {isPast && <div style={{ width:8, height:8, borderRadius:"50%", background:O }} />}
                {isCurr && <span style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:O }}>{r.level}</span>}
                {isLocked && <Lock size={13} color={MU} />}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:isCurr?F.display:F.ui, fontSize:isCurr?22:14, fontWeight:isCurr?700:400, color:isLocked?MU:DK, lineHeight:1.2 }}>{isCurr?r.title.toUpperCase():r.title}</div>
                {isCurr && <div style={{ fontFamily:F.mono, fontSize:9, color:O, marginTop:3, letterSpacing:"0.1em" }}>CURRENT RANK</div>}
              </div>
              <div style={{ fontFamily:F.mono, fontSize:11, color:isCurr?O:MU, fontWeight:isCurr?700:400, flexShrink:0 }}>{r.xp===0?"START":`${r.xp} XP`}</div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
