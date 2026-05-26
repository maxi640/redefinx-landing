"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Sparkles,
  ArrowRight,
  Play,
  Send,
  Check,
  Activity,
  Shield,
  Coins,
  TrendingUp,
  Wallet,
  Globe,
  ChevronRight,
  Database,
  ArrowRightLeft,
  Lock,
  Layers,
  FileSpreadsheet,
  Building
} from "lucide-react";

import BrandCustomizer from "@/components/BrandCustomizer";
import ArchitecturePlayground from "@/components/ArchitecturePlayground";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  
  // 1. Scroll-Reveal Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px -50px -50px 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  // 2. Mouse Spotlight Tracker on Hover for Premium Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // 3. Hero Interactive 3D Convergence Card State and Frictional Physics
  const [cardStyle, setCardStyle] = useState({
    transform: "rotateX(0deg) rotateY(0deg)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize position -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Calculate 3D rotations (max 22 degrees)
    const rotateX = -normalizedY * 22;
    const rotateY = normalizedX * 22;
    
    setCardStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      boxShadow: `0 40px 80px -20px rgba(19, 109, 236, 0.4), ${normalizedX * 15}px ${normalizedY * 15}px 30px 0px rgba(19, 109, 236, 0.15)`
    });
  };

  const handleCardMouseLeave = () => {
    setCardStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
    });
  };

  // 4. Staking Yield Micro-widget States
  const [liveYield, setLiveYield] = useState(8.42);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveYield(prev => {
        const delta = (Math.random() - 0.5) * 0.15;
        const next = prev + delta;
        return Number(Math.max(6.2, Math.min(11.9, next)).toFixed(2));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 5. Swap stablecoin rates oscillation
  const [fiatRate, setFiatRate] = useState(1325.50);
  useEffect(() => {
    const interval = setInterval(() => {
      setFiatRate(prev => {
        const delta = (Math.random() - 0.5) * 1.5;
        return Number((prev + delta).toFixed(2));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 6. Accordion active step for PSAVaaS operation
  const [activeStep, setActiveStep] = useState<number>(0);

  // 7. Interactive Tokenizer state
  const [tokenizedAssetsCount, setTokenizedAssetsCount] = useState<number>(1429);
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenizedAssetsCount(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-primary-brand/30 selection:text-white transition-colors duration-500">
      
      {/* Absolute Ambient Mesh Glows for Visual Depth */}
      <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] rounded-full glow-orb-primary opacity-30 pointer-events-none -translate-y-1/2" />
      <div className="absolute top-[25%] right-1/4 w-[900px] h-[900px] rounded-full glow-orb-secondary opacity-25 pointer-events-none" />
      <div className="absolute top-[50%] left-1/3 w-[1000px] h-[1000px] rounded-full glow-orb-primary opacity-20 pointer-events-none" />
      <div className="absolute bottom-[5%] right-1/4 w-[900px] h-[900px] rounded-full glow-orb-secondary opacity-15 pointer-events-none" />

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 w-full z-50 glass-panel border-x-0 border-t-0 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <a href="#" className="cursor-pointer select-none">
            <img 
              src="/imagotipo.png" 
              alt="reDeFinX Logo" 
              className="h-8 w-auto object-contain hover:scale-[1.02] transition-transform dark:block hidden" 
            />
            <img 
              src="/imagotipo_blue.png" 
              alt="reDeFinX Logo" 
              className="h-8 w-auto object-contain hover:scale-[1.02] transition-transform dark:hidden block" 
            />
          </a>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#pilares" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Pilares
            </a>
            <a href="#marca-blanca" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Marca Blanca
            </a>
            <a href="#arquitectura" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Arquitectura
            </a>
            <a href="#soluciones" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Soluciones
            </a>
            <a href="#operacion" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Operación
            </a>
            <a href="#ecosistema" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Ecosistema
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a 
              href="#contacto" 
              className="bg-primary-brand/10 border border-primary-brand/20 hover:bg-primary-brand text-primary-brand hover:text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shimmer-btn"
            >
              Hablemos
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH DYNAMIC 3D DEBIT CARD */}
      <section className="relative pt-36 pb-28 overflow-hidden flex items-center justify-center min-h-[92vh] reveal-section revealed">
        {/* Background Corporate Facade with ultra-elegant blending */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/fachada.png" 
            alt="reDeFinX Corporate Facade" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-10 dark:opacity-20"
          />
          {/* Extremely smooth layered gradients for 3D depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/85 to-background transition-all duration-500" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Texts (7 cols) */}
          <div className="lg:col-span-7 space-y-10 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2.5 bg-primary-brand/5 border border-primary-brand/25 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(19,109,236,0.15)]">
              <span className="w-2 h-2 rounded-full bg-primary-brand animate-pulse" />
              <span className="text-primary-brand text-[9px] font-bold uppercase tracking-[0.2em] font-mono">
                Infraestructura de Convergencia
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6.5xl font-black text-foreground tracking-tight leading-[1.06] transition-colors duration-500">
              La Suite Financiera Institucional para la{" "}
              <span className="bg-gradient-to-r from-primary-brand to-secondary-brand bg-clip-text text-transparent drop-shadow-sm">
                Convergencia
              </span>
              .
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed max-w-2xl font-light">
              El punto de encuentro donde la solidez y cumplimiento de la banca tradicional se integra con la eficiencia de los activos digitales. Una suite unificada, marca blanca e inmutable.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
              <a 
                href="#soluciones" 
                className="bg-primary-brand hover:bg-primary-brand/90 text-white font-bold px-10 py-4.5 rounded-full text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-primary-brand/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 shimmer-btn"
              >
                <span>Explorar Soluciones</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#contacto" 
                className="text-foreground hover:text-primary-brand font-mono font-bold px-8 py-4.5 text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
              >
                <span>Hablemos</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hero 3D Interactive Card Viewport (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center perspective-container">
            <div 
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={cardStyle}
              className="w-full max-w-[360px] aspect-[1.586] rounded-[24px] bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden select-none interactive-3d-card shadow-2xl animate-float-card cursor-pointer"
            >
              {/* Ambient internal spotlight overlay */}
              <div className="absolute inset-0 bg-radial-gradient from-primary-brand/10 to-transparent pointer-events-none" />

              {/* Card Top */}
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-white/40">Convergence Card</span>
                  <h3 className="text-xs font-black text-white font-mono tracking-wider flex items-center gap-1.5">
                    reDeFinX
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand animate-pulse" />
                  </h3>
                </div>

                {/* Golden chip visual mockup */}
                <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-400/90 via-amber-300/80 to-amber-500/90 border border-amber-300/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30">
                    <div className="border border-slate-950/20" />
                    <div className="border border-slate-950/20" />
                    <div className="border border-slate-950/20" />
                  </div>
                </div>
              </div>

              {/* Card Middle */}
              <div className="relative z-10 space-y-0.5">
                <p className="text-[6.5px] font-mono text-white/35 uppercase tracking-widest">Digital Asset & Fiat Scope</p>
                <p className="text-base font-mono text-white font-bold tracking-widest">
                  4000 1234 5678 9010
                </p>
              </div>

              {/* Card Bottom */}
              <div className="flex justify-between items-end relative z-10 font-mono text-[7px] text-white/60 tracking-wider">
                <div>
                  <p className="text-white/30 text-[5px] uppercase mb-0.5">Cardholder</p>
                  <p className="font-bold">reDeFinX Corporate</p>
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-[5px] uppercase mb-0.5">Exp Date</p>
                  <p className="font-bold">12 / 29</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LOS TRES PILARES DE LA CONVERGENCIA (POMELO ASYMMETRIC BENTO GRID) */}
      <section id="pilares" className="py-28 relative reveal-section">
        <div className="max-w-7xl mx-auto px-8 space-y-6">
          
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Pilar 1 (Left Asymmetric - takes 7 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-7 premium-card p-10 flex flex-col justify-between space-y-8 cursor-default bento-unequal-height-1"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 relative z-10">
                <div className="text-[10px] font-mono text-primary-brand uppercase tracking-widest font-black">01 / Rieles Fiat</div>
                <h3 className="text-2xl font-bold text-foreground">Estabilidad y Confianza Bancaria</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">
                  Integración profunda con sistemas bancarios core y normativas tradicionales. Garantiza la conciliación legal y la robustez regulatoria de grado institucional.
                </p>
              </div>
              
              {/* Dynamic Live SVG transaction ripple chart inside card */}
              <div className="relative h-28 w-full border border-white/5 bg-background/40 rounded-2xl overflow-hidden flex items-end p-2.5 z-10">
                <div className="absolute top-2.5 left-3 flex items-center gap-1.5 font-mono text-[7.5px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Rieles Activos (Compensación Instantánea)
                </div>
                <svg className="w-full h-16 opacity-30 dark:opacity-40" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path
                    d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,20"
                    fill="none"
                    stroke="var(--tenant-primary)"
                    strokeWidth="3"
                    className="flow-path-dashed"
                  />
                </svg>
              </div>
            </div>

            {/* Pilar 2 (Right Asymmetric - takes 5 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-5 premium-card p-10 flex flex-col justify-between border-primary-brand/20 shadow-[0_0_30px_rgba(19,109,236,0.08)] cursor-default bento-unequal-height-1"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="text-[10px] font-mono text-primary-brand uppercase tracking-widest font-black">02 / Convergencia</div>
                  <span className="bg-primary-brand/10 text-primary-brand text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">Activo</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">El Nexo Transaccional</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">
                  El mercado evolucionó de la experimentación a la necesidad de infraestructura real. Conectamos la tesorería corporativa y los rieles fiat tradicionales con la liquidez digital.
                </p>
              </div>
              
              {/* Abstract glowing database connection nodes */}
              <div className="relative h-28 w-full border border-white/5 bg-background/40 rounded-2xl flex items-center justify-center gap-12 z-10">
                <div className="flex flex-col items-center">
                  <Building className="w-6 h-6 text-gray-500" />
                  <span className="text-[7px] text-gray-500 font-mono mt-1">FIAT BANK</span>
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary-brand to-secondary-brand relative flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-primary-brand animate-ping absolute" />
                </div>
                <div className="flex flex-col items-center">
                  <Database className="w-6 h-6 text-primary-brand" />
                  <span className="text-[7px] text-primary-brand font-mono mt-1">reDeFinX CORE</span>
                </div>
              </div>
            </div>

            {/* Pilar 3 (Wide Asymmetric Bottom Card - takes 12 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-12 premium-card p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 cursor-default bento-unequal-height-2"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 max-w-3xl relative z-10">
                <div className="text-[10px] font-mono text-primary-brand uppercase tracking-widest font-black">03 / Infraestructura DeFi</div>
                <h3 className="text-2xl font-bold text-foreground">Eficiencia Blockchain On-Chain</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">
                  Tecnología blockchain auditada, lista para producción. Procesos inmutables que reducen el riesgo de contraparte, automatizan comisiones y eliminan lagunas financieras de tesorería.
                </p>
              </div>
              
              {/* Dynamic APY Counter */}
              <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden min-w-[240px] z-10">
                <span className="text-[7.5px] font-mono uppercase text-muted-foreground tracking-[0.25em] mb-1">Rendimiento DeFi Corporativo</span>
                <span className="text-4xl font-black text-emerald-400 font-mono tracking-tight leading-none animate-pulse">
                  {liveYield}% <span className="text-xs text-muted-foreground uppercase font-bold">APY</span>
                </span>
                <span className="text-[6.5px] font-mono text-gray-500 uppercase mt-2">Protocolos Auditados RWA</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MÓDULO INTERACTIVO 01: BRAND CUSTOMIZER */}
      <section id="marca-blanca" className="py-28 relative overflow-hidden reveal-section">
        <div id="sandbox" />
        {/* Local Background Ambient Orb to make components Pop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-orb-primary opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10 space-y-20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2.5 bg-primary-brand/5 border border-primary-brand/20 px-3 py-1 rounded-full text-[9px] font-bold text-primary-brand uppercase tracking-widest font-mono">
              Marca Blanca por Diseño
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Tu Marca, Tu Color, Tu Ecosistema.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-md leading-relaxed font-light max-w-2xl mx-auto">
              Nuestra infraestructura es invisible para el cliente final. Personaliza el nombre y la paleta de color a continuación para ver cómo se hidrata todo el ecosistema al instante.
            </p>
          </div>

          <div className="pt-4">
            <BrandCustomizer />
          </div>
        </div>
      </section>

      {/* ARQUITECTURA INTERACTIVA (THE DYNAMIC STACK PLAYGROUND) */}
      <section id="arquitectura" className="py-28 relative reveal-section">
        <div className="max-w-7xl mx-auto px-8">
          <ArchitecturePlayground />
        </div>
      </section>

      {/* LAS 6 CAPACIDADES DEL CORE (POMELO ASYMMETRIC BENTO GRID WITH LIVE ANIMATIONS) */}
      <section id="soluciones" className="py-28 relative reveal-section">
        <div className="max-w-7xl mx-auto px-8 space-y-20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2.5 bg-primary-brand/5 border border-primary-brand/20 px-3 py-1 rounded-full text-[9px] font-bold text-primary-brand uppercase tracking-widest font-mono">
              Capacidades del Core
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Soluciones Modulares e Integradas
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-xl mx-auto">
              Una suite integrada de productos diseñados para responder a todas las aristas de tu estrategia digital.
            </p>
          </div>

          {/* Premium Asymmetric Bento Grid of Core Capabilities */}
          <div className="grid lg:grid-cols-12 gap-8 pt-6">
            
            {/* 1. Tokenización (Asymmetric Wide - 7 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-7 premium-card p-8 flex flex-col justify-between min-h-[300px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="grid md:grid-cols-12 gap-6 items-center relative z-10 h-full">
                <div className="md:col-span-7 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 border border-primary-brand/20 flex items-center justify-center text-primary-brand shadow-md">
                    <Globe className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Tokenización (RWA)</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    Emisión y representación digital de activos del mundo real (deuda, commodities, bienes raíces) con compliance on-chain y liquidación instantánea.
                  </p>
                </div>
                
                {/* Visual Asset Minting Simulator */}
                <div className="md:col-span-5 border border-white/5 bg-background/55 rounded-2xl p-4.5 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full border border-dashed border-primary-brand/40 flex items-center justify-center text-primary-brand animate-spin-slow">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[7px] text-gray-500 font-mono uppercase block">Activos Mintados en vivo</span>
                    <span className="text-sm font-mono font-bold text-white tracking-wide">
                      {tokenizedAssetsCount} RWA scope
                    </span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[6px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Inmutable on-chain</span>
                </div>
              </div>
            </div>

            {/* 2. Stablecoins & Pagos (Asymmetric Narrow - 5 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-5 premium-card p-8 flex flex-col justify-between min-h-[300px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-5 relative z-10 flex-1 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 border border-primary-brand/20 flex items-center justify-center text-primary-brand shadow-md">
                    <Coins className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Stablecoins & Pagos</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    Emisión de monedas estables vinculadas a monedas fiat locales (ARS, BRL, USD) y procesamiento de pagos B2C/B2B transparentes y sin fricciones.
                  </p>
                </div>
                
                {/* Conversion Widget Simulator */}
                <div className="bg-background/65 border border-white/5 p-3 rounded-xl flex items-center justify-between text-[9px] font-mono mt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>ARS Stablecoin</span>
                  </div>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-primary-brand" />
                  <div className="text-right text-gray-300">
                    1 USDC = <span className="text-white font-bold">{fiatRate}</span> ARS
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Staking & Yield (Standard Narrow - 4 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-4 premium-card p-8 flex flex-col justify-between min-h-[280px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-5 relative z-10 flex-1 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 border border-primary-brand/20 flex items-center justify-center text-primary-brand shadow-md">
                    <TrendingUp className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Staking & Yield</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    Generación de rendimientos automáticos sobre liquidez corporativa inactiva mediante protocolos DeFi seguros, regulados y auditados de grado institucional.
                  </p>
                </div>
                
                {/* Micro Yield chart simulated */}
                <div className="relative h-12 w-full border border-white/5 bg-background/40 rounded-xl overflow-hidden flex items-end">
                  <svg className="w-full h-8 opacity-20" viewBox="0 0 200 50" preserveAspectRatio="none">
                    <path d="M0,45 Q50,5 100,30 T200,10" fill="none" stroke="#10b981" strokeWidth="2" />
                  </svg>
                  <span className="absolute right-2 top-2.5 font-mono text-[7px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">TNA ~72.4%</span>
                </div>
              </div>
            </div>

            {/* 4. Trading & Conversión (Standard Narrow - 4 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-4 premium-card p-8 flex flex-col justify-between min-h-[280px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-5 relative z-10 flex-1 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 border border-primary-brand/20 flex items-center justify-center text-primary-brand shadow-md">
                    <Activity className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Trading & Conversión</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    Motores de intercambio instantáneo a tipo de cambio optimizado, conectando rieles fiat y tokens digitales con ruteo de liquidez inteligente y de baja latencia.
                  </p>
                </div>

                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl text-[8.5px] text-muted-foreground font-mono">
                  <span>Ruta fiduciaria activa</span>
                  <span className="text-primary-brand font-bold">COELSA ➔ ETH L2</span>
                </div>
              </div>
            </div>

            {/* 5. Custodia & Wallets (Standard Narrow - 4 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-4 premium-card p-8 flex flex-col justify-between min-h-[280px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-5 relative z-10 flex-1 flex flex-col justify-between h-full">
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 border border-primary-brand/20 flex items-center justify-center text-primary-brand shadow-md">
                    <Wallet className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Custodia & Bóvedas MPC</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    Bóvedas multi-inquilino de custodia híbrida basadas en claves distribuidas MPC y Smart Accounts auto-gestionadas sin fricción para el usuario final.
                  </p>
                </div>

                {/* Rotating share key mock */}
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl text-[8px] font-mono text-gray-300">
                  <Lock className="w-3.5 h-3.5 text-primary-brand animate-spin-mpc" />
                  <span>Multikey Threshold (2-of-3 MPC keys verified)</span>
                </div>
              </div>
            </div>

            {/* 6. Auditoría & Cumplimiento (Wide Bottom - 12 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-12 premium-card p-8 flex flex-col md:flex-row justify-between items-stretch gap-8 min-h-[240px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 max-w-2xl relative z-10 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-brand/10 border border-primary-brand/20 flex items-center justify-center text-primary-brand shadow-md">
                    <Shield className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Auditoría & Cumplimiento</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed font-light">
                    Trazabilidad inmutable de extremo a extremo, logs de auditoría nativos en la red y reportes fiscales automáticos listos para auditorías financieras reguladas de grado bancario tradicional.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-mono text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  Conexión directa con API fiscal y logs contables inalterables
                </div>
              </div>
              
              {/* Infinite Scrolling compliance logs screen mock */}
              <div className="md:w-80 h-32 border border-white/5 bg-[#080d16] rounded-2xl overflow-hidden p-3 font-mono text-[7px] text-gray-500 relative flex flex-col z-10">
                <div className="absolute top-2 left-3 flex items-center gap-1 text-primary-brand font-bold text-[7.5px] uppercase z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-brand animate-pulse" />
                  Compliance log stream
                </div>
                <div className="absolute inset-0 top-7 px-3 overflow-hidden">
                  <div className="space-y-1 animate-scroll-logs">
                    <div>[INFO] RLS validation active for scoped Tenant...</div>
                    <div className="text-emerald-400">[PASS] Double-entry check balance total = 0.00 ARS</div>
                    <div>[SYNC] Compensating omnibus vault assets with central fids...</div>
                    <div className="text-primary-brand">[MINT] Issued smart_bond #1024 (RWA debt share)</div>
                    <div>[KYC] Verification completed for new white-label member...</div>
                    <div>[INFO] Gas abstraction proxy verified for OAuth login...</div>
                    <div>[INFO] RLS validation active for scoped Tenant...</div>
                    <div className="text-emerald-400">[PASS] Double-entry check balance total = 0.00 ARS</div>
                    <div>[SYNC] Compensating omnibus vault assets with central fids...</div>
                    <div className="text-primary-brand">[MINT] Issued smart_bond #1024 (RWA debt share)</div>
                    <div>[KYC] Verification completed for new white-label member...</div>
                    <div>[INFO] Gas abstraction proxy verified for OAuth login...</div>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#080d16] to-transparent pointer-events-none z-20" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OPERACIÓN (PSAVaaS) WITH ACCORDION AND PREMIUM SPLIT CANVAS */}
      <section id="operacion" className="py-28 relative overflow-hidden reveal-section">
        <div className="max-w-7xl mx-auto px-8 relative z-10 space-y-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column Accordion (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2.5 bg-primary-brand/5 border border-primary-brand/20 px-3 py-1 rounded-full text-[9px] font-bold text-primary-brand uppercase tracking-widest font-mono">
                Esquema de Operación (PSAVaaS)
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Infraestructura Integral para Proveedores
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                Operamos bajo el modelo **PSAV as a Service**, proporcionando una capa técnica completa que resuelve de manera integrada todos tus canales regulatorios y fiduciarios.
              </p>
              
              {/* Pomelo-Style Elastic Interactive Accordion Selector */}
              <div className="space-y-3 pt-3">
                {/* Tab 1 */}
                <button
                  onClick={() => setActiveStep(0)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-start gap-3.5 relative overflow-hidden ${
                    activeStep === 0
                      ? "bg-primary-brand/10 border-primary-brand/40 text-white shadow-[0_0_20px_rgba(19,109,236,0.06)]"
                      : "bg-background border-border-glow hover:border-white/10 text-muted-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all ${activeStep === 0 ? "bg-primary-brand text-white" : "bg-white/5 text-gray-500"}`}>01</div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-foreground">Blindaje Normativo & Compliance</h4>
                    {activeStep === 0 && (
                      <p className="text-[11px] text-muted-foreground font-light leading-relaxed animate-fade-in-up">
                        Estructura fiduciaria y legal que cumple con las regulaciones de activos virtuales, prevención de lavado de dinero (AML) y verificación KYC.
                      </p>
                    )}
                  </div>
                </button>

                {/* Tab 2 */}
                <button
                  onClick={() => setActiveStep(1)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-start gap-3.5 relative overflow-hidden ${
                    activeStep === 1
                      ? "bg-primary-brand/10 border-primary-brand/40 text-white shadow-[0_0_20px_rgba(19,109,236,0.06)]"
                      : "bg-background border-border-glow hover:border-white/10 text-muted-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all ${activeStep === 1 ? "bg-primary-brand text-white" : "bg-white/5 text-gray-500"}`}>02</div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-foreground">Reglas Contables & Sweeps</h4>
                    {activeStep === 1 && (
                      <p className="text-[11px] text-muted-foreground font-light leading-relaxed animate-fade-in-up">
                        Parametrización contable para sweeps automatizados entre balances on-chain y cuentas bancarias omnibus tradicionales de custodia.
                      </p>
                    )}
                  </div>
                </button>

                {/* Tab 3 */}
                <button
                  onClick={() => setActiveStep(2)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-start gap-3.5 relative overflow-hidden ${
                    activeStep === 2
                      ? "bg-primary-brand/10 border-primary-brand/40 text-white shadow-[0_0_20px_rgba(19,109,236,0.06)]"
                      : "bg-background border-border-glow hover:border-white/10 text-muted-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all ${activeStep === 2 ? "bg-primary-brand text-white" : "bg-white/5 text-gray-500"}`}>03</div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-foreground">Orquestación en Capas</h4>
                    {activeStep === 2 && (
                      <p className="text-[11px] text-muted-foreground font-light leading-relaxed animate-fade-in-up">
                        Conciliación fluida y transparente en tiempo real entre la blockchain, el ledger inmutable y los sistemas de transferencias tradicionales.
                      </p>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Right Video Player (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-primary-brand/10 rounded-[2.5rem] filter blur-3xl pointer-events-none" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border-glow shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] bg-slate-950/80 p-2 z-10">
                <iframe 
                  src="https://www.youtube.com/embed/uvCNK9bo4S8" 
                  title="reDeFinX Plataforma en Acción"
                  className="w-full aspect-video rounded-[1.7rem] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSISTEMA (SEGMENTOS OBJETIVOS - SPACIOUS BENTO GRID LAYOUT) */}
      <section id="ecosistema" className="py-28 relative reveal-section">
        <div className="max-w-7xl mx-auto px-8 space-y-20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2.5 bg-primary-brand/5 border border-primary-brand/20 px-3 py-1 rounded-full text-[9px] font-bold text-primary-brand uppercase tracking-widest font-mono">
              Ecosistema Multi-Tenant
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Mercados y Casos de Uso
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-xl mx-auto">
              Nuestra suite se amolda a los requerimientos de compliance y flujos operativos de diversas industrias clave.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 pt-6">
            
            {/* 1. Bancos (Asymmetric - 8 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-8 premium-card p-8 flex flex-col md:flex-row justify-between items-stretch min-h-[220px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-center max-w-lg">
                <h4 className="text-xl font-bold text-foreground border-b border-border-glow/40 pb-2 flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary-brand" />
                  Bancos & Neobancos
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  Permite lanzar productos cripto y cuentas digitales integrados directamente en su Home Banking tradicional y bajo su propia marca.
                </p>
              </div>

              {/* Mock graphical vault representation inside bento */}
              <div className="md:w-56 mt-4 md:mt-0 border border-white/5 bg-background/55 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 relative z-10">
                <Shield className="w-8 h-8 text-emerald-400" />
                <span className="text-[7.5px] font-mono text-gray-500 uppercase tracking-widest block">Bank Grade Security</span>
                <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase">ISO 27001</span>
              </div>
            </div>

            {/* 2. Mercado de Capitales (Narrow - 4 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-4 premium-card p-8 flex flex-col justify-between min-h-[220px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-center h-full">
                <h4 className="text-xl font-bold text-foreground border-b border-border-glow/40 pb-2">Mercado de Capitales</h4>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  Liquidación instantánea on-chain de valores negociables, colateralización de activos digitales y reducción radical en costos de back-office.
                </p>
              </div>
            </div>

            {/* 3. Fintechs & Neopagos (Narrow - 4 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-4 premium-card p-8 flex flex-col justify-between min-h-[220px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-center h-full">
                <h4 className="text-xl font-bold text-foreground border-b border-border-glow/40 pb-2">Fintechs & Neopagos</h4>
                <p className="text-muted-foreground text-xs leading-relaxed font-light font-light">
                  Pasarelas de pagos híbridas, sweep de liquidez automatizado, emisión de stablecoins marca blanca y balances multimoneda sin fricción.
                </p>
              </div>
            </div>

            {/* 4. Agro & Farma (Asymmetric Wide Bottom - 8 cols) */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-8 premium-card p-8 flex flex-col md:flex-row justify-between items-stretch min-h-[220px] cursor-default"
            >
              <div className="card-spotlight" />
              <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-center max-w-lg">
                <h4 className="text-xl font-bold text-foreground border-b border-border-glow/40 pb-2 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-primary-brand" />
                  Agro & Farma
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  Programas de fidelización avanzados mediante tokens corporativos, custodia de activos físicos y trazabilidad logística on-chain inalterable.
                </p>
              </div>

              {/* Small graphic details */}
              <div className="md:w-56 mt-4 md:mt-0 border border-white/5 bg-background/55 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 relative z-10">
                <span className="text-[7.5px] font-mono text-gray-500 uppercase tracking-widest">Activo Digitalizado</span>
                <span className="text-[10px] font-mono text-white font-bold uppercase tracking-wider bg-white/5 border border-white/5 py-1 px-3.5 rounded-lg">Cereal Token #71</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section id="contacto" className="py-28 relative overflow-hidden reveal-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full glow-orb-primary opacity-15 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-8 text-center space-y-12 relative z-10">
          <div 
            onMouseMove={handleMouseMove}
            className="premium-card p-12 md:p-16 space-y-8 border-primary-brand/10 shadow-[0_0_50px_rgba(19,109,236,0.06)]"
          >
            <div className="card-spotlight" />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight relative z-10">
              ¿Listo para Transformar tu Ecosistema?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed max-w-xl mx-auto font-light relative z-10">
              Contacta con nuestros especialistas de producto para explorar integraciones fiduciarias, técnicas y regulatorias a la medida de tu institución.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 relative z-10">
              <a 
                href="mailto:maxi@redefinx.com" 
                className="bg-primary-brand hover:bg-primary-brand/90 text-white font-bold px-10 py-4.5 rounded-full text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-primary-brand/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 shimmer-btn"
              >
                <Send className="w-4 h-4" />
                <span>maxi@redefinx.com</span>
              </a>
            </div>
          </div>

          <footer className="border-t border-border-glow/50 pt-16 mt-24 text-[10px] text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-8 font-mono">
            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <img src="/imagotipo.png" alt="reDeFinX Logo" className="h-6 w-auto object-contain dark:block hidden opacity-85" />
              <img src="/imagotipo_blue.png" alt="reDeFinX Logo" className="h-6 w-auto object-contain dark:hidden block opacity-85" />
              <span>© 2026 reDeFinX. Todos los derechos reservados.</span>
            </div>
            <span className="opacity-75">Suite Financiera Institucional Multi-Tenant</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
