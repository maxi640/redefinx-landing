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
  Building,
  Smartphone,
  LayoutDashboard,
  UserCheck,
  CreditCard,
  Cpu,
  RefreshCw
} from "lucide-react";

import BrandCustomizer from "@/components/BrandCustomizer";
import ArchitecturePlayground from "@/components/ArchitecturePlayground";
import ThemeToggle from "@/components/ThemeToggle";

const nodeMetadata = {
  bank: {
    title: "Banking (Rieles Bancarios)",
    description: "Conexión directa con redes bancarias tradicionales (COELSA, DEBIN, transferencias inmediatas) para la liquidación local de fondos en pesos o dólares, integrada a redes bancarias Argentinas.",
    type: "source" as const,
    popupClass: "top-[12%] left-[26%] w-[320px]"
  },
  onboard: {
    title: "Onboarding Digital (KYC/AML)",
    description: "Validación de identidad automatizada con biometría facial, control de prevención de lavado de dinero y motores de compliance integrados para el alta ágil de usuarios.",
    type: "source" as const,
    popupClass: "top-[36%] left-[26%] w-[320px]"
  },
  chain: {
    title: "Blockchain (Conectividad Web3)",
    description: "Orquestación en redes blockchain líderes para la transferencia inmutable de stablecoins, tokenización de activos del mundo real (RWA) y custodia descentralizada.",
    type: "source" as const,
    popupClass: "top-[60%] left-[26%] w-[320px]"
  },
  proces: {
    title: "Payment Gateway (Procesador)",
    description: "Integración multi-adquiriente para el procesamiento de cobros con tarjetas de crédito, débito y pasarelas de pago tradicionales con liquidación optimizada.",
    type: "source" as const,
    popupClass: "top-[80%] left-[26%] w-[320px]"
  },
  blueApis: {
    title: "APIs de Ingesta Financiera (Ingreso)",
    description: "Capa de abstracción que unifica múltiples proveedores tradicionales y Web3 en un estándar único de entrada de transacciones.",
    type: "api" as const,
    popupClass: "top-[18%] left-[34%] w-[300px]"
  },
  core: {
    title: "reDeFinX Smart Core (Ledger SSOT V5)",
    description: "Motor transaccional central con contabilidad inmutable SHA-256 de partida doble en tiempo real, separación de Cuentas de Orden (MEMORANDUM_CLIENT Art. 16 RG CNV 1058/25) y Libro de Órdenes Electrónico inmutable.",
    type: "core" as const,
    popupClass: "top-[4%] left-[50%] -translate-x-1/2 w-[360px]"
  },
  orangeApis: {
    title: "APIs de Salida, Topología Multi-Red y Saldo Segregado",
    description: "Endpoints de topología dinámica por Tenant (/api/wallet/capabilities), saldos segregados Mainnet/Testnet (/api/wallet/balance), libreta de contactos y favoritos (/api/wallet/recipients), cotización y liquidación atómica sin fallbacks (/api/wallet/transfer/quote, /api/wallet/transfer, /api/wallet/swap-internal), historial transparente sin tecnicismos (/api/wallet/history), Prueba de Reserva pública en tiempo real (/api/cnv/proof-of-reserves) y Régimen Informativo CNV (/api/admin/cnv/regulatory-report).",
    type: "api" as const,
    popupClass: "top-[18%] right-[34%] w-[300px]"
  },
  wallet: {
    title: "Billetera Digital B2C (Wallet)",
    description: "Aplicación móvil nativa y web marca blanca que permite a los usuarios finales realizar pagos QR, invertir pesos fiat, stake de stablecoins y gestionar sus fondos.",
    type: "app" as const,
    popupClass: "top-[28%] right-[26%] w-[320px]"
  },
  merchant: {
    title: "Portal de Comercios B2B (Merchant)",
    description: "Plataforma web para comercios and puntos de venta que permite la generación de cobros QR dinámicos, conciliación en vivo, sweeps automatizados y control de cajas.",
    type: "app" as const,
    popupClass: "top-[64%] right-[26%] w-[320px]"
  }
};

export default function Home() {
  // Premium Map Refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const linesGroupRef = useRef<SVGGElement | null>(null);
  const packetsGroupRef = useRef<SVGGElement | null>(null);
  
  const bankingNodeRef = useRef<HTMLDivElement | null>(null);
  const onboardingNodeRef = useRef<HTMLDivElement | null>(null);
  const blockchainNodeRef = useRef<HTMLDivElement | null>(null);
  const gatewayNodeRef = useRef<HTMLDivElement | null>(null);
  
  const leftApiRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const rightApiRef = useRef<HTMLDivElement | null>(null);
  
  const walletNodeRef = useRef<HTMLDivElement | null>(null);
  const merchantNodeRef = useRef<HTMLDivElement | null>(null);
  const connectionPathsRef = useRef<{ [key: string]: { path: string; color: string } }>({});
  const [connectionPaths, setConnectionPaths] = useState<{ [key: string]: { path: string; color: string } }>({});

  // Dynamic Map Interaction state
  const [hoveredNode, setHoveredNode] = useState<{
    title: string;
    description: string;
    type: "source" | "api" | "core" | "app";
    popupClass: string;
  } | null>(null);

  // Dynamic login redirection url state
  const [loginUrl, setLoginUrl] = useState("/master");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // In local development, redirect to the dev server port 3000 where the master platform runs
      if (window.location.hostname === "localhost") {
        setLoginUrl("http://localhost:3000/master");
      } else if (window.location.hostname.endsWith(".web.app") || window.location.hostname.endsWith(".firebaseapp.com")) {
        setLoginUrl("https://redefinx.com/master");
      } else {
        setLoginUrl("/master");
      }
    }
  }, []);

  // Premium Aesthetic Map Simulation Engine
  useEffect(() => {
    // 1. Particle Canvas Simulation
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const initCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      particles = [];
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.25 + 0.1,
        });
      }
    };

    const animateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(19, 109, 236, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateCanvas);
    };

    initCanvas();
    animateCanvas();

    // 2. SVG Connections & Connectors mapping
    const updateConnectors = () => {
      const linesContainer = linesGroupRef.current;
      const mapContainer = mapContainerRef.current;
      if (!linesContainer || !mapContainer) return;

      linesContainer.innerHTML = "";
      const containerRect = mapContainer.getBoundingClientRect();

      const getRelativeCoords = (el: HTMLElement | null) => {
        if (!el) return { x: 0, y: 0, w: 0, h: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - containerRect.left,
          y: r.top - containerRect.top,
          w: r.width,
          h: r.height,
        };
      };

      const coreCoords = getRelativeCoords(coreRef.current);
      const leftApiCoords = getRelativeCoords(leftApiRef.current);
      const rightApiCoords = getRelativeCoords(rightApiRef.current);

      const leftApiX = leftApiCoords.x + leftApiCoords.w / 2;
      const leftApiY = leftApiCoords.y + leftApiCoords.h / 2;
      const rightApiX = rightApiCoords.x + rightApiCoords.w / 2;
      const rightApiY = rightApiCoords.y + rightApiCoords.h / 2;

      const createCurveD = (sx: number, sy: number, ex: number, ey: number) => {
        const cp1x = sx + (ex - sx) * 0.5;
        const cp2x = ex - (ex - sx) * 0.5;
        return `M ${sx} ${sy} C ${cp1x} ${sy}, ${cp2x} ${ey}, ${ex} ${ey}`;
      };

      const createCurveElement = (d: string, color: string, id: string) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("class", "connection-line transition-all duration-300");
        path.setAttribute("stroke", color);
        path.setAttribute("id", `line-${id}`);
        linesContainer.appendChild(path);
      };

      const pathsMap: { [key: string]: { path: string; color: string } } = {};

      // A. Left Nodes (Banking, Onboarding, Blockchain, Gateway) to Left API
      const leftNodes = [
        { el: bankingNodeRef.current, key: "banking", color: "#00a3ff" },
        { el: onboardingNodeRef.current, key: "onboarding", color: "#00f2ff" },
        { el: blockchainNodeRef.current, key: "blockchain", color: "#a855f7" },
        { el: gatewayNodeRef.current, key: "gateway", color: "#f59e0b" },
      ];

      leftNodes.forEach((node) => {
        if (!node.el) return;
        const r = getRelativeCoords(node.el);
        const startX = r.x + r.w;
        const startY = r.y + r.h / 2;
        const d = createCurveD(startX, startY, leftApiCoords.x + 5, leftApiY);
        createCurveElement(d, node.color, node.key);
        pathsMap[node.key] = { path: d, color: node.color };
      });

      // B. Left API to Core
      const leftToCoreD = createCurveD(leftApiCoords.x + leftApiCoords.w - 5, leftApiY, coreCoords.x, coreCoords.y + coreCoords.h / 2);
      createCurveElement(leftToCoreD, "#136dec", "left-api-core");
      pathsMap["left-api"] = { path: leftToCoreD, color: "#136dec" };

      // C. Core to Right API
      const coreToRightD = createCurveD(coreCoords.x + coreCoords.w, coreCoords.y + coreCoords.h / 2, rightApiCoords.x + 5, rightApiY);
      createCurveElement(coreToRightD, "#136dec", "core-right-api");
      pathsMap["core"] = { path: coreToRightD, color: "#136dec" };

      // D. Right API to Right Nodes (Wallet, Merchant)
      const rightNodes = [
        { el: walletNodeRef.current, key: "wallet", color: "#22c55e" },
        { el: merchantNodeRef.current, key: "merchant", color: "#10b981" },
      ];

      rightNodes.forEach((node) => {
        if (!node.el) return;
        const r = getRelativeCoords(node.el);
        const startX = r.x;
        const startY = r.y + r.h / 2;
        const d = createCurveD(rightApiCoords.x + rightApiCoords.w - 5, rightApiY, startX, startY);
        createCurveElement(d, node.color, node.key);
        pathsMap[node.key] = { path: d, color: node.color };
      });

      connectionPathsRef.current = pathsMap;
      setConnectionPaths(pathsMap);
    };

    // Delay calculation to let the Next.js layouts settle down fully in DOM
    const connectorTimer = setTimeout(updateConnectors, 500);

    // Window listeners
    const handleResize = () => {
      initCanvas();
      updateConnectors();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(connectorTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden w-full selection:bg-primary-brand/30 selection:text-white transition-colors duration-500">
      
      {/* Absolute Ambient Mesh Glows locked in a container to prevent mobile overflow */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[1000px] rounded-full glow-orb-primary opacity-30 pointer-events-none -translate-y-1/2" />
        <div className="absolute top-[25%] right-1/4 w-[900px] h-[900px] rounded-full glow-orb-secondary opacity-25 pointer-events-none" />
        <div className="absolute top-[50%] left-1/3 w-[1000px] h-[1000px] rounded-full glow-orb-primary opacity-20 pointer-events-none" />
        <div className="absolute bottom-[5%] right-1/4 w-[900px] h-[900px] rounded-full glow-orb-secondary opacity-15 pointer-events-none" />
      </div>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 w-full z-50 glass-panel border-x-0 border-t-0 py-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <a href="#" className="cursor-pointer select-none">
            <img 
              src="/imagotipo.png" 
              alt="reDeFinX Logo" 
              className="h-12 w-auto object-contain hover:scale-[1.02] transition-transform block [.light_&]:hidden" 
            />
            <img 
              src="/imagotipo_blue.png" 
              alt="reDeFinX Logo" 
              className="h-12 w-auto object-contain hover:scale-[1.02] transition-transform hidden [.light_&]:block" 
            />
          </a>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#pilares" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Pilares
            </a>
            <a href="#mapa-convergencia" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Mapa
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
            <a href="/developers" className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              APIs
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a 
              href="#contacto" 
              className="border border-white/10 [.light_&]:border-slate-200 hover:border-white/20 [.light_&]:hover:border-slate-300 bg-white/5 [.light_&]:bg-slate-100 hover:bg-white/10 [.light_&]:hover:bg-slate-200 text-white [.light_&]:text-slate-800 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
            >
              Hablemos
            </a>
            <a 
              href={loginUrl}
              className="bg-primary-brand hover:bg-primary-brand/90 text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-[1.02] flex items-center gap-1.5 shadow-lg shadow-primary-brand/10 shimmer-btn"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Acceso</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH DYNAMIC 3D DEBIT CARD */}
      <section className="relative pt-36 pb-28 overflow-hidden flex items-center justify-center min-h-[92vh] reveal-section revealed">
        {/* Background Corporate Facade and Cinematic Network Loop with ultra-elegant blending */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-[0.08] dark:opacity-[0.16] mix-blend-screen select-none pointer-events-none"
          >
            <source src="/Redefinx Video.mp4" type="video/mp4" />
          </video>
          <img 
            src="/fachada.png" 
            alt="reDeFinX Corporate Facade" 
            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-[0.04] dark:opacity-[0.08] absolute inset-0"
          />
          {/* Extremely smooth layered gradients for 3D depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/85 to-background transition-all duration-500" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Texts (7 cols) */}
          <div className="lg:col-span-7 space-y-10 text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center bg-[#070d19]/80 [.light_&]:bg-blue-50/80 border border-blue-500/20 [.light_&]:border-blue-200/60 px-3 py-1 rounded-[4px]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mr-2" />
              <span className="text-blue-400 [.light_&]:text-blue-600 text-[9px] font-bold uppercase tracking-[0.2em] font-mono">Suite Financiera Institucional Multi-Tenant</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6.5xl lg:text-[76px] xl:text-[80px] font-black text-foreground tracking-tight leading-[0.98] max-w-2xl transition-colors duration-500">
              La Suite<br />
              Institucional<br />
              para la{" "}
              <span className="bg-gradient-to-r from-primary-brand to-secondary-brand bg-clip-text text-transparent drop-shadow-sm">
                Convergencia Financiera
              </span>
              .
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed max-w-2xl font-light">
              La primera infraestructura PSAVaaS de Argentina con plataforma propia y orquestación multiproveedor fiat-crypto del mercado. Una suite unificada, modular y marca blanca diseñada para escalar tu operación.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
              <a 
                href="#soluciones" 
                className="bg-primary-brand hover:bg-primary-brand/90 text-white font-bold px-10 py-4.5 rounded-full text-[10px] tracking-widest transition-all shadow-xl shadow-primary-brand/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 shimmer-btn"
              >
                <span>Explorar Soluciones</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#contacto" 
                className="text-foreground hover:text-primary-brand font-mono font-bold px-8 py-4.5 text-[10px] tracking-widest transition-all flex items-center justify-center gap-1.5"
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
              className="w-full max-w-[420px] aspect-[1.586] rounded-[18px] bg-gradient-to-br from-slate-900/95 via-slate-950/98 to-slate-900/95 border border-white/10 p-7 flex flex-col justify-between relative overflow-hidden select-none interactive-3d-card shadow-2xl cursor-pointer"
            >
              {/* Ambient internal spotlight overlay */}
              <div className="absolute inset-0 bg-radial-gradient from-primary-brand/15 to-transparent pointer-events-none z-10" />

              {/* Raw stylized X logo in the background (Large and behind) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <img 
                  src="/icon.png" 
                  alt="reDeFinX Icon" 
                  className="w-44 h-44 object-contain opacity-[0.16] select-none" 
                />
              </div>

              {/* Card Top */}
              <div className="flex justify-between items-center relative z-20">
                {/* Golden chip visual mockup */}
                <div className="w-10 h-8 rounded-md bg-gradient-to-br from-amber-400/90 via-amber-300/80 to-amber-500/90 border border-amber-300/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30">
                    <div className="border border-slate-950/20" />
                    <div className="border border-slate-950/20" />
                    <div className="border border-slate-950/20" />
                  </div>
                </div>

                {/* Logo on Right: Raw imagotipo.png wordmark */}
                <div className="h-8 flex items-center">
                  <img 
                    src="/imagotipo.png" 
                    alt="reDeFinX Logo" 
                    className="h-5.5 w-auto object-contain select-none opacity-100 hover:scale-[1.02] transition-transform" 
                  />
                </div>
              </div>

              {/* Card Middle (Card numbers positioned elegantly over the background X) */}
              <div className="relative z-20 space-y-1 my-auto text-center">
                <p className="text-base sm:text-lg font-mono text-white font-semibold tracking-[0.22em] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  4000 1234 5678 9010
                </p>
              </div>

              {/* Card Bottom */}
              <div className="flex justify-between items-end relative z-20 font-mono text-[8px] text-white/80 tracking-wider">
                <div>
                  <p className="text-white/45 text-[6.5px] uppercase mb-0.5 tracking-widest font-black">Cardholder</p>
                  <p className="font-bold text-[9px] uppercase">REDEFINX CORPORATE</p>
                </div>
                <div className="text-right">
                  <p className="text-white/45 text-[6.5px] uppercase mb-0.5 tracking-widest font-black">Exp Date</p>
                  <p className="font-bold text-[9px]">12 / 29</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN INTERACTIVA: MAPA DE ORQUESTACIÓN Y CONVERGENCIA */}
      <section id="mapa-convergencia" className="py-24 relative overflow-hidden reveal-section border-t border-b border-white/5 transition-colors duration-500">
        {/* Background glow to emphasize the ecosystem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-orb-secondary opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 relative z-10 space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2.5 bg-primary-brand/5 border border-primary-brand/20 px-3 py-1 rounded-full text-[9px] font-bold text-primary-brand uppercase tracking-widest font-mono">
              Arquitectura en vivo
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Mapa de Orquestación y Convergencia
            </h2>
            <p className="text-muted-foreground text-sm sm:text-md leading-relaxed font-light max-w-2xl mx-auto">
              Nuestra infraestructura unifica todos tus rieles tradicionales y Web3 en un Core transaccional de partida doble, orquestando cobros y egresos al instante de forma modular.
            </p>
          </div>

          {/* Map container */}
          <div 
            ref={mapContainerRef}
            className={`relative w-full min-h-[640px] md:h-[600px] border border-white/5 [.light_&]:border-slate-200 bg-slate-950/20 [.light_&]:bg-white/40 rounded-3xl p-6 md:p-10 overflow-hidden select-none flex items-center justify-center transition-all duration-700 ${
              hoveredNode 
                ? `map-has-active-hover ${
                    hoveredNode === nodeMetadata.bank ? "map-hover-bank" :
                    hoveredNode === nodeMetadata.onboard ? "map-hover-onboard" :
                    hoveredNode === nodeMetadata.chain ? "map-hover-chain" :
                    hoveredNode === nodeMetadata.proces ? "map-hover-gateway" :
                    hoveredNode === nodeMetadata.blueApis ? "map-hover-blueapis" :
                    hoveredNode === nodeMetadata.core ? "map-hover-core" :
                    hoveredNode === nodeMetadata.orangeApis ? "map-hover-orangeapis" :
                    hoveredNode === nodeMetadata.wallet ? "map-hover-wallet" :
                    hoveredNode === nodeMetadata.merchant ? "map-hover-merchant" : ""
                  }`
                : ""
            }`}
          >
            {/* Background Elements */}
            <canvas ref={particleCanvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,85,192,0.06)_0%,rgba(10,15,22,0.7)_80%)] z-0 pointer-events-none" />
            
            {/* SVG Connector Layer */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" id="connectionLayer">
              <g ref={linesGroupRef} id="lines">
                {Object.entries(connectionPaths).map(([key, conn]) => (
                  <path
                    key={`line-${key}`}
                    d={conn.path}
                    className="connection-line transition-all duration-300"
                    stroke={conn.color}
                    id={`line-${key}`}
                  />
                ))}
              </g>
              <g ref={packetsGroupRef} id="packets">
                {Object.entries(connectionPaths).map(([key, conn]) => {
                  const delays = ["0s", "0.4s", "0.8s", "1.2s", "1.6s"];
                  return delays.map((delay, index) => (
                    <circle
                      key={`packet-${key}-${index}`}
                      r="3"
                      className="data-packet"
                      fill={conn.color}
                      style={{ color: conn.color }}
                    >
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={conn.path}
                        begin={delay}
                      />
                    </circle>
                  ));
                })}
              </g>
            </svg>
            
            {/* Desktop Layout Content (Visible on md and up) */}
            <div className="relative z-20 w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-center h-full max-w-[1600px] hidden md:grid">
              
              {/* Left Nodes: Data Sources */}
              <div className="flex flex-col gap-6 justify-center items-end md:col-span-2 animate-float" id="left-nodes">
                {/* Banking */}
                <div 
                  ref={bankingNodeRef}
                  className={`glass-node p-4 rounded-xl flex items-center gap-4 group cursor-default w-52 transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.bank ? "scale-105 opacity-100 shadow-[0_0_20px_rgba(0,163,255,0.25)] border-node-banking/40 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.bank)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="w-10 h-10 rounded-lg node-icon-wrapper flex items-center justify-center text-node-banking border border-white/5 group-hover:border-node-banking/40 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.1em] text-white [.light_&]:text-slate-800 uppercase">Banking</h4>
                    <p className="text-[10px] text-white/40 [.light_&]:text-slate-500 font-mono tracking-tighter">FINANCIAL CORE</p>
                  </div>
                </div>
                
                {/* Onboarding */}
                <div 
                  ref={onboardingNodeRef}
                  className={`glass-node p-4 rounded-xl flex items-center gap-4 group cursor-default w-52 transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.onboard ? "scale-105 opacity-100 shadow-[0_0_20px_rgba(0,242,255,0.25)] border-node-onboarding/40 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.onboard)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="w-10 h-10 rounded-lg node-icon-wrapper flex items-center justify-center text-node-onboarding border border-white/5 group-hover:border-node-onboarding/40 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.1em] text-white [.light_&]:text-slate-800 uppercase">Onboarding</h4>
                    <p className="text-[10px] text-white/40 [.light_&]:text-slate-500 font-mono tracking-tighter">KYC / AML PIPELINE</p>
                  </div>
                </div>
                
                {/* Blockchain */}
                <div 
                  ref={blockchainNodeRef}
                  className={`glass-node p-4 rounded-xl flex items-center gap-4 group cursor-default w-52 transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.chain ? "scale-105 opacity-100 shadow-[0_0_20px_rgba(168,85,247,0.25)] border-node-blockchain/40 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.chain)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="w-10 h-10 rounded-lg node-icon-wrapper flex items-center justify-center text-node-blockchain border border-white/5 group-hover:border-node-blockchain/40 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.1em] text-white [.light_&]:text-slate-800 uppercase">Blockchain</h4>
                    <p className="text-[10px] text-white/40 [.light_&]:text-slate-500 font-mono tracking-tighter">DISTRIBUTED LEDGER</p>
                  </div>
                </div>
                
                {/* Gateway */}
                <div 
                  ref={gatewayNodeRef}
                  className={`glass-node p-4 rounded-xl flex items-center gap-4 group cursor-default w-52 transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.proces ? "scale-105 opacity-100 shadow-[0_0_20px_rgba(245,158,11,0.25)] border-node-gateway/40 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.proces)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="w-10 h-10 rounded-lg node-icon-wrapper flex items-center justify-center text-node-gateway border border-white/5 group-hover:border-node-gateway/40 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.1em] text-white [.light_&]:text-slate-800 uppercase">Gateway</h4>
                    <p className="text-[10px] text-white/40 [.light_&]:text-slate-500 font-mono tracking-tighter">TRANSACTION HUB</p>
                  </div>
                </div>
              </div>
              
              {/* Left API Diamond */}
              <div className="md:col-span-2 flex items-center justify-center">
                <div 
                  ref={leftApiRef}
                  className={`api-diamond cursor-pointer transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.blueApis ? "scale-110 opacity-100 shadow-[0_0_25px_rgba(19,109,236,0.35)] z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.blueApis)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <span className="api-diamond-text">APIs</span>
                </div>
              </div>
              
              {/* Center Section: reDeFinX Core */}
              <div className="md:col-span-4 flex items-center justify-center relative py-12">
                {/* Glow Effect */}
                <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow -z-10"></div>
                {/* Core Card */}
                <div 
                  ref={coreRef}
                  className={`core-card relative w-full max-w-[340px] aspect-[4/5] rounded-[2.5rem] p-10 flex flex-col items-center justify-between text-center animate-breathe cursor-pointer transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.core ? "scale-105 opacity-100 shadow-[0_0_35px_rgba(19,109,236,0.4)] border-primary-brand/60 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.core)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="w-full flex flex-col items-center gap-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                      <img 
                        alt="reDeFinX" 
                        className="w-20 h-20 relative z-10 object-contain brightness-110" 
                        src="/icon.png" 
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-4xl font-black tracking-tight text-white [.light_&]:text-slate-900 uppercase font-sans leading-none">reDeFinX</div>
                      <p className="text-[10px] font-mono tracking-[0.3em] text-brand-blue-alt font-bold uppercase">Architectural Core</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center gap-6">
                    <div className="w-px h-12 bg-gradient-to-b from-brand-blue-alt/60 to-transparent"></div>
                    <div className="px-6 py-2.5 bg-primary/10 border border-brand-blue-alt/30 rounded-full flex items-center gap-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue-alt opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue-alt"></span>
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white [.light_&]:text-slate-850">SMART CORE ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right API Diamond */}
              <div className="md:col-span-2 flex items-center justify-center">
                <div 
                  ref={rightApiRef}
                  className={`api-diamond cursor-pointer transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.orangeApis ? "scale-110 opacity-100 shadow-[0_0_25px_rgba(19,109,236,0.35)] z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.orangeApis)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <span className="api-diamond-text">APIs</span>
                </div>
              </div>
              
              {/* Right Nodes: Consumers */}
              <div className="flex flex-col gap-8 justify-center items-start md:col-span-2 animate-float" id="right-nodes">
                {/* Wallet */}
                <div 
                  ref={walletNodeRef}
                  className={`glass-node rounded-xl flex flex-row-reverse items-center group cursor-default w-52 p-4 gap-4 transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.wallet ? "scale-105 opacity-100 shadow-[0_0_20px_rgba(34,197,94,0.25)] border-node-wallet/40 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.wallet)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="node-icon-wrapper flex items-center justify-center text-node-wallet border border-white/5 group-hover:border-node-wallet/40 transition-all w-10 h-10 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div className="text-right">
                    <h4 className="text-white [.light_&]:text-slate-800 uppercase text-xs font-bold tracking-[0.1em]">Wallet</h4>
                    <p className="text-[10px] text-node-wallet font-mono tracking-[0.1em] font-bold">B2C CONSUMER</p>
                  </div>
                </div>
                
                {/* Merchant */}
                <div 
                  ref={merchantNodeRef}
                  className={`glass-node rounded-xl flex flex-row-reverse items-center group cursor-default w-52 p-4 gap-4 transition-all duration-500 ${
                    hoveredNode ? (hoveredNode === nodeMetadata.merchant ? "scale-105 opacity-100 shadow-[0_0_20px_rgba(16,185,129,0.25)] border-node-merchant/40 z-40" : "opacity-20 blur-[0.5px]") : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredNode(nodeMetadata.merchant)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="node-icon-wrapper flex items-center justify-center text-node-merchant border border-white/5 group-hover:border-node-merchant/40 transition-all w-10 h-10 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  </div>
                  <div className="text-right">
                    <h4 className="text-white [.light_&]:text-slate-800 uppercase text-xs font-bold tracking-[0.1em]">Merchant</h4>
                    <p className="text-[10px] text-node-merchant font-mono tracking-[0.1em] font-bold">B2B ENTERPRISE</p>
                  </div>
                </div>
              </div>
              
              {/* PREMIUM GLASSMORPHIC HUD TOOLTIP/POPUP FOR DESKTOP */}
              {hoveredNode && (
                <div className={`absolute ${hoveredNode.popupClass} pointer-events-none z-50 transition-all duration-500 animate-fade-in bg-slate-950/90 [.light_&]:bg-white/95 backdrop-blur-md border border-white/10 [.light_&]:border-slate-200/80 rounded-2xl p-5.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] [.light_&]:shadow-[0_15px_40px_rgba(19,109,236,0.06)]`}>
                  {/* Deep glowing soft aura behind the popup text */}
                  <div className="absolute -inset-8 bg-radial-gradient from-primary-brand/10 to-transparent blur-xl opacity-60 z-0 pointer-events-none" />
                  
                  {/* Clean Typography Overlay with Larger Text and Bold Title */}
                  <div className="relative z-10 space-y-2 text-left">
                    <span className="text-[12px] font-black font-mono uppercase tracking-[0.18em] text-primary-brand block select-none">
                      {hoveredNode.title}
                    </span>
                    <p className="text-[11.5px] text-white/90 [.light_&]:text-slate-700 font-light leading-relaxed tracking-wide select-none">
                      {hoveredNode.description}
                    </p>
                  </div>
                </div>
              )}
              
            </div>
            
            {/* Mobile Map Panel (Visible on Mobile / Touch viewports) */}
            <div className="block md:hidden space-y-8 w-full relative z-20">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(nodeMetadata).map(([key, node]) => (
                  <button
                    key={key}
                    onClick={() => setHoveredNode(node)}
                    className={`p-4 rounded-2xl text-left border transition-all ${hoveredNode?.title === node.title ? "bg-primary-brand/10 border-primary-brand/40 text-white" : "bg-white/5 border-white/5 text-muted-foreground"}`}
                  >
                    <span className="text-[7.5px] font-mono uppercase tracking-widest block text-primary-brand mb-1">{node.type}</span>
                    <h4 className="text-xs font-bold text-foreground">{node.title}</h4>
                  </button>
                ))}
              </div>

              {hoveredNode && (
                <div className="p-5 rounded-2xl bg-slate-900/90 [.light_&]:bg-white/95 border border-white/5 [.light_&]:border-slate-200 animate-fade-in space-y-2">
                  <span className="text-[8px] font-mono uppercase text-primary-brand font-bold">{hoveredNode.type} capacity</span>
                  <h4 className="text-sm font-bold text-foreground">{hoveredNode.title}</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{hoveredNode.description}</p>
                </div>
              )}
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
              <div className="relative h-28 w-full bg-background/40 [.light_&]:bg-white/40 rounded-2xl overflow-hidden flex items-end p-2.5 z-10">
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
              className="lg:col-span-5 premium-card p-10 flex flex-col justify-between shadow-[0_0_30px_rgba(19,109,236,0.08)] cursor-default bento-unequal-height-1"
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
              <div className="relative h-28 w-full bg-background/40 [.light_&]:bg-white/40 rounded-2xl flex items-center justify-center gap-12 z-10">
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
              <div className="bg-[#111827] [.light_&]:bg-blue-50/50 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden min-w-[240px] z-10">
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
                <div className="md:col-span-5 bg-background/55 [.light_&]:bg-slate-100/50 rounded-2xl p-4.5 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full border border-dashed border-primary-brand/40 flex items-center justify-center text-primary-brand animate-spin-slow">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[7px] text-gray-500 font-mono uppercase block">Activos Mintados en vivo</span>
                    <span className="text-sm font-mono font-bold text-white [.light_&]:text-slate-800 tracking-wide">
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
                <div className="bg-background/65 [.light_&]:bg-white/60 p-3 rounded-xl flex items-center justify-between text-[9px] font-mono mt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>ARS Stablecoin</span>
                  </div>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-primary-brand" />
                  <div className="text-right text-gray-300 [.light_&]:text-slate-600">
                    1 USDC = <span className="text-white [.light_&]:text-slate-800 font-bold">{fiatRate}</span> ARS
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
                <div className="relative h-12 w-full bg-background/40 [.light_&]:bg-white/40 rounded-xl overflow-hidden flex items-end">
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

                <div className="flex justify-between items-center bg-white/5 [.light_&]:bg-slate-100 p-2 rounded-xl text-[8.5px] text-muted-foreground font-mono">
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
                <div className="flex items-center gap-2 bg-white/5 [.light_&]:bg-slate-100 p-2.5 rounded-xl text-[8px] font-mono text-gray-300 [.light_&]:text-slate-700">
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
              <div className="md:w-80 h-32 bg-[#080d16] [.light_&]:bg-slate-50 rounded-2xl overflow-hidden p-3 font-mono text-[7px] text-gray-500 [.light_&]:text-slate-600 relative flex flex-col z-10">
                <div className="absolute top-2 left-3 flex items-center gap-1 text-primary-brand font-bold text-[7.5px] uppercase z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-brand animate-pulse" />
                  Compliance log stream
                </div>
                <div className="absolute inset-0 top-7 px-3 overflow-hidden">
                  <div className="space-y-1 animate-scroll-logs">
                    <div>[INFO] RLS validation active for scoped Tenant...</div>
                    <div className="text-emerald-400">[PASS] Double-entry check balance total = 0.00 ARS</div>
                    <div>[SYNC] Compensating omnibus vault assets with central fids...</div>
                    <div className="text-primary-brand">[SWAP] Settled USDC/ARS order via Cuentas de Orden (RG CNV 1058/25)</div>
                    <div>[KYC] Verification completed for new white-label member...</div>
                    <div>[INFO] Gas abstraction proxy verified for OAuth login...</div>
                    <div>[INFO] RLS validation active for scoped Tenant...</div>
                    <div className="text-emerald-400">[PASS] Double-entry check balance total = 0.00 ARS</div>
                    <div>[SYNC] Compensating omnibus vault assets with central fids...</div>
                    <div className="text-primary-brand">[SWAP] Settled USDC/ARS order via Cuentas de Orden (RG CNV 1058/25)</div>
                    <div>[KYC] Verification completed for new white-label member...</div>
                    <div>[INFO] Gas abstraction proxy verified for OAuth login...</div>
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#080d16] [.light_&]:from-slate-50 to-transparent pointer-events-none z-20" />
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
                Operamos bajo el modelo <strong className="font-bold text-foreground">PSAV as a Service</strong>, proporcionando una capa técnica completa que resuelve de manera integrada todos tus canales regulatorios y fiduciarios.
              </p>
              
              {/* Pomelo-Style Elastic Interactive Accordion Selector */}
              <div className="space-y-3 pt-3">
                {/* Tab 1 */}
                <button
                  onClick={() => setActiveStep(0)}
                  className={`w-full text-left p-4.5 rounded-2xl border-0 transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-start gap-3.5 relative overflow-hidden ${
                    activeStep === 0
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-white [.light_&]:text-slate-800 shadow-[inset_2px_0_0_0_rgba(19,109,236,1)]"
                      : "bg-transparent hover:bg-white/5 [.light_&]:hover:bg-slate-100 text-muted-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all ${activeStep === 0 ? "bg-primary-brand text-white" : "bg-white/5 [.light_&]:bg-slate-100 text-gray-500"}`}>01</div>
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
                  className={`w-full text-left p-4.5 rounded-2xl border-0 transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-start gap-3.5 relative overflow-hidden ${
                    activeStep === 1
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-white [.light_&]:text-slate-800 shadow-[inset_2px_0_0_0_rgba(19,109,236,1)]"
                      : "bg-transparent hover:bg-white/5 [.light_&]:hover:bg-slate-100 text-muted-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all ${activeStep === 1 ? "bg-primary-brand text-white" : "bg-white/5 [.light_&]:bg-slate-100 text-gray-500"}`}>02</div>
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
                  className={`w-full text-left p-4.5 rounded-2xl border-0 transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-start gap-3.5 relative overflow-hidden ${
                    activeStep === 2
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-white [.light_&]:text-slate-800 shadow-[inset_2px_0_0_0_rgba(19,109,236,1)]"
                      : "bg-transparent hover:bg-white/5 [.light_&]:hover:bg-slate-100 text-muted-foreground"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all ${activeStep === 2 ? "bg-primary-brand text-white" : "bg-white/5 [.light_&]:bg-slate-100 text-gray-500"}`}>03</div>
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
              <div className="relative overflow-hidden rounded-[2rem] border border-border-glow shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] [.light_&]:shadow-[0_20px_50px_-20px_rgba(19,109,236,0.04)] bg-slate-950/80 [.light_&]:bg-white/90 p-2 z-10">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full aspect-video rounded-[1.7rem] object-cover border-0"
                >
                  <source src="/Redefinx Video.mp4" type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
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
              <div className="md:w-56 mt-4 md:mt-0 bg-background/55 [.light_&]:bg-slate-100/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 relative z-10">
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
              <div className="md:w-56 mt-4 md:mt-0 bg-background/55 [.light_&]:bg-slate-100/50 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 relative z-10">
                <span className="text-[7.5px] font-mono text-gray-500 uppercase tracking-widest">Activo Digitalizado</span>
                <span className="text-[10px] font-mono text-white [.light_&]:text-slate-800 font-bold uppercase tracking-wider bg-white/5 [.light_&]:bg-slate-100 py-1 px-3.5 rounded-lg">Cereal Token #71</span>
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
            className="premium-card p-12 md:p-16 space-y-8 shadow-[0_0_50px_rgba(19,109,236,0.06)]"
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
                href="https://wa.me/5493517866228?text=Hola%20Maxi%2C%20me%20comunico%20desde%20la%20web%20de%20redefinx%20soy%3A%20"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-10 py-4.5 rounded-full text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-[#25D366]/20 hover:scale-[1.02] flex items-center justify-center gap-2.5 shimmer-btn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Escribinos por WhatsApp</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/redefinx/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 [.light_&]:bg-slate-100 hover:bg-white/10 [.light_&]:hover:bg-slate-200 text-white [.light_&]:text-slate-800 border border-white/10 [.light_&]:border-slate-200 font-bold px-10 py-4.5 rounded-full text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4 text-[#0077b5] fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>Seguir en LinkedIn</span>
              </a>
            </div>
          </div>

          <footer className="border-t border-border-glow/50 pt-16 mt-24 w-full text-muted-foreground font-mono">
            {/* Multi-column Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 text-left">
              <div className="space-y-3.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">Plataforma</h4>
                <ul className="space-y-2 text-[9px]">
                  <li>
                    <a href="/master" className="hover:text-primary-brand transition-colors">Control Panel Maestro</a>
                  </li>
                  <li>
                    <a href="/login" className="hover:text-primary-brand transition-colors">Portal Corporativo</a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">Desarrolladores & Compliance</h4>
                <ul className="space-y-2 text-[9px]">
                  <li>
                    <a href="/developers" className="hover:text-primary-brand transition-colors">Documentación de APIs</a>
                  </li>
                  <li>
                    <a href="/cnv-transparencia" className="hover:text-primary-brand transition-colors">Prueba de Reserva & Transparencia CNV (RG 1058/25)</a>
                  </li>
                  <li>
                    <a href="/api/cnv/proof-of-reserves" className="hover:text-primary-brand transition-colors">API Proof of Reserves (JSON)</a>
                  </li>
                  <li>
                    <a href="/api/admin/compliance/transactional-profiles" className="hover:text-primary-brand transition-colors">API Motor Dinámico de Perfilado UIF (SMVM / Res. 49/24)</a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">Tecnología</h4>
                <ul className="space-y-2 text-[9px]">
                  <li>
                    <a href="/#arquitectura" className="hover:text-primary-brand transition-colors">Core Transaccional</a>
                  </li>
                  <li>
                    <a href="/#marca-blanca" className="hover:text-primary-brand transition-colors">Infraestructura WaaS</a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground">Institucional</h4>
                <ul className="space-y-2 text-[9px]">
                  <li>
                    <a 
                      href="https://wa.me/5493517866228?text=Hola%20Maxi%2C%20me%20comunico%20desde%20la%20web%20de%20redefinx%20soy%3A%20" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-primary-brand transition-colors"
                    >
                      Contacto Soporte
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/redefinx/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-brand transition-colors">LinkedIn Oficial</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Mandatory CNV RG 1058/25 Art. 5 & Art. 36 + UIF Res. 49/2024 Disclosure */}
            <div className="border-t border-white/5 [.light_&]:border-slate-200 py-6 text-left space-y-2">
              <p className="text-[8.5px] leading-relaxed opacity-80">
                <strong>CUMPLIMIENTO NORMATIVO RG CNV N° 1058/25 (Art. 5, 15, 16, 36 y 37) & UIF RES. 49/2024:</strong> CASH INVERSIONES S.A. / Ecosistema YoHub — Proveedor de Servicios de Activos Virtuales (PSAV) inscripto bajo el N° 70 en el Registro de Proveedores de Servicios de Activos Virtuales de CNV. Este registro es a los fines del control como Sujeto Obligado ante la Unidad de Información Financiera (UIF) y de todo otro ente regulador facultado a tal efecto, en el marco de sus competencias, y no implica licencia ni supervisión por parte de la COMISIÓN NACIONAL DE VALORES sobre la actividad realizada por el PSAV. El Core Transaccional aplica perfilado dinámico PLAyFT auto-indexado en Salarios Mínimos, Vitales y Móviles (SMVM), Travel Rule y límites móviles (24h/30d/365d) auditados atómicamente en el Ledger V5. Consulte en <a href="/cnv-transparencia" className="underline text-primary-brand">/cnv-transparencia</a> la pantalla obligatoria sobre &ldquo;Naturaleza y riesgos a los que los clientes están expuestos al realizar operaciones con Activos Virtuales&rdquo; (Art. 36), los Whitepapers oficiales (Art. 37) y la Prueba de Reserva criptográfica en Cuentas de Orden (Art. 15 y 16).
              </p>
            </div>

            {/* Bottom Row */}
            <div className="border-t border-white/5 [.light_&]:border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px]">
              <div className="flex items-center gap-3.5 justify-center sm:justify-start">
                <img src="/imagotipo.png" alt="reDeFinX Logo" className="h-7 w-auto object-contain block [.light_&]:hidden opacity-85" />
                <img src="/imagotipo_blue.png" alt="reDeFinX Logo" className="h-7 w-auto object-contain hidden [.light_&]:block opacity-85" />
                <span>© 2026 reDeFinX. Todos los derechos reservados.</span>
              </div>
              <span className="opacity-75">Suite Financiera Institucional Multi-Tenant • PSAVaaS</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
