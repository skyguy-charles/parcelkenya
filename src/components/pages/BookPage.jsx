import { useState, useRef, useEffect } from "react";
import { COUNTIES, INITIAL_FORM_STATE } from "../../data/Constants";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Mulish:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --ink:      #08090D;
  --ink2:     #0D0F15;
  --ink3:     #12151E;
  --panel:    #0F1219;
  --card:     #141820;
  --card2:    #191D28;
  --surface:  #1E2330;
  --line:     rgba(255,255,255,0.055);
  --line2:    rgba(255,255,255,0.09);
  --line3:    rgba(255,255,255,0.14);
  --amber:    #D4A843;
  --amber2:   #F0C86A;
  --amber3:   #FBE0A0;
  --amber-bg: rgba(212,168,67,0.08);
  --amber-glow: rgba(212,168,67,0.20);
  --teal:     #3DB38A;
  --teal-bg:  rgba(61,179,138,0.08);
  --coral:    #E06060;
  --text:     #DDE0EC;
  --text70:   rgba(221,224,236,0.70);
  --text40:   rgba(221,224,236,0.40);
  --text20:   rgba(221,224,236,0.20);
  --text10:   rgba(221,224,236,0.10);
  --display:  'Playfair Display', Georgia, serif;
  --body:     'Mulish', sans-serif;
  --mono:     'IBM Plex Mono', monospace;
  --spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --smooth:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── ROOT ── */
.bp-root {
  font-family: var(--body);
  background: var(--ink);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

/* Noise texture overlay */
.bp-root::before {
  content: '';
  position: fixed; inset: 0; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* ── TOP NAV ── */
.bp-nav {
  position: sticky; top: 0; z-index: 100;
  height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px;
  background: rgba(8,9,13,0.88);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}
.bp-nav-brand {
  display: flex; align-items: center; gap: 10px;
  cursor: pointer;
  font-family: var(--display); font-size: 1.1rem; font-weight: 500;
  color: var(--text); letter-spacing: -0.2px;
}
.bp-nav-brand-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 10px var(--amber), 0 0 20px rgba(212,168,67,0.4);
  animation: dotPulse 2.5s ease-in-out infinite;
}
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 8px var(--amber), 0 0 16px rgba(212,168,67,0.3); }
  50% { box-shadow: 0 0 16px var(--amber), 0 0 32px rgba(212,168,67,0.6); }
}
.bp-nav-center {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 0.65rem;
  letter-spacing: 1.5px; text-transform: uppercase; color: var(--text40);
}
.bp-nav-center span { color: var(--text20); }
.bp-nav-actions { display: flex; align-items: center; gap: 10px; }
.bp-nav-btn {
  font-family: var(--body); font-size: 0.78rem; font-weight: 500;
  padding: 6px 16px; border-radius: 7px; cursor: pointer;
  transition: all 0.2s; border: 1px solid var(--line2);
  background: none; color: var(--text40);
}
.bp-nav-btn:hover { color: var(--text); border-color: var(--line3); }
.bp-nav-btn.primary {
  background: var(--amber); color: #000; border-color: transparent;
  font-weight: 600;
}
.bp-nav-btn.primary:hover { background: var(--amber2); }

/* ── MAIN LAYOUT ── */
.bp-layout {
  flex: 1; display: grid;
  grid-template-columns: 1fr 380px;
  position: relative; z-index: 1;
}

/* ── LEFT: FORM AREA ── */
.bp-form-area {
  padding: 56px 64px 80px;
  border-right: 1px solid var(--line);
  min-height: calc(100vh - 60px);
}

/* Page header */
.bp-page-header { margin-bottom: 52px; }
.bp-page-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--amber);
  margin-bottom: 14px;
}
.bp-page-eyebrow::before {
  content: ''; width: 20px; height: 1px;
  background: linear-gradient(90deg, var(--amber), transparent);
}
.bp-page-title {
  font-family: var(--display);
  font-size: clamp(2.6rem, 4vw, 3.8rem);
  font-weight: 400; letter-spacing: -1px; line-height: 1.05;
  color: var(--text);
}
.bp-page-title em {
  font-style: italic; color: var(--amber2);
}
.bp-page-desc {
  font-size: 0.85rem; font-weight: 300; color: var(--text40);
  margin-top: 12px; line-height: 1.8; letter-spacing: 0.1px;
}

/* Step progress */
.bp-progress {
  display: flex; align-items: center; gap: 0;
  margin-bottom: 52px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.bp-progress-item {
  display: flex; align-items: center; gap: 12px; flex: 1;
}
.bp-progress-item:last-child { flex: 0; }
.bp-progress-num {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 0.65rem; font-weight: 500;
  border: 1px solid var(--line2); background: var(--ink3);
  color: var(--text20); transition: all 0.4s var(--smooth);
  position: relative;
}
.bp-progress-num.active {
  border-color: var(--amber);
  background: var(--amber-bg);
  color: var(--amber2);
  box-shadow: 0 0 0 4px rgba(212,168,67,0.08);
}
.bp-progress-num.done {
  border-color: var(--teal);
  background: var(--teal-bg);
  color: var(--teal);
  font-size: 0;
}
.bp-progress-num.done::after {
  content: '✓'; font-size: 0.75rem; font-family: var(--body);
}
.bp-progress-label {
  font-size: 0.72rem; font-weight: 500; color: var(--text20);
  letter-spacing: 0.2px; transition: color 0.3s;
}
.bp-progress-label.active { color: var(--text70); }
.bp-progress-label.done { color: var(--teal); }
.bp-progress-bar {
  flex: 1; height: 1px; background: var(--line2); margin: 0 16px;
  position: relative; overflow: hidden;
}
.bp-progress-bar::after {
  content: ''; position: absolute; inset-block: 0; left: 0;
  background: linear-gradient(90deg, var(--amber), var(--amber2));
  width: 0%; transition: width 0.5s var(--smooth);
}
.bp-progress-bar.done::after { width: 100%; }

/* ── FORM BLOCK ── */
.bp-block {
  animation: blockIn 0.5s var(--smooth) both;
}
@keyframes blockIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Section heading */
.bp-section {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 28px; margin-top: 44px;
}
.bp-section:first-child { margin-top: 0; }
.bp-section-num {
  width: 24px; height: 24px; border-radius: 6px;
  background: var(--amber-bg); border: 1px solid rgba(212,168,67,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 0.6rem; color: var(--amber);
  flex-shrink: 0;
}
.bp-section-title {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--amber); flex: 1;
}
.bp-section-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, var(--line2), transparent);
}

/* Field grid */
.bp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.bp-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

/* Field */
.bp-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
.bp-field:last-child { margin-bottom: 0; }
.bp-label {
  font-size: 0.63rem; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--text20);
}
.bp-input-wrap { position: relative; }
.bp-input, .bp-select, .bp-textarea {
  width: 100%;
  background: var(--ink3);
  border: 1px solid var(--line2);
  border-radius: 9px;
  padding: 12px 15px;
  font-family: var(--body); font-size: 0.86rem; font-weight: 400;
  color: var(--text); outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  appearance: none; -webkit-appearance: none;
}
.bp-input::placeholder, .bp-textarea::placeholder { color: var(--text20); }
.bp-input:hover, .bp-select:hover { border-color: var(--line3); }
.bp-input:focus, .bp-select:focus, .bp-textarea:focus {
  border-color: rgba(212,168,67,0.45);
  background: var(--ink2);
  box-shadow: 0 0 0 3px rgba(212,168,67,0.07);
}
.bp-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(221,224,236,0.25)' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.bp-select option { background: #12151E; }
.bp-textarea { resize: vertical; min-height: 86px; line-height: 1.65; }
.bp-input-prefix {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-family: var(--mono); font-size: 0.82rem; color: var(--text40);
  pointer-events: none;
}
.bp-input.has-prefix { padding-left: 36px; }

/* Service cards */
.bp-services {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 10px;
  margin-bottom: 18px;
}
.bp-svc {
  border: 1px solid var(--line2); border-radius: 12px;
  padding: 18px 16px; cursor: pointer; background: var(--ink3);
  transition: all 0.25s var(--smooth);
  position: relative; overflow: hidden;
}
.bp-svc::after {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--amber), var(--amber2));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s var(--smooth);
}
.bp-svc:hover { border-color: var(--line3); background: var(--ink2); transform: translateY(-1px); }
.bp-svc.sel {
  border-color: rgba(212,168,67,0.4);
  background: var(--amber-bg);
  box-shadow: 0 0 0 1px rgba(212,168,67,0.1), 0 8px 24px rgba(0,0,0,0.3);
}
.bp-svc.sel::after { transform: scaleX(1); }
.bp-svc-tag {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--text20);
  background: var(--line); border-radius: 4px; padding: 2px 7px;
  display: inline-block; margin-bottom: 10px;
  transition: all 0.25s;
}
.bp-svc.sel .bp-svc-tag { background: rgba(212,168,67,0.12); color: var(--amber2); }
.bp-svc-name {
  font-family: var(--display); font-size: 1.05rem; font-weight: 500;
  color: var(--text70); margin-bottom: 3px; transition: color 0.25s;
}
.bp-svc.sel .bp-svc-name { color: var(--text); }
.bp-svc-eta {
  font-size: 0.72rem; color: var(--text20); font-weight: 300;
  margin-bottom: 12px; line-height: 1.5;
}
.bp-svc-price {
  font-family: var(--mono); font-size: 0.78rem; color: var(--amber2); font-weight: 500;
}

/* Time slots */
.bp-slots {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  margin-bottom: 18px;
}
.bp-slot {
  border: 1px solid var(--line2); border-radius: 9px;
  padding: 12px 14px; cursor: pointer; background: var(--ink3);
  font-size: 0.8rem; color: var(--text40); font-weight: 400;
  transition: all 0.2s; display: flex; align-items: center; gap: 8px;
}
.bp-slot:hover { border-color: var(--line3); color: var(--text70); }
.bp-slot.sel {
  border-color: rgba(212,168,67,0.4); background: var(--amber-bg);
  color: var(--amber2); font-weight: 500;
}
.bp-slot-icon { font-size: 0.9rem; }

/* Insurance toggle */
.bp-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 18px; border-radius: 10px;
  border: 1px solid var(--line); background: var(--ink3);
  cursor: pointer; transition: all 0.25s; margin-bottom: 18px;
  gap: 16px;
}
.bp-toggle-row:hover { border-color: var(--line2); }
.bp-toggle-row.on { border-color: rgba(61,179,138,0.3); background: var(--teal-bg); }
.bp-toggle-info { flex: 1; }
.bp-toggle-title { font-size: 0.83rem; font-weight: 600; color: var(--text70); margin-bottom: 2px; }
.bp-toggle-sub { font-size: 0.72rem; color: var(--text20); font-weight: 300; }
.bp-toggle-switch {
  width: 42px; height: 24px; border-radius: 12px;
  background: var(--line2); flex-shrink: 0;
  position: relative; transition: background 0.3s;
}
.bp-toggle-switch::after {
  content: ''; position: absolute;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--text20); top: 3px; left: 3px;
  transition: all 0.3s var(--spring);
  box-shadow: 0 1px 4px rgba(0,0,0,0.4);
}
.bp-toggle-row.on .bp-toggle-switch { background: var(--teal); }
.bp-toggle-row.on .bp-toggle-switch::after { left: 21px; background: #fff; }

/* Payment methods */
.bp-payments {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 10px;
  margin-bottom: 20px;
}
.bp-pay {
  border: 1px solid var(--line2); border-radius: 12px;
  padding: 18px 14px; cursor: pointer; background: var(--ink3);
  text-align: center; transition: all 0.25s var(--smooth);
}
.bp-pay:hover { border-color: var(--line3); transform: translateY(-1px); }
.bp-pay.sel {
  border-color: rgba(212,168,67,0.45); background: var(--amber-bg);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.bp-pay-icon { font-size: 1.5rem; margin-bottom: 8px; display: block; }
.bp-pay-name { font-size: 0.75rem; font-weight: 600; color: var(--text40); transition: color 0.25s; }
.bp-pay.sel .bp-pay-name { color: var(--amber2); }

/* Payment detail box */
.bp-pay-detail {
  background: var(--ink2); border: 1px solid var(--line);
  border-radius: 10px; padding: 20px 22px; margin-bottom: 20px;
}
.bp-cash-alert {
  background: rgba(212,168,67,0.05); border: 1px solid rgba(212,168,67,0.15);
  border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;
  font-size: 0.8rem; color: var(--amber2); line-height: 1.75; font-weight: 300;
}

/* Footer */
.bp-form-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 36px; margin-top: 12px;
  border-top: 1px solid var(--line);
}
.bp-btn-ghost {
  font-family: var(--body); font-size: 0.8rem; font-weight: 400;
  color: var(--text20); background: none; border: none;
  cursor: pointer; display: flex; align-items: center; gap: 6px;
  padding: 8px 0; transition: color 0.2s;
}
.bp-btn-ghost:hover { color: var(--text40); }
.bp-btn-primary {
  font-family: var(--body); font-size: 0.85rem; font-weight: 700;
  color: #000;
  background: linear-gradient(135deg, var(--amber) 0%, var(--amber2) 100%);
  border: none; border-radius: 9px; padding: 13px 28px;
  cursor: pointer; transition: all 0.25s var(--smooth);
  display: flex; align-items: center; gap: 8px; letter-spacing: 0.1px;
  box-shadow: 0 4px 16px rgba(212,168,67,0.25);
}
.bp-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(212,168,67,0.38);
  background: linear-gradient(135deg, var(--amber2) 0%, var(--amber3) 100%);
}
.bp-btn-secondary {
  font-family: var(--body); font-size: 0.8rem; font-weight: 500;
  color: var(--text40); background: none;
  border: 1px solid var(--line2); border-radius: 9px; padding: 12px 22px;
  cursor: pointer; transition: all 0.2s;
}
.bp-btn-secondary:hover { color: var(--text); border-color: var(--line3); }

/* ── RIGHT: LIVE SUMMARY PANEL ── */
.bp-panel {
  background: var(--panel);
  padding: 48px 36px;
  position: sticky; top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 0;
}
.bp-panel::-webkit-scrollbar { width: 4px; }
.bp-panel::-webkit-scrollbar-thumb { background: var(--line2); border-radius: 2px; }

.bp-panel-header { margin-bottom: 36px; }
.bp-panel-eyebrow {
  font-family: var(--mono); font-size: 0.58rem; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--amber); margin-bottom: 6px;
}
.bp-panel-title {
  font-family: var(--display); font-size: 1.3rem; font-weight: 400;
  color: var(--text); letter-spacing: -0.3px;
}

/* Route display */
.bp-route {
  background: var(--ink3); border: 1px solid var(--line);
  border-radius: 12px; padding: 18px; margin-bottom: 20px;
}
.bp-route-row {
  display: flex; align-items: center; gap: 10px; padding: 6px 0;
}
.bp-route-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.bp-route-dot.origin { background: var(--amber); box-shadow: 0 0 6px var(--amber-glow); }
.bp-route-dot.dest { background: var(--teal); box-shadow: 0 0 6px rgba(61,179,138,0.4); }
.bp-route-line {
  width: 1px; height: 20px; background: var(--line2);
  margin-left: 3.5px;
}
.bp-route-label { font-size: 0.68rem; color: var(--text20); font-family: var(--mono); letter-spacing: 0.5px; margin-bottom: 2px; }
.bp-route-value { font-size: 0.82rem; color: var(--text70); font-weight: 500; }
.bp-route-value.placeholder { color: var(--text20); font-style: italic; font-weight: 300; }

/* Service badge */
.bp-panel-svc {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--ink3); border: 1px solid var(--line);
  border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;
}
.bp-panel-svc-name { font-size: 0.82rem; font-weight: 600; color: var(--text70); }
.bp-panel-svc-eta { font-size: 0.72rem; color: var(--text20); margin-top: 2px; }
.bp-panel-svc-badge {
  font-family: var(--mono); font-size: 0.68rem; font-weight: 500;
  color: var(--amber2); background: var(--amber-bg);
  border: 1px solid rgba(212,168,67,0.2);
  border-radius: 6px; padding: 4px 10px;
}

/* Cost breakdown */
.bp-cost { display: flex; flex-direction: column; gap: 0; margin-bottom: 20px; }
.bp-cost-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 0; border-bottom: 1px solid var(--line);
  font-size: 0.79rem;
}
.bp-cost-row:last-child { border-bottom: none; }
.bp-cost-row span { color: var(--text40); font-weight: 300; }
.bp-cost-row strong { color: var(--text70); font-family: var(--mono); font-size: 0.75rem; }

/* Total box */
.bp-total {
  background: var(--amber-bg); border: 1px solid rgba(212,168,67,0.2);
  border-radius: 12px; padding: 18px;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px;
}
.bp-total-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--amber); }
.bp-total-amount {
  font-family: var(--mono); font-size: 1.4rem; font-weight: 500;
  color: var(--amber2);
  letter-spacing: -0.5px;
}

/* Panel steps checklist */
.bp-checklist { display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 28px; border-top: 1px solid var(--line); }
.bp-check-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.75rem; color: var(--text20);
}
.bp-check-item.done { color: var(--teal); }
.bp-check-dot {
  width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid var(--line2);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.55rem; transition: all 0.3s;
}
.bp-check-item.done .bp-check-dot {
  background: var(--teal-bg); border-color: var(--teal); color: var(--teal);
}

/* ── CONFIRMATION ── */
.bp-confirm {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 20px 0 40px;
  animation: blockIn 0.5s var(--smooth) both;
}
.bp-confirm-aura {
  position: relative; width: 110px; height: 110px;
  margin-bottom: 32px;
}
.bp-confirm-aura::before {
  content: ''; position: absolute; inset: -16px; border-radius: 50%;
  background: radial-gradient(circle, rgba(61,179,138,0.12) 0%, transparent 70%);
  animation: auraBreath 3s ease-in-out infinite;
}
@keyframes auraBreath {
  0%,100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}
.bp-confirm-ring {
  width: 110px; height: 110px; border-radius: 50%;
  background: var(--teal-bg); border: 1px solid rgba(61,179,138,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 2.4rem;
  box-shadow: 0 0 48px rgba(61,179,138,0.15), inset 0 0 20px rgba(61,179,138,0.05);
  animation: ringPop 0.7s var(--spring) both;
}
@keyframes ringPop {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}
.bp-confirm-status {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--teal); margin-bottom: 8px;
}
.bp-confirm-title {
  font-family: var(--display); font-size: 2.6rem; font-weight: 400;
  letter-spacing: -1px; color: var(--text); margin-bottom: 6px; line-height: 1.1;
}
.bp-confirm-sub {
  font-size: 0.82rem; color: var(--text40); margin-bottom: 36px; font-weight: 300;
}
.bp-tracking-id {
  font-family: var(--mono); font-size: 1.5rem; font-weight: 500;
  letter-spacing: 4px; color: var(--amber2);
  background: var(--amber-bg); border: 1px solid rgba(212,168,67,0.2);
  border-radius: 12px; padding: 16px 36px; margin-bottom: 40px;
  box-shadow: 0 0 40px rgba(212,168,67,0.08);
  animation: blockIn 0.5s 0.3s var(--smooth) both;
}
.bp-confirm-table {
  width: 100%; max-width: 520px;
  background: var(--ink3); border: 1px solid var(--line);
  border-radius: 14px; overflow: hidden; margin-bottom: 32px;
}
.bp-confirm-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 13px 20px; border-bottom: 1px solid var(--line);
  font-size: 0.8rem;
}
.bp-confirm-row:last-child { border-bottom: none; }
.bp-confirm-row span { color: var(--text20); font-weight: 300; }
.bp-confirm-row strong { color: var(--text70); font-weight: 600; }
.bp-confirm-row strong.hi { color: var(--amber2); font-family: var(--mono); }
.bp-confirm-note {
  font-size: 0.76rem; color: var(--text20); line-height: 1.8;
  margin-bottom: 32px; font-weight: 300; max-width: 480px;
}
.bp-confirm-actions { display: flex; gap: 12px; }

@keyframes blockIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

/* ── helpers ── */
const SVC_MAP = {
  express:  { label: "Express",  eta: "Same day",       price: 700  },
  standard: { label: "Standard", eta: "1–2 business days", price: 420 },
  economy:  { label: "Economy",  eta: "3–5 business days", price: 250 },
};

function Section({ num, title }) {
  return (
    <div className="bp-section">
      <div className="bp-section-num">{num}</div>
      <div className="bp-section-title">{title}</div>
      <div className="bp-section-line" />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="bp-field">
      <label className="bp-label">{label}</label>
      {children}
    </div>
  );
}

/* ── Progress Rail ── */
function ProgressRail({ step }) {
  const steps = ["Details", "Schedule", "Payment", "Complete"];
  return (
    <div className="bp-progress">
      {steps.map((label, i) => {
        const n = i + 1;
        const isActive = step === n;
        const isDone   = step > n;
        return (
          <div className="bp-progress-item" key={label}>
            <div className={`bp-progress-num ${isActive ? "active" : isDone ? "done" : ""}`}>
              {!isDone && n}
            </div>
            <span className={`bp-progress-label ${isActive ? "active" : isDone ? "done" : ""}`}>{label}</span>
            {i < steps.length - 1 && <div className={`bp-progress-bar ${isDone ? "done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}

/* ── Live Summary Panel ── */
function SummaryPanel({ form, fee, weightCost, total, step }) {
  const svc = SVC_MAP[form.speed] || SVC_MAP.standard;
  const checks = [
    { label: "Sender details",    done: !!(form.senderName && form.senderPhone) },
    { label: "Recipient details", done: !!(form.recipientName && form.recipientPhone) },
    { label: "Service selected",  done: !!form.speed },
    { label: "Date & time slot",  done: !!(form.date && form.timeSlot) },
    { label: "Payment method",    done: !!form.payment },
  ];

  return (
    <aside className="bp-panel">
      <div className="bp-panel-header">
        <div className="bp-panel-eyebrow">Live Summary</div>
        <div className="bp-panel-title">Shipment Overview</div>
      </div>

      {/* Route */}
      <div className="bp-route">
        <div className="bp-route-row">
          <div className="bp-route-dot origin" />
          <div>
            <div className="bp-route-label">ORIGIN</div>
            <div className={`bp-route-value ${form.senderCounty ? "" : "placeholder"}`}>
              {form.senderCounty || "Select county"}
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:0,paddingLeft:"3.5px"}}>
          <div className="bp-route-line" />
        </div>
        <div className="bp-route-row">
          <div className="bp-route-dot dest" />
          <div>
            <div className="bp-route-label">DESTINATION</div>
            <div className={`bp-route-value ${form.recipientCounty ? "" : "placeholder"}`}>
              {form.recipientCounty || "Select county"}
            </div>
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="bp-panel-svc">
        <div>
          <div className="bp-panel-svc-name">{svc.label} Delivery</div>
          <div className="bp-panel-svc-eta">{svc.eta}</div>
        </div>
        <div className="bp-panel-svc-badge">KSh {svc.price}+</div>
      </div>

      {/* Cost breakdown */}
      <div className="bp-cost">
        <div className="bp-cost-row">
          <span>Base delivery fee</span>
          <strong>KSh {fee.toLocaleString()}</strong>
        </div>
        <div className="bp-cost-row">
          <span>Weight ({form.weight || "0"} kg)</span>
          <strong>KSh {weightCost.toLocaleString()}</strong>
        </div>
        {form.insurance && (
          <div className="bp-cost-row">
            <span>Insurance cover</span>
            <strong>KSh 80</strong>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="bp-total">
        <div>
          <div className="bp-total-label">Estimated Total</div>
        </div>
        <div className="bp-total-amount">KSh {total.toLocaleString()}</div>
      </div>

      {/* Checklist */}
      <div className="bp-checklist">
        {checks.map(c => (
          <div key={c.label} className={`bp-check-item ${c.done ? "done" : ""}`}>
            <div className="bp-check-dot">{c.done ? "✓" : ""}</div>
            {c.label}
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ── Step 1 ── */
function Step1({ form, u, onNext }) {
  return (
    <div className="bp-block">
      <Section num="A" title="Sender Information" />
      <div className="bp-grid-2">
        <Field label="Full Name">
          <input className="bp-input" placeholder="John Kamau" value={form.senderName} onChange={e => u("senderName", e.target.value)} />
        </Field>
        <Field label="Phone Number">
          <div className="bp-input-wrap">
            <span className="bp-input-prefix">🇰🇪</span>
            <input className="bp-input has-prefix" placeholder="+254 700 000 000" value={form.senderPhone} onChange={e => u("senderPhone", e.target.value)} />
          </div>
        </Field>
      </div>
      <div className="bp-grid-2">
        <Field label="Email (optional)">
          <input className="bp-input" placeholder="john@example.com" value={form.senderEmail} onChange={e => u("senderEmail", e.target.value)} />
        </Field>
        <Field label="County / Region">
          <select className="bp-select" value={form.senderCounty} onChange={e => u("senderCounty", e.target.value)}>
            {COUNTIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Pickup Address">
        <input className="bp-input" placeholder="House No., Street, Estate, Landmark" value={form.senderAddress} onChange={e => u("senderAddress", e.target.value)} />
      </Field>

      <Section num="B" title="Recipient Information" />
      <div className="bp-grid-2">
        <Field label="Full Name">
          <input className="bp-input" placeholder="Jane Wanjiku" value={form.recipientName} onChange={e => u("recipientName", e.target.value)} />
        </Field>
        <Field label="Phone Number">
          <div className="bp-input-wrap">
            <span className="bp-input-prefix">🇰🇪</span>
            <input className="bp-input has-prefix" placeholder="+254 700 000 000" value={form.recipientPhone} onChange={e => u("recipientPhone", e.target.value)} />
          </div>
        </Field>
      </div>
      <div className="bp-grid-2">
        <Field label="Destination County">
          <select className="bp-select" value={form.recipientCounty} onChange={e => u("recipientCounty", e.target.value)}>
            <option value="">— Select county —</option>
            {COUNTIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Delivery Address">
          <input className="bp-input" placeholder="House No., Street, Estate, Landmark" value={form.recipientAddress} onChange={e => u("recipientAddress", e.target.value)} />
        </Field>
      </div>

      <Section num="C" title="Parcel Details" />
      <div className="bp-grid-2">
        <Field label="Weight (kg)">
          <input className="bp-input" type="number" placeholder="0.5" min="0.1" max="50" step="0.1" value={form.weight} onChange={e => u("weight", e.target.value)} />
        </Field>
        <Field label="Item Category">
          <select className="bp-select" value={form.parcelType} onChange={e => u("parcelType", e.target.value)}>
            <option value="standard">Documents & Standard</option>
            <option value="fragile">Fragile & Electronics</option>
            <option value="food">Food & Perishables</option>
            <option value="bulk">Bulk & Heavy Goods</option>
          </select>
        </Field>
      </div>
      <Field label="Contents Description (optional)">
        <textarea className="bp-textarea" placeholder="Brief description — e.g. 'Clothing, 3 shirts and 2 trousers'" value={form.description} onChange={e => u("description", e.target.value)} />
      </Field>

      <div className="bp-form-footer">
        <div />
        <button className="bp-btn-primary" onClick={onNext}>
          Schedule Pickup <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* ── Step 2 ── */
function Step2({ form, u, onBack, onNext }) {
  const slots = [
    { icon: "🌅", label: "07:00 – 10:00", sub: "Morning" },
    { icon: "☀️", label: "10:00 – 13:00", sub: "Late Morning" },
    { icon: "🌤", label: "13:00 – 16:00", sub: "Afternoon" },
    { icon: "🌆", label: "16:00 – 19:00", sub: "Evening" },
  ];
  return (
    <div className="bp-block">
      <Section num="A" title="Service Tier" />
      <div className="bp-services">
        {[
          { val:"express",  tag:"Priority",  name:"Express",  eta:"Same day",           price:"KSh 700+" },
          { val:"standard", tag:"Popular",   name:"Standard", eta:"1–2 business days",  price:"KSh 420+" },
          { val:"economy",  tag:"Value",     name:"Economy",  eta:"3–5 business days",  price:"KSh 250+" },
        ].map(s => (
          <div key={s.val} className={`bp-svc ${form.speed === s.val ? "sel" : ""}`} onClick={() => u("speed", s.val)}>
            <div className="bp-svc-tag">{s.tag}</div>
            <div className="bp-svc-name">{s.name}</div>
            <div className="bp-svc-eta">{s.eta}</div>
            <div className="bp-svc-price">{s.price}</div>
          </div>
        ))}
      </div>

      <Section num="B" title="Collection Window" />
      <Field label="Pickup Date">
        <input className="bp-input" type="date" value={form.date} onChange={e => u("date", e.target.value)} style={{maxWidth: 240}} />
      </Field>
      <div className="bp-slots">
        {slots.map(s => (
          <div
            key={s.label}
            className={`bp-slot ${form.timeSlot === s.label ? "sel" : ""}`}
            onClick={() => u("timeSlot", s.label)}
          >
            <span className="bp-slot-icon">{s.icon}</span>
            <div>
              <div style={{fontWeight:500, fontSize:"0.78rem"}}>{s.label}</div>
              <div style={{fontSize:"0.67rem", opacity:0.5, marginTop:1}}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <Section num="C" title="Add-ons" />
      <div
        className={`bp-toggle-row ${form.insurance ? "on" : ""}`}
        onClick={() => u("insurance", !form.insurance)}
      >
        <div className="bp-toggle-info">
          <div className="bp-toggle-title">Parcel Insurance Cover</div>
          <div className="bp-toggle-sub">Up to KSh 50,000 protection — only KSh 80 extra</div>
        </div>
        <div className="bp-toggle-switch" />
      </div>

      <div className="bp-form-footer">
        <button className="bp-btn-ghost" onClick={onBack}>← Back</button>
        <button className="bp-btn-primary" onClick={onNext}>Continue to Payment →</button>
      </div>
    </div>
  );
}

/* ── Step 3 ── */
function Step3({ form, u, total, onBack, onNext }) {
  return (
    <div className="bp-block">
      <Section num="A" title="Payment Method" />
      <div className="bp-payments">
        {[
          { val:"mpesa", icon:"📱", name:"M-Pesa" },
          { val:"card",  icon:"💳", name:"Card" },
          { val:"cash",  icon:"💵", name:"Cash" },
        ].map(p => (
          <div key={p.val} className={`bp-pay ${form.payment === p.val ? "sel" : ""}`} onClick={() => u("payment", p.val)}>
            <span className="bp-pay-icon">{p.icon}</span>
            <div className="bp-pay-name">{p.name}</div>
          </div>
        ))}
      </div>

      {form.payment === "mpesa" && (
        <div className="bp-pay-detail">
          <div className="bp-label" style={{marginBottom:10}}>M-PESA NUMBER</div>
          <div style={{display:"flex",alignItems:"center",gap:10,background:"var(--ink2)",border:"1px solid var(--line2)",borderRadius:9,padding:"0 14px",height:46,transition:"all 0.2s"}}>
            <span style={{fontSize:"1rem"}}>🇰🇪</span>
            <input
              style={{flex:1,background:"none",border:"none",outline:"none",fontFamily:"var(--mono)",fontSize:"0.88rem",color:"var(--text)"}}
              placeholder="+254 700 000 000"
              value={form.mpesaPhone}
              onChange={e => u("mpesaPhone", e.target.value)}
            />
          </div>
          <div style={{fontSize:"0.7rem",color:"var(--text20)",marginTop:8,fontWeight:300}}>An M-Pesa STK push will be sent to authorise payment.</div>
        </div>
      )}

      {form.payment === "card" && (
        <div className="bp-pay-detail">
          <Field label="Card Number">
            <input className="bp-input" placeholder="4111 1111 1111 1111" />
          </Field>
          <div className="bp-grid-2">
            <Field label="Expiry Date"><input className="bp-input" placeholder="MM / YY" /></Field>
            <Field label="Security Code"><input className="bp-input" placeholder="•••" /></Field>
          </div>
        </div>
      )}

      {form.payment === "cash" && (
        <div className="bp-cash-alert">
          💡 Pay your rider in cash at the pickup address. Please prepare <strong>KSh {total.toLocaleString()}</strong> in exact change.
        </div>
      )}

      <div className="bp-form-footer">
        <button className="bp-btn-ghost" onClick={onBack}>← Back</button>
        <button className="bp-btn-primary" onClick={onNext}>Confirm Booking →</button>
      </div>
    </div>
  );
}

/* ── Step 4: Confirmation ── */
function Step4({ form, total, trackingId, onTrack, onNew }) {
  return (
    <div className="bp-confirm">
      <div className="bp-confirm-aura">
        <div className="bp-confirm-ring">✓</div>
      </div>
      <div className="bp-confirm-status">Booking Confirmed</div>
      <div className="bp-confirm-title">Parcel en route</div>
      <div className="bp-confirm-sub">Your tracking reference number</div>
      <div className="bp-tracking-id">{trackingId}</div>
      <div className="bp-confirm-table">
        {[
          ["Origin",         form.senderCounty || "Nairobi"],
          ["Destination",    form.recipientCounty || "—"],
          ["Service Tier",   (SVC_MAP[form.speed] || SVC_MAP.standard).label],
          ["Collection",     form.date && form.timeSlot ? `${form.date} · ${form.timeSlot}` : "—"],
          ["Payment",        form.payment ? form.payment.charAt(0).toUpperCase() + form.payment.slice(1) : "—"],
          ["Amount Charged", `KSh ${total.toLocaleString()}`, true],
        ].map(([k, v, hi]) => (
          <div className="bp-confirm-row" key={k}>
            <span>{k}</span>
            <strong className={hi ? "hi" : ""}>{v}</strong>
          </div>
        ))}
      </div>
      <p className="bp-confirm-note">
        SMS confirmation dispatched to {form.senderPhone || "your number"}.<br />
        Your rider will contact you before arriving for collection.<br />
        Save your tracking ID to monitor real-time delivery progress.
      </p>
      <div className="bp-confirm-actions">
        <button className="bp-btn-primary" onClick={onTrack}>Track Parcel →</button>
        <button className="bp-btn-secondary" onClick={onNew}>New Booking</button>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function BookPage({ setPage }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const trackingId = useRef("SPK-" + Math.floor(100000 + Math.random() * 900000));

  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const fee        = (SVC_MAP[form.speed] || SVC_MAP.standard).price;
  const weightCost = Math.round(parseFloat(form.weight || 0) * 60);
  const total      = fee + weightCost + (form.insurance ? 80 : 0);

  const handleNew = () => {
    setStep(1);
    setForm(INITIAL_FORM_STATE);
    trackingId.current = "SPK-" + Math.floor(100000 + Math.random() * 900000);
  };

  const stepTitles = ["", "Sender & Recipient", "Schedule Pickup", "Payment", "Confirmed"];

  return (
    <div className="bp-root">
      <style>{CSS}</style>

      {/* Nav */}
      <nav className="bp-nav">
        <div className="bp-nav-brand" onClick={() => setPage("home")}>
          <div className="bp-nav-brand-dot" />
          SpeedPak
        </div>
        <div className="bp-nav-center">
          New Shipment <span>/</span> {stepTitles[step]}
        </div>
        <div className="bp-nav-actions">
          <button className="bp-nav-btn" onClick={() => setPage("track")}>Track</button>
          <button className="bp-nav-btn" onClick={() => setPage("home")}>← Home</button>
        </div>
      </nav>

      {/* Split layout */}
      <div className="bp-layout">

        {/* Left: form */}
        <div className="bp-form-area">
          <div className="bp-page-header">
            <div className="bp-page-eyebrow">New Shipment</div>
            <h1 className="bp-page-title">Send a <em>Parcel</em></h1>
            <p className="bp-page-desc">Complete the form to schedule collection and delivery across all 47 counties.</p>
          </div>

          {step < 4 && <ProgressRail step={step} />}

          {step === 1 && <Step1 form={form} u={u} onNext={() => setStep(2)} />}
          {step === 2 && <Step2 form={form} u={u} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <Step3 form={form} u={u} total={total} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
          {step === 4 && (
            <Step4
              form={form} total={total} trackingId={trackingId.current}
              onTrack={() => setPage("track")} onNew={handleNew}
            />
          )}
        </div>

        {/* Right: live summary */}
        {step < 4 && (
          <SummaryPanel form={form} fee={fee} weightCost={weightCost} total={total} step={step} />
        )}
      </div>
    </div>
  );
}