export interface Message {
  sender: string;
  text: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface WelcomeScreenProps {
  onGetStarted: () => void;
  contactInfo: ContactInfo;
}

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo;
}

export interface ChatWindowProps {
  messages?: Message[];
  input?: string;
  isTyping?: boolean;
  onInputChange?: (value: string) => void;
  onSendMessage?: () => void;
  onOpenContact?: () => void;
}