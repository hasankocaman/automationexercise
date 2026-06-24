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
