
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, MessageSquare, Send, User, X, Loader2, Info } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { askConcierge, type ConciergeInput } from '@/ai/flows/concierge-flow';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIConcierge() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          text: t('aiConcierge.greeting', "Bienvenido a Dachs Limousines. ¿Cómo puedo asistirte en tu experiencia exclusiva?"),
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, t, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim() === '' || isLoading) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponse = await askConcierge({ userMessage: userInput } as ConciergeInput);
      const newAiMessage: Message = {
        id: crypto.randomUUID(),
        text: aiResponse.aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);

      if (messages.length > 2 && !showContactForm) { // Heuristic to offer contact form
        const offerContactMessage: Message = {
          id: crypto.randomUUID(),
          text: t('aiConcierge.offerContact', "Si lo deseas, puedo ayudarte a que nuestro equipo te contacte para una atención más personalizada."),
          sender: 'ai',
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, offerContactMessage]);
      }

    } catch (error) {
      console.error("Error calling AI concierge:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: t('aiConcierge.error', "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde."),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd send this data to a backend.
    console.log({
      name: formName,
      email: formEmail,
      phone: formPhone,
      message: formMessage,
    });
    
    const submissionConfirmation: Message = {
      id: crypto.randomUUID(),
      text: t('aiConcierge.form.submissionMessage', `Gracias ${formName}. Hemos recibido tu solicitud. Un asesor te contactará pronto.`),
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, submissionConfirmation]);

    setShowContactForm(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormMessage('');
  };

  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-xl hover:opacity-90 transition-opacity duration-300 transform hover:scale-105 px-5 py-3"
        onClick={() => setIsOpen(true)}
        aria-label={t('aiConcierge.triggerButton', 'Abrir Chat AI Concierge')}
      >
        <MessageSquare className="mr-2 h-5 w-5" />
        {t('aiConcierge.triggerShort', 'AI Concierge')}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] md:max-w-[500px] lg:max-w-[40vw] h-[80vh] flex flex-col bg-background border-primary/50 shadow-2xl p-0">
          <DialogHeader className="p-4 border-b border-border flex flex-row justify-between items-center">
            <DialogTitle className="font-headline text-primary text-xl flex items-center">
              <Bot className="mr-2 h-6 w-6" /> {t('aiConcierge.modalTitle', 'Dachs AI Concierge')}
            </DialogTitle>
            {/* Redundant close button removed here, DialogContent provides one by default */}
          </DialogHeader>
          
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end space-x-2 max-w-[85%]",
                    msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'
                  )}
                >
                  {msg.sender === 'ai' && <Bot className="h-7 w-7 text-primary flex-shrink-0 mb-1" />}
                  <div
                    className={cn(
                      "p-3 rounded-xl shadow",
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && <User className="h-7 w-7 text-muted-foreground flex-shrink-0 mb-1" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 mr-auto justify-start max-w-[85%]">
                  <Bot className="h-7 w-7 text-primary flex-shrink-0 mb-1" />
                  <div className="p-3 rounded-lg shadow bg-secondary text-secondary-foreground rounded-bl-none">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {showContactForm ? (
            <form onSubmit={handleFormSubmit} className="p-4 border-t border-border space-y-3">
              <p className="text-sm text-center text-muted-foreground mb-2">{t('aiConcierge.form.title', 'Completa tus datos para un contacto personalizado:')}</p>
              <div>
                <Label htmlFor="concierge-name" className="text-xs">{t('aiConcierge.form.nameLabel', 'Nombre')}</Label>
                <Input id="concierge-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder={t('aiConcierge.form.namePlaceholder', 'Tu nombre completo')} required className="bg-input border-border focus:border-primary focus:ring-primary text-foreground"/>
              </div>
              <div>
                <Label htmlFor="concierge-email" className="text-xs">{t('aiConcierge.form.emailLabel', 'Email')}</Label>
                <Input id="concierge-email" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder={t('aiConcierge.form.emailPlaceholder', 'tu@email.com')} required className="bg-input border-border focus:border-primary focus:ring-primary text-foreground"/>
              </div>
              <div>
                <Label htmlFor="concierge-phone" className="text-xs">{t('aiConcierge.form.phoneLabel', 'Teléfono (Opcional)')}</Label>
                <Input id="concierge-phone" type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder={t('aiConcierge.form.phonePlaceholder', '+34 600 000 000')} className="bg-input border-border focus:border-primary focus:ring-primary text-foreground"/>
              </div>
              <div>
                <Label htmlFor="concierge-message" className="text-xs">{t('aiConcierge.form.messageLabel', 'Mensaje adicional')}</Label>
                <Textarea id="concierge-message" value={formMessage} onChange={(e) => setFormMessage(e.target.value)} placeholder={t('aiConcierge.form.messagePlaceholder', 'Detalles de tu solicitud...')} rows={2} className="bg-input border-border focus:border-primary focus:ring-primary text-foreground"/>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowContactForm(false)} className="flex-1">
                  {t('aiConcierge.form.cancelButton', 'Cancelar')}
                </Button>
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  {t('aiConcierge.form.submitButton', 'Enviar Solicitud')}
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-4 border-t border-border">
              {messages.length > 3 && !showContactForm && (
                 <Button 
                    variant="outline" 
                    className="w-full mb-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
                    onClick={() => setShowContactForm(true)}
                  >
                    <Info className="mr-2 h-4 w-4" /> {t('aiConcierge.showFormButton', 'Solicitar Contacto Personalizado')}
                  </Button>
              )}
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t('aiConcierge.inputPlaceholder', 'Escribe tu mensaje aquí...')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-grow bg-input border-border focus:border-primary focus:ring-primary text-foreground"
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || userInput.trim() === ''} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  <span className="sr-only">{t('aiConcierge.sendButton', 'Enviar')}</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
