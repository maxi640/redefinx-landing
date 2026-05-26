"use client";

import React, { useState, useEffect } from "react";
import { Smartphone, LayoutDashboard, Palette, Sliders, CheckCircle, Copy, ExternalLink, Loader2 } from "lucide-react";

export default function BrandCustomizer() {
  const [brandName, setBrandName] = useState("reDeFinX");
  const [primaryColor, setPrimaryColor] = useState("#136dec");
  const [activeTab, setActiveTab] = useState<"wallet" | "merchant">("wallet");
  const [currency, setCurrency] = useState("usd");
  const [merchantCurrency, setMerchantCurrency] = useState<"ftk" | "usdc">("ftk");

  const colors = [
    { name: "Electric Blue (reDeFinX)", value: "#136dec" },
    { name: "Emerald Green (FarmaTK)", value: "#10b981" },
    { name: "Cyber Purple (CashPlus)", value: "#8b5cf6" },
    { name: "Crimson Red (PayRapid)", value: "#ef4444" },
    { name: "Sunset Gold", value: "#f59e0b" },
  ];

  useEffect(() => {
    // Dynamically update CSS variables on the document root
    document.documentElement.style.setProperty("--tenant-primary", primaryColor);
    // Offset secondary color for gradients
    document.documentElement.style.setProperty(
      "--tenant-secondary", 
      primaryColor === "#136dec" ? "#3b82f6" : `${primaryColor}cc`
    );
    // Offset glow color
    document.documentElement.style.setProperty(
      "--tenant-glow", 
      `${primaryColor}1f` // 12% opacity
    );
  }, [primaryColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const isOfficialBrand = brandName.toLowerCase() === "redefinx";
  const heroAsset = isOfficialBrand ? "FTK" : brandName.substring(0, 3).toUpperCase();

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      {/* Control Panel (White Label Sandbox) */}
      <div 
        onMouseMove={handleMouseMove}
        className="lg:col-span-4 premium-card p-6 rounded-2xl flex flex-col justify-between z-10"
      >
        <div className="card-spotlight" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="w-5 h-5 text-primary-brand animate-pulse" />
            <h3 className="text-xl font-semibold text-foreground">Marca Blanca Sandbox</h3>
          </div>
          
          <p className="text-muted-foreground text-xs mb-6 leading-relaxed font-light">
            Nuestra infraestructura es marca blanca nativa. Escribe tu nombre corporativo y elige tu color de marca para ver cómo se hidrata todo el ecosistema al instante.
          </p>
 
          {/* Brand Name Input */}
          <div className="space-y-2 mb-6">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
              Nombre de tu Marca
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value.substring(0, 20))}
              placeholder="Ej: FarmaTK"
              className="w-full bg-background border border-border-glow rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary-brand transition-colors text-xs font-semibold"
            />
          </div>

          {/* Color Presets */}
          <div className="space-y-3 mb-6">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
              Paleta de Color Primario
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className={`w-full aspect-square rounded-lg border-2 transition-all relative flex items-center justify-center cursor-pointer`}
                  style={{ 
                    backgroundColor: color.value, 
                    borderColor: primaryColor === color.value ? '#ffffff' : 'transparent' 
                  }}
                  title={color.name}
                >
                  {primaryColor === color.value && (
                    <CheckCircle className="w-4 h-4 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="border-t border-border-glow pt-4 mt-6 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            <Palette className="w-4 h-4 text-primary-brand" />
            <span>La UI entera y el API se re-estilizan en runtime</span>
          </div>
        </div>
      </div>

      {/* Real-time Dynamic Device Mockups Canvas (7 cols) */}
      <div 
        onMouseMove={handleMouseMove}
        className="lg:col-span-8 premium-card flex flex-col items-center justify-center p-6 bg-card-dark/40 rounded-2xl border border-border-glow relative overflow-hidden min-h-[640px]"
      >
        <div className="card-spotlight" />
        
        {/* Glow behind device */}
        <div className="absolute w-80 h-80 rounded-full glow-orb -top-20 -right-20 pointer-events-none opacity-20" />

        {/* Tab Selectors */}
        <div className="flex gap-2 mb-6 bg-background/80 p-1 rounded-full border border-border-glow z-10 relative">
          <button
            onClick={() => setActiveTab("wallet")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "wallet"
                ? "bg-primary-brand text-white shadow-lg scale-105"
                : "text-muted-foreground hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Billetera B2C
          </button>
          <button
            onClick={() => setActiveTab("merchant")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "merchant"
                ? "bg-primary-brand text-white shadow-lg scale-105"
                : "text-muted-foreground hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Web Comercios
          </button>
        </div>

        {/* Device Wrapper with Slide-Crossfade Transition */}
        <div className="w-full z-10 relative flex items-center justify-center min-h-[520px]">
          
          {/* EXACT REAL B2C MOBILE WALLET CLONE */}
          <div 
            className={`w-full max-w-[320px] bg-[#0a0f16] rounded-[44px] border-[7px] border-gray-800 p-4 shadow-2xl overflow-hidden aspect-[9/19.2] flex flex-col text-white transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) absolute ${
              activeTab === "wallet"
                ? "opacity-100 translate-x-0 scale-100 pointer-events-auto z-10"
                : "opacity-0 -translate-x-16 scale-90 pointer-events-none z-0"
            }`}
          >
            {/* Dynamic Camera Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-full z-20" />

            {/* Status bar */}
            <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground pt-1 px-4 mb-3">
              <span>09:41</span>
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>5G</span>
              </div>
            </div>

            {/* Header: User Profile & Notification */}
            <header className="px-2 pt-2 flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shadow-lg"
                  style={{ borderColor: `${primaryColor}30` }}
                >
                  {isOfficialBrand ? (
                    <img src="/icon.png" alt="Avatar" className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-white font-extrabold text-xs">
                      {brandName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-[7.5px] font-black text-muted-foreground tracking-[0.1em] uppercase">Muy buenas tardes</p>
                  <h1 className="text-[10px] font-black tracking-tight text-white flex items-center gap-1">
                    {isOfficialBrand ? "Usuario reDeFinX" : `Usuario ${brandName}`}
                  </h1>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center border border-white/5 bg-white/5">
                <span className="material-symbols-outlined text-[12px] text-primary-brand" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
              </div>
            </header>

            {/* Net Worth Card (Actual visual replica using dynamic background) */}
            <div className="net-worth-card p-5 rounded-[1.8rem] border border-white/5 text-center relative overflow-hidden mb-5 shadow-xl">
              <p className="text-[7.5px] font-bold text-white/70 tracking-[0.2em] uppercase mb-1">
                Patrimonio Total Estimado
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">
                  {currency === "usd" ? "$ 42,850.00" : "$ 49,063,250.00"}
                </span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-[8px] font-black border-none rounded py-0.5 px-1 bg-white/10 text-white focus:ring-0 cursor-pointer uppercase font-mono"
                >
                  <option value="usd" className="bg-slate-900 text-white">USD</option>
                  <option value="ars" className="bg-slate-900 text-white">ARS</option>
                </select>
              </div>
              <div className="mt-1.5 flex items-center justify-center gap-1.5">
                <span className="flex items-center text-white text-[8px] font-bold">
                  <span className="material-symbols-outlined text-[9px] mr-0.5">trending_up</span>
                  +2.4%
                </span>
                <span className="text-white/70 text-[7.5px] font-semibold uppercase tracking-wider">Últimas 24hs</span>
              </div>
            </div>

            {/* Scrollable Main Area */}
            <div className="flex-1 space-y-4 overflow-y-auto pr-0.5 custom-scrollbar">
              {/* Saldos Fiat Section */}
              <div>
                <div className="flex justify-between items-center mb-2 px-1">
                  <h2 className="text-[8px] font-bold text-muted-foreground tracking-wider uppercase">Saldos Fiat</h2>
                  <span className="material-symbols-outlined text-[9px] text-gray-500">info</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Pesos */}
                  <div className="glass-dark p-3 rounded-2xl block">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-[9px]">$</span>
                      </div>
                      <span className="text-[7px] font-black text-muted-foreground tracking-widest uppercase">Pesos</span>
                    </div>
                    <p className="text-xs font-extrabold text-white">$ 142,500</p>
                    <p className="text-[7px] text-muted-foreground font-medium mt-0.5">ARS WaaS</p>
                  </div>
                  {/* Dólares */}
                  <div className="glass-dark p-3 rounded-2xl block">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <span className="text-blue-400 font-bold text-[7px]">U$S</span>
                      </div>
                      <span className="text-[7px] font-black text-muted-foreground tracking-widest uppercase">Dólares</span>
                    </div>
                    <p className="text-xs font-extrabold text-white">$ 124.45</p>
                    <p className="text-[7px] text-muted-foreground font-medium mt-0.5">USD Estimado</p>
                  </div>
                </div>
              </div>

              {/* Cuentas Digitales Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h2 className="text-[8px] font-bold text-muted-foreground tracking-wider uppercase">Cuentas Digitales</h2>
                </div>

                {/* Hero Asset Card (Gradient with ticket shapes) */}
                <div 
                  className="p-4.5 rounded-[1.5rem] shadow-xl relative overflow-hidden cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)` }}
                >
                  {/* Ticket shape accent replica */}
                  <div className="ticket-shape"></div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex flex-col">
                      <p className="text-[7.5px] font-black text-white/70 tracking-[0.15em] uppercase mb-0.5">
                        {isOfficialBrand ? "FarmaTK Token" : `${brandName} Token`}
                      </p>
                      <span className="text-[8.5px] font-bold text-white tracking-wide">
                        {heroAsset} Stablecoin
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[7px] font-black text-white uppercase italic tracking-wider">
                      1:1 ARS
                    </span>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white leading-none">42,850</span>
                      <span className="text-[8px] font-bold text-white/70 uppercase">{heroAsset}</span>
                    </div>
                    <button className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-md">
                      <span className="material-symbols-outlined text-[16px] font-bold" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>qr_code_scanner</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Investment and Credit (Stake & Loans) */}
              <div>
                <h2 className="text-[8px] font-bold text-muted-foreground tracking-wider uppercase mb-2 px-1">Inversión & Crédito</h2>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#111827]/75 border border-white/5 p-3 rounded-2xl">
                    <div className="w-6 h-6 mb-2 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-emerald-400">monitoring</span>
                    </div>
                    <h3 className="text-[8px] font-extrabold text-white tracking-wide">Stake & Earn</h3>
                    <p className="text-[6.5px] text-muted-foreground font-medium uppercase mt-0.5">Rinde tu Capital</p>
                  </div>
                  <div className="bg-[#111827]/75 border border-white/5 p-3 rounded-2xl">
                    <div className="w-6 h-6 mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-blue-400">account_balance</span>
                    </div>
                    <h3 className="text-[8px] font-extrabold text-white tracking-wide">Lombard Loans</h3>
                    <p className="text-[6.5px] text-muted-foreground font-medium uppercase mt-0.5">Liquidez al instante</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-1.5 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-[8px] font-bold text-muted-foreground tracking-wider uppercase mb-1 px-1">Actividad</h2>
                  <span className="text-[7.5px] font-bold text-primary-brand uppercase">Ver Todo</span>
                </div>
                
                <div className="flex p-2.5 rounded-2xl bg-[#111827]/70 border border-white/5 items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                      <span className="material-symbols-outlined text-[12px]">south_west</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[8px] uppercase tracking-tight">Depósito {heroAsset}</h3>
                      <p className="text-[6.5px] text-muted-foreground font-light">Hoy, 14:20 • Web3</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[10px] text-emerald-400">+$2,500.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EXACT REAL B2B MERCHANT DASHBOARD CLONE */}
          <div 
            className={`w-full bg-[#0a0f16] rounded-3xl border-[6px] border-gray-800 p-5 shadow-2xl flex flex-col text-white aspect-[1.53] max-w-[600px] mx-auto overflow-hidden transition-all duration-[750ms] cubic-bezier(0.16, 1, 0.3, 1) absolute ${
              activeTab === "merchant"
                ? "opacity-100 translate-x-0 scale-100 pointer-events-auto z-10"
                : "opacity-0 translate-x-16 scale-90 pointer-events-none z-0"
            }`}
          >
            {/* Header: Brand & Identity */}
            <div className="flex justify-between items-end border-b border-white/5 pb-3.5 mb-3.5">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-primary-brand font-bold text-[7.5px] tracking-[0.2em] mb-1.5 uppercase opacity-85">
                  <span className="material-symbols-outlined text-[10px]">token</span>
                  Crypto Asset Portfolio
                </div>
                <h2 className="text-lg font-black text-white tracking-tighter flex items-center gap-1.5">
                  <span className="text-primary-brand">Merchant</span> 
                  {isOfficialBrand ? (
                    <img src="/imagotipo.png" className="h-4.5 w-auto object-contain" alt="reDeFinX" />
                  ) : (
                    brandName
                  )}
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-[#111827] px-3.5 py-2 rounded-xl border border-white/5">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[8.5px] border shadow-inner"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderColor: `${primaryColor}20` }}
                >
                  {merchantCurrency.toUpperCase()}
                </div>
                <div>
                  <p className="text-[6px] text-muted-foreground font-black uppercase tracking-[0.15em] opacity-60">Smart Vault Address</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[9px] font-mono text-white font-bold">
                      0x7152...9547
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Dashboard Main Grid */}
            <div className="grid grid-cols-12 gap-3.5 flex-1 overflow-hidden">
              {/* Balance Hero Card (8 cols) */}
              <div className="col-span-8 bg-[#111827] border border-white/5 rounded-[1.8rem] p-4 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary-brand/5 rounded-full filter blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Toggle */}
                  <div className="flex justify-start mb-2">
                    <div className="inline-flex p-0.5 bg-background rounded-lg border border-white/5">
                      <button
                        onClick={() => setMerchantCurrency("ftk")}
                        className={`px-4 py-1.5 text-[7.5px] font-black rounded transition-all uppercase tracking-widest ${merchantCurrency === "ftk" ? "bg-primary-brand text-white shadow-sm" : "text-muted-foreground hover:text-white"}`}
                      >
                        FarmaToken
                      </button>
                      <button
                        onClick={() => setMerchantCurrency("usdc")}
                        className={`px-4 py-1.5 text-[7.5px] font-black rounded transition-all uppercase tracking-widest ${merchantCurrency === "usdc" ? "bg-primary-brand text-white shadow-sm" : "text-muted-foreground hover:text-white"}`}
                      >
                        USDC Crypto
                      </button>
                    </div>
                  </div>

                  {/* Available Balance label */}
                  <div className="flex items-center justify-between my-1">
                    <div className="flex items-center gap-1.5 text-[7px] font-black text-muted-foreground uppercase tracking-[0.15em] opacity-60">
                      <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                      {merchantCurrency === "ftk" ? "Liquidez Disponible" : "Liquidez Crypto Staked"}
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2 py-0.5 flex items-center gap-1">
                      <div className="flex items-center text-emerald-400 font-bold gap-0.5 text-[8px]">
                        <span className="material-symbols-outlined text-[9px]">check_circle</span>
                        ONLINE
                      </div>
                    </div>
                  </div>

                  {/* Numeric Balance */}
                  <div className="my-1.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-black text-white tracking-tighter leading-none">
                        {merchantCurrency === "ftk" ? "245,000.00" : "12,500.00"}
                      </span>
                      <span className="text-base font-black text-primary-brand leading-none">
                        {merchantCurrency === "ftk" ? "FTK" : "USDC"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 mt-1">
                    <button className="flex-1 bg-primary-brand hover:bg-primary-brand/90 text-white font-black py-2.5 px-3 rounded-lg text-[8px] uppercase tracking-[0.15em] flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">qr_code</span>
                      Cobro QR POS
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/10 text-white font-black py-2.5 px-3 rounded-lg text-[8px] uppercase tracking-[0.15em] flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">payments</span>
                      Liquidación
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Transaction Stats Column (4 cols) */}
              <div className="col-span-4 flex flex-col gap-3 overflow-hidden">
                {/* Sales Today */}
                <div className="bg-[#111827] border border-white/5 rounded-xl p-3.5 flex flex-col justify-center">
                  <h3 className="text-[6.5px] font-black text-muted-foreground uppercase tracking-[0.15em] opacity-60 mb-0.5">Ventas Hoy</h3>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-base font-black text-white">12,450</span>
                    <span className="text-[7px] text-emerald-400 font-bold uppercase font-mono">FTK</span>
                  </div>
                </div>

                {/* Micro Activity Feed */}
                <div className="bg-[#111827] border border-white/5 rounded-xl p-3 flex-1 flex flex-col overflow-hidden">
                  <h3 className="text-[6.5px] font-black text-muted-foreground uppercase tracking-[0.15em] opacity-60 mb-2">Movimientos</h3>
                  <div className="space-y-1.5 overflow-y-auto custom-scrollbar flex-1 text-[7.5px] font-mono">
                    <div className="bg-slate-50/5 border border-white/5 rounded-lg p-1.5 flex items-center justify-between font-semibold">
                      <span>Cobro FTK</span>
                      <span className="text-emerald-400 font-bold">+$2,500</span>
                    </div>
                    <div className="bg-slate-50/5 border border-white/5 rounded-lg p-1.5 flex items-center justify-between font-semibold">
                      <span>Sweep Coelsa</span>
                      <span className="text-white font-bold">-$15,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
