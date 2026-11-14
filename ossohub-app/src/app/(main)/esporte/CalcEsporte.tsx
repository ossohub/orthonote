"use client";

import { useState } from "react";
import { n, f, Campo, Opcoes, Resultado, Num, Card } from "../pronto-socorro/Calculadoras";

type Sexo = "m" | "f";

function Gasto() {
  const [sexo, setSexo] = useState<Sexo>("m");
  const [idade, setIdade] = useState(""); const [peso, setPeso] = useState(""); const [alt, setAlt] = useState(""); const [mlg, setMlg] = useState("");
  const [fator, setFator] = useState("1.55");
  const a = n(idade), w = n(peso), h = n(alt);
  const mifflin = 10 * w + 6.25 * h - 5 * a + (sexo === "m" ? 5 : -161);
  const hb = sexo === "m" ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a : 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
  const cunn = n(mlg) > 0 ? 500 + 22 * n(mlg) : NaN;
  const fa = n(fator);
  const ok = a > 0 && w > 0 && h > 0;
  return (
    <Card id="gasto" titulo="Gasto energético" desc="Repouso (Mifflin-St Jeor, Harris-Benedict, Cunningham) × fator de atividade.">
      <Opcoes value={sexo} onChange={setSexo} items={[{ v: "m", l: "Masculino" }, { v: "f", l: "Feminino" }]} />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Campo label="Idade" unit="anos" value={idade} onChange={setIdade} />
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label="Altura" unit="cm" value={alt} onChange={setAlt} />
        <Campo label="Massa magra" unit="kg" value={mlg} onChange={setMlg} placeholder="opcional" />
      </div>
      <div className="mt-3">
        <Opcoes value={fator} onChange={setFator} items={[
          { v: "1.2", l: "Sedentário 1,2" }, { v: "1.375", l: "Leve 1,375" }, { v: "1.55", l: "Moderado 1,55" },
          { v: "1.725", l: "Intenso 1,725" }, { v: "1.9", l: "Atleta 1,9" },
        ]} />
      </div>
      {ok && (
        <Resultado>
          Repouso — Mifflin: <Num>{f(mifflin, 0)} kcal</Num> · Harris-Benedict: <Num>{f(hb, 0)} kcal</Num>
          {Number.isFinite(cunn) && <> · Cunningham: <Num>{f(cunn, 0)} kcal</Num></>}
          <br />Gasto total (Mifflin × {f(fa, 3)}): <Num>{f(mifflin * fa, 0)} kcal/dia</Num>
          {Number.isFinite(cunn) && <> · (Cunningham × {f(fa, 3)}): <Num>{f(cunn * fa, 0)} kcal/dia</Num></>}
        </Resultado>
      )}
    </Card>
  );
}

const CARGAS = { leve: [3, 5], moderada: [5, 7], alta: [6, 10], muito: [8, 12] } as const;
const PROT = { manter: [1.4, 2.0], perder: [2.0, 2.4], ganhar: [1.6, 2.2] } as const;

function Macros() {
  const [peso, setPeso] = useState("");
  const [carga, setCarga] = useState<keyof typeof CARGAS>("moderada");
  const [obj, setObj] = useState<keyof typeof PROT>("manter");
  const w = n(peso);
  const [c1, c2] = CARGAS[carga]; const [p1, p2] = PROT[obj];
  const g = 1; // gordura ~1 g/kg (≈ 20–35% das calorias na maioria dos atletas)
  const kmin = w * (c1 * 4 + p1 * 4 + g * 9), kmax = w * (c2 * 4 + p2 * 4 + g * 9);
  return (
    <Card id="macros" titulo="Macronutrientes" desc="Metas diárias por kg conforme carga de treino e objetivo.">
      <div className="max-w-[180px]"><Campo label="Peso" unit="kg" value={peso} onChange={setPeso} /></div>
      <p className="mt-3 mb-1.5 text-[12px] text-[#A3B1C6]">Carga de treino</p>
      <Opcoes value={carga} onChange={setCarga} items={[{ v: "leve", l: "Leve" }, { v: "moderada", l: "Moderada (~1 h/dia)" }, { v: "alta", l: "Alta (1–3 h/dia)" }, { v: "muito", l: "Muito alta (> 4 h/dia)" }]} />
      <p className="mt-3 mb-1.5 text-[12px] text-[#A3B1C6]">Objetivo</p>
      <Opcoes value={obj} onChange={setObj} items={[{ v: "manter", l: "Manter" }, { v: "perder", l: "Perder gordura" }, { v: "ganhar", l: "Ganhar massa" }]} />
      {w > 0 && (
        <Resultado>
          Carboidrato: <Num>{f(w * c1, 0)}–{f(w * c2, 0)} g</Num> ({c1}–{c2} g/kg)
          <br />Proteína: <Num>{f(w * p1, 0)}–{f(w * p2, 0)} g</Num> ({f(p1)}–{f(p2)} g/kg) · por refeição ≈ <Num>{f(w * 0.3, 0)}–{f(w * 0.4, 0)} g</Num>
          <br />Gordura: <Num>≈ {f(w * g, 0)} g</Num> (manter ≥ 20% das calorias)
          <br />Total aproximado: <Num>{f(kmin, 0)}–{f(kmax, 0)} kcal/dia</Num>
          {obj === "perder" && <> — aplicar déficit de 300–500 kcal sobre o gasto total.</>}
        </Resultado>
      )}
    </Card>
  );
}

function Sudorese() {
  const [pre, setPre] = useState(""); const [pos, setPos] = useState(""); const [beb, setBeb] = useState(""); const [uri, setUri] = useState(""); const [min, setMin] = useState("");
  const perda = (n(pre) - n(pos)) * 1000 + (n(beb) || 0) - (n(uri) || 0);
  const taxa = perda / (n(min) / 60);
  const pct = ((n(pre) - n(pos)) / n(pre)) * 100;
  const ok = n(pre) > 0 && n(pos) > 0 && n(min) > 0;
  return (
    <Card id="sudorese" titulo="Taxa de sudorese e reposição" desc="Pese sem roupa antes e depois do treino.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Campo label="Peso antes" unit="kg" value={pre} onChange={setPre} />
        <Campo label="Peso depois" unit="kg" value={pos} onChange={setPos} />
        <Campo label="Duração" unit="min" value={min} onChange={setMin} />
        <Campo label="Bebeu" unit="mL" value={beb} onChange={setBeb} placeholder="0" />
        <Campo label="Urina" unit="mL" value={uri} onChange={setUri} placeholder="0" />
      </div>
      {ok && (
        <Resultado>
          Suor: <Num>{f(perda / 1000, 2)} L</Num> → <Num>{f(taxa / 1000, 2)} L/h</Num> · perda de peso <Num>{f(pct, 1)}%</Num>{pct > 2 && <> (acima de 2%: desempenho cai)</>}
          <br />Repor após: <Num>{f((n(pre) - n(pos)) * 1.25, 1)}–{f((n(pre) - n(pos)) * 1.5, 1)} L</Num> com sódio.
          <br />Próximos treinos: beber cerca de <Num>{f((taxa / 1000) * 0.8, 2)} L/h</Num> (sem ultrapassar a perda).
        </Resultado>
      )}
    </Card>
  );
}

const PCT = [[1, 100], [2, 95], [3, 93], [4, 90], [5, 87], [6, 85], [7, 83], [8, 80], [9, 77], [10, 75], [12, 70], [15, 67]];

function UmRM() {
  const [carga, setCarga] = useState(""); const [reps, setReps] = useState("");
  const w = n(carga), r = n(reps);
  const epley = w * (1 + r / 30); const brzycki = r < 37 ? (w * 36) / (37 - r) : NaN;
  const rm = r === 1 ? w : (epley + brzycki) / 2;
  return (
    <Card id="rm1" titulo="1RM estimada e cargas por repetição" desc="Epley e Brzycki (mais precisas com até 10 repetições).">
      <div className="grid grid-cols-2 gap-3">
        <Campo label="Carga levantada" unit="kg" value={carga} onChange={setCarga} />
        <Campo label="Repetições até a falha" unit="reps" value={reps} onChange={setReps} />
      </div>
      {w > 0 && r > 0 && (
        <>
          <Resultado>1RM ≈ <Num>{f(rm, 1)} kg</Num> (Epley {f(epley, 1)} · Brzycki {f(brzycki, 1)})</Resultado>
          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-4">
            {PCT.map(([rep, p]) => (
              <div key={rep} className="rounded-lg border border-[var(--line)] px-2.5 py-1.5 text-center">
                <p className="oh-mono text-[11px] text-[#8C9AB0]">{rep} rep · {p}%</p>
                <p className="oh-mono text-[14px] font-bold text-[#7FE7EE]">{f((rm * p) / 100, 1)} kg</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}

const ZONAS = [
  { z: "Z1 Recuperação", a: 0.5, b: 0.6 }, { z: "Z2 Aeróbio leve", a: 0.6, b: 0.7 }, { z: "Z3 Moderado", a: 0.7, b: 0.8 },
  { z: "Z4 Limiar", a: 0.8, b: 0.9 }, { z: "Z5 Máximo", a: 0.9, b: 1 },
];

function ZonasFC() {
  const [idade, setIdade] = useState(""); const [rep, setRep] = useState(""); const [max, setMax] = useState("");
  const fcmax = n(max) > 0 ? n(max) : 208 - 0.7 * n(idade);
  const fcr = fcmax - n(rep);
  return (
    <Card id="fc" titulo="Zonas de frequência cardíaca" desc="Karvonen (reserva de FC). FC máx. estimada por Tanaka (208 − 0,7 × idade) se não informada.">
      <div className="grid grid-cols-3 gap-3">
        <Campo label="Idade" unit="anos" value={idade} onChange={setIdade} />
        <Campo label="FC repouso" unit="bpm" value={rep} onChange={setRep} />
        <Campo label="FC máx." unit="bpm" value={max} onChange={setMax} placeholder="opcional" />
      </div>
      {fcmax > 0 && n(rep) > 0 && Number.isFinite(fcr) && (
        <>
          <Resultado>FC máx.: <Num>{f(fcmax, 0)} bpm</Num> · reserva: <Num>{f(fcr, 0)} bpm</Num></Resultado>
          <ul className="mt-3 divide-y divide-[var(--line)] rounded-xl border border-[var(--line)]">
            {ZONAS.map((z) => (
              <li key={z.z} className="flex items-center justify-between px-3 py-2 text-[13.5px]">
                <span className="text-[#DCE3EE]">{z.z} <span className="text-[#8C9AB0]">({z.a * 100}–{z.b * 100}%)</span></span>
                <span className="oh-mono font-bold text-[#7FE7EE]">{f(n(rep) + fcr * z.a, 0)}–{f(n(rep) + fcr * z.b, 0)} bpm</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}

function Carga() {
  const [s, setS] = useState(["", "", "", ""]);
  const [rpe, setRpe] = useState(""); const [min, setMin] = useState("");
  const vals = s.map(n);
  const ok = vals.every((v) => v > 0);
  const aguda = vals[3]; const cronica = vals.reduce((a, b) => a + b, 0) / 4;
  const r = aguda / cronica;
  return (
    <Card id="carga" titulo="Carga de treino (sRPE e ACWR)" desc="Carga da sessão = RPE (0–10) × minutos. ACWR = semana atual ÷ média das 4 semanas.">
      <div className="grid grid-cols-2 gap-3">
        <Campo label="RPE da sessão" unit="0–10" value={rpe} onChange={setRpe} />
        <Campo label="Duração" unit="min" value={min} onChange={setMin} />
      </div>
      {n(rpe) > 0 && n(min) > 0 && <Resultado>Carga da sessão: <Num>{f(n(rpe) * n(min), 0)} UA</Num></Resultado>}
      <p className="mt-4 mb-1.5 text-[12px] text-[#A3B1C6]">Carga semanal (soma das sessões), da mais antiga para a atual</p>
      <div className="grid grid-cols-4 gap-2">
        {s.map((v, i) => (
          <Campo key={i} label={i === 3 ? "Atual" : `Sem. ${i + 1}`} value={v} onChange={(x) => setS(s.map((y, j) => (j === i ? x : y)))} />
        ))}
      </div>
      {ok && (
        <Resultado>
          ACWR = <Num>{f(r, 2)}</Num> → {r < 0.8 ? "carga abaixo do habitual (destreino)" : r <= 1.3 ? "faixa usualmente considerada segura" : r <= 1.5 ? "atenção: aumento rápido de carga" : "pico de carga — maior risco de lesão"}.
        </Resultado>
      )}
    </Card>
  );
}

function Dobras() {
  const [sexo, setSexo] = useState<Sexo>("m");
  const [idade, setIdade] = useState(""); const [peso, setPeso] = useState("");
  const [d1, setD1] = useState(""); const [d2, setD2] = useState(""); const [d3, setD3] = useState("");
  const S = n(d1) + n(d2) + n(d3); const a = n(idade);
  const D = sexo === "m"
    ? 1.10938 - 0.0008267 * S + 0.0000016 * S * S - 0.0002574 * a
    : 1.0994921 - 0.0009929 * S + 0.0000023 * S * S - 0.0001392 * a;
  const pg = 495 / D - 450;
  const labels = sexo === "m" ? ["Peitoral", "Abdominal", "Coxa"] : ["Tríceps", "Suprailíaca", "Coxa"];
  return (
    <Card id="dobras" titulo="Percentual de gordura (3 dobras)" desc="Jackson-Pollock 3 dobras + equação de Siri. Medidas em mm, lado direito.">
      <Opcoes value={sexo} onChange={setSexo} items={[{ v: "m", l: "Masculino" }, { v: "f", l: "Feminino" }]} />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Campo label="Idade" unit="anos" value={idade} onChange={setIdade} />
        <Campo label="Peso" unit="kg" value={peso} onChange={setPeso} />
        <Campo label={labels[0]} unit="mm" value={d1} onChange={setD1} />
        <Campo label={labels[1]} unit="mm" value={d2} onChange={setD2} />
        <Campo label={labels[2]} unit="mm" value={d3} onChange={setD3} />
      </div>
      {S > 0 && a > 0 && Number.isFinite(pg) && (
        <Resultado>
          Gordura: <Num>{f(pg, 1)}%</Num>
          {n(peso) > 0 && <> · massa gorda <Num>{f((n(peso) * pg) / 100, 1)} kg</Num> · massa magra <Num>{f(n(peso) * (1 - pg / 100), 1)} kg</Num> (use em Cunningham)</>}
        </Resultado>
      )}
    </Card>
  );
}

export const CALC_ESP = [
  { id: "gasto", l: "Gasto energético" }, { id: "macros", l: "Macros" }, { id: "dobras", l: "% gordura" },
  { id: "sudorese", l: "Sudorese" }, { id: "rm1", l: "1RM" }, { id: "fc", l: "Zonas de FC" }, { id: "carga", l: "Carga/ACWR" },
];

export function CalcEsporte() {
  return (
    <div>
      <nav className="mb-4 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Ir para calculadora">
        {CALC_ESP.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="shrink-0 rounded-full border border-[var(--line)] px-3 py-1.5 text-[12.5px] text-[#C9D3E1] hover:border-[#38D5E0]/40 hover:text-white">{c.l}</a>
        ))}
      </nav>
      <div className="grid gap-4 lg:grid-cols-2">
        <Gasto /><Macros /><Dobras /><Sudorese /><UmRM /><ZonasFC /><Carga />
      </div>
    </div>
  );
}
