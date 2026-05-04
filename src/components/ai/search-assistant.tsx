'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { MessageSquare, X, Send, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VerticalType } from '@/lib/verticals';

interface SearchAssistantProps {
  vertical?: VerticalType;
  accentColor?: string;
}

export function SearchAssistant({ vertical, accentColor = 'var(--accent)' }: SearchAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/search',
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: { messages, id, vertical },
      }),
    }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105',
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
        style={{ backgroundColor: accentColor }}
        aria-label="Open AI search assistant"
      >
        <MessageSquare className="h-6 w-6 text-background" />
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300',
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
        style={{
          height: 'min(600px, calc(100vh - 6rem))',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between rounded-t-2xl px-4 py-3"
          style={{ backgroundColor: accentColor }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-background" />
            <span className="font-semibold text-background">AI Search Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-background/80 transition-colors hover:bg-background/10 hover:text-background"
              aria-label="Minimize"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-background/80 transition-colors hover:bg-background/10 hover:text-background"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
                style={{ backgroundColor: `color-mix(in oklch, ${accentColor} 15%, transparent)` }}
              >
                <Sparkles className="h-8 w-8" style={{ color: accentColor }} />
              </div>
              <h3 className="font-semibold text-foreground">How can I help?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ask me anything about listings. Try &quot;Find me a 3 bed home under $500k&quot; or &quot;What jobs are available remotely?&quot;
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                )}
              >
                {message.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return <span key={index} className="whitespace-pre-wrap">{part.text}</span>;
                  }
                  if (part.type === 'tool-invocation') {
                    return (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Searching listings...</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2.5 text-sm text-secondary-foreground rounded-bl-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about listings..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="h-10 w-10 rounded-xl shrink-0"
              style={{
                backgroundColor: input.trim() ? accentColor : undefined,
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
