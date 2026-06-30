import React from 'react'

export default function CssAnimationBlock({ block, darkMode, language }) {
    const kind = block.kind || 'default'
    const label = block.label ? (typeof block.label === 'object' ? (block.label[language] || block.label.en) : block.label) : null

    const animations = {
        events: (
            <svg viewBox="0 0 320 200" style={{ width: '100%', maxWidth: '320px', height: '200px' }} aria-label="Event Bubbling Animation">
                <style>{`
                    @keyframes evtClick{0%,80%,100%{r:8;opacity:1}40%{r:16;opacity:.6}}
                    @keyframes evtBubble{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-60px);opacity:0}}
                    @keyframes evtPulse{0%,100%{fill:#6366f1}50%{fill:#a78bfa}}
                    .evtNode{animation:evtPulse 2s ease-in-out infinite}
                    .evtBubble1{animation:evtBubble 2.4s ease-in-out 0.2s infinite}
                    .evtBubble2{animation:evtBubble 2.4s ease-in-out 0.8s infinite}
                    .evtBubble3{animation:evtBubble 2.4s ease-in-out 1.4s infinite}
                    .evtClick{animation:evtClick 2.4s ease-in-out infinite}
                `}</style>
                <rect x="130" y="10" width="60" height="28" rx="6" fill="#4f46e5" opacity=".9"/>
                <text x="160" y="29" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace">document</text>
                <line x1="160" y1="38" x2="100" y2="68" stroke="#6366f1" strokeWidth="1.5"/>
                <line x1="160" y1="38" x2="220" y2="68" stroke="#6366f1" strokeWidth="1.5"/>
                <rect x="65" y="68" width="70" height="26" rx="6" fill="#7c3aed" opacity=".85"/>
                <text x="100" y="85" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace">&lt;body&gt;</text>
                <rect x="185" y="68" width="70" height="26" rx="6" fill="#7c3aed" opacity=".85"/>
                <text x="220" y="85" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace">&lt;div&gt;</text>
                <line x1="100" y1="94" x2="100" y2="124" stroke="#6366f1" strokeWidth="1.5"/>
                <rect x="60" y="124" width="80" height="26" rx="6" className="evtNode"/>
                <text x="100" y="141" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace">&lt;button&gt;</text>
                <circle cx="100" cy="148" r="8" fill="#f59e0b" opacity="0" className="evtBubble1"/>
                <circle cx="100" cy="148" r="8" fill="#f59e0b" opacity="0" className="evtBubble2"/>
                <circle cx="100" cy="148" r="8" fill="#f59e0b" opacity="0" className="evtBubble3"/>
                <circle cx="100" cy="168" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" className="evtClick"/>
                <text x="115" y="173" fill="#f59e0b" fontSize="10" fontFamily="sans-serif">click!</text>
                <text x="10" y="195" fill="#a78bfa" fontSize="9" fontFamily="sans-serif">Event bubbles up the DOM tree</text>
            </svg>
        ),
        dates: (
            <svg viewBox="0 0 280 180" style={{ width: '100%', maxWidth: '280px', height: '180px' }} aria-label="Date Animation">
                <style>{`
                    @keyframes calFlip{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:0;transform:scaleY(0)}}
                    @keyframes clockHand{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
                    .calPage{animation:calFlip 3s ease-in-out infinite;transform-origin:140px 90px}
                    .secHand{animation:clockHand 2s linear infinite;transform-origin:220px 100px}
                `}</style>
                <rect x="20" y="30" width="160" height="130" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
                <rect x="20" y="30" width="160" height="35" rx="10" fill="#4f46e5"/>
                <rect x="20" y="55" width="160" height="10" fill="#4f46e5"/>
                <text x="100" y="52" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">June 2025</text>
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((d, idx) => (
                    <text key={d} x={35+(idx%7)*22} y={90+Math.floor(idx/7)*22} textAnchor="middle" fill={d===24?'#f59e0b':'#a5b4fc'} fontSize="11" fontFamily="monospace">{d}</text>
                ))}
                <circle cx="100" cy="88" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0" className="calPage"/>
                <text x="100" y="140" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">getMonth() = 5 → +1 = June</text>
                <circle cx="220" cy="100" r="45" fill="#0f172a" stroke="#6366f1" strokeWidth="2"/>
                <circle cx="220" cy="100" r="3" fill="#f59e0b"/>
                <line x1="220" y1="100" x2="220" y2="62" stroke="#a78bfa" strokeWidth="2.5" className="secHand"/>
                <line x1="220" y1="100" x2="245" y2="100" stroke="#6366f1" strokeWidth="2"/>
                <text x="220" y="156" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="sans-serif">Date.now() = epoch ms</text>
            </svg>
        ),
        regex: (
            <svg viewBox="0 0 320 160" style={{ width: '100%', maxWidth: '320px', height: '160px' }} aria-label="RegExp Animation">
                <style>{`
                    @keyframes rxScan{0%{transform:translateX(-80px);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:translateX(200px);opacity:0}}
                    .rxScanBar{animation:rxScan 3s ease-in-out infinite}
                `}</style>
                <rect x="10" y="20" width="300" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <text x="20" y="46" fill="#94a3b8" fontSize="13" fontFamily="monospace">/</text>
                <text x="32" y="46" fill="#f59e0b" fontSize="13" fontFamily="monospace">\d+</text>
                <text x="66" y="46" fill="#94a3b8" fontSize="13" fontFamily="monospace">-</text>
                <text x="78" y="46" fill="#a78bfa" fontSize="13" fontFamily="monospace">[A-Z]</text>
                <text x="126" y="46" fill="#94a3b8" fontSize="13" fontFamily="monospace">\w+</text>
                <text x="164" y="46" fill="#94a3b8" fontSize="13" fontFamily="monospace">/g</text>
                <rect x="10" y="80" width="300" height="40" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <rect x="0" y="82" width="18" height="36" rx="3" fill="#6366f1" opacity=".35" className="rxScanBar"/>
                {'TC-001 PASS abc-B123'.split('').map((ch, i) => (
                    <text key={i} x={20+i*8.5} y={106} fill={['0','1','2','3','4','5','6','7','8','9'].includes(ch)?'#f59e0b':ch===ch.toUpperCase()&&ch!==' '&&ch!=='-'?'#a78bfa':'#94a3b8'} fontSize="12" fontFamily="monospace">{ch}</text>
                ))}
                <text x="10" y="145" fill="#64748b" fontSize="9" fontFamily="sans-serif">Pattern scans text → highlights matches by type</text>
            </svg>
        ),
        setmap: (
            <svg viewBox="0 0 320 180" style={{ width: '100%', maxWidth: '320px', height: '180px' }} aria-label="Set vs Array Animation">
                <style>{`
                    @keyframes smDup{0%,60%{opacity:1;transform:translateY(0)}80%{opacity:0;transform:translateY(-15px)}100%{opacity:0}}
                    @keyframes smKeep{0%,100%{opacity:1}50%{opacity:.7}}
                    .smDup{animation:smDup 3s ease-in-out infinite}
                    .smKeep{animation:smKeep 3s ease-in-out infinite}
                `}</style>
                <text x="60" y="22" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Array (allows dups)</text>
                {['A','B','A','C','B'].map((v,i) => (
                    <g key={i}>
                        <rect x={15+i*22} y="30" width="20" height="20" rx="4" fill={v==='A'&&i===2?'#7c3aed':v==='B'&&i===4?'#7c3aed':'#1e1b4b'} stroke="#6366f1" strokeWidth="1.5" className={v==='A'&&i===2?'smDup':v==='B'&&i===4?'smDup':'smKeep'}/>
                        <text x={25+i*22} y="44" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace" className={v==='A'&&i===2?'smDup':v==='B'&&i===4?'smDup':'smKeep'}>{v}</text>
                    </g>
                ))}
                <text x="155" y="50" fill="#94a3b8" fontSize="18" fontFamily="sans-serif">→</text>
                <text x="240" y="22" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Set (unique only)</text>
                {['A','B','C'].map((v,i) => (
                    <g key={i}>
                        <rect x={183+i*38} y="30" width="30" height="20" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="1.5"/>
                        <text x={198+i*38} y="44" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">{v}</text>
                    </g>
                ))}
                <text x="70" y="95" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Map (key value)</text>
                {[['chrome','Driver'],['firefox','Gecko'],['safari','Safari']].map(([k,v],i) => (
                    <g key={i}>
                        <rect x="10" y={108+i*22} width="55" height="18" rx="4" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5"/>
                        <text x="37" y={121+i*22} textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">{k}</text>
                        <text x="70" y={121+i*22} fill="#94a3b8" fontSize="9" fontFamily="monospace">→</text>
                        <rect x="85" y={108+i*22} width="50" height="18" rx="4" fill="#1c1917" stroke="#6366f1" strokeWidth="1.5"/>
                        <text x="110" y={121+i*22} textAnchor="middle" fill="#a5b4fc" fontSize="9" fontFamily="monospace">{v}</text>
                    </g>
                ))}
                <text x="10" y="180" fill="#64748b" fontSize="9" fontFamily="sans-serif">Set deduplicates. Map keys can be any type.</text>
            </svg>
        ),
        promises: (
            <svg viewBox="0 0 320 170" style={{ width: '100%', maxWidth: '320px', height: '170px' }} aria-label="Promise Flow Animation">
                <style>{`
                    @keyframes prFlow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
                    @keyframes prPending{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    @keyframes prResolve{0%,40%{opacity:0}60%,100%{opacity:1}}
                    .prArrow{stroke-dasharray:200;animation:prFlow 2.5s linear infinite}
                    .prPend{animation:prPending 2.5s ease-in-out infinite}
                    .prDone{animation:prResolve 2.5s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="arrP" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/></marker>
                    <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#34d399"/></marker>
                    <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#ef4444"/></marker>
                </defs>
                <rect x="10" y="60" width="80" height="32" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="prPend"/>
                <text x="50" y="80" textAnchor="middle" fill="#a78bfa" fontSize="11" fontFamily="monospace">pending</text>
                <line x1="90" y1="76" x2="140" y2="76" stroke="#6366f1" strokeWidth="2" className="prArrow" markerEnd="url(#arrP)"/>
                <rect x="140" y="48" width="80" height="56" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
                <text x="180" y="70" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">async</text>
                <text x="180" y="84" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">operation</text>
                <text x="180" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">fetch/db/timer</text>
                <line x1="220" y1="65" x2="265" y2="45" stroke="#34d399" strokeWidth="2" className="prArrow" markerEnd="url(#arrG)"/>
                <line x1="220" y1="95" x2="265" y2="115" stroke="#ef4444" strokeWidth="2" className="prArrow" markerEnd="url(#arrR)"/>
                <rect x="265" y="28" width="50" height="26" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="prDone"/>
                <text x="290" y="44" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">.then()</text>
                <rect x="265" y="102" width="50" height="26" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="2" className="prDone"/>
                <text x="290" y="118" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">.catch()</text>
                <text x="160" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Promise: pending → fulfilled or rejected</text>
            </svg>
        ),
        classes: (
            <svg viewBox="0 0 320 190" style={{ width: '100%', maxWidth: '320px', height: '190px' }} aria-label="Class Hierarchy Animation">
                <style>{`
                    @keyframes clsParent{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    @keyframes clsChild{0%{opacity:0;transform:translateY(-10px)}40%,100%{opacity:1;transform:translateY(0)}}
                    .clsP{animation:clsParent 2s ease-in-out infinite}
                    .clsC{animation:clsChild 2s ease-out 0.6s both}
                `}</style>
                <rect x="95" y="10" width="130" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="clsP"/>
                <text x="160" y="30" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold" fontFamily="monospace">class Animal</text>
                <text x="160" y="48" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">constructor(name)</text>
                <line x1="110" y1="60" x2="60" y2="100" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="210" y1="60" x2="260" y2="100" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3"/>
                <text x="60" y="96" fill="#6366f1" fontSize="8" fontFamily="sans-serif">extends</text>
                <text x="210" y="96" fill="#6366f1" fontSize="8" fontFamily="sans-serif">extends</text>
                <rect x="10" y="100" width="100" height="50" rx="8" fill="#0f172a" stroke="#7c3aed" strokeWidth="2" className="clsC"/>
                <text x="60" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold" fontFamily="monospace">class Dog</text>
                <text x="60" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">bark() + super()</text>
                <rect x="210" y="100" width="100" height="50" rx="8" fill="#0f172a" stroke="#7c3aed" strokeWidth="2" className="clsC"/>
                <text x="260" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold" fontFamily="monospace">class Cat</text>
                <text x="260" y="138" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">meow() + super()</text>
                <text x="160" y="180" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">extends = Java: class Dog extends Animal</text>
            </svg>
        ),
        ecosystem: (
            <svg viewBox="0 0 280 200" style={{ width: '100%', maxWidth: '280px', height: '200px' }} aria-label="JS Ecosystem Animation">
                <style>{`
                    @keyframes orbit1{from{transform:rotate(0deg) translateX(80px) rotate(0deg)}to{transform:rotate(360deg) translateX(80px) rotate(-360deg)}}
                    @keyframes orbit2{from{transform:rotate(120deg) translateX(80px) rotate(-120deg)}to{transform:rotate(480deg) translateX(80px) rotate(-480deg)}}
                    @keyframes orbit3{from{transform:rotate(240deg) translateX(80px) rotate(-240deg)}to{transform:rotate(600deg) translateX(80px) rotate(-600deg)}}
                    @keyframes ecoCore{0%,100%{opacity:1}50%{opacity:.8}}
                    .ecoT1{animation:orbit1 8s linear infinite;transform-origin:140px 100px}
                    .ecoT2{animation:orbit2 8s linear infinite;transform-origin:140px 100px}
                    .ecoT3{animation:orbit3 8s linear infinite;transform-origin:140px 100px}
                    .ecoCore{animation:ecoCore 2s ease-in-out infinite}
                `}</style>
                <circle cx="140" cy="100" r="35" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" className="ecoCore"/>
                <text x="140" y="105" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold" fontFamily="monospace">JS</text>
                <circle cx="140" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4,4"/>
                <g className="ecoT1">
                    <circle cx="140" cy="100" r="22" fill="#0f172a" stroke="#00d4ff" strokeWidth="2"/>
                    <text x="140" y="105" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="sans-serif">Playwright</text>
                </g>
                <g className="ecoT2">
                    <circle cx="140" cy="100" r="22" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
                    <text x="140" y="105" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="sans-serif">Jest</text>
                </g>
                <g className="ecoT3">
                    <circle cx="140" cy="100" r="22" fill="#0f172a" stroke="#f97316" strokeWidth="2"/>
                    <text x="140" y="105" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="sans-serif">Cypress</text>
                </g>
                <text x="140" y="195" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">JS core + testing frameworks orbit around it</text>
            </svg>
        ),
        errors: (
            <svg viewBox="0 0 300 160" style={{ width: '100%', maxWidth: '300px', height: '160px' }} aria-label="Error Debug Animation">
                <style>{`
                    @keyframes errShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
                    @keyframes errFix{0%,40%{opacity:0}60%,100%{opacity:1}}
                    @keyframes errArrow{0%,30%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}
                    .errBox{animation:errShake 2.8s ease-in-out infinite;transform-origin:75px 70px}
                    .errFixed{animation:errFix 2.8s ease-in-out infinite}
                    .errArr{animation:errArrow 2.8s ease-in-out infinite;transform-origin:150px 70px}
                `}</style>
                <defs>
                    <marker id="arrFix" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/></marker>
                </defs>
                <rect x="10" y="40" width="130" height="60" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" className="errBox"/>
                <text x="75" y="64" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">TypeError</text>
                <text x="75" y="82" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">Cannot read</text>
                <text x="75" y="94" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">property of null</text>
                <line x1="140" y1="70" x2="172" y2="70" stroke="#6366f1" strokeWidth="2.5" className="errArr" markerEnd="url(#arrFix)"/>
                <rect x="172" y="40" width="115" height="60" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="errFixed"/>
                <text x="230" y="64" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">Fixed</text>
                <text x="230" y="82" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace">optional chain</text>
                <text x="230" y="94" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace">el?.property</text>
                <text x="150" y="140" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Error → diagnose → apply fix → verify</text>
            </svg>
        ),
        intro: (
            <svg viewBox="0 0 260 160" style={{ width: '100%', maxWidth: '260px', height: '160px' }} aria-label="JavaScript Intro Animation">
                <style>{`
                    @keyframes jsLogo{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
                    @keyframes jsStar{0%{opacity:1}100%{opacity:0}}
                    @keyframes jsLabel{0%,100%{opacity:.7}50%{opacity:1}}
                    .jsL{animation:jsLogo 2s ease-in-out infinite;transform-origin:130px 75px}
                    .jsS1{animation:jsStar 2s ease-in-out infinite}
                    .jsS2{animation:jsStar 2s ease-in-out 0.4s infinite}
                    .jsS3{animation:jsStar 2s ease-in-out 0.8s infinite}
                    .jsLab{animation:jsLabel 3s ease-in-out infinite}
                `}</style>
                <rect x="80" y="25" width="100" height="100" rx="14" fill="#f59e0b" className="jsL"/>
                <text x="130" y="100" textAnchor="middle" fill="#1c1917" fontSize="52" fontWeight="bold" fontFamily="monospace" className="jsL">JS</text>
                <circle cx="70" cy="45" r="6" fill="#fde68a" className="jsS1" opacity=".9"/>
                <circle cx="190" cy="50" r="5" fill="#fde68a" className="jsS2" opacity=".9"/>
                <circle cx="155" cy="135" r="4" fill="#fde68a" className="jsS3" opacity=".9"/>
                <text x="130" y="152" textAnchor="middle" fill="#a78bfa" fontSize="11" fontFamily="sans-serif" className="jsLab">Web · Automation · Node.js · APIs</text>
            </svg>
        ),
        install: (
            <svg viewBox="0 0 300 140" style={{ width: '100%', maxWidth: '300px', height: '140px' }} aria-label="Installation Terminal">
                <style>{`
                    @keyframes instLine1{0%,15%{opacity:0}20%,100%{opacity:1}}
                    @keyframes instLine2{0%,30%{opacity:0}35%,100%{opacity:1}}
                    @keyframes instLine3{0%,50%{opacity:0}55%,100%{opacity:1}}
                    @keyframes instCursor{0%,100%{opacity:1}50%{opacity:0}}
                    .iL1{animation:instLine1 4s ease-in-out infinite}
                    .iL2{animation:instLine2 4s ease-in-out infinite}
                    .iL3{animation:instLine3 4s ease-in-out infinite}
                    .iCur{animation:instCursor 1s ease-in-out infinite}
                `}</style>
                <rect x="10" y="10" width="280" height="120" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
                <circle cx="28" cy="28" r="6" fill="#ef4444"/>
                <circle cx="46" cy="28" r="6" fill="#f59e0b"/>
                <circle cx="64" cy="28" r="6" fill="#22c55e"/>
                <text x="20" y="58" fill="#22c55e" fontSize="12" fontFamily="monospace" className="iL1">$ node --version</text>
                <text x="20" y="76" fill="#94a3b8" fontSize="12" fontFamily="monospace" className="iL2">v22.4.0</text>
                <text x="20" y="94" fill="#22c55e" fontSize="12" fontFamily="monospace" className="iL3">$ npm init -y</text>
                <text x="20" y="112" fill="#a78bfa" fontSize="12" fontFamily="monospace" className="iL3">Wrote package.json</text>
                <rect x="215" y="100" width="2" height="14" fill="#e2e8f0" className="iCur"/>
            </svg>
        ),
        datatypes: (
            <svg viewBox="0 0 300 150" style={{ width: '100%', maxWidth: '300px', height: '150px' }} aria-label="Data Types Animation">
                <style>{`
                    @keyframes dtPrim{0%,100%{fill:#1e1b4b}50%{fill:#2e1b6b}}
                    @keyframes dtRef{0%,100%{fill:#0c2240}50%{fill:#0a2e54}}
                    .dtP{animation:dtPrim 2s ease-in-out infinite}
                    .dtR{animation:dtRef 2s ease-in-out 0.5s infinite}
                `}</style>
                <text x="70" y="20" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Primitives (Stack)</text>
                {['String','Number','Boolean','null','undefined'].map((t,i) => (
                    <g key={t}>
                        <rect x="10" y={28+i*20} width="120" height="16" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" className="dtP"/>
                        <text x="70" y={40+i*20} textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">{t}</text>
                    </g>
                ))}
                <text x="225" y="20" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="sans-serif">References (Heap)</text>
                {['Object {}','Array []','Function()'].map((t,i) => (
                    <g key={t}>
                        <rect x="160" y={28+i*30} width="130" height="24" rx="6" fill="#0c2240" stroke="#34d399" strokeWidth="1.5" className="dtR"/>
                        <text x="225" y={44+i*30} textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="monospace">{t}</text>
                    </g>
                ))}
                <text x="150" y="142" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java: primitive int vs Object reference — same concept</text>
            </svg>
        ),
        strings: (
            <svg viewBox="0 0 300 140" style={{ width: '100%', maxWidth: '300px', height: '140px' }} aria-label="String Template Literal Animation">
                <style>{`
                    @keyframes strPart{0%,100%{opacity:.5;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
                    @keyframes strResult{0%,40%{opacity:0}60%,100%{opacity:1}}
                    .sP1{animation:strPart 2.5s ease-in-out infinite}
                    .sP2{animation:strPart 2.5s ease-in-out 0.4s infinite}
                    .sP3{animation:strPart 2.5s ease-in-out 0.8s infinite}
                    .sRes{animation:strResult 2.5s ease-in-out infinite}
                `}</style>
                <rect x="10" y="20" width="70" height="28" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" className="sP1"/>
                <text x="45" y="38" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">{'`Hello `'}</text>
                <rect x="88" y="20" width="65" height="28" rx="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" className="sP2"/>
                <text x="120" y="38" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">{'${name}'}</text>
                <rect x="161" y="20" width="80" height="28" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" className="sP3"/>
                <text x="201" y="38" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">{'` (#${id})`'}</text>
                <text x="150" y="78" textAnchor="middle" fill="#a78bfa" fontSize="18" fontFamily="sans-serif">↓</text>
                <rect x="30" y="88" width="240" height="28" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="sRes"/>
                <text x="150" y="106" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">{'"Hello QAEngineer (#42)"'}</text>
                <text x="150" y="135" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java: String.format vs JS Template Literals</text>
            </svg>
        ),
        arrays: (
            <svg viewBox="0 0 300 160" style={{ width: '100%', maxWidth: '300px', height: '160px' }} aria-label="Array Methods Animation">
                <style>{`
                    @keyframes arrIn{0%{transform:translateX(-8px);opacity:0}30%,70%{transform:translateX(0);opacity:1}100%{transform:translateX(8px);opacity:0}}
                    @keyframes arrFilter{0%,100%{fill:#7c3aed}50%{fill:#a78bfa}}
                    .aIn{animation:arrIn 3s ease-in-out infinite}
                    .aIn2{animation:arrIn 3s ease-in-out 0.5s infinite}
                    .aFil{animation:arrFilter 3s ease-in-out infinite}
                `}</style>
                <text x="10" y="16" fill="#94a3b8" fontSize="10" fontFamily="monospace">Input: [1, 2, 3, 4, 5]</text>
                {[1,2,3,4,5].map((n,i) => (
                    <g key={n}>
                        <rect x={10+i*46} y="22" width="40" height="28" rx="6" fill="#1e1b4b" stroke={n%2===0?'#ef4444':'#6366f1'} strokeWidth="2" className="aIn"/>
                        <text x={30+i*46} y="40" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="monospace">{n}</text>
                    </g>
                ))}
                <rect x="80" y="62" width="140" height="22" rx="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" className="aFil"/>
                <text x="150" y="77" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">{'.filter(n => n % 2 !== 0)'}</text>
                <text x="150" y="97" textAnchor="middle" fill="#a78bfa" fontSize="12" fontFamily="sans-serif">↓</text>
                <text x="10" y="116" fill="#34d399" fontSize="10" fontFamily="monospace">Result: [1, 3, 5]</text>
                {[1,3,5].map((n,i) => (
                    <g key={n}>
                        <rect x={10+i*56} y="122" width="48" height="28" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="aIn2"/>
                        <text x={34+i*56} y="140" textAnchor="middle" fill="#34d399" fontSize="14" fontFamily="monospace">{n}</text>
                    </g>
                ))}
                <text x="150" y="158" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java: stream().filter() → collect(toList())</text>
            </svg>
        ),
        loops: (
            <svg viewBox="0 0 260 150" style={{ width: '100%', maxWidth: '260px', height: '150px' }} aria-label="Loop Animation">
                <style>{`
                    @keyframes lpCount{0%{opacity:0;transform:translateY(-8px)}15%,85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(8px)}}
                    @keyframes lpArrow{0%,100%{stroke:#6366f1}50%{stroke:#a78bfa}}
                    @keyframes lpBox{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    .lpC{animation:lpCount 2s ease-in-out infinite}
                    .lpA{animation:lpArrow 2s ease-in-out infinite}
                    .lpB{animation:lpBox 2s ease-in-out infinite}
                `}</style>
                <rect x="80" y="20" width="100" height="40" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="lpB"/>
                <text x="130" y="38" textAnchor="middle" fill="#a78bfa" fontSize="11" fontFamily="monospace">i = 0,1,2,3...</text>
                <text x="130" y="52" textAnchor="middle" fill="#6366f1" fontSize="9" fontFamily="sans-serif">condition: i &lt; 5</text>
                <path d="M90 60 C20 60 20 110 90 110" fill="none" stroke="#6366f1" strokeWidth="2" className="lpA"/>
                <text x="22" y="95" fill="#6366f1" fontSize="8" fontFamily="sans-serif">i++</text>
                <rect x="90" y="72" width="140" height="36" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <text x="100" y="88" fill="#f59e0b" fontSize="10" fontFamily="monospace">for</text>
                <text x="118" y="88" fill="#94a3b8" fontSize="10" fontFamily="monospace">(let i=0; i&lt;5; i++)</text>
                <text x="100" y="102" fill="#22c55e" fontSize="10" fontFamily="monospace">  console.log(i)</text>
                {[0,1,2,3,4].map((n,i) => (
                    <text key={n} x={115+i*18} y="130" textAnchor="middle" fill="#34d399" fontSize="13" fontFamily="monospace" className="lpC" style={{ animationDelay: `${i*0.18}s` }}>{n}</text>
                ))}
                <text x="130" y="148" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java for loop syntax identical — only let/var differs</text>
            </svg>
        ),
        dom: (
            <svg viewBox="0 0 300 160" style={{ width: '100%', maxWidth: '300px', height: '160px' }} aria-label="DOM Selector Animation">
                <style>{`
                    @keyframes domPulse{0%,100%{fill:#1e1b4b;stroke:#6366f1}50%{fill:#1e293b;stroke:#a78bfa}}
                    @keyframes domHighlight{0%,100%{fill:#064e3b;stroke:#34d399}50%{fill:#065f46;stroke:#6ee7b7}}
                    @keyframes domArrow{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
                    .dP{animation:domPulse 2.5s ease-in-out infinite}
                    .dH{animation:domHighlight 2.5s ease-in-out 0.5s infinite}
                    .dArr{stroke-dasharray:120;animation:domArrow 2.5s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="dArrHead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/></marker>
                </defs>
                <text x="10" y="18" fill="#94a3b8" fontSize="10" fontFamily="monospace">&lt;body&gt;</text>
                <rect x="25" y="24" width="90" height="22" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" className="dP"/>
                <text x="70" y="38" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">&lt;div id="app"&gt;</text>
                <rect x="40" y="54" width="75" height="20" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" className="dP"/>
                <text x="78" y="67" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">&lt;h1&gt;Title&lt;/h1&gt;</text>
                <rect x="40" y="82" width="120" height="20" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="dH"/>
                <text x="100" y="96" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">&lt;button class="btn"&gt;</text>
                <line x1="200" y1="92" x2="165" y2="92" stroke="#f59e0b" strokeWidth="2" className="dArr" markerEnd="url(#dArrHead)"/>
                <rect x="195" y="70" width="100" height="44" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <text x="245" y="86" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">document</text>
                <text x="245" y="98" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">.querySelector</text>
                <text x="245" y="110" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace">{".btn"}</text>
                <text x="150" y="145" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">querySelector vs Playwright locator — both select elements</text>
            </svg>
        ),
        // ── SELENIUM ─────────────────────────────────────────────────────────────
        'selenium-flow': (
            <svg viewBox="0 0 340 160" style={{ width: '100%', maxWidth: '340px', height: '160px' }} aria-label="Selenium WebDriver Flow">
                <style>{`
                    @keyframes sfCmd{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
                    @keyframes sfResp{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
                    @keyframes sfBlink{0%,100%{opacity:.5}50%{opacity:1}}
                    @keyframes sfClick{0%,80%,100%{r:5;opacity:1}40%{r:10;opacity:.4}}
                    .sfA1{stroke-dasharray:120;animation:sfCmd 1.5s ease-in-out 0s infinite}
                    .sfA2{stroke-dasharray:120;animation:sfCmd 1.5s ease-in-out 0.5s infinite}
                    .sfA3{stroke-dasharray:120;animation:sfResp 1.5s ease-in-out 1s infinite}
                    .sfB{animation:sfBlink 2s ease-in-out infinite}
                    .sfC{animation:sfClick 2s ease-in-out 1.5s infinite}
                `}</style>
                <defs>
                    <marker id="sfH1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#6366f1"/></marker>
                    <marker id="sfH2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Test Code box */}
                <rect x="4" y="45" width="75" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
                <text x="42" y="68" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace">Test</text>
                <text x="42" y="82" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace">Code</text>
                <text x="42" y="100" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">driver</text>
                <text x="42" y="112" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">.click()</text>
                {/* Arrow test → driver */}
                <line x1="79" y1="72" x2="116" y2="72" stroke="#6366f1" strokeWidth="2" className="sfA1" markerEnd="url(#sfH1)"/>
                <text x="97" y="68" textAnchor="middle" fill="#6366f1" fontSize="7" fontFamily="sans-serif">HTTP</text>
                {/* WebDriver box */}
                <rect x="116" y="45" width="80" height="70" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
                <text x="156" y="68" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">WebDriver</text>
                <text x="156" y="82" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">Protocol</text>
                <text x="156" y="98" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">ChromeDriver</text>
                <text x="156" y="110" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">GeckoDriver</text>
                {/* Arrow driver → browser */}
                <line x1="196" y1="72" x2="234" y2="72" stroke="#6366f1" strokeWidth="2" className="sfA2" markerEnd="url(#sfH1)"/>
                <text x="215" y="68" textAnchor="middle" fill="#6366f1" fontSize="7" fontFamily="sans-serif">CDP</text>
                {/* Browser box */}
                <rect x="234" y="30" width="100" height="100" rx="8" fill="#0c2240" stroke="#38bdf8" strokeWidth="2" className="sfB"/>
                <rect x="244" y="42" width="80" height="50" rx="4" fill="#0f172a" stroke="#1e3a5f" strokeWidth="1"/>
                <text x="284" y="58" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">Browser</text>
                <text x="284" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Chrome / Firefox</text>
                <text x="284" y="86" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">Safari / Edge</text>
                <circle cx="284" cy="108" r="5" fill="none" stroke="#f59e0b" strokeWidth="2" className="sfC"/>
                {/* Return arrow */}
                <line x1="234" y1="108" x2="196" y2="108" stroke="#34d399" strokeWidth="2" className="sfA3" markerEnd="url(#sfH2)"/>
                <text x="215" y="120" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="sans-serif">response</text>
                <text x="170" y="150" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java WebDriver → HTTP → ChromeDriver → Browser</text>
            </svg>
        ),
        'selenium-wait': (
            <svg viewBox="0 0 320 170" style={{ width: '100%', maxWidth: '320px', height: '170px' }} aria-label="Selenium Wait Strategy">
                <style>{`
                    @keyframes swBad{0%,20%{x:0}22%,32%{x:2}24%{x:-2}26%{x:2}28%{x:-2}30%{x:2}35%,100%{x:0}}
                    @keyframes swGood{0%,60%{opacity:.3}80%,100%{opacity:1}}
                    @keyframes swTimer{0%{width:0}60%{width:90px}61%,100%{width:0}}
                    @keyframes swElem{0%,50%{opacity:0}70%,100%{opacity:1}}
                    .swShake{animation:swBad 3s ease-in-out infinite}
                    .swOk{animation:swGood 3s ease-in-out infinite}
                    .swBar{animation:swTimer 3s linear infinite}
                    .swEl{animation:swElem 3s ease-in-out infinite}
                `}</style>
                {/* Bad: Thread.sleep */}
                <rect x="8" y="10" width="140" height="70" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2"/>
                <text x="78" y="30" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="monospace">Thread.sleep(3000)</text>
                <rect x="18" y="38" width="120" height="14" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <rect x="18" y="38" width="120" height="14" rx="3" fill="#7f1d1d" className="swBar"/>
                <text x="78" y="49" textAnchor="middle" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">fixed 3s — wastes time or too short</text>
                <text x="78" y="72" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace" className="swShake">❌ Flaky tests!</text>
                {/* Good: WebDriverWait */}
                <rect x="170" y="10" width="145" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2"/>
                <text x="242" y="30" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">WebDriverWait</text>
                <text x="242" y="44" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace">until(elementVisible)</text>
                <rect x="180" y="52" width="40" height="16" rx="3" fill="#0f172a" stroke="#6366f1" strokeWidth="1" className="swEl"/>
                <text x="200" y="63" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">poll</text>
                <rect x="227" y="52" width="40" height="16" rx="3" fill="#0f172a" stroke="#6366f1" strokeWidth="1" className="swEl"/>
                <text x="247" y="63" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">poll</text>
                <rect x="274" y="52" width="30" height="16" rx="3" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="swEl"/>
                <text x="289" y="63" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">✓</text>
                <text x="242" y="72" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace" className="swOk">✅ Stable!</text>
                {/* Timeline */}
                <line x1="8" y1="110" x2="312" y2="110" stroke="#334155" strokeWidth="1"/>
                <text x="8" y="125" fill="#64748b" fontSize="9" fontFamily="sans-serif">0s</text>
                <text x="140" y="125" fill="#64748b" fontSize="9" fontFamily="sans-serif">3s</text>
                <text x="220" y="125" fill="#64748b" fontSize="9" fontFamily="sans-serif">→ element found early → fast</text>
                <text x="160" y="150" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">WebDriverWait polls every 500ms — stops when condition met</text>
            </svg>
        ),
        'selenium-locator': (
            <svg viewBox="0 0 320 175" style={{ width: '100%', maxWidth: '320px', height: '175px' }} aria-label="Selenium Locator Strategies">
                <style>{`
                    @keyframes slScan{0%{transform:translateX(-30px);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(30px);opacity:0}}
                    @keyframes slPulse{0%,100%{stroke:#6366f1}50%{stroke:#a78bfa}}
                    .slS{animation:slScan 3s ease-in-out infinite}
                    .slP{animation:slPulse 2s ease-in-out infinite}
                `}</style>
                {/* HTML snippet */}
                <rect x="5" y="5" width="180" height="100" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
                <text x="15" y="25" fill="#94a3b8" fontSize="9" fontFamily="monospace">{'<input'}</text>
                <text x="30" y="39" fill="#f59e0b" fontSize="9" fontFamily="monospace">{'id="email"'}</text>
                <text x="30" y="53" fill="#a78bfa" fontSize="9" fontFamily="monospace">{'name="user-email"'}</text>
                <text x="30" y="67" fill="#34d399" fontSize="9" fontFamily="monospace">{'class="form-input"'}</text>
                <text x="30" y="81" fill="#38bdf8" fontSize="9" fontFamily="monospace">{'type="email"'}</text>
                <text x="15" y="95" fill="#94a3b8" fontSize="9" fontFamily="monospace">{'/>'}</text>
                {/* Scan line */}
                <rect x="5" y="5" width="4" height="100" rx="2" fill="#6366f1" opacity=".4" className="slS"/>
                {/* Locator options */}
                <rect x="200" y="5" width="115" height="20" rx="4" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" className="slP"/>
                <text x="258" y="18" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">By.id("email") ★</text>
                <rect x="200" y="32" width="115" height="20" rx="4" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1"/>
                <text x="258" y="45" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">By.name("user-email")</text>
                <rect x="200" y="59" width="115" height="20" rx="4" fill="#1e1b4b" stroke="#34d399" strokeWidth="1"/>
                <text x="258" y="72" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace">By.cssSelector(".form-input")</text>
                <rect x="200" y="86" width="115" height="20" rx="4" fill="#1e1b4b" stroke="#ef4444" strokeWidth="1"/>
                <text x="258" y="99" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">By.xpath("//input[...]")</text>
                <text x="5" y="120" fill="#64748b" fontSize="8" fontFamily="sans-serif">★ By.id = fastest (unique HTML attribute)</text>
                <text x="5" y="135" fill="#64748b" fontSize="8" fontFamily="sans-serif">CSS = concise; XPath = powerful but brittle</text>
                <text x="160" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Choose stable locators → tests survive UI refactors</text>
            </svg>
        ),
        // ── PLAYWRIGHT ────────────────────────────────────────────────────────────
        'playwright-autowait': (
            <svg viewBox="0 0 320 170" style={{ width: '100%', maxWidth: '320px', height: '170px' }} aria-label="Playwright Auto-Wait">
                <style>{`
                    @keyframes pawLoad{0%{width:0}60%{width:100px}100%{width:100px}}
                    @keyframes pawElem{0%,50%{opacity:0;transform:translateY(-5px)}70%,100%{opacity:1;transform:translateY(0)}}
                    @keyframes pawAct{0%,65%{opacity:0}80%,100%{opacity:1}}
                    @keyframes pawCheck{0%,75%{opacity:0;r:3}90%,100%{opacity:1;r:8}}
                    .pawL{animation:pawLoad 3s ease-out infinite}
                    .pawEl{animation:pawElem 3s ease-out infinite}
                    .pawAct{animation:pawAct 3s ease-out infinite}
                    .pawCh{animation:pawCheck 3s ease-out infinite}
                `}</style>
                {/* Page loading */}
                <rect x="10" y="10" width="300" height="50" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
                <text x="20" y="28" fill="#94a3b8" fontSize="9" fontFamily="monospace">page loading...</text>
                <rect x="20" y="34" width="100" height="8" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
                <rect x="20" y="34" width="0" height="8" rx="3" fill="#6366f1" className="pawL"/>
                {/* Button appears */}
                <rect x="80" y="70" width="160" height="28" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="pawEl"/>
                <text x="160" y="88" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace" className="pawEl">Button is visible</text>
                {/* Auto-wait label */}
                <text x="10" y="115" fill="#f59e0b" fontSize="9" fontFamily="sans-serif" className="pawAct">⏳ Playwright auto-waited for element to be actionable</text>
                {/* Click action */}
                <rect x="90" y="125" width="140" height="24" rx="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" className="pawAct"/>
                <text x="160" y="141" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace" className="pawAct">await button.click()</text>
                {/* Success */}
                <circle cx="160" cy="158" r="3" fill="#34d399" className="pawCh"/>
                <text x="175" y="163" fill="#34d399" fontSize="8" fontFamily="sans-serif" className="pawCh">No explicit wait needed!</text>
                <text x="160" y="168" textAnchor="middle" fill="#64748b" fontSize="0" fontFamily="sans-serif"/>
            </svg>
        ),
        'playwright-locator': (
            <svg viewBox="0 0 320 170" style={{ width: '100%', maxWidth: '320px', height: '170px' }} aria-label="Playwright Locator vs Selenium">
                <style>{`
                    @keyframes plFade{0%,100%{opacity:.6}50%{opacity:1}}
                    @keyframes plArrow{0%{stroke-dashoffset:80}100%{stroke-dashoffset:0}}
                    .plF{animation:plFade 2.5s ease-in-out infinite}
                    .plArr{stroke-dasharray:80;animation:plArrow 2s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="plH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#38bdf8"/></marker>
                </defs>
                {/* Playwright column */}
                <text x="80" y="18" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Playwright</text>
                {[
                    ['getByRole("button")', '#a78bfa', 'ARIA — no ID needed'],
                    ['getByLabel("Email")', '#34d399', 'form label association'],
                    ['getByText("Submit")', '#f59e0b', 'visible text content'],
                    ['getByTestId("btn")', '#38bdf8', 'data-testid attribute'],
                ].map(([code, col, hint], i) => (
                    <g key={i}>
                        <rect x="4" y={26+i*32} width="152" height="24" rx="5" fill="#0f172a" stroke={col} strokeWidth="1.5" className="plF"/>
                        <text x="80" y={41+i*32} textAnchor="middle" fill={col} fontSize="8" fontFamily="monospace">{code}</text>
                        <text x="80" y={47+i*32} textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="sans-serif">{hint}</text>
                    </g>
                ))}
                {/* Selenium column */}
                <text x="248" y="18" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Selenium</text>
                {[
                    ['By.id("btn")', '#f59e0b'],
                    ['By.xpath("//...")', '#ef4444'],
                    ['By.css(".cls")', '#a78bfa'],
                    ['By.name("x")', '#94a3b8'],
                ].map(([code, col], i) => (
                    <g key={i}>
                        <rect x="170" y={26+i*32} width="140" height="24" rx="5" fill="#0f172a" stroke={col} strokeWidth="1.5" className="plF"/>
                        <text x="240" y={42+i*32} textAnchor="middle" fill={col} fontSize="8" fontFamily="monospace">{code}</text>
                    </g>
                ))}
                <text x="160" y="165" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Playwright: semantic first; Selenium: attribute first</text>
            </svg>
        ),
        'playwright-network': (
            <svg viewBox="0 0 320 165" style={{ width: '100%', maxWidth: '320px', height: '165px' }} aria-label="Playwright Network Mock">
                <style>{`
                    @keyframes pnReq{0%{transform:translateX(-40px);opacity:0}20%{opacity:1;transform:translateX(0)}50%{transform:translateX(0);opacity:1}70%{transform:translateX(40px);opacity:0}100%{transform:translateX(40px);opacity:0}}
                    @keyframes pnInter{0%,15%{opacity:0}25%,75%{opacity:1}85%,100%{opacity:0}}
                    @keyframes pnMock{0%,40%{opacity:0}55%,100%{opacity:1}}
                    .pnR{animation:pnReq 3.5s ease-in-out infinite}
                    .pnI{animation:pnInter 3.5s ease-in-out infinite}
                    .pnM{animation:pnMock 3.5s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="pnH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#38bdf8"/></marker>
                    <marker id="pnH2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Test */}
                <rect x="4" y="40" width="65" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
                <text x="36" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace">Test</text>
                <text x="36" y="74" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">page.route()</text>
                {/* Request arrow */}
                <line x1="69" y1="62" x2="108" y2="62" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#pnH)" className="pnR"/>
                {/* Interceptor */}
                <rect x="108" y="30" width="100" height="65" rx="8" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" className="pnI"/>
                <text x="158" y="52" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">Interceptor</text>
                <text x="158" y="66" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">route.fulfill()</text>
                <text x="158" y="80" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="sans-serif">returns mock data</text>
                <text x="158" y="88" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="sans-serif">no real server</text>
                {/* Mock response arrow */}
                <line x1="108" y1="85" x2="72" y2="85" stroke="#34d399" strokeWidth="2" markerEnd="url(#pnH2)" className="pnM"/>
                {/* Real API (crossed) */}
                <rect x="235" y="40" width="80" height="45" rx="8" fill="#1a0808" stroke="#ef4444" strokeWidth="2" opacity=".6"/>
                <text x="275" y="60" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">Real API</text>
                <text x="275" y="74" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">skipped</text>
                <line x1="235" y1="40" x2="315" y2="85" stroke="#ef4444" strokeWidth="2" opacity=".5"/>
                <line x1="315" y1="40" x2="235" y2="85" stroke="#ef4444" strokeWidth="2" opacity=".5"/>
                <text x="160" y="130" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="sans-serif" className="pnM">✓ Mock response returned — real API not called</text>
                <text x="160" y="150" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">page.route() intercepts → test controls API responses</text>
            </svg>
        ),
        // ── PYTHON ────────────────────────────────────────────────────────────────
        'python-flow': (
            <svg viewBox="0 0 320 165" style={{ width: '100%', maxWidth: '320px', height: '165px' }} aria-label="Python Execution Flow">
                <style>{`
                    @keyframes pyFlow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
                    @keyframes pyBox{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    @keyframes pyHighlight{0%,30%{opacity:0}50%,80%{opacity:1}100%{opacity:0}}
                    .pyArr{stroke-dasharray:200;animation:pyFlow 3s linear infinite}
                    .pyB{animation:pyBox 2s ease-in-out infinite}
                    .pyHL{animation:pyHighlight 3s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="pyH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
                </defs>
                {/* Source .py file */}
                <rect x="4" y="40" width="70" height="50" rx="8" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="2" className="pyB"/>
                <text x="39" y="62" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold" fontFamily="monospace">test.py</text>
                <text x="39" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">source</text>
                {/* Arrow → Interpreter */}
                <line x1="74" y1="65" x2="114" y2="65" stroke="#f59e0b" strokeWidth="2" className="pyArr" markerEnd="url(#pyH)"/>
                {/* Python Interpreter */}
                <rect x="114" y="30" width="90" height="70" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
                <text x="159" y="52" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">CPython</text>
                <text x="159" y="66" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">Interpreter</text>
                <text x="159" y="80" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">bytecode</text>
                <text x="159" y="92" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">compile+run</text>
                {/* Arrow → Output */}
                <line x1="204" y1="65" x2="244" y2="65" stroke="#f59e0b" strokeWidth="2" className="pyArr" markerEnd="url(#pyH)"/>
                {/* Output */}
                <rect x="244" y="40" width="70" height="50" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
                <text x="279" y="60" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold" fontFamily="monospace">Output</text>
                <text x="279" y="74" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif">stdout</text>
                {/* Highlight line */}
                <rect x="4" y="108" width="310" height="24" rx="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" className="pyHL"/>
                <text x="160" y="123" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" className="pyHL">No compile step! Python interprets line by line</text>
                <text x="160" y="152" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java: compile → .class → JVM · Python: interpret directly</text>
            </svg>
        ),
        'python-indent': (
            <svg viewBox="0 0 300 170" style={{ width: '100%', maxWidth: '300px', height: '170px' }} aria-label="Python Indentation Structure">
                <style>{`
                    @keyframes piHL{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    @keyframes piBad{0%,30%{opacity:0}40%,60%{opacity:1}70%,100%{opacity:0}}
                    @keyframes piGood{0%,60%{opacity:0}70%,100%{opacity:1}}
                    .piB{animation:piHL 2s ease-in-out infinite}
                    .piBad{animation:piBad 4s ease-in-out infinite}
                    .piGood{animation:piGood 4s ease-in-out infinite}
                `}</style>
                {/* Good indentation */}
                <rect x="5" y="5" width="135" height="110" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="2"/>
                <text x="75" y="22" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="sans-serif">✓ Correct</text>
                <text x="15" y="40" fill="#60a5fa" fontSize="9" fontFamily="monospace">def test_login():</text>
                <rect x="15" y="48" width="2" height="30" fill="#6366f1" opacity=".6"/>
                <text x="25" y="62" fill="#a78bfa" fontSize="9" fontFamily="monospace">  driver = setup()</text>
                <text x="25" y="76" fill="#a78bfa" fontSize="9" fontFamily="monospace">  if logged_in:</text>
                <rect x="25" y="82" width="2" height="18" fill="#f59e0b" opacity=".6"/>
                <text x="35" y="96" fill="#fbbf24" fontSize="9" fontFamily="monospace">    assert True</text>
                <text x="15" y="108" fill="#22c55e" fontSize="8" fontFamily="sans-serif">4-space indent = block</text>
                {/* Bad indentation */}
                <rect x="155" y="5" width="140" height="110" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
                <text x="225" y="22" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="sans-serif">✗ IndentationError</text>
                <text x="165" y="40" fill="#60a5fa" fontSize="9" fontFamily="monospace">def test_login():</text>
                <text x="165" y="56" fill="#a78bfa" fontSize="9" fontFamily="monospace">  driver = setup()</text>
                <text x="162" y="72" fill="#ef4444" fontSize="9" fontFamily="monospace">   if logged_in:</text>
                <text x="295" y="72" fill="#ef4444" fontSize="8" fontFamily="sans-serif">←3sp!</text>
                <rect x="159" y="65" width="130" height="14" rx="2" fill="#ef4444" opacity=".1" className="piBad"/>
                <text x="165" y="88" fill="#fbbf24" fontSize="9" fontFamily="monospace">    assert True</text>
                <text x="165" y="108" fill="#ef4444" fontSize="8" fontFamily="sans-serif">3≠4 spaces → crash</text>
                <text x="150" y="135" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Python uses indentation instead of {`{ }`} braces</text>
                <text x="150" y="150" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Java: braces define blocks · Python: 4-space indent</text>
            </svg>
        ),
        'pytest-flow': (
            <svg viewBox="0 0 300 170" style={{ width: '100%', maxWidth: '300px', height: '170px' }} aria-label="pytest Lifecycle">
                <style>{`
                    @keyframes ptStep{0%{fill:#1e1b4b}16%{fill:#4f46e5}32%{fill:#1e1b4b}100%{fill:#1e1b4b}}
                    @keyframes ptArrow{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}
                    .ptS1{animation:ptStep 4s ease-in-out 0s infinite}
                    .ptS2{animation:ptStep 4s ease-in-out 0.8s infinite}
                    .ptS3{animation:ptStep 4s ease-in-out 1.6s infinite}
                    .ptS4{animation:ptStep 4s ease-in-out 2.4s infinite}
                    .ptS5{animation:ptStep 4s ease-in-out 3.2s infinite}
                    .ptArr{stroke-dasharray:60;animation:ptArrow 0.6s linear infinite}
                `}</style>
                <defs>
                    <marker id="ptH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#6366f1"/></marker>
                </defs>
                {[
                    { label: 'fixture\nsetup', sub: '@pytest.fixture', col: '#3b82f6', y: 10 },
                    { label: 'test\ncollect', sub: 'def test_*()', col: '#a78bfa', y: 46 },
                    { label: 'test\nrun', sub: 'assert / expect', col: '#f59e0b', y: 82 },
                    { label: 'pass /\nfail', sub: 'report', col: '#22c55e', y: 118 },
                    { label: 'teardown', sub: 'yield / finally', col: '#ef4444', y: 154 },
                ].map(({ label, sub, col, y }, i) => (
                    <g key={i}>
                        <rect x="10" y={y - 2} width="120" height="30" rx="6" fill="#1e1b4b" stroke={col} strokeWidth="2" className={`ptS${i+1}`}/>
                        <text x="70" y={y + 12} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold" fontFamily="monospace">{label.split('\n')[0]}</text>
                        <text x="70" y={y + 24} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">{sub}</text>
                        {i < 4 && <line x1="70" y1={y+28} x2="70" y2={y+44} stroke={col} strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#ptH)"/>}
                        <rect x="150" y={y} width="140" height="28" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                        <text x="220" y={y + 16} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">{['conftest.py', 'test_*.py discovery', 'run assertions', 'green/red report', 'cleanup resources'][i]}</text>
                    </g>
                ))}
            </svg>
        ),
        // ── GIT ──────────────────────────────────────────────────────────────────
        'git-flow': (
            <svg viewBox="0 0 320 160" style={{ width: '100%', maxWidth: '320px', height: '160px' }} aria-label="Git Push Pull Flow">
                <style>{`
                    @keyframes gfPush{0%{transform:translateX(0);opacity:1}40%{transform:translateX(80px);opacity:0}41%,100%{transform:translateX(0);opacity:1}}
                    @keyframes gfPull{0%,60%{transform:translateX(80px);opacity:0}100%{transform:translateX(0);opacity:1}}
                    @keyframes gfCommit{0%,20%{fill:#1e1b4b}30%,50%{fill:#4f46e5}60%,100%{fill:#1e1b4b}}
                    .gfPush{animation:gfPush 4s ease-in-out infinite}
                    .gfPull{animation:gfPull 4s ease-in-out 2s infinite}
                    .gfCom{animation:gfCommit 4s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="gfH1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#6366f1"/></marker>
                    <marker id="gfH2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Local repo */}
                <rect x="4" y="30" width="110" height="80" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
                <text x="59" y="52" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold" fontFamily="monospace">Local Repo</text>
                {[0,1,2].map(i => (
                    <rect key={i} x={18+i*18} y="62" width="14" height="14" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" className="gfCom"/>
                ))}
                <text x="59" y="92" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">git add + commit</text>
                <text x="59" y="104" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">Working tree</text>
                {/* Push arrow */}
                <line x1="114" y1="58" x2="200" y2="58" stroke="#6366f1" strokeWidth="2" markerEnd="url(#gfH1)" className="gfPush"/>
                <text x="157" y="52" textAnchor="middle" fill="#6366f1" fontSize="9" fontFamily="sans-serif">git push</text>
                {/* Pull arrow */}
                <line x1="200" y1="78" x2="114" y2="78" stroke="#34d399" strokeWidth="2" markerEnd="url(#gfH2)" className="gfPull"/>
                <text x="157" y="92" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="sans-serif">git pull</text>
                {/* Remote repo */}
                <rect x="200" y="30" width="115" height="80" rx="8" fill="#0c2240" stroke="#38bdf8" strokeWidth="2"/>
                <text x="258" y="52" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">Remote Repo</text>
                <text x="258" y="68" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">GitHub / GitLab</text>
                <text x="258" y="82" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">origin/main</text>
                <text x="258" y="96" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">CI/CD triggers</text>
                <text x="160" y="135" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">git fetch = download only · git pull = fetch + merge</text>
                <text x="160" y="150" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Always pull before push to avoid conflicts</text>
            </svg>
        ),
        'git-branch': (
            <svg viewBox="0 0 300 165" style={{ width: '100%', maxWidth: '300px', height: '165px' }} aria-label="Git Branch and Merge">
                <style>{`
                    @keyframes gbCommit{0%{r:0;opacity:0}30%,100%{r:8;opacity:1}}
                    @keyframes gbMerge{0%,70%{opacity:0}90%,100%{opacity:1}}
                    @keyframes gbLabel{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    .gbC1{animation:gbCommit 3s ease-out 0.2s infinite}
                    .gbC2{animation:gbCommit 3s ease-out 0.7s infinite}
                    .gbC3{animation:gbCommit 3s ease-out 1.2s infinite}
                    .gbFeat{animation:gbCommit 3s ease-out 1.8s infinite}
                    .gbMerge{animation:gbMerge 3s ease-out infinite}
                    .gbLab{animation:gbLabel 2s ease-in-out infinite}
                `}</style>
                {/* main branch line */}
                <line x1="20" y1="60" x2="280" y2="60" stroke="#6366f1" strokeWidth="2.5"/>
                <text x="5" y="64" fill="#a78bfa" fontSize="10" fontWeight="bold" fontFamily="monospace">main</text>
                {/* Commits on main */}
                <circle cx="50" cy="60" r="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="gbC1"/>
                <circle cx="90" cy="60" r="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="gbC2"/>
                {/* Feature branch fork */}
                <path d="M130 60 C 145 60 145 110 160 110" fill="none" stroke="#f59e0b" strokeWidth="2"/>
                <line x1="160" y1="110" x2="230" y2="110" stroke="#f59e0b" strokeWidth="2.5"/>
                <text x="155" y="130" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">feature/login</text>
                {/* Commits on feature */}
                <circle cx="170" cy="110" r="8" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" className="gbC3"/>
                <circle cx="210" cy="110" r="8" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" className="gbFeat"/>
                {/* Merge back */}
                <path d="M230 110 C 245 110 245 60 260 60" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="5,3"/>
                <circle cx="260" cy="60" r="9" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" className="gbMerge"/>
                <text x="260" y="64" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="monospace" className="gbMerge">M</text>
                <text x="150" y="152" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Branch off main → add commits → merge PR</text>
                <text x="150" y="164" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Never commit directly to main in a team</text>
            </svg>
        ),
        // ── SQL ──────────────────────────────────────────────────────────────────
        'sql-join': (
            <svg viewBox="0 0 320 170" style={{ width: '100%', maxWidth: '320px', height: '170px' }} aria-label="SQL JOIN Visualization">
                <style>{`
                    @keyframes sjPulse{0%,100%{opacity:.5}50%{opacity:1}}
                    @keyframes sjMatch{0%,30%{fill:#1e1b4b}50%,70%{fill:#064e3b}100%{fill:#1e1b4b}}
                    .sjP{animation:sjPulse 2s ease-in-out infinite}
                    .sjM{animation:sjMatch 3s ease-in-out infinite}
                `}</style>
                {/* Left table */}
                <text x="5" y="16" fill="#60a5fa" fontSize="10" fontWeight="bold" fontFamily="monospace">users</text>
                {[['1','Alice'],['2','Bob'],['3','Carol']].map(([id, name], i) => (
                    <g key={i}>
                        <rect x="5" y={22+i*24} width="35" height="20" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" className={i<2?'sjM':'sjP'}/>
                        <text x="22" y={36+i*24} textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">{id}</text>
                        <rect x="42" y={22+i*24} width="60" height="20" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" className={i<2?'sjM':'sjP'}/>
                        <text x="72" y={36+i*24} textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="monospace">{name}</text>
                    </g>
                ))}
                {/* Right table */}
                <text x="175" y="16" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">orders</text>
                {[['1','Laptop'],['1','Mouse'],['2','Screen']].map(([uid, item], i) => (
                    <g key={i}>
                        <rect x="175" y={22+i*24} width="35" height="20" rx="3" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" className={i<2?'sjM':'sjP'}/>
                        <text x="192" y={36+i*24} textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">{uid}</text>
                        <rect x="212" y={22+i*24} width="65" height="20" rx="3" fill="#1c1917" stroke="#f59e0b" strokeWidth="1" className={i<2?'sjM':'sjP'}/>
                        <text x="244" y={36+i*24} textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="monospace">{item}</text>
                    </g>
                ))}
                {/* Join lines */}
                <line x1="104" y1="32" x2="172" y2="32" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4,3" className="sjM"/>
                <line x1="104" y1="56" x2="172" y2="56" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4,3" className="sjM"/>
                <line x1="104" y1="56" x2="172" y2="32" stroke="#34d399" strokeWidth="1" strokeDasharray="2,4" opacity=".4" className="sjM"/>
                <text x="138" y="44" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="sans-serif">ON users.id</text>
                <text x="138" y="54" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="sans-serif">= orders.user_id</text>
                {/* Result */}
                <text x="160" y="105" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">INNER JOIN result</text>
                <rect x="10" y="112" width="295" height="18" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1"/>
                <text x="158" y="125" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="monospace">Alice|Laptop · Alice|Mouse · Bob|Screen</text>
                <text x="160" y="150" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">INNER JOIN = only rows with a match in BOTH tables</text>
                <text x="160" y="163" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Carol has no orders → excluded from INNER JOIN</text>
            </svg>
        ),
        'sql-select': (
            <svg viewBox="0 0 310 165" style={{ width: '100%', maxWidth: '310px', height: '165px' }} aria-label="SQL Query Execution Order">
                <style>{`
                    @keyframes ssStep{0%{fill:#1e1b4b}14%{fill:#4f46e5}28%{fill:#1e1b4b}100%{fill:#1e1b4b}}
                    .ssS1{animation:ssStep 5s ease-in-out 0s infinite}
                    .ssS2{animation:ssStep 5s ease-in-out 0.7s infinite}
                    .ssS3{animation:ssStep 5s ease-in-out 1.4s infinite}
                    .ssS4{animation:ssStep 5s ease-in-out 2.1s infinite}
                    .ssS5{animation:ssStep 5s ease-in-out 2.8s infinite}
                    .ssS6{animation:ssStep 5s ease-in-out 3.5s infinite}
                `}</style>
                <text x="155" y="14" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="sans-serif">SQL Execution Order (vs Write Order)</text>
                {[
                    ['1', 'FROM', 'pick table(s)', '#3b82f6', 'ssS1'],
                    ['2', 'WHERE', 'filter rows', '#a78bfa', 'ssS2'],
                    ['3', 'GROUP BY', 'bucket rows', '#f59e0b', 'ssS3'],
                    ['4', 'HAVING', 'filter buckets', '#f97316', 'ssS4'],
                    ['5', 'SELECT', 'pick columns', '#34d399', 'ssS5'],
                    ['6', 'ORDER BY', 'sort result', '#38bdf8', 'ssS6'],
                ].map(({ 0: num, 1: kw, 2: desc, 3: col, 4: cls }, i) => (
                    <g key={i}>
                        <rect x="10" y={22+i*22} width="22" height="18" rx="4" fill="#0f172a" stroke={col} strokeWidth="2" className={cls}/>
                        <text x="21" y={35+i*22} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold" fontFamily="monospace">{num}</text>
                        <rect x="36" y={22+i*22} width="80" height="18" rx="4" fill="#1e1b4b" stroke={col} strokeWidth="1.5" className={cls}/>
                        <text x="76" y={35+i*22} textAnchor="middle" fill={col} fontSize="9" fontWeight="bold" fontFamily="monospace">{kw}</text>
                        <text x="126" y={35+i*22} fill="#94a3b8" fontSize="9" fontFamily="sans-serif">{desc}</text>
                    </g>
                ))}
                <text x="155" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">You write SELECT first, but FROM runs first!</text>
            </svg>
        ),
        // ── DOCKER ────────────────────────────────────────────────────────────────
        'docker-build': (
            <svg viewBox="0 0 310 170" style={{ width: '100%', maxWidth: '310px', height: '170px' }} aria-label="Docker Build Flow">
                <style>{`
                    @keyframes dbLayer{0%{opacity:0;transform:translateY(8px)}30%,80%{opacity:1;transform:translateY(0)}100%{opacity:0}}
                    @keyframes dbPulse{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    @keyframes dbRun{0%,60%{opacity:0}75%,100%{opacity:1}}
                    .dbL1{animation:dbLayer 4s ease-out 0.2s infinite}
                    .dbL2{animation:dbLayer 4s ease-out 0.7s infinite}
                    .dbL3{animation:dbLayer 4s ease-out 1.2s infinite}
                    .dbL4{animation:dbLayer 4s ease-out 1.7s infinite}
                    .dbP{animation:dbPulse 2s ease-in-out infinite}
                    .dbR{animation:dbRun 4s ease-out infinite}
                `}</style>
                <defs>
                    <marker id="dbH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#38bdf8"/></marker>
                </defs>
                {/* Dockerfile */}
                <rect x="4" y="25" width="70" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="dbP"/>
                <text x="39" y="44" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace">Dockerfile</text>
                <text x="14" y="60" fill="#64748b" fontSize="8" fontFamily="monospace">FROM node</text>
                <text x="14" y="73" fill="#64748b" fontSize="8" fontFamily="monospace">COPY . .</text>
                <text x="14" y="86" fill="#64748b" fontSize="8" fontFamily="monospace">RUN npm i</text>
                <text x="14" y="99" fill="#64748b" fontSize="8" fontFamily="monospace">CMD start</text>
                {/* Build arrow */}
                <line x1="74" y1="70" x2="112" y2="70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#dbH)"/>
                <text x="93" y="64" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="sans-serif">docker build</text>
                {/* Image layers */}
                <text x="160" y="16" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Image (layers)</text>
                {[
                    ['node:18 base', '#1e293b', '#6366f1'],
                    ['COPY app files', '#1e293b', '#a78bfa'],
                    ['npm install', '#1e293b', '#38bdf8'],
                    ['CMD startup', '#064e3b', '#34d399'],
                ].map(([label, bg, col], i) => (
                    <rect key={i} x="112" y={20+i*22} width="96" height="18" rx="4" fill={bg} stroke={col} strokeWidth="1.5" className={`dbL${i+1}`}>
                        <title>{label}</title>
                    </rect>
                ))}
                {[
                    ['node:18 base', '#a78bfa'],
                    ['COPY app files', '#a78bfa'],
                    ['npm install', '#38bdf8'],
                    ['CMD startup', '#34d399'],
                ].map(([label, col], i) => (
                    <text key={i} x="160" y={33+i*22} textAnchor="middle" fill={col} fontSize="8" fontFamily="monospace" className={`dbL${i+1}`}>{label}</text>
                ))}
                {/* Run arrow */}
                <line x1="208" y1="70" x2="244" y2="70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#dbH)"/>
                <text x="226" y="64" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="sans-serif">docker run</text>
                {/* Container */}
                <rect x="244" y="30" width="62" height="80" rx="8" fill="#0c2240" stroke="#38bdf8" strokeWidth="2" className="dbR"/>
                <text x="275" y="50" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">Container</text>
                <text x="275" y="65" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">isolated</text>
                <text x="275" y="78" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">process</text>
                <text x="275" y="93" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="sans-serif">running!</text>
                <text x="155" y="140" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Each RUN/COPY creates a cached layer</text>
                <text x="155" y="155" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Unchanged layers reuse cache → fast rebuilds</text>
            </svg>
        ),
        // ── LINUX ─────────────────────────────────────────────────────────────────
        'linux-pipe': (
            <svg viewBox="0 0 320 165" style={{ width: '100%', maxWidth: '320px', height: '165px' }} aria-label="Linux Pipe and Redirect">
                <style>{`
                    @keyframes lpFlow{0%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}
                    @keyframes lpData{0%{opacity:0;transform:translateX(-10px)}30%,70%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(10px)}}
                    .lpArr{stroke-dasharray:100;animation:lpFlow 1.5s linear infinite}
                    .lpD{animation:lpData 2s ease-in-out infinite}
                    .lpD2{animation:lpData 2s ease-in-out 0.5s infinite}
                    .lpD3{animation:lpData 2s ease-in-out 1s infinite}
                `}</style>
                <defs>
                    <marker id="lpH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
                    <marker id="lpH2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Command 1: cat */}
                <rect x="4" y="30" width="72" height="34" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
                <text x="40" y="47" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">cat log</text>
                <text x="40" y="58" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">all lines</text>
                {/* Pipe → grep */}
                <line x1="76" y1="47" x2="108" y2="47" stroke="#f59e0b" strokeWidth="2.5" className="lpArr" markerEnd="url(#lpH)"/>
                <text x="92" y="42" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="sans-serif">|</text>
                {/* Command 2: grep */}
                <rect x="108" y="30" width="80" height="34" rx="6" fill="#1c1917" stroke="#f59e0b" strokeWidth="2"/>
                <text x="148" y="47" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">grep ERROR</text>
                <text x="148" y="58" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">filter lines</text>
                {/* Pipe → sort */}
                <line x1="188" y1="47" x2="218" y2="47" stroke="#f59e0b" strokeWidth="2.5" className="lpArr" markerEnd="url(#lpH)"/>
                <text x="203" y="42" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="sans-serif">|</text>
                {/* Command 3: wc */}
                <rect x="218" y="30" width="80" height="34" rx="6" fill="#0c2240" stroke="#38bdf8" strokeWidth="2"/>
                <text x="258" y="47" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">wc -l</text>
                <text x="258" y="58" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">count lines</text>
                {/* Data packets flowing */}
                <text x="92" y="76" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace" className="lpD">1000 lines →</text>
                <text x="203" y="76" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" className="lpD2">42 errors →</text>
                <text x="285" y="76" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" className="lpD3">42</text>
                {/* Redirect section */}
                <text x="5" y="100" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Redirection:</text>
                <rect x="5" y="108" width="300" height="18" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <text x="10" y="121" fill="#22c55e" fontSize="9" fontFamily="monospace">cat log | grep ERROR {'>'} errors.txt</text>
                <text x="5" y="143" fill="#64748b" fontSize="9" fontFamily="sans-serif">{'>'} overwrites · {'>>'} appends · {'<'} reads from file</text>
                <text x="160" y="160" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">stdout of command feeds into stdin of next</text>
            </svg>
        ),
        // ── TYPESCRIPT ────────────────────────────────────────────────────────────
        'ts-typecheck': (
            <svg viewBox="0 0 310 165" style={{ width: '100%', maxWidth: '310px', height: '165px' }} aria-label="TypeScript Type Checking">
                <style>{`
                    @keyframes tsError{0%,30%{opacity:1}50%,70%{opacity:.2}90%,100%{opacity:1}}
                    @keyframes tsFix{0%,50%{opacity:0}70%,100%{opacity:1}}
                    @keyframes tsCompile{0%,60%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}
                    .tsErr{animation:tsError 4s ease-in-out infinite}
                    .tsFix{animation:tsFix 4s ease-in-out infinite}
                    .tsComp{stroke-dasharray:100;animation:tsCompile 4s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="tsH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Wrong code */}
                <rect x="4" y="10" width="135" height="75" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" className="tsErr"/>
                <text x="70" y="28" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="sans-serif" className="tsErr">❌ Type Error</text>
                <text x="14" y="44" fill="#fca5a5" fontSize="8" fontFamily="monospace" className="tsErr">let age: number = 25</text>
                <text x="14" y="58" fill="#ef4444" fontSize="8" fontFamily="monospace" className="tsErr">age = "twenty"  ← error!</text>
                <text x="14" y="72" fill="#fca5a5" fontSize="8" fontFamily="sans-serif" className="tsErr">Type 'string' not assignable</text>
                {/* Fixed code */}
                <rect x="170" y="10" width="135" height="75" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="tsFix"/>
                <text x="237" y="28" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="sans-serif" className="tsFix">✅ Type Safe</text>
                <text x="180" y="44" fill="#6ee7b7" fontSize="8" fontFamily="monospace" className="tsFix">let age: number = 25</text>
                <text x="180" y="58" fill="#34d399" fontSize="8" fontFamily="monospace" className="tsFix">age = 26  ✓ number ok</text>
                <text x="180" y="72" fill="#6ee7b7" fontSize="8" fontFamily="sans-serif" className="tsFix">tsc compiles cleanly</text>
                {/* Compile arrow */}
                <line x1="152" y1="48" x2="168" y2="48" stroke="#34d399" strokeWidth="2" className="tsComp" markerEnd="url(#tsH)"/>
                <text x="160" y="44" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="sans-serif">fix</text>
                {/* Bottom section */}
                <rect x="4" y="100" width="300" height="30" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                <text x="12" y="113" fill="#38bdf8" fontSize="8" fontFamily="monospace">tsc → compiles to JavaScript → Node.js / browser runs it</text>
                <text x="12" y="126" fill="#64748b" fontSize="8" fontFamily="sans-serif">Java: javac at compile time · TS: tsc catches errors BEFORE runtime</text>
                <text x="155" y="155" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">TypeScript = JavaScript + static types (like Java, but optional)</text>
            </svg>
        ),
        // ── CYPRESS ──────────────────────────────────────────────────────────────
        'cypress-retry': (
            <svg viewBox="0 0 300 165" style={{ width: '100%', maxWidth: '300px', height: '165px' }} aria-label="Cypress Retry Mechanism">
                <style>{`
                    @keyframes crPoll{0%{stroke-dashoffset:80}100%{stroke-dashoffset:0}}
                    @keyframes crElem{0%,55%{opacity:0}70%,100%{opacity:1}}
                    @keyframes crPass{0%,75%{opacity:0}90%,100%{opacity:1}}
                    @keyframes crWait{0%,100%{fill:#1e1b4b}50%{fill:#1e293b}}
                    .crArr{stroke-dasharray:80;animation:crPoll 0.8s linear infinite}
                    .crEl{animation:crElem 4s ease-out infinite}
                    .crPass{animation:crPass 4s ease-out infinite}
                    .crW{animation:crWait 2s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="crH" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker>
                    <marker id="crH2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Cypress command */}
                <rect x="4" y="25" width="130" height="35" rx="7" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2"/>
                <text x="69" y="42" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace">cy.get('.button')</text>
                <text x="69" y="54" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">.should('be.visible')</text>
                {/* Polling arrows */}
                {[0,1,2].map(i => (
                    <g key={i}>
                        <line x1="134" y1={35+i*14} x2="170" y2={35+i*14} stroke="#f59e0b" strokeWidth="1.5" className="crArr" markerEnd="url(#crH)"/>
                        <text x="158" y={32+i*14} textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="sans-serif">poll {i+1}</text>
                    </g>
                ))}
                {/* DOM state */}
                <rect x="170" y="10" width="120" height="90" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5"/>
                <text x="230" y="26" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">DOM</text>
                <text x="230" y="42" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="sans-serif">not found yet...</text>
                <text x="230" y="56" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="sans-serif">loading...</text>
                <rect x="185" y="64" width="90" height="22" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" className="crEl"/>
                <text x="230" y="79" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace" className="crEl">.button ← visible!</text>
                {/* Success */}
                <line x1="170" y1="75" x2="136" y2="55" stroke="#34d399" strokeWidth="2" markerEnd="url(#crH2)" className="crPass"/>
                <rect x="4" y="115" width="290" height="18" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="1" className="crPass"/>
                <text x="149" y="128" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace" className="crPass">✅ Assertion passed on attempt 3</text>
                <text x="150" y="152" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Cypress retries up to 4s — no manual wait needed</text>
            </svg>
        ),
        // ── POSTMAN ───────────────────────────────────────────────────────────────
        'postman-flow': (
            <svg viewBox="0 0 310 165" style={{ width: '100%', maxWidth: '310px', height: '165px' }} aria-label="Postman Request/Response Flow">
                <style>{`
                    @keyframes pmSend{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
                    @keyframes pmResp{0%{stroke-dashoffset:120}100%{stroke-dashoffset:0}}
                    @keyframes pmStatus{0%,60%{opacity:0}75%,100%{opacity:1}}
                    .pmS{stroke-dasharray:120;animation:pmSend 2s ease-in-out infinite}
                    .pmR{stroke-dasharray:120;animation:pmResp 2s ease-in-out 1s infinite}
                    .pmSt{animation:pmStatus 3s ease-in-out infinite}
                `}</style>
                <defs>
                    <marker id="pmH1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f97316"/></marker>
                    <marker id="pmH2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#34d399"/></marker>
                </defs>
                {/* Postman client */}
                <rect x="4" y="30" width="90" height="90" rx="8" fill="#1c1917" stroke="#f97316" strokeWidth="2"/>
                <text x="49" y="52" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Postman</text>
                <text x="49" y="66" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">GET /users</text>
                <text x="49" y="78" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">Pre-request</text>
                <text x="49" y="90" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">scripts run</text>
                <text x="49" y="102" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">here first</text>
                {/* Request arrow */}
                <line x1="94" y1="55" x2="170" y2="55" stroke="#f97316" strokeWidth="2" className="pmS" markerEnd="url(#pmH1)"/>
                <text x="132" y="50" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="sans-serif">HTTP Request</text>
                {/* Server */}
                <rect x="170" y="30" width="90" height="90" rx="8" fill="#0c2240" stroke="#38bdf8" strokeWidth="2"/>
                <text x="215" y="52" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">API Server</text>
                <text x="215" y="68" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">processes</text>
                <text x="215" y="80" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">request</text>
                <text x="215" y="94" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">200 OK</text>
                {/* Response arrow */}
                <line x1="170" y1="80" x2="94" y2="80" stroke="#34d399" strokeWidth="2" className="pmR" markerEnd="url(#pmH2)"/>
                <text x="132" y="76" textAnchor="middle" fill="#34d399" fontSize="8" fontFamily="sans-serif">JSON response</text>
                {/* Test script */}
                <rect x="265" y="30" width="42" height="90" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" className="pmSt"/>
                <text x="286" y="55" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="bold" fontFamily="sans-serif" className="pmSt">Test</text>
                <text x="286" y="67" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="sans-serif" className="pmSt">Script</text>
                <text x="286" y="80" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontFamily="monospace" className="pmSt">pm</text>
                <text x="286" y="92" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontFamily="monospace" className="pmSt">.test()</text>
                <text x="155" y="140" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">Pre-request → send → response → Test scripts run</text>
                <text x="155" y="155" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="sans-serif">pm.environment.set() stores variables for next request</text>
            </svg>
        ),
        default: (
            <svg viewBox="0 0 200 100" style={{ width: '100%', maxWidth: '200px', height: '100px' }} aria-label="JS Animation">
                <style>{`@keyframes dfPulse{0%,100%{fill:#4f46e5}50%{fill:#7c3aed}}.dfP{animation:dfPulse 2s ease-in-out infinite}`}</style>
                <text x="100" y="55" textAnchor="middle" fill="#f59e0b" fontSize="36" className="dfP">🟨</text>
                <text x="100" y="80" textAnchor="middle" fill="#6366f1" fontSize="12" fontFamily="sans-serif">JavaScript</text>
            </svg>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 0' }}>
            {label && (
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'sans-serif', textAlign: 'center', marginBottom: '4px' }}>
                    {label}
                </div>
            )}
            {animations[kind] || animations.default}
        </div>
    )
}
