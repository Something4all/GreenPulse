import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  User, 
  Mail, 
  Lock, 
  Leaf, 
  ArrowRight,
  TrendingDown,
  Coins,
  BrainCircuit
} from 'lucide-react';

// 1. We removed the Firebase tools.
// We will now use standard network requests to interact with our custom Express backend.

interface LoginPageProps {
  onLogin: (userInfo: { name: string; email: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    // Requires at least one uppercase letter, one number, and minimum 8 characters
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- Validation (Checking if form inputs are correct) ---
    if (isSignUp && !name.trim()) {
      setError('Please provide a display name.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setError('Please provide a valid, well-formatted email address.');
      return;
    }
    if (isSignUp && !validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain an uppercase letter and a number.');
      return;
    } else if (!isSignUp && password.length < 1) {
       setError('Please enter your password.');
       return;
    }

    setIsSubmitting(true);

    try {
      // --- Secure Login/Signup Flow with Backend ---
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const bodyPayload = isSignUp 
        ? { name, email, password }
        : { email, password };

      // We send the email and password securely to our backend via an HTTP POST request.
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Network response was not ok');
      }

      // --- Handling the ID Token (JWT) ---
      // A JWT (JSON Web Token) is like a secure digital ID card. 
      // Once the user proves they know the password, the backend hands them this ID card.
      const idToken = data.token;
      
      // SAFE STORAGE: We use `sessionStorage` to hold onto the token securely. 
      sessionStorage.setItem('secure_session_jwt', idToken);
      
      // Finally, pass the user information upwards into our React application so the UI can update!
      onLogin({
        name: data.user.name,
        email: data.user.email
      });

    } catch (err: any) {
      console.error('Authentication Error:', err);
      // Display the error returned by the backend (like "Invalid email or password.")
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  }, [isSignUp, name, email, password, onLogin]);

  const handleTabSwitch = useCallback((isSignUpMode: boolean) => {
    setIsSignUp(isSignUpMode);
    setError('');
    if (isSignUpMode) {
      setEmail('');
      setPassword('');
      setName('');
    }
  }, []);

  return (
    <div id="login-container-page" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Interactive Background Elements */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a8e6cf] to-[#10b981] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10 items-center">
        
        {/* Left Side: Brand Value Proposition & Live Animation */}
        <section className="lg:col-span-6 space-y-8 text-left" aria-labelledby="brand-heading">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-light/75 border border-brand-green/20 rounded-full text-brand-green font-bold text-xs uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Verified Safe Environment</span>
            </div>
            
            <h1 id="brand-heading" className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-tight">
              A smarter way to build <span className="text-brand-green">green habits</span>
            </h1>
            <p className="text-sm text-brand-muted leading-relaxed font-medium">
              We translate climate metrics into real actions. Create an account to log personal commitments, monitor cumulative averted carbon, and track behavioral alignments securely.
            </p>
          </motion.div>

          {/* Core App Highlights */}
          <div className="space-y-4" role="list">
            {[
              { icon: <TrendingDown className="w-5 h-5 text-brand-green" aria-hidden="true" />, title: 'Micro-Incentive Driven', text: 'Strap immediate financial savings or time benefits directly into daily carbon nudges.' },
              { icon: <BrainCircuit className="w-5 h-5 text-brand-orange" aria-hidden="true" />, title: 'Privacy First Architecture', text: 'Your calculations and telemetry signals never touch central databases. Completely local.' },
              { icon: <Coins className="w-5 h-5 text-[#3b82f6]" aria-hidden="true" />, title: 'Verified Impact', text: 'Real user authentication directly connects your data so you never lose it.' }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                role="listitem"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex gap-3.5 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-brand-border/60 hover:shadow-xs transition-shadow"
              >
                <div className="p-2.5 bg-brand-light rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">{item.title}</h4>
                  <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Right Side: Animated Login / Sign Up Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 bg-white rounded-3xl border border-brand-border/80 shadow-lg p-6 sm:p-10 relative overflow-hidden"
          role="region"
          aria-labelledby="auth-form-title"
        >
          {/* Glassmorphic border glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-green/15 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" aria-hidden="true" />

          <h2 id="auth-form-title" className="sr-only">{isSignUp ? 'Create New Account' : 'Log In Profile'}</h2>

          {/* Form Top Navigation */}
          <div className="flex border-b border-brand-border mb-6" role="tablist">
            <button
              role="tab"
              aria-selected={!isSignUp}
              aria-controls="auth-form"
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-3 text-sm font-bold border-b-2 tracking-tight transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                !isSignUp 
                  ? 'border-brand-green text-brand-green' 
                  : 'border-transparent text-brand-muted hover:text-brand-dark'
              }`}
            >
              Log In Profile
            </button>
            <button
              role="tab"
              aria-selected={isSignUp}
              aria-controls="auth-form"
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-3 text-sm font-bold border-b-2 tracking-tight transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                isSignUp 
                  ? 'border-brand-green text-brand-green' 
                  : 'border-transparent text-brand-muted hover:text-brand-dark'
              }`}
            >
              Create New Account
            </button>
          </div>

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left" noValidate>
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  aria-live="assertive"
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label htmlFor="login-name" className="text-xs font-bold text-brand-dark block">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle" aria-hidden="true" />
                    <input
                      id="login-name"
                      type="text"
                      required
                      autoComplete="name"
                      aria-invalid={!name.trim() && !!error}
                      className="w-full bg-brand-light/30 border border-brand-border text-brand-dark rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green transition-all"
                      placeholder="Jane Cooper"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="login-email" className="text-xs font-bold text-brand-dark block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle" aria-hidden="true" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={!validateEmail(email) && !!error}
                    className="w-full bg-brand-light/30 border border-brand-border text-brand-dark rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green transition-all"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="login-password" className="text-xs font-bold text-brand-dark block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-subtle" aria-hidden="true" />
                  <input
                    id="login-password"
                    type="password"
                    required
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    aria-invalid={(!password || (isSignUp && !validatePassword(password))) && !!error}
                    className="w-full bg-brand-light/30 border border-brand-border text-brand-dark rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-green/35 focus:border-brand-green transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isSignUp && (
                   <p className="text-[10px] text-brand-muted mt-1 px-1">Must be at least 8 chars, 1 uppercase, 1 number.</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-dark text-white rounded-xl py-3 text-xs uppercase tracking-wider font-extrabold shadow hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin mr-1" aria-hidden="true">⌛</span>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create & Launch' : 'Enter Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>

          <footer className="mt-6 pt-5 border-t border-brand-border text-center">
            <span className="text-[10px] text-brand-subtle font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-green" aria-hidden="true" />
              <span>Real Accounts • Cloud Secured</span>
            </span>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
