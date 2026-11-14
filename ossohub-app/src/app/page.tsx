import Link from "next/link";
import {
  Bone,
  BookOpen,
  Trophy,
  Users,
  Shield,
  ArrowRight,
  Star,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Baby,
  Stethoscope,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Visual do herói: filme de raio-X na caixa de luz ---
function LightboxFilm() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] aspect-[4/5]" aria-hidden>
      {/* caixa de luz */}
      <div className="absolute -inset-6 rounded-[36px] blur-2xl"
        style={{ background: "radial-gradient(closest-side, rgba(56,213,224,0.28), transparent)" }} />
      <div className="relative h-full rounded-[28px] border border-[rgba(127,231,238,0.25)] p-3"
        style={{ background: "linear-gradient(180deg,#DDF7F8 0%,#BFEFF2 100%)", boxShadow: "0 30px 80px -20px rgba(56,213,224,0.45)" }}>
        {/* filme */}
        <div className="relative h-full overflow-hidden rounded-[20px]"
          style={{ background: "radial-gradient(120% 90% at 50% 40%, #1A2A40 0%, #070D18 75%)" }}>
          <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="osso" x1="0" x2="1">
                <stop offset="0" stopColor="#9FB3C8" stopOpacity="0.55" />
                <stop offset="0.5" stopColor="#F3ECDD" stopOpacity="0.95" />
                <stop offset="1" stopColor="#9FB3C8" stopOpacity="0.55" />
              </linearGradient>
              <filter id="brilho"><feGaussianBlur stdDeviation="1.4" /></filter>
            </defs>
            {/* fêmur */}
            <g filter="url(#brilho)" fill="url(#osso)">
              <circle cx="78" cy="38" r="15" />
              <path d="M88 46 C96 52 100 58 101 66 L104 150 C104 158 108 162 116 168 C126 175 128 186 118 192 C108 197 100 192 92 194 C84 196 76 198 70 190 C64 182 70 174 80 168 C88 162 90 158 90 150 L88 70 Z" />
              {/* tíbia */}
              <path d="M76 204 C84 200 108 200 116 204 C118 210 112 214 108 220 L106 248 L92 248 L90 220 C84 214 74 210 76 204 Z" />
            </g>
            {/* placa e parafusos (síntese) */}
            <rect x="104" y="96" width="5" height="54" rx="2" fill="#E8FDFF" opacity="0.9" />
            {[104, 116, 128, 140].map((y) => (
              <rect key={y} x="86" y={y} width="23" height="2.4" rx="1" fill="#E8FDFF" opacity="0.85" />
            ))}
          </svg>
          {/* marcadores do filme */}
          <span className="oh-mono absolute left-3 top-3 rounded bg-white/90 px-1.5 text-[11px] font-bold text-[#070D18]">E</span>
          <span className="oh-mono absolute right-3 top-3 text-[10px] tracking-[0.14em] text-[#A3B1C6]">OSSOHUB · AP</span>
          <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between">
            <div className="flex gap-[3px]">
              {Array.from({ length: 14 }).map((_, k) => (
                <span key={k} className="w-px bg-[#7FE7EE]/60" style={{ height: k % 5 === 0 ? 12 : 6 }} />
              ))}
            </div>
            <span className="oh-mono text-[10px] text-[#7FE7EE]">5 cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Hero ---
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="ossohub-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(127,231,238,0.3)] bg-[rgba(56,213,224,0.08)] px-4 py-1.5 text-sm text-[#7FE7EE] mb-8">
              <Star className="h-3.5 w-3.5" />
              A rede que a ortopedia brasileira precisava
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-white leading-[1.05] mb-6">
              Compartilhe conhecimento.{" "}
              <span className="text-gradient">Evolua junto.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A3B1C6] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              OssoHub é a rede profissional exclusiva para ortopedistas brasileiros.
              Publique casos clínicos, discuta artigos e conecte-se com especialistas
              de todo o Brasil — com sistema de recompensa por contribuição.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" asChild className="btn-teal border-0">
                <Link href="/signup">
                  Criar conta gratuita
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline"
                className="border-white/20 text-white hover:bg-white/[0.06] hover:text-white bg-transparent"
                asChild
              >
                <Link href="/login">Já tenho conta</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-8 max-w-xl mx-auto lg:mx-0">
              {[
                { value: "100%", label: "Verificados por CRM" },
                { value: "Gratuito", label: "Para sempre" },
                { value: "LGPD", label: "Compliant" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="oh-mono text-xl sm:text-2xl font-bold text-[#7FE7EE]">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-[#A3B1C6] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <LightboxFilm />
        </div>
      </div>
    </section>
  );
}

// --- Áreas (ferramentas reunidas) ---
const AREAS = [
  { marker: "AD", icon: Bone, title: "Ortopedia Adulto", desc: "Classificações, vias de acesso, exame físico, calculadora, algoritmos, conteúdo e anatomia 3D." },
  { marker: "PD", icon: Baby, title: "Pediatria", desc: "Prescrição pediátrica por peso com diluições EV, classificações e conteúdo da criança." },
  { marker: "CX", icon: Stethoscope, title: "Consultório", desc: "Anamnese, documentos médicos, textos salvos e ferramentas de PDF." },
  { marker: "ED", icon: GraduationCap, title: "Estudos & Desempenho", desc: "Banco de questões, flashcards, cronograma e análise do seu desempenho." },
];

function AreasSection() {
  return (
    <section className="ossohub-section pt-0">
      <div className="ossohub-container">
        <div className="mb-10 text-center">
          <span className="oh-eyebrow mb-4">Ferramentas integradas</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Tudo do dia a dia do ortopedista, <span className="text-gradient">em 4 áreas</span>
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map(({ marker, icon: Icon, title, desc }) => (
            <div key={title} className="oh-hub-card">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(56,213,224,0.1)] text-[#7FE7EE]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="oh-marker bg-white/[0.06] text-[#EADFC8]">{marker}</span>
              </div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-[#A3B1C6]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Como funciona ---
const STEPS = [
  {
    step: "01",
    icon: Shield,
    title: "Cadastre-se com seu CRM",
    desc: "Somente ortopedistas verificados. Seu CRM garante que a rede mantém a qualidade e seriedade que a medicina exige.",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Publique casos e artigos",
    desc: "Compartilhe casos clínicos (anonimizados), resumos de artigos, experiências cirúrgicas e tire dúvidas com colegas.",
  },
  {
    step: "03",
    icon: Trophy,
    title: "Ganhe XP e suba de nível",
    desc: "Cada publicação e comentário construtivo gera XP. Suba de Aprendiz a Lenda da Ortopedia e conquiste badges exclusivos.",
  },
  {
    step: "04",
    icon: Users,
    title: "Conecte-se com especialistas",
    desc: "Siga colegas, filtre por subspecialidade e construa sua rede profissional dentro da ortopedia brasileira.",
  },
];

function HowItWorksSection() {
  return (
    <section className="ossohub-section">
      <div className="ossohub-container">
        <div className="text-center mb-14">
          <span className="oh-eyebrow mb-4">Como funciona</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simples. Profissional. <span className="text-gradient">Recompensador.</span>
          </h2>
          <p className="text-[#A3B1C6] max-w-xl mx-auto">
            Em 4 passos você começa a contribuir e se destacar na maior rede de ortopedistas do Brasil.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="ossohub-card p-6 group cursor-default">
              <div className="oh-mono text-4xl font-bold mb-4 leading-none text-[rgba(127,231,238,0.28)]">
                {step}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <Icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">
                {title}
              </h3>
              <p className="text-sm text-[#A3B1C6] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Benefícios ---
const BENEFITS = [
  { icon: BookOpen, text: "Casos clínicos com template estruturado e revisão por pares" },
  { icon: MessageSquare, text: "Comentários threaded em tempo real com colegas especialistas" },
  { icon: TrendingUp, text: "Sistema de XP justo que reconhece quem mais contribui" },
  { icon: Shield, text: "Anonimização automática — nenhum dado de paciente exposto" },
  { icon: Users, text: "Filtro por subspecialidade: Ombro, Joelho, Coluna, Quadril e mais" },
  { icon: Trophy, text: "Badges exclusivos: Case Publisher, Mentor Ativo, Lenda do Ombro..." },
];

// --- Gamificação Teaser ---
const LEVELS = [
  { level: 1, name: "Aprendiz",     xp: "0–150 XP",    color: "level-aprendiz" },
  { level: 2, name: "Residente",    xp: "151–400 XP",  color: "level-residente" },
  { level: 3, name: "Especialista", xp: "401–800 XP",  color: "level-especialista" },
  { level: 4, name: "Mestre",       xp: "801–1500 XP", color: "level-mestre" },
  { level: 5, name: "Lenda",        xp: "1501+ XP",    color: "level-lenda" },
];

function BenefitsSection() {
  return (
    <section className="ossohub-section">
      <div className="ossohub-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Benefícios */}
          <div>
            <span className="oh-eyebrow mb-4">Por que OssoHub</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Feito por ortopedistas,{" "}
              <span className="text-gradient">para ortopedistas</span>
            </h2>
            <div className="space-y-4">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gamificação Teaser */}
          <div>
            <span className="oh-eyebrow mb-4">Sistema de Recompensa</span>
            <h2 className="text-3xl font-bold text-white mb-2">
              Quanto mais você contribui,
              <br />
              <span className="text-gradient">mais você cresce</span>
            </h2>
            <p className="text-[#A3B1C6] mb-8">
              Publique casos, comente, receba likes e suba na hierarquia da ortopedia brasileira.
            </p>

            <div className="space-y-3">
              {LEVELS.map(({ level, name, xp, color }) => (
                <div
                  key={level}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ background: "rgba(13,25,44,0.85)", border: "1px solid var(--line)" }}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${color}`}>
                    {level}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{name}</div>
                    <div className="text-xs text-[#A3B1C6]">{xp}</div>
                  </div>
                  <Bone className="h-4 w-4 text-[rgba(127,231,238,0.4)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CTA Final ---
function CTASection() {
  return (
    <section className="ossohub-section">
      <div className="ossohub-container text-center">
        {/* Glow */}
        <div className="relative inline-block w-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(56,213,224,0.10) 0%, transparent 70%)" }} />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para fazer parte?
            </h2>
            <p className="text-[#A3B1C6] mb-8 max-w-xl mx-auto">
              Cadastre-se gratuitamente com seu CRM e comece a compartilhar
              conhecimento com ortopedistas de todo o Brasil.
            </p>
            <Button size="lg" asChild className="btn-teal border-0">
              <Link href="/signup">
                Criar conta grátis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--line)]">
      <div className="ossohub-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#A3B1C6]">
        {/* Logo original mantida */}
        <div className="flex items-center">
          <img src="/logo.webp" alt="OssoHub" className="ossohub-logo h-8 w-auto" />
        </div>
        <p className="text-[#8C9AB0]">© {new Date().getFullYear()} OssoHub — Todos os direitos reservados</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacidade</Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">Termos</Link>
        </div>
      </div>
    </footer>
  );
}

// --- Page ---
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AreasSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </>
  );
}
