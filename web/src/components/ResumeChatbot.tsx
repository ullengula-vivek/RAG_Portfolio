"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import WelcomeScreen from './WelcomeScreen';
import ChatWindow from './ChatWindow';
import ContactModal from './ContactModal';
import { Message, ContactInfo } from './types';

export default function ResumeChatbot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const contactInfo: ContactInfo = {
    email: "vivekullengula77@example.com",
    linkedin: "https://www.linkedin.com/in/vivekullengula/",
    github: "https://github.com/ullengula-vivek",
    portfolio: "https://ullengula-vivek.github.io/vivek-portfolio/"
  };

  useEffect(() => {
    if (showChat && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([{ 
            sender: "bot", 
            text: "Hello! I'm Vivek Ullengula's resume assistant. I can help you learn about my professional experience, skills, projects, and background. What would you like to know about me?" 
          }]);
          setIsTyping(false);
        }, 1500);
      }, 500);
    }
  }, [showChat]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/query_resume", { query: input });
      
      setIsTyping(true);
      setTimeout(() => {
        const botMessage = { sender: "bot", text: res.data.answer };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (err) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: "Sorry, I encountered an error. Please try again." 
        }]);
        setIsTyping(false);
      }, 1000);
      console.error(err);
    }
  };

  if (!showChat) {
    return (
      <WelcomeScreen 
        onGetStarted={() => setShowChat(true)}
        contactInfo={contactInfo}
      />
    );
  }

  return (
    <>
      <ChatWindow
        messages={messages}
        input={input}
        isTyping={isTyping}
        onInputChange={setInput}
        onSendMessage={sendMessage}
        onOpenContact={() => setShowContactModal(true)}
        onBackToWelcome={() => setShowChat(false)} // Add this line
      />
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        contactInfo={contactInfo}
      />
    </>
  );
}