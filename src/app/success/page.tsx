import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Confetti, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Welcome to Pro | ShipFreeAPIs',
  description: 'Your purchase was successful. Welcome to ShipFreeAPIs Pro!',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_55%),linear-gradient(320deg,rgba(155,45,93,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mb-8 shadow-2xl shadow-emerald-500/30">
          <CheckCircle className="w-12 h-12 text-white" weight="fill" />
        </div>

        {/* Confetti decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <Confetti className="w-40 h-40 text-cyan-400" weight="duotone" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-emerald-400">Welcome</span> to Pro!
        </h1>

        <p className="text-lg text-muted mb-8">
          Your payment was successful. You now have full access to all 52 APIs, 
          Claude skills, Cursor rules, and monthly drops.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-plum to-cyan-accent text-white font-bold hover:shadow-lg hover:shadow-plum/30 hover:scale-105 transition-all"
          >
            Explore Your APIs
            <ArrowRight weight="bold" />
          </Link>

          <p className="text-sm text-muted">
            Check your email for your receipt and onboarding details.
          </p>
        </div>
      </div>
    </main>
  );
}
