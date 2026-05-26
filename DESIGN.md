# 📈 reDeFinX Platform Design System & Specification

This document defines the official design tokens, layouts, visual rules, and premium components for the **reDeFinX** B2B Fintech as a Service platform. 

This design system is optimized for high-fidelity, interactive, and beautifully responsive web experiences inspired by high-end modern tech landing pages (such as Pomelo).

---

## 🎨 Color Palette & Themes

### Dark Mode (Default / Base Theme)
*   **Background**: Deep Navy (`#0a0f16`)
*   **Foreground (Text)**: Pure White (`#ffffff`)
*   **Muted (Navy Text)**: Soft Slate (`#94a3b8`)
*   **Card Background**: Deep Charcoal (`#111827`) with `0.45` to `0.7` opacity
*   **Borders**: Translucent frosted border (`rgba(255, 255, 255, 0.08)`)
*   **Primary Glow Orb**: Electric Radial Glow (`rgba(19, 109, 236, 0.12)`)

### Light Mode (High Contrast Theme)
*   **Background**: Clean Light Gray (`#f4f7fa`)
*   **Foreground (Text)**: Dark Slate (`#0f172a`)
*   **Muted**: Slate Gray (`#475569`)
*   **Card Background**: White Panel (`#ffffff`) with `0.75` to `0.9` opacity
*   **Borders**: Soft Gray (`rgba(0, 0, 0, 0.06)`)
*   **Primary Glow Orb**: Soft Blue Radial (`rgba(19, 109, 236, 0.05)`)

### Dynamic Brand Seed Colors (Tenant Adaptability)
*   **Tenant Primary (Seed)**: Electric Blue (`#136dec`)
*   **Tenant Secondary**: Vibrant Blue (`#3b82f6`)
*   **Tenant Glow**: HSL active accent tracking

---

## 🔠 Typography Hierarchy

*   **Primary Font Family**: `Inter`, `Geist Sans`, or modern system sans-serif.
*   **Headline Font Family**: `Inter` or `Plus Jakarta Sans`.
*   **Weights**:
    *   Display/Title: Bold (`700`), Semibold (`600`)
    *   Body/Content: Medium (`500`), Regular (`400`)

### Scale
1.  **Display Large**: `fontSize: "4rem" (64px)`, `lineHeight: "1.1"`, `letterSpacing: "-0.02em"`, `fontWeight: "700"`
2.  **Display Medium**: `fontSize: "2.5rem" (40px)`, `lineHeight: "1.2"`, `letterSpacing: "-0.01em"`, `fontWeight: "700"`
3.  **Title Large**: `fontSize: "1.75rem" (28px)`, `lineHeight: "1.3"`, `letterSpacing: "-0.01em"`, `fontWeight: "600"`
4.  **Body Medium**: `fontSize: "1rem" (16px)`, `lineHeight: "1.6"`, `fontWeight: "400"`
5.  **Label Small**: `fontSize: "0.875rem" (14px)`, `lineHeight: "1.5"`, `letterSpacing: "0.05em"`, `fontWeight: "600"`

---

## 💎 Structural Design Patterns

### 1. Bento Grid (Modular Bento Layout)
*   **Asymmetric Grids**: High density layouts combining `col-span-2` and `col-span-1` components.
*   **Border Radius**: Extra Large (`28px` / `ROUND_TWELVE` or higher).
*   **Interaction States**:
    *   Hover Translation: `translate-y-[-6px]`, `scale-[1.008]`
    *   Spotlight: Dynamic mouse-following radial overlay (`rgba(19, 109, 236, 0.05)`)
    *   Shadow: Deep volumetric drop shadow combined with high-contrast active accent glow.

### 2. Glassmorphism Panels
*   **Blur**: `backdrop-filter: blur(12px)` (Dark Mode) or `blur(20px)` (Premium Cards)
*   **Borders**: High-fidelity esmerilado 1px gradient stroke using CSS mask-composites.

---

## 🕹️ Interactive Functional Components

### Component 1: White-Label Sandbox (Brand Customizer)
An interactive preview panel representing a white-label dashboard and a live-updating smartphone viewport:
*   **Controls**: Real-time text inputs for custom Brand Name, preset selectors for brand colors (Emerald, Electric Blue, Violet, Rose).
*   **Real-time Hydration**: Updates logo text, cards, wallet layout, transaction state, and glow halos instantaneously based on selected seeds.

### Component 2: Core Technology Node (Architecture Playground)
An interactive explorer presenting the multi-layer stack of the reDeFinX BaaS/WaaS infrastructure:
1.  **Capa 1: Base de Datos & Ledger (Asiento Contable)**: Implements standard Double-Entry Ledger rules ensuring zero-sum transactional integrity. Includes transaction list auto-scrolling log mockups.
2.  **Capa 2: Transactional Core & Rieles**: Features fiat sweep simulation (Fiat/Crypto sweep, burn-mint operations, and 1:1 settlement logging).
3.  **Capa 3: BFF & Gateway APIs**: Displays JSON API schemas and webhook transaction structures.
4.  **Capa 4: Frontend UI Modules**: Renders interactive sub-mockups of a Mobile Wallet App (QR codes, Staking yield, Social access) and a Merchant POS portal.

---

## 🔒 Custodial & Regulatory Alignment

*   **PSAVaaS Framework**: Virtual Assets Service Provider as a Service with strict custodial segregation.
*   **Account Abstraction**: MPC Wallet key recovery without seed phrases, combining Passkey WebAuthn tokens.
