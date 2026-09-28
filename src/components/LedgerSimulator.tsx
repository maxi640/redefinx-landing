"use client";

import React, { useState } from "react";
import { Check, ShieldAlert, ArrowRightLeft, FileCode, Landmark, RefreshCw } from "lucide-react";

interface LedgerEntry {
  account: string;
  type: "DEBIT" | "CREDIT" | "FEE";
  amount: number;
}

export default function LedgerSimulator() {
  const [amount, setAmount] = useState<number>(100);
  const [txType, setTxType] = useState<"purchase" | "sweep" | "yield">("purchase");
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [correlationId, setCorrelationId] = useState<string>("");

  const runSimulation = () => {
    setIsSimulating(true);
    setEntries([]);
    const cid = "corr_id_" + Math.random().toString(36).substring(2, 9).toUpperCase();
    setCorrelationId(cid);

    const stepLogs = [
      `[STATE] Inicializando transacción asíncrona - Correlation ID: ${cid}...`,
      `[RESOLVER] Leyendo cuentas y tenan_id bloqueado para sesión activa...`,
      `[DATABASE] Iniciando transacción PL/pgSQL encapsulada en base de datos...`,
    ];

    setLogs([stepLogs[0]]);

    setTimeout(() => {
      setLogs((prev) => [...prev, stepLogs[1]]);
    }, 400);

    setTimeout(() => {
      setLogs((prev) => [...prev, stepLogs[2]]);
    }, 800);

    setTimeout(() => {
      // Generate split entries based on transaction type
      let splitEntries: LedgerEntry[] = [];
      const fee = Number((amount * 0.015).toFixed(2)); // 1.5% fee
      const netAmount = Number((amount - fee).toFixed(2));

      if (txType === "purchase") {
        splitEntries = [
          { account: "Billetera Usuario (User Smart Account)", type: "DEBIT", amount: -amount },
          { account: "Caja Comercio (Merchant POS Vault)", type: "CREDIT", amount: netAmount },
          { account: "Ingresos de Plataforma (Platform Revenue Wallet)", type: "FEE", amount: fee }
        ];
        setLogs((prev) => [
          ...prev,
          `[RULE CHECK] Aplicando Regla Contable 7 (Partida Doble Suma Cero)...`,
          `[MINT/BURN] Retirando -${amount.toFixed(2)} DFX de balance de usuario...`,
          `[SWEEP] Depositando +${netAmount.toFixed(2)} DFX en balance de comercio...`,
          `[REVENUE] Asentando comisión de +${fee.toFixed(2)} DFX (1.5% Fee)...`
        ]);
      } else if (txType === "sweep") {
        splitEntries = [
          { account: "Caja Comercio (Merchant POS Vault)", type: "DEBIT", amount: -amount },
          { account: "Cuenta Banco Central (Omnibus Custody Account)", type: "CREDIT", amount: amount }
        ];
        setLogs((prev) => [
          ...prev,
          `[RULE CHECK] Iniciando sweep asíncrono hacia cuenta bancaria central...`,
          `[BURN] Quitando -${amount.toFixed(2)} DFX de la circulación on-chain...`,
          `[BANK RAIL] Asentando transferencia fiat de $${amount.toFixed(2)} ARS por canal bancario tradicional...`
        ]);
      } else {
        splitEntries = [
          { account: "Bóveda Corporativa (Corporate Treasury)", type: "DEBIT", amount: -amount },
          { account: "Billeteras Satélite (Client Yield Wallets)", type: "CREDIT", amount: amount }
        ];
        setLogs((prev) => [
          ...prev,
          `[YIELD] Liquidando rendimiento acumulado...`,
          `[LEDGER] Distribuyendo +${amount.toFixed(2)} DFX entre billeteras scoped...`
        ]);
      }

      setEntries(splitEntries);

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          `[DATABASE] Commit ejecutado con éxito. 0 lagunas contables.`,
          `[VERIFICATION] SUM(amount) = 0.00 VALIDADO.`
        ]);
        setIsSimulating(false);
      }, 500);

    }, 1200);
  };

  const getSum = () => {
    return entries.reduce((acc, entry) => acc + entry.amount, 0);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      {/* Simulation Workspace */}
      <div className="lg:col-span-7 bg-card-dark/40 border border-border-glow rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute w-80 h-80 rounded-full glow-orb -bottom-20 -left-20 pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-6">
            <ArrowRightLeft className="w-5 h-5 text-primary-brand animate-spin-slow" />
            <h3 className="text-xl font-semibold text-foreground">Consola de Partida Doble en Vivo</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                Tipo de Transacción
              </label>
              <select
                value={txType}
                onChange={(e) => setTxType(e.target.value as any)}
                className="w-full bg-background border border-border-glow rounded-lg px-3 py-2.5 text-foreground text-xs font-semibold focus:outline-none focus:border-primary-brand"
              >
                <option value="purchase">Compra en Comercio B2B (DFX)</option>
                <option value="sweep">Sweep Bancario (Clear Fiat)</option>
                <option value="yield">Distribución de Rendimiento</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                Monto ($ ARS)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-background border border-border-glow rounded-lg px-3 py-2 text-foreground text-xs font-mono font-semibold focus:outline-none focus:border-primary-brand"
              />
            </div>
          </div>

          {/* Trigger button */}
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full bg-primary-brand hover:bg-primary-brand/90 text-white font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Ejecutando en Motor PL/pgSQL...
              </>
            ) : (
              <>
                <FileCode className="w-4 h-4" />
                Confirmar Asiento Contable
              </>
            )}
          </button>
        </div>

        {/* Database Live Log Viewer */}
        <div className="bg-[#030712] border border-border-glow rounded-xl p-4 mt-6 flex-1 flex flex-col font-mono text-[10px] text-muted-foreground min-h-[140px] max-h-[160px] overflow-y-auto">
          <div className="border-b border-border-glow pb-1.5 mb-2 text-xs text-slate-100 font-semibold flex justify-between">
            <span>Terminal Database Logs</span>
            {correlationId && <span className="text-primary-brand text-[9px]">{correlationId}</span>}
          </div>
          <div className="space-y-1.5 flex-1">
            {logs.length === 0 ? (
              <span className="text-gray-500 block">Espera de transacción...</span>
            ) : (
              logs.map((log, index) => {
                let color = "text-muted-foreground";
                if (log.includes("[VERIFICATION]") || log.includes("VALIDADO")) color = "text-green-400 font-bold";
                if (log.includes("[RULE CHECK]")) color = "text-primary-brand font-semibold";
                if (log.includes("[DATABASE]")) color = "text-yellow-400";
                return (
                  <div key={index} className={`${color} leading-relaxed`}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Real-time Ledger Math Balance */}
      <div className="lg:col-span-5 glass-panel p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Landmark className="w-5 h-5 text-primary-brand" />
            <h3 className="text-xl font-semibold text-foreground">Contabilidad de Suma Cero</h3>
          </div>

          <p className="text-muted-foreground text-xs leading-relaxed mb-6">
            Toda transacción financiera en nuestra base de datos inyecta múltiples registros en el Ledger contable que deben balancearse a cero exactamente para blindar al sistema de cualquier laguna financiera.
          </p>

          {/* Dynamic entries table */}
          {entries.length > 0 ? (
            <div className="space-y-3 mb-6">
              <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground grid grid-cols-12 pb-1 border-b border-border-glow">
                <span className="col-span-8">Cuenta Scoped</span>
                <span className="col-span-4 text-right">Monto (DFX)</span>
              </div>
              <div className="space-y-2">
                {entries.map((entry, idx) => (
                  <div key={idx} className="grid grid-cols-12 text-xs font-mono">
                    <span className="col-span-8 text-foreground truncate pr-2">{entry.account}</span>
                    <span className={`col-span-4 text-right font-bold ${entry.amount < 0 ? 'text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                      {entry.amount < 0 ? '' : '+'}{entry.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-background/50 border border-dashed border-border-glow rounded-xl p-8 text-center text-xs text-muted-foreground mb-6">
              Genera una transacción en la consola para auditar los asientos contables en vivo
            </div>
          )}
        </div>

        {/* Verification Hub */}
        <div className="border-t border-border-glow pt-4">
          <div className="flex justify-between items-center bg-background p-3 rounded-xl border border-border-glow">
            <div className="flex items-center gap-2">
              {entries.length > 0 && getSum() === 0 ? (
                <Check className="w-4 h-4 text-green-500 bg-green-500/10 p-0.5 rounded-full" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-primary-brand" />
              )}
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground">
                Validación de Balance
              </span>
            </div>
            <span className={`font-mono text-sm font-bold ${entries.length > 0 && getSum() === 0 ? 'text-green-500 dark:text-green-400' : 'text-foreground'}`}>
              SUM(Amount) = {entries.length > 0 ? getSum().toFixed(2) : "0.00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
