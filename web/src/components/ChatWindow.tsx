import { useRef, useEffect } from 'react';
import { Message } from './types';

interface ChatWindowProps {
  messages: Message[];
  input: string;
  isTyping: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onOpenContact: () => void;
  onBackToWelcome: () => void; // New prop for back button
}

export default function ChatWindow({
  messages = [],
  input = "",
  isTyping = false,
  onInputChange,
  onSendMessage,
  onOpenContact,
  onBackToWelcome // New prop
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() && !isTyping) {
      onSendMessage();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>

      <div style={{
        background: 'rgba(30, 41, 59, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        width: '95%',
        maxWidth: '1200px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          padding: '24px 32px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2 }}>
            {/* Back Button */}
            <button 
              onClick={onBackToWelcome}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              title="Back to Welcome"
            >
              ←
            </button>
            
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '0 0 4px 0',
                background: 'linear-gradient(135deg, #fff, #e2e8f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Vivek Ullengula</h2>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                fontWeight: '500'
              }}>AI Resume Assistant</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 2 }}>
            <button 
              onClick={onOpenContact}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📧 Contact
            </button>
          </div>

          {/* Header Background Animation */}
          <div style={{
            position: 'absolute',
            top: '-100%',
            left: '-100%',
            width: '300%',
            height: '300%',
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            animation: 'shimmer 3s infinite linear'
          }}></div>
        </div>

        {/* Messages Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px',
          background: 'rgba(15, 23, 42, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {messages.length === 0 && !isTyping ? (
            <div style={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.6)',
              fontStyle: 'italic',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ fontSize: '48px' }}>👋</div>
              <div>Hello! I'm Vivek's AI assistant. Ask me about his experience, skills, or projects!</div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: msg.sender === "user" ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  {msg.sender === "bot" && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'white',
                      flexShrink: 0
                    }}>AI</div>
                  )}
                  
                  <div style={{
                    maxWidth: '70%',
                    padding: '16px 20px',
                    borderRadius: '20px',
                    fontSize: '15px',
                    lineHeight: '1.5',
                    background: msg.sender === "user" 
                      ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: msg.sender === "user" ? 'white' : 'rgba(255, 255, 255, 0.9)',
                    border: msg.sender === "bot" ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    backdropFilter: 'blur(10px)',
                    boxShadow: msg.sender === "user" ? '0 8px 25px rgba(99, 102, 241, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
                    animation: 'messageSlide 0.3s ease-out'
                  }}>
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(135deg, #f472b6, #d946ef)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'white',
                      flexShrink: 0
                    }}>You</div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'white',
                    flexShrink: 0
                  }}>AI</div>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '16px 20px',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out',
                        animationDelay: '0.1s'
                      }}></div>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out',
                        animationDelay: '0.2s'
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '24px 32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(30, 41, 59, 0.8)'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my experience, skills, projects, education..."
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={isTyping}
              />
            </div>
            
            <button
              onClick={onSendMessage}
              disabled={!input.trim() || isTyping}
              style={{
                background: input.trim() && !isTyping 
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: input.trim() && !isTyping ? 'white' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                fontSize: '20px',
                transition: 'all 0.3s ease',
                boxShadow: input.trim() && !isTyping ? '0 8px 25px rgba(99, 102, 241, 0.4)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isTyping) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (input.trim() && !isTyping) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
                }
              }}
            >
              ↑
            </button>
          </div>
          
          <div style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            marginTop: '12px'
          }}>
            Ask about skills, experience, projects, or education
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes messageSlide {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}