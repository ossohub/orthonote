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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Hero ---
function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" style={{ background: "#060F1E" }}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14,165,233,0.06) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glows */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />

      <div className="ossohub-container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 mb-8">
            <Star className="h-3.5 w-3.5" />
            A rede que a ortopedia brasileira precisava
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
            Compartilhe conhecimento.{" "}
            <span style={{ background: "linear-gradient(135deg,#10B981,#0EA5E9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Evolua junto.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            OssoHub é a rede profissional exclusiva para ortopedistas brasileiros.
            Publique casos clínicos, discuta artigos e conecte-se com especialistas
            de todo o Brasil — com sistema de recompensa por contribuição.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="btn-teal border-0">
              <Link href="/signup">
                Criar conta gratuita
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline"
              className="border-white/15 text-white hover:bg-white/8 hover:text-white bg-transparent"
              asChild
            >
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t pt-10"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {[
              { value: "100%", label: "Verificados por CRM" },
              { value: "Gratuito", label: "Para sempre" },
              { value: "LGPD", label: "Compliant" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
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
    <section className="ossohub-section" style={{ background: "#060F1E" }}>
      <div className="ossohub-container">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1 text-xs font-semibold text-sky-400 mb-4 uppercase tracking-wider">
            Como funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
            Simples. Profissional. <span className="text-gradient">Recompensador.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Em 4 passos você começa a contribuir e se destacar na maior rede de ortopedistas do Brasil.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="ossohub-card p-6 group cursor-default">
              <div className="text-5xl font-black mb-4 leading-none"
                style={{ color: "rgba(14,165,233,0.15)" }}>
                {step}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <Icon className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm"
                style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
                {title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
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
    <section className="ossohub-section ossohub-canvas">
      <div className="ossohub-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Benefícios */}
          <div>
            <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-400 mb-4 uppercase tracking-wider">
              Por que OssoHub
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
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
            <span className="inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1 text-xs font-semibold text-sky-400 mb-4 uppercase tracking-wider">
              Sistema de Recompensa
            </span>
            <h2 className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
              Quanto mais você contribui,
              <br />
              <span className="text-gradient">mais você cresce</span>
            </h2>
            <p className="text-slate-400 mb-8">
              Publique casos, comente, receba likes e suba na hierarquia da ortopedia brasileira.
            </p>

            <div className="space-y-3">
              {LEVELS.map(({ level, name, xp, color }) => (
                <div
                  key={level}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{
                    background: "rgba(10,22,40,0.7)",
                    border: "1px solid rgba(14,165,233,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${color}`}>
                    {level}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{name}</div>
                    <div className="text-xs text-slate-500">{xp}</div>
                  </div>
                  <Bone className="h-4 w-4" style={{ color: "rgba(14,165,233,0.3)" }} />
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
    <section className="ossohub-section" style={{ background: "#060F1E" }}>
      <div className="ossohub-container text-center">
        {/* Glow */}
        <div className="relative inline-block w-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)" }} />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}>
              Pronto para fazer parte?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
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
    <footer className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#060F1E" }}>
      <div className="ossohub-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        {/* Logo original mantida */}
        <div className="flex items-center">
          <img src="/logo.png" alt="OssoHub" className="ossohub-logo h-8 w-auto" />
        </div>
        <p className="text-slate-600">© 2024 OssoHub — Todos os direitos reservados</p>
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
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </>
  );
}
