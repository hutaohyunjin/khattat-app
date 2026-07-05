import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, RotateCcw, Check } from "lucide-react";
import { O, DK, MU, BR, F } from "./tokens";
import { PRACTICE_TIPS } from "./data";
import { Card } from "./ui";
import type { LetterEntry, LetterGroup } from "./types";

function LearnTab({ letter }: { letter: LetterEntry }) {
  const d = letter.detail;
  return (
    <>
      <Card label="ABOUT"><p style={{ fontFamily:F.ui, fontSize:14, color:DK, lineHeight:1.75 }}>{d.about}</p></Card>
      <Card label={`STROKE GUIDE · ${d.strokes.length} STEPS`}>
        <div style={{ borderTop:`1px solid ${BR}` }}>
          <div style={{ display:"flex", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${BR}` }}>
            <div style={{ width:36, flexShrink:0, fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.1em" }}>#</div>
            <div style={{ fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.1em" }}>INSTRUCTION</div>
          </div>
          {d.strokes.map((step, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", padding:"12px 0", borderBottom:`1px solid ${BR}`, opacity:i===0?0.45:1 }}>
              <div style={{ width:36, flexShrink:0, fontFamily:F.mono, fontSize:11, color:MU, paddingTop:1 }}>{String(i+1).padStart(2,"0")}</div>
              <div style={{ fontFamily:F.ui, fontSize:14, color:DK, lineHeight:1.55, fontWeight:500 }}>{step}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card label="PROPORTION TIP"><p style={{ fontFamily:F.ui, fontSize:14, color:DK, lineHeight:1.75 }}>{d.proportionTip}</p></Card>
    </>
  );
}

function FormsTab({ letter }: { letter: LetterEntry }) {
  const d = letter.detail;
  const positions = [
    { key:"isolated", label:"Isolated",  sub:"Standalone letter", form:d.forms.isolated },
    { key:"initial",  label:"Initial",   sub:"Start of a word",   form:d.forms.initial  },
    { key:"medial",   label:"Medial",    sub:"Middle of a word",  form:d.forms.medial   },
    { key:"final",    label:"Final",     sub:"End of a word",     form:d.forms.final    },
  ];
  return (
    <Card label="POSITIONAL FORMS">
      <div style={{ borderTop:`1px solid ${BR}` }}>
        <div style={{ display:"flex", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${BR}` }}>
          <div style={{ width:80, flexShrink:0, fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.1em" }}>FORM</div>
          <div style={{ fontFamily:F.mono, fontSize:9, color:O, letterSpacing:"0.1em" }}>POSITION</div>
        </div>
        {positions.map((pos, i) => (
          <div key={pos.key} style={{ display:"flex", alignItems:"center", padding:"20px 0", borderBottom:`1px solid ${BR}`, background:i%2===0?"#fff":"#fafafa" }}>
            <div style={{ width:80, flexShrink:0 }}><span style={{ fontFamily:F.arabic, fontSize:34, color:DK, direction:"rtl", lineHeight:1 }}>{pos.form}</span></div>
            <div>
              <div style={{ fontFamily:F.ui, fontSize:15, fontWeight:600, color:DK, marginBottom:4 }}>{pos.label}</div>
              <div style={{ fontFamily:F.mono, fontSize:11, color:MU }}>{pos.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DrawingCanvas({ letter }: { letter: LetterEntry }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{x:number;y:number}|null>(null);
  const [isDone, setIsDone] = useState(false);
  const getPos = (cx:number, cy:number) => { const c=canvasRef.current; if(!c) return {x:0,y:0}; const r=c.getBoundingClientRect(); return {x:(cx-r.left)*(c.width/r.width),y:(cy-r.top)*(c.height/r.height)}; };
  const clear = useCallback(() => { const ctx=canvasRef.current?.getContext("2d"); if(ctx&&canvasRef.current){ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);setIsDone(false);} }, []);
  const start = (x:number,y:number) => { isDrawing.current=true; lastPos.current={x,y}; setIsDone(false); };
  const move = (x:number,y:number) => { if(!isDrawing.current||!lastPos.current) return; const ctx=canvasRef.current?.getContext("2d"); if(!ctx) return; ctx.beginPath();ctx.moveTo(lastPos.current.x,lastPos.current.y);ctx.lineTo(x,y);ctx.strokeStyle=DK;ctx.lineWidth=3.5;ctx.lineCap="round";ctx.lineJoin="round";ctx.stroke();lastPos.current={x,y}; };
  const end = () => { isDrawing.current=false; lastPos.current=null; };
  useEffect(() => { const c=canvasRef.current,ct=containerRef.current; if(c&&ct){c.width=ct.clientWidth;c.height=ct.clientHeight;} }, []);
  return (
    <div style={{ border:`1px solid ${BR}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 16px", borderBottom:`1px solid ${BR}` }}>
        <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.15em" }}>PRACTICE CANVAS — {letter.name.toUpperCase()} ({letter.arabic})</div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:MU }}>CALLIGRAPHY NIB · {letter.detail.nibAngle}</div>
      </div>
      <div ref={containerRef} style={{ position:"relative", height:280, overflow:"hidden", backgroundImage:"repeating-linear-gradient(to bottom,transparent,transparent 27px,rgba(148,163,184,0.25) 27px,rgba(148,163,184,0.25) 28px)", backgroundSize:"100% 28px" }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none", zIndex:1, paddingBottom:28 }}><span style={{ fontFamily:F.arabic, fontSize:160, color:"rgba(0,0,0,0.05)", lineHeight:1, direction:"rtl", userSelect:"none" }}>{letter.arabic}</span></div>
        <div style={{ position:"absolute", left:0, right:0, top:"60%", height:1, background:"rgba(100,116,139,0.4)", zIndex:1, pointerEvents:"none" }} />
        <div style={{ position:"absolute", left:12, top:"calc(60% - 14px)", fontFamily:F.mono, fontSize:9, color:"rgba(148,163,184,0.8)", zIndex:1, pointerEvents:"none", letterSpacing:"0.1em" }}>BASELINE</div>
        <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:2, touchAction:"none", cursor:"crosshair" }}
          onMouseDown={(e)=>{const p=getPos(e.clientX,e.clientY);start(p.x,p.y);}}
          onMouseMove={(e)=>{const p=getPos(e.clientX,e.clientY);move(p.x,p.y);}}
          onMouseUp={end} onMouseLeave={end}
          onTouchStart={(e)=>{e.preventDefault();const t=e.touches[0];const p=getPos(t.clientX,t.clientY);start(p.x,p.y);}}
          onTouchMove={(e)=>{e.preventDefault();const t=e.touches[0];const p=getPos(t.clientX,t.clientY);move(p.x,p.y);}}
          onTouchEnd={end} />
      </div>
      <div style={{ display:"flex", borderTop:`1px solid ${BR}` }}>
        <button onClick={clear} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px", background:"none", border:"none", borderRight:`1px solid ${BR}`, cursor:"pointer", fontFamily:F.mono, fontSize:12, color:DK }}><RotateCcw size={14}/> Clear</button>
        <button onClick={()=>setIsDone(true)} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px", background:"none", border:"none", cursor:"pointer", fontFamily:F.mono, fontSize:12, color:isDone?O:DK }}><Check size={14}/> {isDone?"Saved!":"Done"}</button>
      </div>
    </div>
  );
}

export function LetterPage({ letter, group, onBack, prevLetter, nextLetter, onSelectLetter }: { letter:LetterEntry; group:LetterGroup; onBack:()=>void; prevLetter:LetterEntry|null; nextLetter:LetterEntry|null; onSelectLetter:(l:LetterEntry)=>void; }) {
  const [activeTab, setActiveTab] = useState<"learn"|"forms"|"practice">("learn");
  const d = letter.detail;
  const TABS = [{id:"learn" as const,label:"LEARN"},{id:"forms" as const,label:"FORMS"},{id:"practice" as const,label:"PRACTICE"}];
  return (
    <div style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ padding:"8px 20px", borderBottom:`1px solid ${BR}`, display:"flex", alignItems:"center", gap:6, cursor:"pointer" }} onClick={onBack}>
        <ArrowRight size={12} color={MU} style={{ transform:"rotate(180deg)" }} />
        <span style={{ fontFamily:F.mono, fontSize:10, color:MU }}>+ KHATTAT</span>
      </div>
      <div style={{ padding:"24px 20px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:F.mono, fontSize:10, color:O, letterSpacing:"0.2em", marginBottom:12 }}>LETTER {String(d.globalIndex).padStart(2,"0")} / 28</div>
          <div style={{ fontFamily:F.display, fontSize:"clamp(42px,11vw,60px)", fontWeight:700, color:DK, lineHeight:1, marginBottom:14 }}>{letter.name.toUpperCase()} ({letter.arabic})</div>
          <div style={{ fontFamily:F.mono, fontSize:12, color:MU }}>{letter.roman} · {d.arabicName}</div>
        </div>
        <div style={{ width:80, height:80, border:`1px solid ${BR}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginLeft:16 }}><span style={{ fontFamily:F.arabic, fontSize:40, color:DK }}>{letter.arabic}</span></div>
      </div>
      <div style={{ display:"flex", borderBottom:`1px solid ${BR}`, margin:"20px 0 0" }}>
        {TABS.map((t) => { const active=activeTab===t.id; return <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ flex:1, padding:"12px 0", background:"none", border:"none", cursor:"pointer", fontFamily:F.mono, fontSize:11, letterSpacing:"0.1em", color:active?DK:MU, borderBottom:active?`2px solid ${DK}`:"2px solid transparent", marginBottom:-1 }}>{t.label}</button>; })}
      </div>
      <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:16 }}>
        {activeTab==="learn"    && <LearnTab letter={letter} />}
        {activeTab==="forms"    && <FormsTab letter={letter} />}
        {activeTab==="practice" && <DrawingCanvas letter={letter} />}
      </div>
      <div style={{ display:"flex", borderTop:`1px solid ${BR}`, marginTop:8 }}>
        <button onClick={()=>prevLetter&&onSelectLetter(prevLetter)} disabled={!prevLetter} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"14px 16px", background:"none", border:"none", borderRight:`1px solid ${BR}`, cursor:prevLetter?"pointer":"default", fontFamily:F.mono, fontSize:11, color:prevLetter?DK:MU }}><ArrowRight size={13} style={{transform:"rotate(180deg)"}}/> PREV</button>
        <button onClick={()=>nextLetter&&onSelectLetter(nextLetter)} disabled={!nextLetter} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"14px 16px", background:"none", border:"none", cursor:nextLetter?"pointer":"default", fontFamily:F.mono, fontSize:11, color:nextLetter?DK:MU }}>
          {nextLetter?<><span style={{fontFamily:F.ui}}>{nextLetter.name}</span><span style={{fontFamily:F.arabic,fontSize:16}}>({nextLetter.arabic})</span></>:"—"}<ArrowRight size={13}/>
        </button>
      </div>
      <div style={{ height:24 }} />
    </div>
  );
}
