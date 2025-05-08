
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const Landing = () => {
  return (
    <div className="min-h-screen bg-crypto-bg-dark text-crypto-text-primary flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-blue-glow" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-left animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-crypto-accent-blue to-blue-400 bg-clip-text text-transparent mb-6">
                MobiusEngine.ai
              </h1>
              <p className="text-xl md:text-2xl text-crypto-text-primary mb-8">
                Next-generation AI platform for crypto market analysis and prediction
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-crypto-accent-blue hover:bg-crypto-accent-blue/80 flex items-center gap-2"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center animate-fade-in">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-crypto-accent-blue/20 rounded-full animate-pulse-blue" />
                <div className="absolute inset-8 bg-crypto-accent-blue/30 rounded-full animate-pulse-blue animation-delay-300" />
                <div className="absolute inset-16 bg-crypto-accent-blue/40 rounded-full animate-pulse-blue animation-delay-600" />
                <div className="absolute inset-24 bg-crypto-accent-blue/50 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">AI Crypto Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 md:px-8 py-16 bg-crypto-bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-accent-blue to-blue-400 bg-clip-text text-transparent">
            Powerful AI-Driven Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-crypto-bg-dark p-6 rounded-lg border border-crypto-accent-blue/20 hover:border-crypto-accent-blue/50 transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-crypto-accent-blue/20 flex items-center justify-center mb-4">
                  <span className="text-xl text-crypto-accent-blue">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-crypto-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-crypto-accent-blue to-blue-400 bg-clip-text text-transparent">
            Trusted by Crypto Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-crypto-bg-card p-6 rounded-lg border border-crypto-accent-blue/10"
              >
                <p className="mb-4 text-crypto-text-secondary italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-crypto-accent-blue/30" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-crypto-text-secondary">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-16 bg-gradient-to-r from-[#192841] to-[#1E40AF]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Crypto Analysis?
          </h2>
          <p className="text-lg mb-8 text-crypto-text-secondary">
            Join thousands of traders using MobiusEngine.ai for smarter, data-driven decisions.
          </p>
          <Link to="/">
            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-white/90"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Help Assistant Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full bg-crypto-accent-blue hover:bg-crypto-accent-blue/80 shadow-lg"
          onClick={() => window.open('/help', '_blank')}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

// Data
const features = [
  {
    icon: "🔍",
    title: "AI Market Analysis",
    description: "Advanced machine learning algorithms to identify market trends and opportunities."
  },
  {
    icon: "📊",
    title: "Predictive Modeling",
    description: "Forecast potential price movements with our proprietary prediction engine."
  },
  {
    icon: "⚡",
    title: "Real-time Alerts",
    description: "Instant notifications on significant market movements and opportunities."
  },
  {
    icon: "🔒",
    title: "Secure Data",
    description: "Enterprise-grade encryption and security for all your data and investments."
  },
  {
    icon: "📱",
    title: "Cross-platform",
    description: "Access your analysis and insights from any device, anywhere."
  },
  {
    icon: "🤝",
    title: "Community Insights",
    description: "Leverage the wisdom of our expert trader community and share strategies."
  }
];

const testimonials = [
  {
    quote: "MobiusEngine.ai has completely transformed how I approach crypto trading. The AI insights are incredibly accurate.",
    name: "Alex Chen",
    title: "Crypto Hedge Fund Manager"
  },
  {
    quote: "After using dozens of analytics platforms, nothing comes close to the precision and ease of use that MobiusEngine offers.",
    name: "Sarah Johnson",
    title: "Day Trader & Analyst"
  },
  {
    quote: "The predictive modeling alone has saved me from countless bad trades. This platform is a game-changer.",
    name: "Michael Rodriguez",
    title: "Institutional Investor"
  },
  {
    quote: "I've been able to increase my portfolio by 47% in just three months using the insights from MobiusEngine.ai.",
    name: "Emily Zhang",
    title: "Independent Trader"
  }
];

export default Landing;
