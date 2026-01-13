import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'API Glossary | ShipFreeAPIs',
  description: 'Learn essential API terminology. From REST to GraphQL, OAuth to Rate Limiting - understand the building blocks of modern web development.',
  keywords: ['API glossary', 'REST API', 'GraphQL', 'OAuth', 'API authentication', 'rate limiting', 'webhooks'],
};

const glossaryTerms = [
  {
    term: 'API',
    short: 'Application Programming Interface',
    definition: 'A set of rules that allows different software to communicate. Think of it as a waiter taking your order to the kitchen.',
    gradient: 'from-plum to-cyan-accent',
  },
  {
    term: 'REST',
    short: 'Representational State Transfer',
    definition: 'The most common API style. Uses HTTP methods like GET, POST, PUT, DELETE. Simple and everywhere.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    term: 'GraphQL',
    short: 'Query Language for APIs',
    definition: 'Ask for exactly what you need, nothing more. Invented by Facebook. Trendy and powerful.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    term: 'API Key',
    short: 'Your Secret Password',
    definition: 'A unique code that identifies your app. Keep it secret. Lose it = someone else uses your quota.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    term: 'OAuth',
    short: 'Open Authorization',
    definition: 'Log in with Google/GitHub without sharing passwords. Secure delegation of access.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    term: 'Rate Limiting',
    short: 'Speed Bumps for APIs',
    definition: 'Caps on how many requests you can make. 1000/day = 1000 requests max. Exceed = blocked.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    term: 'Webhook',
    short: 'Reverse API Call',
    definition: 'Instead of you asking, the API tells you when something happens. Push notifications for code.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    term: 'Endpoint',
    short: 'The URL You Hit',
    definition: 'Specific URLs for specific data. /users gets users. /posts gets posts. Simple routing.',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    term: 'JSON',
    short: 'JavaScript Object Notation',
    definition: 'The universal language of APIs. Data formatted as key-value pairs. Easy to read, easy to parse.',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    term: 'SDK',
    short: 'Software Development Kit',
    definition: 'Pre-built code to use an API. Saves you from writing boilerplate. npm install and go.',
    gradient: 'from-amber-500 to-orange-600',
  },
];

function GlossaryCard({ term, short, definition, gradient }: typeof glossaryTerms[0]) {
  return (
    <div className="group relative p-6 rounded-2xl bg-card/80 border border-card-border hover:border-plum/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
      
      {/* Term */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-plum-light transition-colors">
          {term}
        </h3>
        <CaretRight className="w-5 h-5 text-muted group-hover:text-plum-light group-hover:translate-x-1 transition-all" weight="bold" />
      </div>
      
      {/* Short description */}
      <p className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}>
        {short}
      </p>
      
      {/* Definition */}
      <p className="text-muted leading-relaxed">
        {definition}
      </p>
    </div>
  );
}

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_55%),linear-gradient(320deg,rgba(155,45,93,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" weight="bold" />
          <span>Back to ShipFreeAPIs</span>
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-plum/20 text-plum-light text-sm font-bold border border-plum/30">
            FREE RESOURCE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">API </span>
            <span className="text-cyan-300">Glossary</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            10 essential terms every developer should know. 
            No fluff. Just the basics.
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {glossaryTerms.map((item) => (
            <GlossaryCard key={item.term} {...item} />
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-plum/15 to-cyan-accent/10 border border-plum/30 text-center">
          <h2 className="text-2xl font-bold mb-4">Want the Full API Library?</h2>
          <p className="text-muted mb-6">
            52 verified free APIs, curated and categorized.
          </p>
          <Link 
            href="/#unlock"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-plum to-plum-dark text-white font-bold hover:shadow-lg hover:shadow-plum/30 transition-all hover:scale-105"
          >
            <span>Access Free APIs</span>
            <CaretRight className="w-4 h-4" weight="bold" />
          </Link>
        </div>
      </div>
    </main>
  );
}
