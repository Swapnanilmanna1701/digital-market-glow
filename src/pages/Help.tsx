
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: boolean; text: string; time: Date }[]>([
    { 
      user: false, 
      text: "Hello! I'm the MobiusEngine AI assistant. How can I help you with cryptocurrency analytics today?", 
      time: new Date() 
    }
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { user: true, text: message, time: new Date() }]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const responses = [
        "I can help you analyze market trends for any cryptocurrency. Which one are you interested in?",
        "Our AI predictions show bullish trends for major cryptocurrencies this week. Would you like specific details?",
        "The MobiusEngine analytics platform provides real-time data for over 10,000 cryptocurrencies. What specific information are you looking for?",
        "I can guide you through setting up custom alerts for price movements. Would you like to know how?",
        "Our community insights show increased interest in DeFi tokens. Would you like to see the latest analysis?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { user: false, text: randomResponse, time: new Date() }]);
    }, 1000);
    
    // Clear input
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-crypto-bg-dark text-crypto-text-primary flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-crypto-accent-blue/20">
        <div className="container mx-auto flex items-center">
          <Link to="/">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-crypto-accent-blue to-blue-400 bg-clip-text text-transparent">
            MobiusEngine Help Assistant
          </h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 container mx-auto p-4 gap-6">
        {/* Sidebar with FAQs */}
        <div className="w-full md:w-1/3">
          <Card className="bg-crypto-bg-card border-crypto-accent-blue/20 h-full">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about MobiusEngine.ai</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {faqs.map((faq, index) => (
                  <li 
                    key={index} 
                    className="p-3 bg-crypto-bg-dark rounded-md cursor-pointer hover:bg-crypto-accent-blue/10 transition-colors"
                    onClick={() => setMessage(faq.question)}
                  >
                    {faq.question}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Area */}
        <div className="w-full md:w-2/3">
          <Card className="bg-crypto-bg-card border-crypto-accent-blue/20 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-crypto-accent-blue" />
                AI Assistant Chat
              </CardTitle>
              <CardDescription>Get help with MobiusEngine.ai features and analytics</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto mb-4">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.user 
                          ? 'bg-crypto-accent-blue text-white' 
                          : 'bg-crypto-bg-dark text-crypto-text-primary'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input 
                  placeholder="Type your question here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-crypto-bg-dark border-crypto-accent-blue/20"
                />
                <Button 
                  type="submit" 
                  className="bg-crypto-accent-blue hover:bg-crypto-accent-blue/80"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const faqs = [
  { 
    question: "What is MobiusEngine.ai?",
    answer: "MobiusEngine.ai is an advanced AI platform for cryptocurrency market analysis and prediction, offering real-time data, predictive modeling, and community insights."
  },
  { 
    question: "How accurate are the AI predictions?",
    answer: "Our AI models have demonstrated over 78% accuracy in predicting major market movements, based on historical data analysis and machine learning algorithms."
  },
  { 
    question: "What cryptocurrencies do you support?",
    answer: "We support over 10,000 cryptocurrencies, including all major tokens and most altcoins with significant market presence."
  },
  { 
    question: "How do I set up price alerts?",
    answer: "You can set up custom price alerts by navigating to the Dashboard, selecting your asset of interest, and clicking the 'Create Alert' button to define your conditions."
  },
  { 
    question: "Is my data secure on the platform?",
    answer: "Yes, we use enterprise-grade encryption and adhere to strict security protocols to ensure all user data and analytics are protected."
  },
  { 
    question: "How do I get started with MobiusEngine.ai?",
    answer: "You can create an account on our platform, explore the dashboard features, and start setting up your personalized analytics preferences immediately."
  }
];

export default Help;
