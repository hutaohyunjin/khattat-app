import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { O, DK, MU, BR, F } from "./tokens";
import { LETTER_GROUPS } from "./letterGroups";
import type { LetterGroup, LetterEntry } from "./types";
import { Card } from "./App";
import { LetterPage } from "./LetterPage";

function LetterDetailView({ group, onBack, onSelectLetter }: { group: LetterGroup; onBack: () => void; onSelectLetter: (l: LetterEntry) => void }) {
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ background:DK, padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }} onClick={onBack}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ color:O, fontSize:14 }}>■</span>
          <span style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:O, letterSpacing:"0.12em" }}>{group.label}</span>
        </div>
        <span style={{ fontFamily:F.mono, fontSize:12, color:O }}>0 / {group.letters.length}</span>
      </div>
      <div style={{ background:"#f9fafb", padding:"8px 20px", borderBottom:`1px solid ${BR}`, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }} onClick={onBack}>
        <ArrowRight size={12} color={MU} style={{ transform:"rotate(180deg)" }} />
        <span style={{ fontFamily:F.mono, fontSize:10, color:MU, letterSpacing:"0.1em" }}>BACK TO GROUPS</span>
      </div>
      <div style={{ background:"#f3f4f6", display:"flex", alignItems:"center", padding:"10px 20px", borderBottom:`1px solid ${BR}` }}>
        <div style={{ width:72, flexShrink:0, fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.15em" }}>FORM</div>
        <div style={{ flex:1, fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.15em" }}>NAME</div>
        <div style={{ fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.15em" }}>STATUS</div>
      </div>
      {group.letters.map((letter, i) => (
        <div key={letter.arabic} onClick={() => onSelectLetter(letter)} style={{ display:"flex", alignItems:"center", padding:"18px 20px", borderBottom:`1px solid ${BR}`, background:i%2===0?"#fff":"#fafafa", cursor:"pointer" }}>
          <div style={{ width:72, flexShrink:0 }}><span style={{ fontFamily:F.arabic, fontSize:36, color:DK, lineHeight:1 }}>{letter.arabic}</span></div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:F.ui, fontSize:15, fontWeight:600, color:DK, marginBottom:3 }}>{letter.name} <span style={{ fontFamily:F.arabic, fontWeight:400, fontSize:15, color:"#4a5568" }}>({letter.arabic})</span></div>
            <div style={{ fontFamily:F.mono, fontSize:11, color:O }}>{letter.roman}</div>
          </div>
          <ArrowRight size={14} color={MU} />
        </div>
      ))}
      <div style={{ height:24 }} />
    </div>
  );
}

export function PracticeView() {
  const [selectedGroup, setSelectedGroup] = useState<LetterGroup|null>(null);
  const [selectedLetter, setSelectedLetter] = useState<LetterEntry|null>(null);

  if (selectedLetter && selectedGroup) {
    const idx = selectedGroup.letters.findIndex(l => l.arabic === selectedLetter.arabic);
    const prevLetter = idx > 0 ? selectedGroup.letters[idx-1] : null;
    const nextLetter = idx < selectedGroup.letters.length-1 ? selectedGroup.letters[idx+1] : null;
    return <LetterPage letter={selectedLetter} group={selectedGroup} onBack={() => setSelectedLetter(null)} prevLetter={prevLetter} nextLetter={nextLetter} onSelectLetter={setSelectedLetter} />;
  }
  if (selectedGroup) {
    return <LetterDetailView group={selectedGroup} onBack={() => setSelectedGroup(null)} onSelectLetter={setSelectedLetter} />;
  }
  return (
    <div style={{ padding:"28px 20px", display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.3em", marginBottom:18 }}>LETTER PRACTICE</div>
        <div style={{ fontFamily:F.display, lineHeight:0.86, marginBottom:20 }}>
          <div style={{ fontSize:"clamp(52px,14vw,76px)", fontWeight:700, color:DK }}>28</div>
          <div style={{ fontSize:"clamp(52px,14vw,76px)", fontWeight:700, fontStyle:"italic", color:"#4a5568" }}>LETTERS</div>
        </div>
        <p style={{ fontFamily:F.ui, fontSize:14, color:MU, lineHeight:1.6 }}>All 28 Arabic letters organized by stroke family. Complete lessons to unlock each group.</p>
      </div>
      <div style={{ height:1, background:BR }} />
      <Card label="LETTER GROUPS">
        <div style={{ display:"flex", alignItems:"center", paddingBottom:10, borderBottom:`1px solid ${BR}` }}>
          <div style={{ width:32, flexShrink:0 }}><span style={{ color:O, fontSize:12 }}>■</span></div>
          <div style={{ flex:1, fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.12em" }}>GROUP</div>
          <div style={{ fontFamily:F.mono, fontSize:9, color:MU, letterSpacing:"0.12em" }}>LETTERS</div>
        </div>
        {LETTER_GROUPS.map((g) => (
          <div key={g.num} onClick={() => g.available && setSelectedGroup(g)} style={{ display:"flex", alignItems:"center", padding:"13px 0", borderBottom:`1px solid ${BR}`, opacity:g.available?1:0.38, cursor:g.available?"pointer":"default" }}>
            <div style={{ width:32, flexShrink:0 }}>
              {g.available?<span style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:DK }}>{g.num}</span>:<Lock size={13} color={MU} />}
            </div>
            <div style={{ flex:1, minWidth:0, paddingRight:12 }}>
              <div style={{ fontFamily:F.ui, fontSize:14, fontWeight:g.available?700:400, color:g.available?DK:MU, marginBottom:3 }}>Group {g.num}: {g.name}</div>
              <div style={{ fontFamily:F.mono, fontSize:11, color:MU }}>{g.trait}</div>
            </div>
            <div style={{ display:"flex", gap:6, direction:"rtl", flexShrink:0 }}>
              {g.letters.slice(0,4).map((l) => <span key={l.arabic} style={{ fontFamily:F.arabic, fontSize:20, color:g.available?DK:MU }}>{l.arabic}</span>)}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
