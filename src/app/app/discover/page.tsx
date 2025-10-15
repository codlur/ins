"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Search as SearchIcon, ArrowRight, X, HistoryIcon, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function DiscoverPage() {
  const [message, setMessage] = useState("");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Call our chat API (which will use the Groq API)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
        } else {
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: (error as Error).message?.includes('429') 
          ? 'Rate limit exceeded. Please wait a moment before trying again.' 
          : 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  // Accordion data
  const accordions = [
    {
      title: "Ask and discover the best AI application for your needs",
      content: "Find the right AI tool for your problem or project."
    },
    {
      title: "Ask about the AI apps you use",
      content: "Learn more about how your AI tools work and how to use them better."
    },
    {
      title: "Ask about AI updates and trends",
      content: "Keep up with the latest news, tools, and ideas in AI."
    },
    {
      title: "Learn new tools and tricks",
      content: "Discover how to create, build, and experiment with AI easily."
    }
  ];

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col items-center justify-start pt-12 p-4 md:p-8 min-h-[calc(100vh-4rem)]">
        {chatMessages.length > 0 ? (
          // Chat Interface
          <div className="w-full max-w-2xl flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl animate-fadeIn ${
                      msg.role === 'user' 
                        ? 'bg-primary/10' 
                        : ''
                    }`}
                  >
                    <div className="font-thin mb-1 text-sm">
                      {msg.role === 'user' ? '' : ''}
                    </div>
                    <div className="font-light tracking-wide">
                      {msg.role === 'assistant' 
                        ? msg.content.split('\n\n').map((paragraph, index, array) => (
                            <div key={index} className="animate-fadeIn">
                              {paragraph}
                              {index < array.length - 1 && (
                                <div className="my-4 border-t border-muted"></div>
                              )}
                            </div>
                          ))
                        : msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl">
                    <div className="font-thin mb-1 text-sm"></div>
                    <div className="font-light flex items-center animate-pulse-subtle">
                      <span className="mr-2">thinking</span>
                      <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="w-full relative">
              <Textarea
                placeholder="Ask anything about AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[100px] resize-none border-0 shadow-none bg-muted pr-12"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className={`absolute bottom-2 right-2 h-8 w-8 p-0 ${message.trim() && !isLoading ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                variant="default"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-end mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearChat}
              >
                Clear Chat
              </Button>
            </div>
          </div>
        ) : (
          // Welcome Screen
          <div className="space-y-4 text-center max-w-2xl w-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-thin" style={{ letterSpacing: '-0.02em', lineHeight: '0.98' }}>
              Understand AI .
              <br />
              <span className="font-normal">Discover What's Possible .</span>
            </h1>

            <div className="w-full max-w-2xl mt-8 relative">
              <Textarea
                placeholder="Ask anything about AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[100px] resize-none border-0 shadow-none bg-muted pr-12"
              />
              <Button 
                onClick={handleSend}
                disabled={!message.trim()}
                className={`absolute bottom-2 right-2 h-8 w-8 p-0 ${message.trim() ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                variant="default"
                size="icon"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full max-w-2xl mt-6 text-left">
              <h2 className="text-xl font-light">What to ask?</h2>
            </div>
            
            <div className="w-full max-w-2xl mt-4 space-y-1">
              {accordions.map((accordion, index) => (
                <div key={index}>
                  <div className="rounded-lg">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                      className="flex items-center justify-between w-full p-4 text-left"
                    >
                      <span className="font-light text-muted-foreground">{accordion.title}</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-200 text-muted-foreground ${openAccordion === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openAccordion === index && (
                      <div className="p-4 pt-0 text-left">
                        <p className="text-sm">{accordion.content}</p>
                      </div>
                    )}
                  </div>
                  {index < accordions.length - 1 && (
                    <div className="h-px bg-muted w-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}