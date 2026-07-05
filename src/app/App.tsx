import { useState } from "react";
import { Home, BookOpen, PenLine, Award } from "lucide-react";
import { O, DK, MU, BR, F } from "./tokens";
import type { Tab } from "./types";
import { getRank, USER_XP } from "./data";
import { HomeView } from "./HomeView";
import { StylesView } from "./StylesView";
import { PracticeView } from "./PracticeView";
import { RanksView } from "./RanksView";

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

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const { curr, next, pct } = getRank(USER_XP);
  const NAV = [
    { id:"home" as Tab,     num:"01", label:"HOME",     Icon:Home     },
    { id:"styles" as Tab,   num:"02", label:"STYLES",   Icon:BookOpen },
    { id:"practice" as Tab, num:"03", label:"PRACTICE", Icon:PenLine  },
    { id:"ranks" as Tab,    num:"04", label:"RANKS",    Icon:Award    },
  ];
  return (
    <div style={{ minHeight:"100dvh", background:"#fff", color:DK, fontFamily:F.ui }}>
      <div style={{ maxWidth:600, margin:"0 auto", minHeight:"100dvh", display:"flex", flexDirection:"column", background:"#fff" }}>
        <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", flexShrink:0 }}>
          <div onClick={() => setTab("home")} style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:O, display:"flex", alignItems:"center", gap:5, cursor:"pointer" }}>
            <span style={{ fontSize:20, lineHeight:1 }}>+</span>KHATTAT
          </div>
        </header>
        <div style={{ height:2, background:O, flexShrink:0 }} />
        <main style={{ flex:1, overflowY:"auto", paddingBottom:90 }}>
          {tab==="home"     && <HomeView curr={curr} next={next} pct={pct} onNav={setTab} />}
          {tab==="styles"   && <StylesView />}
          {tab==="practice" && <PracticeView />}
          {tab==="ranks"    && <RanksView curr={curr} />}
        </main>
        <nav style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:600, background:"#fff", borderTop:`1px solid ${BR}`, display:"flex", zIndex:100 }}>
          {NAV.map(({ id, num, label, Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"10px 0", background:"none", border:"none", cursor:"pointer", color:active?O:MU, position:"relative" }}>
                {active && <div style={{ position:"absolute", top:-1, left:0, right:0, height:2, background:O }} />}
                <span style={{ fontFamily:F.mono, fontSize:9, color:active?O:MU }}>{num}</span>
                <Icon size={18} strokeWidth={active?2:1.5} />
                <span style={{ fontFamily:F.mono, fontSize:9, letterSpacing:"0.05em", color:active?O:MU }}>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
