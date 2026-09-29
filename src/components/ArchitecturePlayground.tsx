"use client";

import React, { useState, useEffect } from "react";
import { 
  Smartphone, 
  LayoutDashboard, 
  Database, 
  ArrowRight, 
  CheckCircle, 
  QrCode, 
  TrendingUp, 
  Key, 
  RefreshCw, 
  ArrowRightLeft, 
  Send,
  Building,
  DollarSign,
  Lock,
  ChevronRight
} from "lucide-react";

type ProductId = "wallet" | "merchant" | "ledger";

const formatAmount = (num: number) => {
  const isDecimal = num % 1 !== 0;
  const numStr = isDecimal ? num.toFixed(2) : num.toString();
  const parts = numStr.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
};

export default function ArchitecturePlayground() {
  const [activeProduct, setActiveProduct] = useState<ProductId>("wallet");

  // Wallet states
  const [walletAction, setWalletAction] = useState<"pay" | "stake" | "passkey">("pay");
  const [stakeAmount, setStakeAmount] = useState<number>(50000);
  const [payState, setPayState] = useState<"idle" | "scanning" | "success">("idle");
  const [passkeyState, setPasskeyState] = useState<"idle" | "scanning" | "success">("idle");

  // Merchant states
  const [merchantAction, setMerchantAction] = useState<"pos" | "sweep">("pos");
  const [chargeAmount, setChargeAmount] = useState<string>("1500");
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);
  const [sweepState, setSweepState] = useState<"idle" | "processing" | "success">("idle");

  // Active SVG Flow path animation state
  const [activeFlow, setActiveFlow] = useState<"none" | "pay-scan" | "pay-ledger" | "sweep-ledger">("none");

  // Shared Transaction History for Ledger
  const [transactions, setTransactions] = useState<Array<{
    id: string;
    product: string;
    type: "DEBITO" | "CREDITO" | "COMISION";
    account: string;
    amount: number;
    currency: "ARS" | "DFX";
    highlight?: boolean;
  }>>([
    { id: "TX-9041", product: "Wallet B2C", type: "DEBITO", account: "Billetera User smart_acc...", amount: -2500, currency: "ARS" },
    { id: "TX-9041", product: "Merchant POS", type: "CREDITO", account: "Caja Comercio POS vault...", amount: 2462.50, currency: "ARS" },
    { id: "TX-9041", product: "Platform Fee", type: "COMISION", account: "Comisión Fee scoped...", amount: 37.50, currency: "ARS" },
  ]);

  // Handle simulations adding directly to Ledger records
  const handlePaySuccess = () => {
    setPayState("scanning");
    setActiveFlow("pay-scan");

    // Coordinated multistep animation matching Pomelo
    setTimeout(() => {
      setActiveFlow("pay-ledger");
    }, 850);

    setTimeout(() => {
      setPayState("success");
      setActiveFlow("none");
      
      const newTxId = "TX-" + Math.floor(Math.random() * 9000 + 1000);
      setTransactions(prev => [
        { id: newTxId, product: "Wallet B2C", type: "DEBITO", account: "Scan QR User smart_wallet", amount: -1000, currency: "DFX", highlight: true },
        { id: newTxId, product: "Merchant POS", type: "CREDITO", account: "POS Comercio DFX vault", amount: 985, currency: "DFX", highlight: true },
        { id: newTxId, product: "Platform Fee", type: "COMISION", account: "reDeFinX Revenue scoped", amount: 15, currency: "DFX", highlight: true },
        ...prev.map(t => ({ ...t, highlight: false }))
      ]);
    }, 1800);
  };

  const handleSweepSuccess = () => {
    setSweepState("processing");
    setActiveFlow("sweep-ledger");

    setTimeout(() => {
      setSweepState("success");
      setActiveFlow("none");
      
      const newTxId = "TX-" + Math.floor(Math.random() * 9000 + 1000);
      setTransactions(prev => [
        { id: newTxId, product: "Merchant POS", type: "DEBITO", account: "Caja Comercio POS vault", amount: -50000, currency: "ARS", highlight: true },
        { id: newTxId, product: "Bco Central", type: "CREDITO", account: "Omnibus Custody Central Coelsa", amount: 50000, currency: "ARS", highlight: true },
        ...prev.map(t => ({ ...t, highlight: false }))
      ]);
    }, 2000);
  };

  const handlePasskeySuccess = () => {
    setPasskeyState("scanning");
    setTimeout(() => {
      setPasskeyState("success");
    }, 1500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="space-y-16">
      
      {/* Dynamic Pomelo-Style Header Selector */}
      <div className="grid lg:grid-cols-12 gap-8 items-center border-b border-border-glow/40 pb-10">
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary-brand/5 border border-primary-brand/20 px-3 py-1 rounded-full text-[9px] font-bold text-primary-brand uppercase tracking-widest font-mono">
            Ecosistema en Acción
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Una Experiencia Fintech <span className="bg-gradient-to-r from-primary-brand to-secondary-brand bg-clip-text text-transparent">Fluida</span>.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">
            Conecta todos tus canales operativos. Descubre cómo las interfaces B2C y B2B se alimentan del mismo motor transaccional inmutable. Selecciona un producto para interactuar en vivo.
          </p>
        </div>

        {/* Big Premium Product Typographic Selectors - Borderless Gradients */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Wallet selector */}
          <button
            onClick={() => setActiveProduct("wallet")}
            onMouseMove={handleMouseMove}
            className={`p-6 text-left rounded-3xl transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) relative overflow-hidden group ${
              activeProduct === "wallet"
                ? "bg-gradient-to-br from-primary-brand/15 to-transparent text-foreground scale-[1.02] -translate-y-1 shadow-[0_30px_100px_-30px_rgba(19,109,236,0.15)]"
                : "bg-transparent hover:bg-white/5 [.light_&]:hover:bg-slate-100 text-muted-foreground"
            }`}
          >
            <div className="card-spotlight" />
            <div className="flex flex-col h-full justify-between space-y-4 relative z-10">
              <Smartphone className={`w-6 h-6 transition-colors ${activeProduct === "wallet" ? "text-primary-brand" : "text-gray-400 group-hover:text-foreground"}`} />
              <div>
                <h4 className="text-sm font-bold text-foreground">Billetera B2C</h4>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed font-light">Pagar QR, invertir pesos fiat y fidelizar clientes sin fricción.</p>
              </div>
            </div>
          </button>

          {/* POS Merchant selector */}
          <button
            onClick={() => setActiveProduct("merchant")}
            onMouseMove={handleMouseMove}
            className={`p-6 text-left rounded-3xl transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) relative overflow-hidden group ${
              activeProduct === "merchant"
                ? "bg-gradient-to-br from-primary-brand/15 to-transparent text-foreground scale-[1.02] -translate-y-1 shadow-[0_30px_100px_-30px_rgba(19,109,236,0.15)]"
                : "bg-transparent hover:bg-white/5 [.light_&]:hover:bg-slate-100 text-muted-foreground"
            }`}
          >
            <div className="card-spotlight" />
            <div className="flex flex-col h-full justify-between space-y-4 relative z-10">
              <LayoutDashboard className={`w-6 h-6 transition-colors ${activeProduct === "merchant" ? "text-primary-brand" : "text-gray-400 group-hover:text-foreground"}`} />
              <div>
                <h4 className="text-sm font-bold text-foreground">Web de Comercios</h4>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed font-light">Generar cobros QR dinámicos, sweeps bancarios y control de caja.</p>
              </div>
            </div>
          </button>

          {/* Ledger selector */}
          <button
            onClick={() => setActiveProduct("ledger")}
            onMouseMove={handleMouseMove}
            className={`p-6 text-left rounded-3xl transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) relative overflow-hidden group ${
              activeProduct === "ledger"
                ? "bg-gradient-to-br from-primary-brand/15 to-transparent text-foreground scale-[1.02] -translate-y-1 shadow-[0_30px_100px_-30px_rgba(19,109,236,0.15)]"
                : "bg-transparent hover:bg-white/5 [.light_&]:hover:bg-slate-100 text-muted-foreground"
            }`}
          >
            <div className="card-spotlight" />
            <div className="flex flex-col h-full justify-between space-y-4 relative z-10">
              <Database className={`w-6 h-6 transition-colors ${activeProduct === "ledger" ? "text-primary-brand" : "text-gray-400 group-hover:text-foreground"}`} />
              <div>
                <h4 className="text-sm font-bold text-foreground">Core Ledger</h4>
                <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed font-light">Partida doble inmutable a nivel de base de datos con balance cero.</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* THE DYNAMIC DEMO DISPLAY SCREEN (THE PLAYGROUND CANVAS) */}
      <div className="grid lg:grid-cols-12 gap-12 items-stretch pt-2">
        
        {/* LEFT DYNAMIC CAPABILITIES CONTROLS (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 z-10">
          
          {/* PRODUCT: Wallet capabilities */}
          {activeProduct === "wallet" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in-up">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase bg-primary-brand/10 text-primary-brand px-3 py-1 rounded-full font-bold">
                  Billetera Híbrida B2C
                </span>
                <h3 className="text-2xl font-bold text-foreground">Ofrece una Experiencia Web2 sin Fricciones</h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  Nuestra billetera marca blanca permite a tus usuarios finales realizar transacciones de forma nativa e inmediata. Oculta la complejidad técnica de la red blockchain a través de abstracción de cuentas.
                </p>
              </div>

              {/* Action buttons tabs - Borderless Gradients */}
              <div className="space-y-3">
                <button
                  onClick={() => setWalletAction("pay")}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    walletAction === "pay"
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-primary-brand scale-[1.01]"
                      : "bg-transparent hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-primary-brand" />
                      Simular Compra QR en Pesos / Fiat
                    </div>
                    <div className="text-[11px] text-muted-foreground font-light leading-relaxed">Escanea y transfiere saldo de forma instantánea.</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setWalletAction("stake")}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    walletAction === "stake"
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-primary-brand scale-[1.01]"
                      : "bg-transparent hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-primary-brand" />
                      Inversión & Staking Automático
                    </div>
                    <div className="text-[11px] text-muted-foreground font-light leading-relaxed">Genera rendimientos fiduciarios en pesos con liquidez inmediata.</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setWalletAction("passkey")}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    walletAction === "passkey"
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-primary-brand scale-[1.01]"
                      : "bg-transparent hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-primary-brand" />
                      Registro con Passkeys (OAuth)
                    </div>
                    <div className="text-[11px] text-muted-foreground font-light leading-relaxed">Login con biometría o redes sociales. Cero frases semilla.</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PRODUCT: Merchant POS capabilities */}
          {activeProduct === "merchant" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in-up">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase bg-primary-brand/10 text-primary-brand px-3 py-1 rounded-full font-bold">
                  Terminal POS de Comercios
                </span>
                <h3 className="text-2xl font-bold text-foreground">El Motor Comercial para tu Red Afiliada</h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  Empodera a los comercios de tu ecosistema. Generación instantánea de cobros por códigos QR, control transaccional robusto y sweeps de retiro bancario automático.
                </p>
              </div>

              {/* Action buttons tabs - Borderless Gradients */}
              <div className="space-y-3">
                <button
                  onClick={() => setMerchantAction("pos")}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    merchantAction === "pos"
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-primary-brand scale-[1.01]"
                      : "bg-transparent hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-primary-brand" />
                      Generación Dinámica de Cobros QR
                    </div>
                    <div className="text-[11px] text-muted-foreground font-light leading-relaxed">Cobra de forma física en terminal POS instantánea.</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setMerchantAction("sweep")}
                  className={`w-full text-left p-4.5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    merchantAction === "sweep"
                      ? "bg-gradient-to-r from-primary-brand/15 to-transparent text-primary-brand scale-[1.01]"
                      : "bg-transparent hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 text-primary-brand" />
                      Sweep Bancario Coelsa en Vivo
                    </div>
                    <div className="text-[11px] text-muted-foreground font-light leading-relaxed">Liquida balances digitales on-chain directamente a cuenta bancaria.</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PRODUCT: Ledger capabilities */}
          {activeProduct === "ledger" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in-up">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase bg-primary-brand/10 text-primary-brand px-3 py-1 rounded-full font-bold">
                  Core Ledger Contable
                </span>
                <h3 className="text-2xl font-bold text-foreground">Precisión de Partida Doble en Tiempo Real</h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  Cada evento financiero on-chain o fiat asienta de forma inalterable múltiples registros contables cruzados. Cumple con la regla matemática del ledger de balance cero, blindando a tu empresa contra fugas financieras.
                </p>
              </div>

              {/* Ledger visual specification panel - Borderless Gradient */}
              <div className="bg-gradient-to-br from-primary-brand/10 via-primary-brand/5 to-transparent p-5 rounded-2xl text-xs space-y-4 font-light text-muted-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-brand/[0.01] pointer-events-none" />
                <div className="flex items-center gap-2 text-foreground font-bold relative z-10">
                  <Database className="w-4 h-4 text-primary-brand" />
                  Regla 7: Contabilidad de Suma Cero
                </div>
                <p className="relative z-10">
                  Toda operación genera simultáneamente un asiento de **Débito (Retiro)** y un asiento de **Crédito (Depósito)**, cuya suma matemática debe balancear a exactamente **0.00**.
                </p>
                <div className="border-t border-border-glow pt-3 text-[10px] font-mono text-primary-brand flex justify-between items-center relative z-10">
                  <span>Auditoría de Inmutabilidad activa</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full uppercase text-[8px] font-bold">Suma = 0.00 OK</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT DYNAMIC HIGH-FIDELITY PREVIEW SCREENS (UNIFIED PERSPECTIVE CANVAS) */}
        <div 
          className="lg:col-span-7 bg-[#080d16] [.light_&]:bg-slate-50 dark:bg-[#03070c] rounded-[2.5rem] border border-primary-brand/10 [.light_&]:border-slate-200/80 p-6 md:p-8 flex items-center justify-center relative overflow-hidden min-h-[640px] shadow-2xl"
        >
          {/* Mesh lighting glow orb to make preview stand out */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-brand/[0.03] to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full glow-orb opacity-10 pointer-events-none" />
          
          {/* PERSISTENT SVG FLOW CONNECTORS (Active in Large Screens) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" style={{ overflow: "visible" }}>
            {/* Base network lines */}
            <path
              d="M 190 280 C 270 280, 270 160, 350 160"
              fill="none"
              stroke="var(--theme-border)"
              strokeWidth="2"
              className="flow-path-dashed dark:stroke-white/10 stroke-slate-900/10"
            />
            <path
              d="M 190 340 C 270 340, 270 450, 350 450"
              fill="none"
              stroke="var(--theme-border)"
              strokeWidth="2"
              className="flow-path-dashed dark:stroke-white/10 stroke-slate-900/10"
            />
            <path
              d="M 520 230 L 520 370"
              fill="none"
              stroke="var(--theme-border)"
              strokeWidth="2"
              className="flow-path-dashed dark:stroke-white/10 stroke-slate-900/10"
            />

            {/* Active Glowing Pulsing Lines (Triggered by active flow events) */}
            <path
              d="M 190 280 C 270 280, 270 160, 350 160"
              fill="none"
              stroke="url(#blue-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className={`flow-path-pulse ${activeFlow === "pay-scan" ? "active" : ""}`}
            />
            <path
              d="M 190 340 C 270 340, 270 450, 350 450"
              fill="none"
              stroke="url(#blue-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className={`flow-path-pulse ${activeFlow === "pay-ledger" ? "active" : ""}`}
            />
            <path
              d="M 520 230 L 520 370"
              fill="none"
              stroke="url(#emerald-gradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className={`flow-path-pulse ${activeFlow === "sweep-ledger" ? "active" : ""}`}
            />

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--tenant-primary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--tenant-secondary)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--tenant-primary)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* DYNAMIC CANVAS WRAPPER - Shifts focus sutilly depending on Active Tab */}
          <div className="relative w-full h-[580px] hidden lg:block">
            
            {/* NODE A: WALLET MOCKUP (Left side of canvas) - Borderless Gradient Frame */}
            <div 
              onClick={() => setActiveProduct("wallet")}
              onMouseMove={handleMouseMove}
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-[270px] h-[550px] bg-gradient-to-br from-slate-950 to-slate-900 [.light_&]:from-white [.light_&]:to-slate-50 rounded-[40px] border-[2px] transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none overflow-hidden flex flex-col ${
                activeProduct === "wallet"
                  ? "opacity-100 scale-100 border-primary-brand/35 shadow-[0_30px_100px_-30px_rgba(19,109,236,0.15)] z-20"
                  : "opacity-35 scale-[0.92] border-white/5 [.light_&]:border-slate-200 hover:opacity-55 hover:scale-[0.94] z-10 grayscale-[35%]"
              }`}
            >
              <div className="card-spotlight" />
              
              {/* Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 [.light_&]:bg-slate-200 rounded-full z-30" />

              {/* Phone Content */}
              <div className="flex-1 p-4 flex flex-col text-white [.light_&]:text-slate-800 relative z-10">
                {/* Status bar */}
                <div className="flex justify-between items-center text-[7.5px] font-mono text-muted-foreground pt-1.5 px-2.5 mb-4">
                  <span>09:41</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span>5G</span>
                  </div>
                </div>

                {walletAction === "pay" && (
                  <div className="flex-1 flex flex-col justify-between">
                    {payState === "idle" && (
                      <div className="flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-3">
                          <p className="text-[7.5px] font-mono tracking-widest text-primary-brand uppercase text-center font-bold">Smart Wallet Pay</p>
                          {/* Balance Display - borderless gradient */}
                          <div className="bg-gradient-to-br from-primary-brand/15 to-transparent p-3 rounded-2xl text-center">
                            <p className="text-[6.5px] text-muted-foreground uppercase font-black tracking-widest">Saldo Disponible</p>
                            <p className="text-lg font-black text-white [.light_&]:text-slate-800 mt-0.5">$ 42,850.00 <span className="text-xs text-primary-brand font-mono">DFX</span></p>
                          </div>
                        </div>

                        {/* Scan Area - borderless gradient */}
                        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-white/5 [.light_&]:from-slate-100 to-transparent rounded-2xl p-4 space-y-3 text-center">
                          <QrCode className="w-10 h-10 text-primary-brand" />
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePaySuccess(); }}
                            className="bg-primary-brand text-white text-[9px] font-bold px-4 py-2 rounded-xl uppercase tracking-wider hover:bg-primary-brand/90 transition-all flex items-center gap-1 shadow-md shimmer-btn"
                          >
                            <Send className="w-2.5 h-2.5" />
                            Escanear QR POS
                          </button>
                        </div>
                        <p className="text-[6.5px] text-muted-foreground font-light text-center leading-relaxed">Simula el canje de saldo fiduciario ARS Stablecoin.</p>
                      </div>
                    )}

                    {payState === "scanning" && (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <div className="absolute inset-0 border border-primary-brand/40 border-t-primary-brand rounded-full animate-spin" />
                          <QrCode className="w-5 h-5 text-primary-brand animate-pulse" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white [.light_&]:text-slate-800 uppercase tracking-wider animate-pulse">Procesando pago...</p>
                          <p className="text-[7.5px] text-muted-foreground font-mono mt-1">Abstracción de Gas Patrocinada</p>
                        </div>
                      </div>
                    )}

                    {payState === "success" && (
                      <div className="flex-1 flex flex-col justify-between text-center space-y-2">
                        <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                          <div className="w-11 h-11 text-emerald-400 bg-emerald-500/10 p-2 rounded-full border border-emerald-500/10 animate-bounce flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-xs font-extrabold text-white [.light_&]:text-slate-800">¡Pago Confirmado!</h4>
                            <p className="text-[8px] text-muted-foreground font-mono mt-0.5">Smart Tx Hash: 0x71d2...a984</p>
                          </div>
                        </div>

                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-xl text-[8px] text-emerald-400 space-y-0.5 font-mono">
                          <div>Monto: -1,000 DFX (1:1 ARS)</div>
                          <div>Destino: POS Comercial DFX</div>
                        </div>

                        <button 
                          onClick={(e) => { e.stopPropagation(); setPayState("idle"); }}
                          className="w-full bg-white/5 border border-white/10 text-white [.light_&]:text-slate-800 text-[8px] py-1.5 rounded-lg mt-2 font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                          Pagar de nuevo
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {walletAction === "stake" && (
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-3">
                      <p className="text-[7.5px] font-mono tracking-widest text-primary-brand uppercase text-center font-bold">Stake & Earn en ARS</p>
                      
                      {/* Yield box - borderless gradient */}
                      <div className="bg-gradient-to-br from-emerald-500/15 to-transparent p-3 rounded-2xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-10 h-10 bg-emerald-500/5 rounded-full filter blur-md" />
                        <p className="text-[6.5px] text-muted-foreground uppercase font-black tracking-widest">Rendimiento Anual (TNA)</p>
                        <p className="text-xl font-black text-emerald-400 mt-0.5">72.4%</p>
                        <p className="text-[6px] text-muted-foreground uppercase font-medium mt-0.5 font-mono">Liquidez 100% Inmediata</p>
                      </div>
                    </div>

                    {/* Amount slider panel - borderless gradient */}
                    <div className="space-y-3.5 bg-gradient-to-r from-white/5 [.light_&]:from-slate-100 to-transparent p-3 rounded-2xl">
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-muted-foreground">Monto a Invertir</span>
                        <span className="font-mono font-bold text-white [.light_&]:text-slate-850">$ {formatAmount(stakeAmount)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="10000" 
                        max="500000" 
                        step="5000"
                        value={stakeAmount}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setStakeAmount(Number(e.target.value))}
                        className="w-full accent-primary-brand cursor-pointer"
                      />
                      
                      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[9px]">
                        <span className="text-muted-foreground">Retorno/Mes:</span>
                        <span className="font-mono font-bold text-emerald-400">+$ {((stakeAmount * 0.724) / 12).toFixed(2)}</span>
                      </div>
                    </div>

                    <p className="text-[6.5px] text-muted-foreground font-light text-center leading-relaxed">Los balances rinden pasivamente con liquidez inmediata.</p>
                  </div>
                )}

                {walletAction === "passkey" && (
                  <div className="flex-1 flex flex-col justify-between text-center space-y-2">
                    <div className="space-y-1">
                      <p className="text-[7.5px] font-mono tracking-widest text-primary-brand uppercase font-bold">Onboarding OAuth 2.0</p>
                      <h5 className="text-[11px] font-bold text-white [.light_&]:text-slate-800">Login Social Marca Blanca</h5>
                    </div>

                    {passkeyState === "idle" && (
                      <div className="flex-1 flex flex-col justify-center space-y-3">
                        <div className="w-10 h-10 rounded-full border border-white/10 [.light_&]:border-slate-200 bg-white/5 [.light_&]:bg-slate-100 flex items-center justify-center mx-auto text-primary-brand">
                          <Lock className="w-4 h-4" />
                        </div>
                        <p className="text-[9px] text-muted-foreground leading-relaxed px-2 font-light">Utiliza el sensor biométrico del teléfono (FaceID / Passkeys) para firmar de forma inmutable.</p>
                        
                        <button
                          onClick={(e) => { e.stopPropagation(); handlePasskeySuccess(); }}
                          className="bg-primary-brand text-white text-[8px] font-bold py-2 px-3 rounded-lg uppercase tracking-widest hover:bg-primary-brand/90 transition-all mx-auto shadow-md"
                        >
                          Activar Biometría
                        </button>
                      </div>
                    )}

                    {passkeyState === "scanning" && (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          {/* FaceID visual scanner vectors */}
                          <div className="absolute inset-0 border border-primary-brand/30 rounded-full animate-spin-slow" />
                          <div className="absolute inset-1.5 border border-dashed border-primary-brand/50 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
                          <div className="absolute inset-3 border-2 border-primary-brand/80 rounded-full animate-pulse" />
                          <Lock className="w-5 h-5 text-primary-brand relative z-10" />
                        </div>
                        <p className="text-[8px] text-primary-brand font-mono uppercase tracking-wider animate-pulse">Escaneando Biometría...</p>
                      </div>
                    )}

                    {passkeyState === "success" && (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                        <div className="w-10 h-10 text-emerald-400 bg-emerald-500/10 p-2 rounded-full border border-emerald-500/10 animate-bounce flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white [.light_&]:text-slate-800">¡Biometría Enlazada!</p>
                          <p className="text-[7.5px] text-muted-foreground font-mono mt-0.5">Clave firmante MPC encriptada.</p>
                        </div>
                        
                        <button 
                          onClick={(e) => { e.stopPropagation(); setPasskeyState("idle"); }}
                          className="bg-white/5 border border-white/10 text-white [.light_&]:text-slate-800 text-[8px] py-1 px-3 rounded-lg uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                          Reiniciar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* NODE B: MERCHANT POS MOCKUP (Right Top side of canvas) - Borderless Gradient */}
            <div 
              onClick={() => setActiveProduct("merchant")}
              onMouseMove={handleMouseMove}
              className={`absolute right-0 top-0 w-[420px] h-[270px] bg-gradient-to-br from-slate-950/95 to-slate-900/90 [.light_&]:from-white [.light_&]:to-slate-50 rounded-3xl border transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none overflow-hidden flex flex-col text-white [.light_&]:text-slate-800 ${
                activeProduct === "merchant"
                  ? "opacity-100 scale-100 border-primary-brand/35 shadow-[0_30px_100px_-30px_rgba(19,109,236,0.15)] z-20"
                  : "opacity-35 scale-[0.92] border-white/5 [.light_&]:border-slate-200 hover:opacity-55 hover:scale-[0.94] z-10 grayscale-[35%]"
              }`}
            >
              <div className="card-spotlight" />
              <div className="p-4 flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 [.light_&]:border-slate-200 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand animate-pulse" />
                    <span className="text-[8.5px] font-bold uppercase tracking-widest text-white [.light_&]:text-slate-800">DFX Merchant POS</span>
                  </div>
                  <span className="text-[7.5px] font-mono text-muted-foreground uppercase bg-white/5 [.light_&]:bg-slate-100 px-2 py-0.5 rounded">Terminal 01</span>
                </div>

                {merchantAction === "pos" && (
                  <div className="flex-1 grid grid-cols-12 gap-3.5">
                    {/* Left QR Display (6 cols) - Borderless Gradient */}
                    <div className="col-span-6 flex flex-col justify-center items-center bg-gradient-to-br from-white/5 [.light_&]:from-slate-100/50 to-transparent rounded-xl p-3 relative overflow-hidden">
                      {qrGenerated ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-24 h-24 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-md relative overflow-hidden">
                            <QrCode className="w-full h-full text-slate-900" />
                            {/* Scanning laser line in POS */}
                            <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981] animate-bounce" style={{ animationDuration: '2s' }} />
                          </div>
                          <p className="text-[7.5px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            Esperando Canje...
                          </p>
                        </div>
                      ) : (
                        <div className="text-center space-y-1.5 text-muted-foreground">
                          <QrCode className="w-8 h-8 mx-auto opacity-30" />
                          <p className="text-[7.5px] font-light leading-relaxed">Ingresa un monto y genera cobro QR</p>
                        </div>
                      )}
                    </div>

                    {/* Right Amount Form (6 cols) */}
                    <div className="col-span-6 flex flex-col justify-between py-1">
                      <div className="space-y-1.5">
                        <label className="text-[7.5px] font-mono uppercase tracking-widest text-muted-foreground block">Monto a Cobrar ($)</label>
                        <input 
                          type="number"
                          value={chargeAmount}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => { setChargeAmount(e.target.value); setQrGenerated(false); }}
                          className="w-full bg-[#0a0f16] [.light_&]:bg-slate-100 border border-white/10 [.light_&]:border-slate-200 rounded-lg px-2.5 py-1.5 text-white [.light_&]:text-slate-850 font-mono font-bold text-xs focus:outline-none focus:border-primary-brand"
                          placeholder="Monto"
                        />
                        <p className="text-[6px] text-muted-foreground uppercase leading-relaxed font-light">Paridad fiduciaria $ARS 1:1.</p>
                      </div>

                      <button
                        onClick={(e) => { e.stopPropagation(); setQrGenerated(true); }}
                        className="w-full bg-primary-brand hover:bg-primary-brand/90 text-white font-bold py-2 rounded-xl text-[8.5px] uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 shimmer-btn"
                      >
                        <QrCode className="w-3 h-3" />
                        Generar Cobro QR
                      </button>
                    </div>
                  </div>
                )}

                {merchantAction === "sweep" && (
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1.5">
                      <h5 className="text-[11px] font-bold text-white [.light_&]:text-slate-800">Liquidación & Retiro de Cajas</h5>
                      <p className="text-[9px] text-muted-foreground leading-relaxed font-light">
                        Envía de forma automatizada o manual tus balances acumulados en la red digital a tu cuenta bancaria tradicional con compensación inmediata Coelsa.
                      </p>
                    </div>

                    {/* Sweep balance wrapper - borderless gradient */}
                    <div className="bg-gradient-to-r from-white/5 [.light_&]:from-slate-100 to-transparent p-3 rounded-2xl flex justify-between items-center">
                      <div>
                        <span className="text-[6.5px] text-muted-foreground uppercase font-black tracking-widest">Saldo Liquidable</span>
                        <span className="text-sm font-black text-white [.light_&]:text-slate-850 block mt-0.5">$ 142,500.00 ARS</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSweepSuccess(); }}
                        disabled={sweepState === "processing"}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-[8.5px] uppercase tracking-wider transition-all flex items-center gap-1 shadow-md"
                      >
                        <RefreshCw className={`w-2.5 h-2.5 ${sweepState === "processing" ? "animate-spin" : ""}`} />
                        Sweep
                      </button>
                    </div>

                    {sweepState === "processing" && (
                      <p className="text-[8px] text-primary-brand font-mono text-center animate-pulse uppercase tracking-wider">
                        Compensando y depositando pesos en cuenta fiduciaria...
                      </p>
                    )}

                    {sweepState === "success" && (
                      <div className="bg-emerald-500/10 p-2 rounded-xl text-[8px] text-emerald-400 text-center font-mono animate-bounce">
                        ✓ Sweep asentado. Cuenta omnibus Coelsa acreditada.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* NODE C: LEDGER TABLE MOCKUP (Right Bottom side of canvas) - Borderless Gradient */}
            <div 
              onClick={() => setActiveProduct("ledger")}
              onMouseMove={handleMouseMove}
              className={`absolute right-0 bottom-0 w-[420px] h-[270px] bg-gradient-to-br from-slate-950/95 to-slate-900/90 [.light_&]:from-white [.light_&]:to-slate-50 rounded-3xl border transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer select-none overflow-hidden flex flex-col text-white [.light_&]:text-slate-800 ${
                activeProduct === "ledger"
                  ? "opacity-100 scale-100 border-primary-brand/35 shadow-[0_30px_100px_-30px_rgba(19,109,236,0.15)] z-20"
                  : "opacity-35 scale-[0.92] border-white/5 [.light_&]:border-slate-200 hover:opacity-55 hover:scale-[0.94] z-10 grayscale-[35%]"
              }`}
            >
              <div className="card-spotlight" />
              <div className="p-4 flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 [.light_&]:border-slate-200 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-primary-brand animate-pulse" />
                    <span className="text-[8.5px] font-bold uppercase tracking-widest text-white [.light_&]:text-slate-800">Central Transaction Ledger</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[7px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Inmutable RLS</span>
                </div>

                {/* Main Content split side-by-side */}
                <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden mt-1.5">
                  
                  {/* Left: Scoped Commercial Tree (5 cols) */}
                  <div className="col-span-5 border-r border-white/5 [.light_&]:border-slate-200 pr-3 flex flex-col justify-between select-none">
                    <span className="text-[6.5px] text-gray-500 uppercase font-black tracking-widest block mb-2">
                      Árbol RLS Scoped
                    </span>
                    
                    {/* Visual Vertical Node Tree */}
                    <div className="flex-1 flex flex-col items-center justify-between py-1 relative">
                      
                      {/* Connection Line Background SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                        {/* Vertical line from Corp to PSP */}
                        <line x1="50%" y1="12" x2="50%" y2="34" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 3" className="dark:stroke-white/5 stroke-slate-900/10" />
                        {/* Branching from PSP to POS & Wallet */}
                        <path d="M 68 46 C 68 62, 34 62, 34 82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 3" className="dark:stroke-white/5 stroke-slate-900/10" />
                        {/* Right branch */}
                        <path d="M 68 46 C 68 62, 102 62, 102 82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 3" className="dark:stroke-white/5 stroke-slate-900/10" />
                      </svg>

                      {/* Node 1: Root Corporate */}
                      <div className="relative z-10 w-full flex justify-center">
                        <div className={`px-2.5 py-1 rounded-lg bg-slate-900 border text-[7.5px] font-mono font-bold tracking-wide flex items-center gap-1 shadow-md transition-all duration-300 ${activeFlow === "sweep-ledger" ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.15)] text-emerald-400" : "border-white/5 [.light_&]:border-slate-200 bg-slate-900 [.light_&]:bg-slate-100 text-gray-300 [.light_&]:text-slate-800"}`}>
                          <Building className="w-2.5 h-2.5 text-primary-brand" />
                          <span>reDeFinX Corp</span>
                        </div>
                      </div>

                      {/* Node 2: PSP Gateway */}
                      <div className="relative z-10 w-full flex justify-center">
                        <div className={`px-2 py-0.5 rounded-md bg-slate-950 border border-white/5 [.light_&]:border-slate-200 text-[6.5px] font-mono text-gray-400 [.light_&]:text-slate-600 flex items-center gap-1 transition-all duration-300 bg-slate-950 [.light_&]:bg-slate-50`}>
                          <ArrowRightLeft className="w-2 h-2 text-primary-brand animate-spin-slow" />
                          <span>PSP Gateway</span>
                                       {/* Node 3 & 4: Leaf nodes side by side */}
                      <div className="relative z-10 w-full grid grid-cols-2 gap-2 mt-2">
                        {/* Merchant POS */}
                        <div className={`p-1.5 rounded-lg bg-slate-900 border text-center font-mono flex flex-col items-center justify-center transition-all duration-300 ${activeFlow === "pay-scan" || activeFlow === "pay-ledger" || activeFlow === "sweep-ledger" ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.15)]" : "border-white/5 [.light_&]:border-slate-200 bg-slate-900 [.light_&]:bg-slate-100"}`}>
                          <LayoutDashboard className="w-3.5 h-3.5 text-primary-brand mb-0.5" />
                          <span className="text-[6px] font-bold text-white [.light_&]:text-slate-800 leading-none">Merchant POS</span>
                          <span className="text-[5px] text-gray-500 mt-0.5">POS Comercio</span>
                        </div>

                        {/* Smart Wallet */}
                        <div className={`p-1.5 rounded-lg bg-slate-900 border text-center font-mono flex flex-col items-center justify-center transition-all duration-300 ${activeFlow === "pay-scan" || activeFlow === "pay-ledger" ? "border-primary-brand bg-primary-brand/10 shadow-[0_0_12px_rgba(19,109,236,0.15)]" : "border-white/5 [.light_&]:border-slate-200 bg-slate-900 [.light_&]:bg-slate-100"}`}>
                          <Smartphone className="w-3.5 h-3.5 text-secondary-brand mb-0.5" />
                          <span className="text-[6px] font-bold text-white [.light_&]:text-slate-800 leading-none">Smart Wallet</span>
                          <span className="text-[5px] text-gray-500 mt-0.5">Billetera B2C</span>
                        </div>
                      </div>          </div>
                      </div>

                    </div>
                  </div>

                  {/* Right: Central Transaction Ledger (7 cols) */}
                  <div className="col-span-7 flex flex-col justify-between overflow-hidden">
                    <div className="space-y-1.5 overflow-y-auto max-h-[145px] pr-1 text-[8px] font-mono custom-scrollbar">
                      <div className="grid grid-cols-12 text-[6px] text-gray-500 uppercase font-black pb-1 border-b border-white/5 [.light_&]:border-slate-200">
                        <span className="col-span-3">Tx ID</span>
                        <span className="col-span-6">Cuenta Scoped</span>
                        <span className="col-span-3 text-right">Monto</span>
                      </div>

                      {transactions.map((tx, idx) => (
                        <div 
                          key={idx} 
                          className={`grid grid-cols-12 py-1 items-center border-b border-white/5/30 [.light_&]:border-slate-200/50 transition-colors duration-500 ${
                            tx.highlight ? "bg-primary-brand/10 text-white [.light_&]:text-slate-800 font-bold" : "text-gray-300 [.light_&]:text-slate-700"
                          }`}
                        >
                          <span className={`col-span-3 ${tx.highlight ? "text-primary-brand" : "text-gray-500"}`}>{tx.id}</span>
                          <span className="col-span-6 truncate pr-1">{tx.account}</span>
                          <span className={`col-span-3 text-right font-bold ${tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {tx.amount < 0 ? '' : '+'}{formatAmount(tx.amount)} {tx.currency}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 [.light_&]:border-slate-200 pt-2.5 mt-2 flex justify-between items-center bg-white/5 [.light_&]:bg-slate-100 p-2 rounded-xl">
                      <div className="flex items-center gap-1 text-[7px] text-muted-foreground uppercase font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Partida Doble Check
                      </div>
                      <span className="font-mono text-emerald-400 font-bold text-[9px]">SUM(Balance) = 0.00 ARS</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* SIMPLIFIED RESPONSIVE PREVIEW SCREENS (Visible below lg break) */}
          <div className="w-full lg:hidden block">
            
            {/* Responsive Wallet screen */}
            {activeProduct === "wallet" && (
              <div className="w-full max-w-[310px] mx-auto bg-[#0a0f16] [.light_&]:bg-white rounded-[40px] border-[5px] border-gray-800 [.light_&]:border-slate-200 p-4 shadow-xl relative aspect-[9/18.5] flex flex-col text-white [.light_&]:text-slate-800 overflow-hidden animate-fade-in-up">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-full z-20" />
                <div className="flex-1 p-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[7px] font-mono text-muted-foreground pt-1.5 px-2 mb-3">
                    <span>09:41</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {walletAction === "pay" && (
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-2">
                        <p className="text-[7.5px] font-mono text-primary-brand text-center uppercase tracking-widest font-bold">Smart Wallet Pay</p>
                        <div className="bg-[#111827] p-3 rounded-xl border border-white/5 text-center">
                          <p className="text-[6px] text-muted-foreground uppercase tracking-widest">Saldo</p>
                          <p className="text-base font-black">$ 42,850.00 <span className="text-[10px] text-primary-brand">DFX</span></p>
                        </div>
                      </div>
                      <div className="flex-1 border border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center p-4 space-y-3">
                        <QrCode className="w-8 h-8 text-primary-brand" />
                        <button
                          onClick={handlePaySuccess}
                          className="bg-primary-brand text-white text-[8px] font-bold px-4 py-2 rounded-lg uppercase tracking-widest shadow-md shimmer-btn"
                        >
                          Escanear QR POS
                        </button>
                      </div>
                    </div>
                  )}

                  {walletAction === "stake" && (
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <p className="text-[7.5px] font-mono text-primary-brand text-center uppercase tracking-widest font-bold">Stake & Earn en ARS</p>
                      <div className="bg-[#111827] p-3 rounded-xl border border-white/5 text-center">
                        <p className="text-[6px] text-muted-foreground uppercase">Rendimiento (TNA)</p>
                        <p className="text-xl font-black text-emerald-400">72.4%</p>
                      </div>
                      <div className="space-y-2 bg-white/5 p-3 rounded-xl">
                        <div className="flex justify-between text-[8px]">
                          <span>Inversión</span>
                          <span>$ {formatAmount(stakeAmount)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="10000" 
                          max="500000" 
                          step="5000"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(Number(e.target.value))}
                          className="w-full accent-primary-brand"
                        />
                      </div>
                    </div>
                  )}

                  {walletAction === "passkey" && (
                    <div className="flex-1 flex flex-col justify-center space-y-3 text-center">
                      <p className="text-[7px] font-mono text-primary-brand uppercase tracking-widest font-bold">Onboarding</p>
                      <Lock className="w-8 h-8 mx-auto text-primary-brand" />
                      <button
                        onClick={handlePasskeySuccess}
                        className="bg-primary-brand text-white text-[8px] font-bold py-2 px-4 rounded-lg uppercase tracking-widest shadow-md"
                      >
                        Activar Huella
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Responsive POS screen */}
            {activeProduct === "merchant" && (
              <div className="w-full max-w-[420px] mx-auto bg-[#0a0f16] rounded-2xl border-[5px] border-gray-800 p-4 shadow-xl flex flex-col text-white aspect-[1.53] overflow-hidden animate-fade-in-up">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                  <span className="text-[8px] font-bold text-white uppercase">POS Merchant</span>
                  <span className="text-[7px] font-mono text-muted-foreground uppercase bg-white/5 px-2 py-0.5 rounded">Terminal 01</span>
                </div>

                {merchantAction === "pos" && (
                  <div className="flex-1 grid grid-cols-12 gap-3">
                    <div className="col-span-6 flex flex-col justify-center items-center border border-white/5 bg-white/5 rounded-xl p-2 relative overflow-hidden">
                      {qrGenerated ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-20 h-20 bg-white rounded-lg p-1 relative overflow-hidden">
                            <QrCode className="w-full h-full text-slate-900" />
                            <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 animate-bounce" />
                          </div>
                        </div>
                      ) : (
                        <QrCode className="w-8 h-8 text-gray-600" />
                      )}
                    </div>
                    <div className="col-span-6 flex flex-col justify-between py-0.5">
                      <input 
                        type="number"
                        value={chargeAmount}
                        onChange={(e) => { setChargeAmount(e.target.value); setQrGenerated(false); }}
                        className="w-full bg-[#111827] border border-white/5 rounded px-2 py-1 text-white font-mono text-xs"
                      />
                      <button
                        onClick={() => setQrGenerated(true)}
                        className="w-full bg-primary-brand text-white font-bold py-2 rounded text-[8px] uppercase tracking-widest shimmer-btn"
                      >
                        Generar Cobro QR
                      </button>
                    </div>
                  </div>
                )}

                {merchantAction === "sweep" && (
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="bg-[#111827] p-3 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[6.5px] text-muted-foreground uppercase">Saldo Liquidable</span>
                        <span className="text-xs font-black block mt-0.5">$ 142,500.00 ARS</span>
                      </div>
                      <button
                        onClick={handleSweepSuccess}
                        className="bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded text-[8px] uppercase tracking-wider"
                      >
                        Sweep
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Responsive Ledger screen */}
            {activeProduct === "ledger" && (
              <div className="w-full max-w-[420px] mx-auto bg-[#0a0f16] rounded-2xl border-[5px] border-gray-800 p-4 shadow-xl flex flex-col text-white aspect-[1.53] overflow-hidden animate-fade-in-up">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="text-[8px] font-bold text-white uppercase">Central Ledger</span>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[6.5px] font-mono px-2 py-0.5 rounded-full">RLS ACTIVE</span>
                </div>

                {/* Micro Horizontal Tree on Mobile */}
                <div className="flex justify-between items-center bg-white/5 border border-white/5 p-1.5 rounded-lg mb-2 text-[6px] font-mono select-none">
                  <div className={`px-1.5 py-0.5 rounded border ${activeFlow === "sweep-ledger" ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/5 text-gray-400"}`}>reDeFinX Corp</div>
                  <div className="text-gray-600">➔</div>
                  <div className="px-1 py-0.5 rounded border border-white/5 bg-slate-950 text-gray-400">PSP</div>
                  <div className="text-gray-600">➔</div>
                  <div className="flex gap-1">
                    <div className={`px-1 py-0.5 rounded border ${activeFlow === "pay-scan" || activeFlow === "pay-ledger" || activeFlow === "sweep-ledger" ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/5 text-gray-400"}`}>POS</div>
                    <div className={`px-1 py-0.5 rounded border ${activeFlow === "pay-scan" || activeFlow === "pay-ledger" ? "border-primary-brand bg-primary-brand/10 text-primary-brand" : "border-white/5 text-gray-400"}`}>B2C</div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-1 overflow-y-auto max-h-[80px] text-[7px] font-mono pr-1 custom-scrollbar">
                    {transactions.map((tx, idx) => (
                      <div key={idx} className="flex justify-between py-0.5 border-b border-white/5">
                        <span className="text-gray-500">{tx.id}</span>
                        <span className="truncate max-w-[120px]">{tx.account}</span>
                        <span className={tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'}>
                          {tx.amount < 0 ? '' : '+'}{formatAmount(tx.amount)} {tx.currency}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 p-2 rounded-lg flex justify-between items-center text-[7.5px] mt-1.5">
                    <span className="text-muted-foreground uppercase">Partida Doble Check</span>
                    <span className="text-emerald-400 font-bold">SUM(Balance) = 0.00 ARS</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
