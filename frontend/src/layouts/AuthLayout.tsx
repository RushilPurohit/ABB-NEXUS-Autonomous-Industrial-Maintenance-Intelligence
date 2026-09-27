import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Brain, Zap } from 'lucide-react';

const features = [
  { icon: Brain, label: 'Multimodal AI', desc: 'Vision + language models for complex manual understanding' },
  { icon: BarChart3, label: 'Predictive Analytics', desc: 'XGBoost sensor models with 94%+ accuracy' },
  { icon: ShieldCheck, label: 'Grounded Answers', desc: 'Every response traceable to source document evidence' },
];

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(204,0,0,0.25) 0%, transparent 50%),
                              radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.15) 0%, transparent 50%)`,
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">ABB Nexus</p>
              <p className="text-slate-500 text-[11px]">Maintenance Intelligence</p>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Industrial AI for<br />
            <span className="text-primary">Predictive Maintenance</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Empower technicians with instant diagnostics from sensor telemetry, manuals, and knowledge graphs — all in one platform.
          </p>

          <div className="mt-10 space-y-5">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '14+', label: 'Datasets' },
            { value: '99.2%', label: 'Uptime' },
            { value: '4', label: 'AI Models' },
          ].map(s => (
            <div key={s.label} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <p className="font-bold text-slate-900">ABB Nexus</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
