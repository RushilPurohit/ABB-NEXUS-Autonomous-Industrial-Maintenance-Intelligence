import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bot, Search, BrainCircuit, Activity, BarChart3,
  Database, Zap, ShieldCheck, GitBranch, FileSearch, ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Document Q&A',
    desc: 'Instantly find answers across thousands of pages of unstructured technical manuals with precise, page-level citations.',
    badge: 'RAG + Vision',
  },
  {
    icon: Activity,
    color: 'text-primary',
    bg: 'bg-red-50',
    title: 'Sensor Diagnostics',
    desc: 'Upload CSV telemetry and let predictive models identify anomalies, forecast failures, and generate technician action plans.',
    badge: 'XGBoost · LSTM',
  },
  {
    icon: GitBranch,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Knowledge Graphs',
    desc: 'Connect faults, components, and procedures visually to trace root causes across your entire facility instantly.',
    badge: 'Neo4j · GNN',
  },
];

const models = [
  { icon: Database, name: 'Qwen2.5-VL', desc: 'Multimodal OCR & layout understanding' },
  { icon: Search, name: 'ColPali', desc: 'Vision-based multimodal retrieval' },
  { icon: Bot, name: 'Gemini Flash', desc: 'Grounded maintenance answer generation' },
  { icon: BarChart3, name: 'XGBoost', desc: 'Sensor anomaly & failure prediction' },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-slate-950/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-sm">ABB Nexus</span>
          <span className="text-slate-600 text-xs hidden md:block">Maintenance Intelligence Platform</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-400 hover:text-white text-sm transition-colors">Sign in</Link>
          <Link
            to="/dashboard"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            Launch <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-slate-950 text-white pt-14 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 15% 60%, rgba(204,0,0,0.3) 0%, transparent 45%),
                              radial-gradient(ellipse at 85% 30%, rgba(59,130,246,0.15) 0%, transparent 45%),
                              radial-gradient(ellipse at 50% 100%, rgba(100,116,139,0.1) 0%, transparent 50%)`,
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-28 md:py-36">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-semibold rounded-full">
              v2.0 — Now with multimodal vision
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight max-w-4xl">
            Industrial Maintenance<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400">
              Powered by AI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            A multimodal platform combining technical manuals, sensor telemetry, and knowledge graphs — giving technicians instant, grounded diagnostics and repair guidance.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/dashboard"
              className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm shadow-lg shadow-primary/30"
            >
              Launch Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-7 py-3.5 rounded-xl font-semibold transition-colors text-sm"
            >
              Sign In
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { value: '14+', label: 'Industrial Datasets' },
              { value: '4', label: 'AI Models' },
              { value: '94%+', label: 'Prediction Accuracy' },
              { value: '<2s', label: 'Response Time' },
            ].map(s => (
              <div key={s.label} className="bg-slate-900/60 border border-slate-800 rounded-xl px-5 py-4">
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Capabilities</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything a technician needs</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              From dense PDF manuals to real-time machine telemetry — one platform handles it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <div
                key={f.title}
                className="group border border-slate-200 rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-200 bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-50 -translate-y-12 translate-x-12 group-hover:bg-red-50/50 transition-colors" />
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-6 relative`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">{f.badge}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                <Link to="/dashboard" className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Powered by Industry-Leading AI</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Qwen2.5-VL', 'ColPali', 'Gemini Flash', 'XGBoost', 'Qdrant Vector DB', 'Neo4j Graph'].map(name => (
              <span key={name} className="text-sm font-semibold text-slate-400">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Under the Hood</p>
            <h2 className="text-3xl font-bold text-slate-900">Advanced AI Stack</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {models.map(m => (
              <div key={m.name} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-colors">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <m.icon className="w-5 h-5 text-slate-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{m.name}</h4>
                <p className="text-sm text-slate-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Ready to reduce downtime?</h2>
          <p className="text-slate-400 mb-8">Get started with the demo — no setup required.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-colors text-sm shadow-lg shadow-primary/30"
          >
            Launch Platform <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-slate-500 text-xs">ABB Nexus Maintenance Intelligence · v2.0</span>
        </div>
        <p className="text-slate-600 text-xs">© 2026 ABB Ltd. Built for the Hackathon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
