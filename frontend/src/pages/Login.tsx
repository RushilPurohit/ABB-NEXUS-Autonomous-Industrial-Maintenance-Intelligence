import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Building2, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithSSO, signup, error, clearError } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('technician@abb.com');
  const [password, setPassword] = useState('••••••••');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalErr(null);
    clearError();

    try {
      let success = false;
      if (isSignUp) {
        success = await signup(name || 'ABB Technician', email, password);
      } else {
        success = await login(email, password);
      }

      if (success) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLocalErr(err.message || 'Authentication failed. Please check your credentials.');
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
      setLocalErr(err.message || 'SSO configuration is unavailable in this environment.');
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
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setLocalErr(null); clearError(); }}
            className={`pb-2.5 text-sm font-semibold transition-colors border-b-2 mr-6 ${
              !isSignUp ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setLocalErr(null); clearError(); }}
            className={`pb-2.5 text-sm font-semibold transition-colors border-b-2 ${
              isSignUp ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Create Account
          </button>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          {isSignUp ? 'Join ABB Nexus Workspace' : 'Welcome back'}
        </h2>
        <p className="text-sm text-slate-500">
          {isSignUp
            ? 'Register as an engineer to access multimodal maintenance tools.'
            : 'Sign in to your ABB Nexus account to continue.'}
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
        {/* Name (for Sign Up) */}
        {isSignUp && (
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
        )}

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Email address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="technician@abb.com"
              autoComplete="off"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Password
            </label>
            {!isSignUp && (
              <a href="#" className="text-xs text-primary hover:text-primary-dark font-medium">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="off"
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

        {/* Remember me */}
        {!isSignUp && (
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember"
              type="checkbox"
              defaultChecked
              className="w-3.5 h-3.5 accent-primary border-slate-300 rounded"
            />
            <label htmlFor="remember" className="text-xs text-slate-600">
              Keep me signed in for 30 days
            </label>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>{isSignUp ? 'Create Account' : 'Sign in'} <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-slate-400">or continue with</span>
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
          Continue with Corporate SSO (Demo Mode)
        </button>
      </form>

      {/* Demo notice */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex gap-2">
        <span className="text-amber-500 text-xs mt-0.5">ℹ</span>
        <p className="text-xs text-amber-700 leading-relaxed">
          <span className="font-semibold">Demo Authentication:</span> Click <strong>Sign In</strong> or <strong>Corporate SSO</strong> to test authenticated maintenance flows.
        </p>
      </div>
    </div>
  );
};

export default Login;
