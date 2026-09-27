import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff, User, AlertCircle, Building2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loginWithSSO, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('engineer@abb.com');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Field Maintenance Engineer');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalErr(null);
    clearError();

    try {
      const success = await signup(name || 'ABB Technician', email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLocalErr(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSSOClick = async () => {
    setLoading(true);
    setLocalErr(null);
    clearError();
    try {
      const success = await loginWithSSO();
      if (success) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLocalErr(err.message || 'SSO authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const displayError = localErr || error;

  return (
    <div className="w-full">
      {/* Header tab switch */}
      <div className="mb-6">
        <div className="flex border-b border-slate-200 mb-4">
          <Link
            to="/login"
            className="pb-2.5 text-sm font-semibold transition-colors border-b-2 mr-6 border-transparent text-slate-400 hover:text-slate-600"
          >
            Sign In
          </Link>
          <span className="pb-2.5 text-sm font-semibold transition-colors border-b-2 border-primary text-primary">
            Create Account
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Join ABB Nexus Platform
        </h2>
        <p className="text-sm text-slate-500">
          Register your technician profile for industrial maintenance intelligence access.
        </p>
      </div>

      {/* Error alert banner */}
      {displayError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{displayError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Alex Mercer"
              autoComplete="off"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Corporate Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="engineer@abb.com"
              autoComplete="off"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Engineering Role
          </label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-slate-800"
          >
            <option value="Field Maintenance Engineer">Field Maintenance Engineer</option>
            <option value="Reliability & Safety Lead">Reliability & Safety Lead</option>
            <option value="Robotics Technician">Robotics Technician</option>
            <option value="Plant Operations Manager">Plant Operations Manager</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Create Account <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-slate-400">or register with</span>
          </div>
        </div>

        {/* SSO Button */}
        <button
          type="button"
          onClick={handleSSOClick}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Building2 className="w-4 h-4 text-primary" />
          Register with Corporate SSO (Demo Mode)
        </button>
      </form>

      {/* Info notice */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 flex gap-2">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">ABB Nexus Workspaces</span> are encrypted end-to-end and integrated with ABB industrial maintenance standards.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
