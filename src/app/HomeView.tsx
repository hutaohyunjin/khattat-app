import { Lock, ArrowRight } from "lucide-react";
import { O, DK, MU, BR, F } from "./tokens";
import { RANKS, LESSONS, USER_XP, USER_DONE } from "./data";
import { Card, XpBadge } from "./ui";
import type { Tab } from "./types";

export function HomeView({ curr, next, pct, onNav }: { curr:typeof RANKS[0]; next:typeof RANKS[0]; pct:number; onNav:(t:Tab)=>void }) {
  const lesson = LESSONS[USER_DONE];
  return (
    <div style={{ padding:"28px 20px", display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.3em", marginBottom:18 }}>ARABIC CALLIGRAPHY TRAINING</div>
        <div style={{ fontFamily:F.display, lineHeight:0.86, marginBottom:22 }}>
          <div style={{ fontSize:"clamp(68px,19vw,98px)", fontWeight:700, color:DK }}>THE</div>
          <div style={{ fontSize:"clamp(68px,19vw,98px)", fontWeight:700, fontStyle:"italic", color:"#4a5568" }}>ART OF</div>
          <div style={{ fontSize:"clamp(68px,19vw,98px)", fontWeight:700, color:DK }}>KHATT</div>
        </div>
        <p style={{ fontFamily:F.ui, fontSize:15, fontWeight:600, color:DK, lineHeight:1.55, maxWidth:360 }}>Master classical Arabic scripts through structured lessons and guided practice.</p>
      </div>
      <div style={{ height:1, background:BR }} />
      <Card label="RANK PROGRESS">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.1em", marginBottom:6 }}>CURRENT RANK</div>
            <div style={{ fontFamily:F.display, fontSize:30, fontWeight:700, color:DK, lineHeight:1 }}>{curr.title.toUpperCase()}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.1em", marginBottom:6 }}>LEVEL</div>
            <div style={{ fontFamily:F.display, fontSize:30, fontWeight:700, color:DK, lineHeight:1 }}>{curr.level}</div>
          </div>
        </div>
        <div style={{ height:3, background:BR, borderRadius:2 }}><div style={{ height:"100%", width:`${pct}%`, background:O, borderRadius:2 }} /></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, fontFamily:F.mono, fontSize:10, color:MU }}>
          <span>{USER_XP} XP</span><span>{next.xp} XP</span>
        </div>
      </Card>
      <Card label="NEXT LESSON">
        <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:O, marginBottom:10 }}>MISSION #{lesson.num}</div>
            <div style={{ fontFamily:F.ui, fontSize:22, fontWeight:600, color:DK, lineHeight:1.2, marginBottom:10 }}>{lesson.title}</div>
            <div style={{ fontFamily:F.mono, fontSize:11, color:MU, lineHeight:1.7 }}>{lesson.desc}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:14, flexShrink:0, paddingTop:2 }}>
            <XpBadge xp={lesson.xp} />
            <button onClick={() => onNav("practice")} style={{ background:"none", border:"none", cursor:"pointer", color:DK, padding:0 }}><ArrowRight size={20} /></button>
          </div>
        </div>
      </Card>
      <Card label={`MISSION BOARD · ${USER_DONE}/10 COMPLETE`}>
        <div style={{ display:"flex", alignItems:"center", paddingBottom:10, borderBottom:`1px solid ${BR}` }}>
          <div style={{ width:32, flexShrink:0 }}><span style={{ color:O, fontSize:12 }}>■</span></div>
          <div style={{ flex:1, fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.12em" }}>LESSON</div>
          <div style={{ fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.12em" }}>XP</div>
        </div>
        {LESSONS.map((l, i) => {
          const isNext=i===USER_DONE, isDone=i<USER_DONE, isLocked=i>USER_DONE;
          return (
            <div key={l.num} style={{ display:"flex", alignItems:"flex-start", padding:"13px 0", borderBottom:`1px solid ${BR}`, opacity:isLocked?0.38:1 }}>
              <div style={{ width:32, flexShrink:0, paddingTop:2 }}>
                {isDone && <div style={{ width:8, height:8, borderRadius:"50%", background:O }} />}
                {isNext && <span style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:DK }}>{l.num}</span>}
                {isLocked && <Lock size={13} color={MU} />}
              </div>
              <div style={{ flex:1, minWidth:0, paddingRight:14 }}>
                <div style={{ fontFamily:F.ui, fontSize:14, fontWeight:isNext?700:400, color:isLocked?MU:DK, textDecoration:isDone?"line-through":"none", marginBottom:4 }}>{l.title}</div>
                <div style={{ fontFamily:F.mono, fontSize:11, color:MU, lineHeight:1.5 }}>{l.desc.length>58?l.desc.slice(0,58)+"…":l.desc}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0, paddingTop:2 }}>
                {isNext?<><XpBadge xp={l.xp}/><ArrowRight size={15} color={DK}/></>:<span style={{ fontFamily:F.mono, fontSize:11, color:MU }}>+{l.xp}xp</span>}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
