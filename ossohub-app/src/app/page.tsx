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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Hero ---
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ossohub-navy py-24 sm:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-ossohub-green/10 blur-3xl pointer-events-none" />

      <div className="ossohub-container relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-ossohub-green/30 bg-ossohub-green/10 px-4 py-1.5 text-sm text-ossohub-green mb-8">
            <Star className="h-3.5 w-3.5" />
            A rede que a ortopedia brasileira precisava
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Compartilhe conhecimento.{" "}
            <span className="text-ossohub-green">Evolua junto.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            OssoHub é a rede profissional exclusiva para ortopedistas brasileiros.
            Publique casos clínicos, discuta artigos e conecte-se com especialistas
            de todo o Brasil — com sistema de recompensa por contribuição.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Criar conta gratuita
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline"
              className="border-slate-600 text-white hover:bg-white/10 hover:text-white bg-transparent"
              asChild
            >
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-slate-700 pt-10">
            {[
              { value: "100%", label: "Verificados por CRM" },
              { value: "Gratuito", label: "Para sempre" },
              { value: "LGPD", label: "Compliant" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-ossohub-green">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
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
    <section className="ossohub-section bg-white">
      <div className="ossohub-container">
        <div className="text-center mb-14">
          <Badge variant="green-light" className="mb-4">Como funciona</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-ossohub-navy mb-4">
            Simples. Profissional. Recompensador.
          </h2>
          <p className="text-ossohub-slate max-w-xl mx-auto">
            Em 4 passos você começa a contribuir e se destacar na maior rede de ortopedistas do Brasil.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, icon: Icon, title, desc }) => (
            <Card key={step} className="relative p-6 hover:border-ossohub-green/40 transition-colors">
              <CardContent className="p-0">
                <div className="text-5xl font-black text-slate-100 mb-4 leading-none">{step}</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ossohub-green-light mb-4">
                  <Icon className="h-5 w-5 text-ossohub-green-dark" />
                </div>
                <h3 className="font-semibold text-ossohub-navy mb-2">{title}</h3>
                <p className="text-sm text-ossohub-slate leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
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
  { level: 1, name: "Aprendiz", xp: "0–150 XP", color: "level-aprendiz" },
  { level: 2, name: "Residente", xp: "151–400 XP", color: "level-residente" },
  { level: 3, name: "Especialista", xp: "401–800 XP", color: "level-especialista" },
  { level: 4, name: "Mestre", xp: "801–1500 XP", color: "level-mestre" },
  { level: 5, name: "Lenda", xp: "1501+ XP", color: "level-lenda" },
];

function BenefitsSection() {
  return (
    <section className="ossohub-section bg-ossohub-bg-light">
      <div className="ossohub-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Benefícios */}
          <div>
            <Badge variant="green-light" className="mb-4">Por que OssoHub</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-ossohub-navy mb-6">
              Feito por ortopedistas,{" "}
              <span className="text-ossohub-green">para ortopedistas</span>
            </h2>
            <div className="space-y-4">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-ossohub-green mt-0.5 shrink-0" />
                  <p className="text-ossohub-slate">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gamificação Teaser */}
          <div>
            <Badge variant="green-light" className="mb-4">Sistema de Recompensa</Badge>
            <h2 className="text-3xl font-bold text-ossohub-navy mb-2">
              Quanto mais você contribui,
              <br />
              <span className="text-ossohub-green">mais você cresce</span>
            </h2>
            <p className="text-ossohub-slate mb-8">
              Publique casos, comente, receba likes e suba na hierarquia da ortopedia brasileira.
            </p>

            <div className="space-y-3">
              {LEVELS.map(({ level, name, xp, color }) => (
                <div
                  key={level}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 bg-white"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${color}`}>
                    {level}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-ossohub-navy text-sm">{name}</div>
                    <div className="text-xs text-ossohub-slate">{xp}</div>
                  </div>
                  <Bone className="h-4 w-4 text-slate-300" />
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
    <section className="ossohub-section bg-ossohub-navy">
      <div className="ossohub-container text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Pronto para fazer parte?
        </h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Cadastre-se gratuitamente com seu CRM e comece a compartilhar
          conhecimento com ortopedistas de todo o Brasil.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">
            Criar conta grátis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="ossohub-container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ossohub-slate">
        <div className="flex items-center gap-2 font-semibold text-ossohub-navy">
          <Bone className="h-4 w-4 text-ossohub-green" />
          OssoHub
        </div>
        <p>© 2024 OssoHub — Todos os direitos reservados</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-ossohub-navy transition-colors">Privacidade</Link>
          <Link href="/terms" className="hover:text-ossohub-navy transition-colors">Termos</Link>
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
