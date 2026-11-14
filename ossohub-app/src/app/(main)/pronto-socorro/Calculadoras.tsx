"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ADULTO, calcularDose } from "@/data/ps";

// ───────── utilidades ─────────
const n = (v: string) => {
  const x = parseFloat(v.replace(",", "."));
  return Number.isFinite(x) ? x : NaN;
};
const f = (x: number, casas = 1) =>
  Number.isFinite(x) ? x.toLocaleString("pt-BR", { maximumFractionDigits: casas }) : "—";

function Campo({ label, value, onChange, unit, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; unit?: string; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-[#A3B1C6]">{label}</span>
      <span className="flex items-center rounded-lg border border-[var(--line)] bg-[var(--film-3)] focus-within:border-[#38D5E0]">
        <input
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="oh-bare w-full min-w-0 px-3 py-2 text-[15px] text-white outline-none"
        />
        {unit && <span className="oh-mono pr-3 text-[12px] text-[#8C9AB0]">{unit}</span>}
      </span>
    </label>
  );
}

function Opcoes<T extends string>({ value, onChange, items }: {
  value: T; onChange: (v: T) => void; items: { v: T; l: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <button key={i.v} type="button" onClick={() => onChange(i.v)}
          className={cn("rounded-lg border px-3 py-1.5 text-[13px] font-medium",
            value === i.v ? "border-[#38D5E0]/50 bg-[#38D5E0]/10 text-[#7FE7EE]" : "border-[var(--line)] text-[#C9D3E1]")}>
          {i.l}
        </button>
      ))}
    </div>
  );
}

function Resultado({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl border border-[#38D5E0]/25 bg-[#38D5E0]/[0.06] px-4 py-3 text-[14px] leading-relaxed text-[#E6EBF2]">
      {children}
    </div>
  );
}

function Num({ children }: { children: React.ReactNode }) {
  return <strong className="oh-mono text-[#7FE7EE]">{children}</strong>;
}

function Card({ id, titulo, desc, children }: { id: string; titulo: string; desc: string; children: React.ReactNode }) {
  return (
    <section id={id} className="ossohub-card p-4 sm:p-5 scroll-mt-24">
      <h3 className="text-[16px] font-semibold text-white">{titulo}</h3>
      <p className="mt-0.5 mb-3 text-[13px] text-[#A3B1C6]">{desc}</p>
      {children}
    </section>
  );
}

// ───────── calculadoras ─────────
function DosePeso() {
  const [peso, setPeso] = useState(""); const [dose, setDose] = useState(""); const [conc, setConc] = useState(""); const [max, setMax] = useState("");
  const mg = n(peso) * n(dose); const teto = n(max); const final = Number.isFinite(teto) && mg > teto ? teto : mg;
  return (
    <Card id="dose" titulo="Dose por peso" desc="mg/kg → mg e volume da apresentação.">
      <div className="grid grid-cols-2 gap-3">
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label="Dose" unit="mg/kg" value={dose} onChange={setDose} />
        <Campo label="Concentração" unit="mg/mL" value={conc} onChange={setConc} placeholder="opcional" />
        <Campo label="Dose máxima" unit="mg" value={max} onChange={setMax} placeholder="opcional" />
      </div>
      {Number.isFinite(final) && final > 0 && (
        <Resultado>
          Dose: <Num>{f(final, 2)} mg</Num>{final !== mg && <> (limitada pelo teto; calculado {f(mg, 1)} mg)</>}
          {n(conc) > 0 && <> = <Num>{f(final / n(conc), 2)} mL</Num> · gotas (20/mL): <Num>{f((final / n(conc)) * 20, 0)}</Num></>}
        </Resultado>
      )}
    </Card>
  );
}

function Hidratacao() {
  const [peso, setPeso] = useState(""); const [desid, setDesid] = useState("0");
  const p = n(peso);
  const manut = !(p > 0) ? NaN : p <= 10 ? p * 100 : p <= 20 ? 1000 + (p - 10) * 50 : 1500 + (p - 20) * 20;
  const deficit = p * n(desid) * 10;
  return (
    <Card id="hidratacao" titulo="Hidratação (Holliday-Segar)" desc="Manutenção diária e déficit estimado pela % de desidratação.">
      <div className="grid grid-cols-2 gap-3">
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label="Desidratação" unit="%" value={desid} onChange={setDesid} />
      </div>
      {p > 0 && (
        <Resultado>
          Manutenção: <Num>{f(manut, 0)} mL/dia</Num> = <Num>{f(manut / 24, 1)} mL/h</Num> (regra 4-2-1: {f(p <= 10 ? p * 4 : p <= 20 ? 40 + (p - 10) * 2 : 60 + (p - 20), 0)} mL/h).
          {deficit > 0 && <><br />Déficit: <Num>{f(deficit, 0)} mL</Num> · Plano B (SRO 50–100 mL/kg em 4–6 h): <Num>{f(p * 50, 0)}–{f(p * 100, 0)} mL</Num></>}
          <br />Bolus 20 mL/kg: <Num>{f(p * 20, 0)} mL</Num> · 10 mL/kg: <Num>{f(p * 10, 0)} mL</Num>
        </Resultado>
      )}
    </Card>
  );
}

function Gotejamento() {
  const [vol, setVol] = useState(""); const [h, setH] = useState("");
  const mlh = n(vol) / n(h);
  return (
    <Card id="gotejamento" titulo="Gotejamento / vazão" desc="Volume e tempo → mL/h, gotas/min e microgotas/min.">
      <div className="grid grid-cols-2 gap-3">
        <Campo label="Volume" unit="mL" value={vol} onChange={setVol} />
        <Campo label="Tempo" unit="horas" value={h} onChange={setH} />
      </div>
      {mlh > 0 && Number.isFinite(mlh) && (
        <Resultado>
          <Num>{f(mlh, 1)} mL/h</Num> · macrogotas: <Num>{f(mlh / 3, 0)} gotas/min</Num> · microgotas: <Num>{f(mlh, 0)} mgts/min</Num>
        </Resultado>
      )}
    </Card>
  );
}

const DROGAS = [
  { v: "nora", l: "Noradrenalina", conc: 64, un: "mcg/kg/min", dil: "16 mg em 250 mL (64 mcg/mL)" },
  { v: "adre", l: "Adrenalina", conc: 16, un: "mcg/kg/min", dil: "4 mg em 250 mL (16 mcg/mL)" },
  { v: "dobu", l: "Dobutamina", conc: 4000, un: "mcg/kg/min", dil: "1.000 mg em 250 mL (4.000 mcg/mL)" },
  { v: "dopa", l: "Dopamina", conc: 1000, un: "mcg/kg/min", dil: "250 mg em 250 mL (1.000 mcg/mL)" },
  { v: "nipr", l: "Nitroprussiato", conc: 200, un: "mcg/kg/min", dil: "50 mg em 250 mL (200 mcg/mL)" },
  { v: "tridil", l: "Nitroglicerina", conc: 200, un: "mcg/min", dil: "50 mg em 250 mL (200 mcg/mL)" },
] as const;

function Vasoativas() {
  const [droga, setDroga] = useState<(typeof DROGAS)[number]["v"]>("nora");
  const [peso, setPeso] = useState(""); const [dose, setDose] = useState(""); const [vaz, setVaz] = useState(""); const [conc, setConc] = useState("");
  const d = DROGAS.find((x) => x.v === droga)!;
  const c = n(conc) > 0 ? n(conc) : d.conc;
  const porKg = d.un.includes("/kg");
  const fator = porKg ? n(peso) * 60 : 60;
  const mlh = (n(dose) * fator) / c;
  const doseDaVazao = (n(vaz) * c) / fator;
  return (
    <Card id="vasoativas" titulo="Drogas vasoativas" desc="Dose ↔ vazão da bomba (mL/h) com a diluição padrão ou a sua.">
      <Opcoes value={droga} onChange={setDroga} items={DROGAS.map((x) => ({ v: x.v, l: x.l }))} />
      <p className="mt-2 text-[12px] text-[#8C9AB0]">Diluição padrão: {d.dil}</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {porKg && <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />}
        <Campo label="Concentração (opcional)" unit="mcg/mL" value={conc} onChange={setConc} placeholder={String(d.conc)} />
        <Campo label="Dose desejada" unit={d.un} value={dose} onChange={setDose} />
        <Campo label="Ou vazão atual" unit="mL/h" value={vaz} onChange={setVaz} />
      </div>
      {(mlh > 0 || doseDaVazao > 0) && (
        <Resultado>
          {mlh > 0 && Number.isFinite(mlh) && <>Vazão: <Num>{f(mlh, 1)} mL/h</Num><br /></>}
          {doseDaVazao > 0 && Number.isFinite(doseDaVazao) && <>Dose atual: <Num>{f(doseDaVazao, 3)} {d.un}</Num></>}
        </Resultado>
      )}
    </Card>
  );
}

function Clearance() {
  const [idade, setIdade] = useState(""); const [peso, setPeso] = useState(""); const [cr, setCr] = useState(""); const [sexo, setSexo] = useState<"m" | "f">("m");
  const cl = ((140 - n(idade)) * n(peso)) / (72 * n(cr)) * (sexo === "f" ? 0.85 : 1);
  return (
    <Card id="clearance" titulo="Clearance de creatinina" desc="Cockcroft-Gault — usado para ajustar doses.">
      <Opcoes value={sexo} onChange={setSexo} items={[{ v: "m", l: "Masculino" }, { v: "f", l: "Feminino" }]} />
      <div className="mt-3 grid grid-cols-3 gap-3">
        <Campo label="Idade" unit="anos" value={idade} onChange={setIdade} />
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label="Creatinina" unit="mg/dL" value={cr} onChange={setCr} />
      </div>
      {cl > 0 && Number.isFinite(cl) && <Resultado>ClCr ≈ <Num>{f(cl, 0)} mL/min</Num></Resultado>}
    </Card>
  );
}

const INFUSATOS = [
  { v: "3", l: "NaCl 3%", na: 513 }, { v: "09", l: "SF 0,9%", na: 154 }, { v: "rl", l: "Ringer lactato", na: 130 },
  { v: "045", l: "NaCl 0,45%", na: 77 }, { v: "sg", l: "SG 5%", na: 0 },
] as const;

function Sodio() {
  const [na, setNa] = useState(""); const [peso, setPeso] = useState(""); const [glic, setGlic] = useState("");
  const [grupo, setGrupo] = useState<"h" | "m" | "i">("h"); const [inf, setInf] = useState<(typeof INFUSATOS)[number]["v"]>("3");
  const fatorAct = grupo === "h" ? 0.6 : grupo === "m" ? 0.5 : 0.45;
  const act = n(peso) * fatorAct;
  const infNa = INFUSATOS.find((x) => x.v === inf)!.na;
  const delta = (infNa - n(na)) / (act + 1);
  const deficitAgua = act * (n(na) / 140 - 1);
  const naCorr = n(na) + 1.6 * ((n(glic) - 100) / 100);
  return (
    <Card id="sodio" titulo="Sódio" desc="Adrogué-Madias (efeito de 1 L), déficit de água livre e Na corrigido pela glicemia.">
      <Opcoes value={grupo} onChange={setGrupo} items={[{ v: "h", l: "Homem adulto" }, { v: "m", l: "Mulher adulta" }, { v: "i", l: "Idoso(a)" }]} />
      <div className="mt-3 grid grid-cols-3 gap-3">
        <Campo label="Na sérico" unit="mEq/L" value={na} onChange={setNa} />
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label="Glicemia" unit="mg/dL" value={glic} onChange={setGlic} placeholder="opcional" />
      </div>
      <div className="mt-3"><Opcoes value={inf} onChange={setInf} items={INFUSATOS.map((x) => ({ v: x.v, l: x.l }))} /></div>
      {n(na) > 0 && n(peso) > 0 && (
        <Resultado>
          1 L de {INFUSATOS.find((x) => x.v === inf)!.l} muda o Na em <Num>{delta > 0 ? "+" : ""}{f(delta, 1)} mEq/L</Num>.
          {delta > 0 && <> Para subir 8 mEq/L em 24 h: <Num>≈ {f((8 / delta) * 1000, 0)} mL</Num> em 24 h.</>}
          {deficitAgua > 0 && <><br />Déficit de água livre: <Num>{f(deficitAgua, 1)} L</Num> (repor em 48 h; queda máx. 10 mEq/L/dia).</>}
          {n(glic) > 100 && <><br />Na corrigido pela glicemia: <Num>{f(naCorr, 1)} mEq/L</Num></>}
        </Resultado>
      )}
    </Card>
  );
}

function AnionGap() {
  const [na, setNa] = useState(""); const [cl, setCl] = useState(""); const [hco3, setHco3] = useState(""); const [alb, setAlb] = useState("");
  const [glic, setGlic] = useState(""); const [ureia, setUreia] = useState("");
  const ag = n(na) - n(cl) - n(hco3);
  const agc = ag + 2.5 * (4 - n(alb));
  const osm = 2 * n(na) + n(glic) / 18 + n(ureia) / 6;
  return (
    <Card id="anion-gap" titulo="Ânion gap e osmolaridade" desc="AG = Na − (Cl + HCO₃); corrigido pela albumina; osmolaridade calculada.">
      <div className="grid grid-cols-3 gap-3">
        <Campo label="Na" unit="mEq/L" value={na} onChange={setNa} />
        <Campo label="Cl" unit="mEq/L" value={cl} onChange={setCl} />
        <Campo label="HCO₃" unit="mEq/L" value={hco3} onChange={setHco3} />
        <Campo label="Albumina" unit="g/dL" value={alb} onChange={setAlb} placeholder="opcional" />
        <Campo label="Glicemia" unit="mg/dL" value={glic} onChange={setGlic} placeholder="opcional" />
        <Campo label="Ureia" unit="mg/dL" value={ureia} onChange={setUreia} placeholder="opcional" />
      </div>
      {Number.isFinite(ag) && (
        <Resultado>
          Ânion gap: <Num>{f(ag, 1)}</Num> (normal 8–12)
          {Number.isFinite(agc) && n(alb) > 0 && <> · corrigido: <Num>{f(agc, 1)}</Num></>}
          {Number.isFinite(osm) && n(glic) > 0 && n(ureia) > 0 && <><br />Osmolaridade: <Num>{f(osm, 0)} mOsm/kg</Num></>}
        </Resultado>
      )}
    </Card>
  );
}

function Check({ itens, sel, setSel }: { itens: string[]; sel: boolean[]; setSel: (s: boolean[]) => void }) {
  return (
    <ul className="space-y-1.5">
      {itens.map((t, i) => (
        <li key={t}>
          <button type="button" onClick={() => setSel(sel.map((x, j) => (j === i ? !x : x)))}
            className={cn("flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[13.5px]",
              sel[i] ? "border-[#38D5E0]/45 bg-[#38D5E0]/10 text-white" : "border-[var(--line)] text-[#C9D3E1]")}>
            <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px]",
              sel[i] ? "border-[#38D5E0] bg-[#38D5E0] text-[#04141A]" : "border-[#8C9AB0]")}>{sel[i] ? "✓" : ""}</span>
            {t}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Escores() {
  const [esc, setEsc] = useState<"curb" | "qsofa" | "cha" | "glasgow">("curb");
  const CURB = ["Confusão mental", "Ureia > 43 mg/dL (> 7 mmol/L)", "FR ≥ 30 irpm", "PAS < 90 ou PAD ≤ 60 mmHg", "Idade ≥ 65 anos"];
  const QSOFA = ["FR ≥ 22 irpm", "PAS ≤ 100 mmHg", "Alteração do nível de consciência"];
  const CHA = ["IC / disfunção de VE (1)", "Hipertensão (1)", "Idade ≥ 75 anos (2)", "Diabetes (1)", "AVC/AIT/tromboembolismo prévio (2)", "Doença vascular (1)", "Idade 65–74 anos (1)", "Sexo feminino (1)"];
  const CHA_P = [1, 1, 2, 1, 2, 1, 1, 1];
  const [c, setC] = useState(CURB.map(() => false)); const [q, setQ] = useState(QSOFA.map(() => false)); const [h, setH] = useState(CHA.map(() => false));
  const [go, setGo] = useState(4); const [gv, setGv] = useState(5); const [gm, setGm] = useState(6);
  const curb = c.filter(Boolean).length; const qs = q.filter(Boolean).length;
  const cha = h.reduce((s, x, i) => s + (x ? CHA_P[i] : 0), 0);
  const sel = (label: string, val: number, set: (n: number) => void, opts: string[]) => (
    <label className="block">
      <span className="mb-1 block text-[12px] text-[#A3B1C6]">{label}</span>
      <select value={val} onChange={(e) => set(Number(e.target.value))}
        className="w-full rounded-lg border border-[var(--line)] bg-[var(--film-3)] px-3 py-2 text-[14px] text-white">
        {opts.map((o, i) => <option key={o} value={opts.length - i}>{opts.length - i} — {o}</option>)}
      </select>
    </label>
  );
  return (
    <Card id="escores" titulo="Escores do PS" desc="CURB-65, qSOFA, CHA₂DS₂-VASc e Glasgow.">
      <Opcoes value={esc} onChange={setEsc} items={[{ v: "curb", l: "CURB-65" }, { v: "qsofa", l: "qSOFA" }, { v: "cha", l: "CHA₂DS₂-VASc" }, { v: "glasgow", l: "Glasgow" }]} />
      <div className="mt-3">
        {esc === "curb" && <>
          <Check itens={CURB} sel={c} setSel={setC} />
          <Resultado>CURB-65 = <Num>{curb}</Num> → {curb <= 1 ? "baixo risco: tratamento ambulatorial" : curb === 2 ? "risco intermediário: considerar internação" : "alto risco: internação, considerar UTI"}.</Resultado>
        </>}
        {esc === "qsofa" && <>
          <Check itens={QSOFA} sel={q} setSel={setQ} />
          <Resultado>qSOFA = <Num>{qs}</Num> → {qs >= 2 ? "alto risco de desfecho ruim: investigar disfunção orgânica e sepse" : "não exclui sepse; reavaliar"}.</Resultado>
        </>}
        {esc === "cha" && <>
          <Check itens={CHA} sel={h} setSel={setH} />
          <Resultado>CHA₂DS₂-VASc = <Num>{cha}</Num> → {(h[7] ? cha - 1 : cha) >= 2 ? "anticoagulação indicada" : (h[7] ? cha - 1 : cha) === 1 ? "considerar anticoagulação" : "anticoagulação não indicada"} (sexo feminino isolado não conta para indicar).</Resultado>
        </>}
        {esc === "glasgow" && <>
          <div className="grid gap-3 sm:grid-cols-3">
            {sel("Abertura ocular", go, setGo, ["Espontânea", "Ao chamado", "À pressão/dor", "Ausente"])}
            {sel("Resposta verbal", gv, setGv, ["Orientada", "Confusa", "Palavras", "Sons", "Ausente"])}
            {sel("Resposta motora", gm, setGm, ["Obedece", "Localiza", "Flexão normal", "Flexão anormal", "Extensão", "Ausente"])}
          </div>
          <Resultado>Glasgow = <Num>{go + gv + gm}</Num> {go + gv + gm <= 8 ? "→ coma: proteger via aérea" : go + gv + gm <= 12 ? "→ moderado" : "→ leve"}.</Resultado>
        </>}
      </div>
    </Card>
  );
}

function Iot() {
  const [peso, setPeso] = useState("");
  const iot = useMemo(() => ADULTO.find((c) => c.id === "iot")!, []);
  const p = n(peso);
  return (
    <Card id="iot" titulo="Sequência rápida (IOT)" desc="Doses e volumes pelo peso — adulto.">
      <div className="max-w-[200px]"><Campo label="Peso" unit="kg" value={peso} onChange={setPeso} /></div>
      {p > 0 && (
        <ul className="mt-3 divide-y divide-[var(--line)] rounded-xl border border-[var(--line)]">
          {iot.rx.flatMap((b) => b.itens).map((it) => {
            const r = it.k ? calcularDose(it.k, p) : null;
            return (
              <li key={it.m} className="flex items-center justify-between gap-3 px-3 py-2.5 text-[13.5px]">
                <span className="text-[#DCE3EE]">{it.m}</span>
                {r && <span className="oh-mono shrink-0 text-right text-[#7FE7EE]">{r.dose}{r.volume ? ` · ${r.volume}` : ""}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function Superficie() {
  const [peso, setPeso] = useState(""); const [alt, setAlt] = useState("");
  const sc = Math.sqrt((n(peso) * n(alt)) / 3600);
  const imc = n(peso) / Math.pow(n(alt) / 100, 2);
  return (
    <Card id="superficie" titulo="Superfície corporal e IMC" desc="Mosteller: √(peso × altura / 3600).">
      <div className="grid grid-cols-2 gap-3">
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label="Altura" unit="cm" value={alt} onChange={setAlt} />
      </div>
      {sc > 0 && Number.isFinite(sc) && <Resultado>SC: <Num>{f(sc, 2)} m²</Num> · IMC: <Num>{f(imc, 1)} kg/m²</Num></Resultado>}
    </Card>
  );
}

export const CALCULADORAS = [
  { id: "dose", l: "Dose por peso" }, { id: "hidratacao", l: "Hidratação" }, { id: "gotejamento", l: "Gotejamento" },
  { id: "vasoativas", l: "Vasoativas" }, { id: "iot", l: "IOT" }, { id: "escores", l: "Escores" },
  { id: "clearance", l: "Clearance" }, { id: "sodio", l: "Sódio" }, { id: "anion-gap", l: "Ânion gap" }, { id: "superficie", l: "Superfície" },
];

export function Calculadoras() {
  return (
    <div>
      <nav className="mb-4 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Ir para calculadora">
        {CALCULADORAS.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1.5 text-[12.5px] text-[#C9D3E1] hover:border-[#38D5E0]/40 hover:text-white">
            {c.l}
          </a>
        ))}
      </nav>
      <div className="grid gap-4 lg:grid-cols-2">
        <DosePeso /><Hidratacao /><Gotejamento /><Vasoativas /><Iot /><Escores /><Clearance /><Sodio /><AnionGap /><Superficie />
      </div>
    </div>
  );
}
