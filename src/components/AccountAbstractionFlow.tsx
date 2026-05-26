"use client";

import React, { useState } from "react";
import { User, Key, Cpu, Flame, CheckCircle, ArrowRight, Play } from "lucide-react";

interface Step {
  id: number;
  title: string;
  desc: string;
  icon: any;
  status: "idle" | "active" | "success";
  highlight: string;
}

export default function AccountAbstractionFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Login Social (OAuth 2.0)",
      desc: "El usuario final se autentica mediante Google, Apple o Email tradicional sin contraseñas.",
      icon: User,
      status: "idle",
      highlight: "Fricción Cero de Web2"
    },
    {
      id: 2,
      title: "Criptografía MPC (Web3Auth)",
      desc: "El sistema genera una clave privada descentralizada dividida en fragmentos (Secret Shares) sin custodio único.",
      icon: Key,
      status: "idle",
      highlight: "Llave Distribuida MPC"
    },
    {
      id: 3,
      title: "Cuenta Inteligente (ERC-4337)",
      desc: "Se inicializa y despliega la Smart Account del usuario utilizando su clave MPC únicamente como firmante.",
      icon: Cpu,
      status: "idle",
      highlight: "Smart Contract Wallet"
    },
    {
      id: 4,
      title: "Transacción Gasless (Paymaster)",
      desc: "El Bundler agrupa la operación y el Paymaster de la plataforma subsidia la comisión de la red blockchain.",
      icon: Flame,
      status: "idle",
      highlight: "Gas = $0.00 para Usuario"
    }
  ]);

  const runFlow = () => {
    setIsRunning(true);
    setActiveStep(1);
    
    // Reset steps
    setSteps(prev => prev.map(s => ({ ...s, status: s.id === 1 ? "active" : "idle" })));

    const delay = 1200;

    // Step 2
    setTimeout(() => {
      setSteps(prev => prev.map(s => {
        if (s.id === 1) return { ...s, status: "success" };
        if (s.id === 2) return { ...s, status: "active" };
        return s;
      }));
      setActiveStep(2);
    }, delay);

    // Step 3
    setTimeout(() => {
      setSteps(prev => prev.map(s => {
        if (s.id === 2) return { ...s, status: "success" };
        if (s.id === 3) return { ...s, status: "active" };
        return s;
      }));
      setActiveStep(3);
    }, delay * 2);

    // Step 4
    setTimeout(() => {
      setSteps(prev => prev.map(s => {
        if (s.id === 3) return { ...s, status: "success" };
        if (s.id === 4) return { ...s, status: "active" };
        return s;
      }));
      setActiveStep(4);
    }, delay * 3);

    // Finish
    setTimeout(() => {
      setSteps(prev => prev.map(s => {
        if (s.id === 4) return { ...s, status: "success" };
        return s;
      }));
      setActiveStep(5);
      setIsRunning(false);
    }, delay * 4);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-center">
      {/* Visual Explanation */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary-brand/10 border border-primary-brand/30 px-4 py-1.5 rounded-full">
          <Cpu className="w-3.5 h-3.5 text-primary-brand animate-pulse" />
          <span className="text-primary-brand text-xs font-bold uppercase tracking-widest">
            Fricción Cero en Blockchain
          </span>
        </div>
        
        <h3 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
          La Magia de la <span className="text-primary-brand">Abstracción de Cuentas</span>.
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          Ocultamos por completo la complejidad técnica de la Web3 (frases semilla, gas fees, firmas criptográficas ásperas) para brindar una experiencia de usuario 100% familiar tipo Web2, pero manteniendo la custodia inmutable en el ledger.
        </p>

        {/* Action button */}
        <button
          onClick={runFlow}
          disabled={isRunning}
          className="bg-primary-brand hover:bg-primary-brand/90 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <Cpu className="w-4 h-4 animate-spin" />
              Desplegando Identidad...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Iniciar Onboarding Animado
            </>
          )}
        </button>
      </div>

      {/* Interactive Step Blocks */}
      <div className="lg:col-span-7 space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.status === "active";
          const isSuccess = step.status === "success";

          return (
            <div
              key={step.id}
              className={`glass-panel p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? "border-primary-brand bg-primary-brand/5 shadow-[0_0_15px_rgba(19,109,236,0.15)]" 
                  : "opacity-60 border-border-glow"
              } ${isSuccess ? "opacity-100 border-green-500/30" : ""}`}
            >
              {/* Dynamic glowing background for active state */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-brand/10 to-transparent pointer-events-none" />
              )}

              {/* Step Icon */}
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive 
                    ? "bg-primary-brand text-white scale-110" 
                    : isSuccess 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-background border border-border-glow text-muted-foreground"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              {/* Step Copy */}
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className={`text-sm font-bold ${isActive ? "text-foreground dark:text-white" : isSuccess ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}`}>
                    {step.id}. {step.title}
                  </h4>
                  <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    isActive 
                      ? "bg-primary-brand text-white" 
                      : isSuccess 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-background border border-border-glow text-muted-foreground"
                  }`}>
                    {step.highlight}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
