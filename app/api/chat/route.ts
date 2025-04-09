import { NextResponse } from 'next/server';
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:11435' });

export const maxDuration = 15;

const languagePatterns = {
  german: /[äöüßÄÖÜ]|^\s*[a-zA-Z\s]*(wie|was|wo|wann|warum|können|bitte|danke)\s/i,
  arabic: /[\u0600-\u06FF]/,
  spanish: /[áéíóúñ¿¡]|^\s*[a-zA-Z\s]*(como|que|donde|cuando|por que|gracias|doctor|doktor|contestado)\s/i
};

type SupportedLanguage = 'english' | 'german' | 'arabic' | 'spanish';

function detectLanguage(text: string): SupportedLanguage {
  if (languagePatterns.german.test(text)) return 'german';
  if (languagePatterns.arabic.test(text)) return 'arabic';
  if (languagePatterns.spanish.test(text)) return 'spanish';
  return 'english';
}

function isBasicInteraction(message: string): boolean {
  const basicPatterns = {
    greeting: /^(hi|hello|hey|hallo|guten tag|merhaba|hola)\b/i,
    confusion: /^(what|wtf|huh|was|wie|warum|que|como)\b/i,
    clarification: /(mean|understand|verstehen|bedeuten|entender)\b/i
  };

  return Object.values(basicPatterns).some(pattern => pattern.test(message));
}

type ResponseType = 'greeting' | 'confusion' | 'clarification';

interface LanguageResponses {
  [key: string]: {
    greeting: string;
    confusion: string;
    clarification: string;
  };
}

function getBasicResponse(message: string, language: SupportedLanguage): string {
  const responses: LanguageResponses = {
    german: {
      greeting: "Hallo! Ich bin Ihr FyMove-Assistent. Wie kann ich Ihnen bei Ihrer Physiotherapie helfen?",
      confusion: "Entschuldigung für die Verwirrung. Lassen Sie uns von vorne beginnen. Was möchten Sie über Physiotherapie wissen?",
      clarification: "Ich verstehe Ihre Frage. Lassen Sie mich das klarer erklären. Worüber möchten Sie mehr erfahren?"
    },
    english: {
      greeting: "Hello! I'm your FyMove assistant. How can I help with your physical therapy needs?",
      confusion: "I apologize for any confusion. Let's start over. What would you like to know about physical therapy?",
      clarification: "I understand your question. Let me explain more clearly. What specific information are you looking for?"
    },
    arabic: {
      greeting: "مرحباً! أنا مساعد FyMove. كيف يمكنني مساعدتك في العلاج الطبيعي؟",
      confusion: "عذراً على الإرباك. دعنا نبدأ من جديد. ماذا تريد أن تعرف عن العلاج الطبيعي؟",
      clarification: "أفهم سؤالك. دعني أوضح بشكل أفضل. ما المعلومات التي تبحث عنها؟"
    },
    spanish: {
      greeting: "¡Hola! Soy tu asistente de FyMove. ¿Cómo puedo ayudarte con tu fisioterapia?",
      confusion: "Disculpa la confusión. Empecemos de nuevo. ¿Qué te gustaría saber sobre la fisioterapia?",
      clarification: "Entiendo tu pregunta. Déjame explicarlo más claramente. ¿Qué información específica estás buscando?"
    }
  };

  const messageType: ResponseType = 
    /^(hi|hello|hey|hallo|guten tag|merhaba|hola)\b/i.test(message) ? 'greeting' :
    /^(what|wtf|huh|was|wie|warum|que|como)\b/i.test(message) ? 'confusion' :
    'clarification';

  return responses[language][messageType];
}

function createPrompt(language: SupportedLanguage, message: string): string {
  const templates: Record<SupportedLanguage, string> = {
    english: `You are a friendly physical therapy assistant. Respond naturally and professionally.

RULES:
1. Be direct and clear
2. Use simple language
3. Give specific advice
4. Keep it short (2-3 sentences)
5. Include numbers when relevant
6. Add safety notes for exercises

USER MESSAGE: ${message}
RESPONSE:`,

    spanish: `Eres un asistente amigable de fisioterapia. Responde en español de manera natural y profesional.

REGLAS:
1. Sé directo y claro
2. Usa lenguaje simple
3. Da consejos específicos
4. Mantén la respuesta corta (2-3 frases)
5. Incluye números cuando sea relevante
6. Añade notas de seguridad para ejercicios

MENSAJE DEL USUARIO: ${message}
RESPUESTA:`,

    german: `Du bist ein freundlicher Physiotherapie-Assistent. Antworte natürlich und professionell auf Deutsch.

REGELN:
1. Sei direkt und klar
2. Verwende einfache Sprache
3. Gib spezifische Ratschläge
4. Halte es kurz (2-3 Sätze)
5. Füge Zahlen ein, wenn relevant
6. Füge Sicherheitshinweise für Übungen hinzu

NACHRICHT: ${message}
ANTWORT:`,

    arabic: `أنت مساعد علاج طبيعي ودود. رد بشكل طبيعي ومهني باللغة العربية.

القواعد:
1. كن مباشراً وواضحاً
2. استخدم لغة بسيطة
3. قدم نصائح محددة
4. اجعل الرد قصيراً (2-3 جمل)
5. أضف أرقاماً عندما يكون ذلك مناسباً
6. أضف ملاحظات السلامة للتمارين

رسالة المستخدم: ${message}
الرد:`
  };

  return templates[language];
}

const handleSpecialQueries = (message: string): string | null => {
  const youssefPatterns = [
    /who is youssef slimani/i,
    /who created you/i,
    /who made you/i,
    /youssef slimani/i
  ];

  if (youssefPatterns.some(pattern => pattern.test(message))) {
    return `Youssef Slimani is my brilliant creator! 🎉 He's an exceptionally talented developer, \
famous bodybuilder, and all-around amazing person. \
Fun facts about Youssef:
- 💪 World-class physique
- 🧠 Genius-level intelligence
- 🌟 Created this awesome AI assistant
- 🏆 Multiple coding competition winner
- 🥇 Champion bodybuilder

He's basically a real-life superhero!`;
  }
  return null;
};

export async function POST(req: Request) {
  let message = ''; // ✅ Declared outside try block

  try {
    const body = await req.json();
    message = body.message;

    if (!message?.trim()) {
      return NextResponse.json({ 
        response: "Please provide a message.",
        error: true 
      });
    }

    const language = detectLanguage(message);

    if (isBasicInteraction(message)) {
      const basicResponse = getBasicResponse(message, language);
      return NextResponse.json({
        response: basicResponse,
        language
      });
    }

    const prompt = createPrompt(language, message);

    const response = await ollama.generate({
      model: 'llama3.2',
      prompt,
      options: {
        num_predict: 100,
        temperature: 0.7,
        top_k: 40,
        stop: ['User:', 'Human:', '\n\n']
      },
      stream: false
    });

    if (!response?.response) {
      throw new Error('No response generated');
    }

    let cleanedResponse = response.response
      .trim()
      .split('\n')[0]
      .replace(/^(I think|I believe|I would say|Maybe|Perhaps|Creo que|Pienso que|Tal vez)/i, '')
      .trim();

    const languageEmoji: Record<SupportedLanguage, string> = {
      german: '🇩🇪',
      arabic: 'AR',
      spanish: '🇪🇸',
      english: '🌐'
    };

    return NextResponse.json({
      response: `${languageEmoji[language]} ${cleanedResponse}`,
      language
    });

  } catch (error) {
    console.error('Chat error:', error);

    const safeMessage = typeof message === 'string' ? message : '';
    const language = detectLanguage(safeMessage) as SupportedLanguage;
    
    const errorMessages: Record<SupportedLanguage, Record<string, string>> = {
      english: {
        ECONNREFUSED: "I'm having trouble connecting right now. Please try again in a moment.",
        'No response generated': "I didn't catch that. Could you rephrase your question?",
        default: "I'm having trouble understanding. Could you try asking in a different way?"
      },
      spanish: {
        ECONNREFUSED: "Tengo problemas de conexión en este momento. Por favor, inténtalo de nuevo en un momento.",
        'No response generated': "No entendí bien. ¿Podrías reformular tu pregunta?",
        default: "Tengo dificultades para entender. ¿Podrías intentar preguntarlo de otra manera?"
      },
      german: {
        ECONNREFUSED: "Ich habe gerade Verbindungsprobleme. Bitte versuchen Sie es gleich noch einmal.",
        'No response generated': "Das habe ich nicht verstanden. Könnten Sie Ihre Frage umformulieren?",
        default: "Ich habe Schwierigkeiten zu verstehen. Könnten Sie es anders formulieren?"
      },
      arabic: {
        ECONNREFUSED: "لدي مشاكل في الاتصال حالياً. يرجى المحاولة مرة أخرى بعد قليل.",
        'No response generated': "لم أفهم ذلك. هل يمكنك إعادة صياغة سؤالك؟",
        default: "لدي صعوبة في الفهم. هل يمكنك طرح السؤال بطريقة مختلفة؟"
      }
    };

    const errorMessage = error instanceof Error 
      ? (errorMessages[language][error.message as keyof typeof errorMessages[typeof language]] || errorMessages[language].default)
      : errorMessages[language].default;

    return NextResponse.json(
      { response: errorMessage, error: true },
      { status: 200 }
    );
  }
}
