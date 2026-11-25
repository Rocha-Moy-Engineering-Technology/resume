export type ResumeLanguage = 'en' | 'pt-BR';

export interface ValidationCopy {
  readonly nameRequired: string;
  readonly emailRequired: string;
  readonly emailInvalid: string;
  readonly messageRequired: string;
}

export interface ContactCopy {
  readonly validation: ValidationCopy;
  readonly success: string;
  readonly failure: string;
}

export type LanguageFlag = 'us' | 'br';

export const LANGUAGE_OPTIONS = [
  { id: 'en', label: 'English', flag: 'us' },
  { id: 'pt-BR', label: 'Português', flag: 'br' },
] as const satisfies readonly {
  readonly id: ResumeLanguage;
  readonly label: string;
  readonly flag: LanguageFlag;
}[];

export const COPY = {
  en: {
    language: 'Language',
    education: 'Education',
    sections: 'Resume sections',
    experience: 'Experience',
    portfolio: 'Portfolio',
    download: 'Download Resume',
    downloadTooltip: 'Download Resume PDF',
    pdf: 'resume.pdf',
    filename: 'PHRMOY_RESUME',
    contactButton: 'Contact',
    contactDialog: 'Contact form',
    closeContact: 'Close contact form',
    contactHeading: 'Get in Touch',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    messagePlaceholder: 'Your message...',
    send: 'Send Message',
    sending: 'Sending...',
    sendAnother: 'Send another message',
    lightTheme: 'Switch to light theme',
    darkTheme: 'Switch to dark theme',
    contact: {
      validation: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        messageRequired: 'Message is required',
      },
      success: 'Message sent successfully!',
      failure: 'Failed to send message. Please try again.',
    },
  },
  'pt-BR': {
    language: 'Idioma',
    education: 'Formação Acadêmica',
    sections: 'Seções do currículo',
    experience: 'Experiência',
    portfolio: 'Portfólio',
    download: 'Baixar currículo',
    downloadTooltip: 'Baixar currículo em PDF',
    pdf: 'resume-pt.pdf',
    filename: 'PHRMOY_RESUME_PT',
    contactButton: 'Contato',
    contactDialog: 'Formulário de contato',
    closeContact: 'Fechar formulário de contato',
    contactHeading: 'Entre em contato',
    name: 'Nome',
    email: 'E-mail',
    message: 'Mensagem',
    namePlaceholder: 'Seu nome',
    emailPlaceholder: 'seu@email.com',
    messagePlaceholder: 'Sua mensagem...',
    send: 'Enviar mensagem',
    sending: 'Enviando...',
    sendAnother: 'Enviar outra mensagem',
    lightTheme: 'Mudar para tema claro',
    darkTheme: 'Mudar para tema escuro',
    contact: {
      validation: {
        nameRequired: 'Informe seu nome',
        emailRequired: 'Informe seu e-mail',
        emailInvalid: 'Informe um endereço de e-mail válido',
        messageRequired: 'Escreva uma mensagem',
      },
      success: 'Mensagem enviada com sucesso!',
      failure: 'Não foi possível enviar a mensagem. Tente novamente.',
    },
  },
} as const;
