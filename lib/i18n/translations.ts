export type Language = 'en' | 'de';

export interface Translations {
  navbar: {
    home: string;
    about: string;
    services: string;
    departments: string;
    doctors: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    welcome: string;
    brandName: string;
    rehabilitation: string;
    tagline: string;
    getStarted: string;
    learnMore: string;
    scrollDown: string;
    loading: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    watchVideo: string;
    whyChooseUs: string;
    learnMoreAboutUs: string;
    mission: {
      title: string;
      content: string;
    };
    vision: {
      title: string;
      content: string;
    };
    values: {
      title: string;
      content: string;
    };
    benefits: {
      benefit1: string;
      benefit2: string;
      benefit3: string;
      benefit4: string;
      benefit5: string;
      benefit6: string;
    };
    features: {
      patientCare: {
        title: string;
        description: string;
      };
      tracking: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
    };
  };
  stats: {
    experience: string;
    patients: string;
    successRate: string;
    therapists: string;
  };
  features: {
    whyChoose: {
      title: string;
      text: string;
      button: string;
    };
    smartTracking: {
      title: string;
      text: string;
    };
    expertSupport: {
      title: string;
      text: string;
    };
    personalizedCare: {
      title: string;
      text: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      departments: 'Departments',
      doctors: 'Doctors',
      contact: 'Contact',
    },
    hero: {
      subtitle: '20+ Years of Excellence in Rehabilitation',
      welcome: 'WELCOME TO',
      brandName: 'FyMove',
      rehabilitation: 'Rehabilitation reimagined for the digital age.',
      tagline: 'Smart recovery programs tailored to you.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      scrollDown: 'Scroll Down',
      loading: 'Loading your experience...',
    },
    about: {
      title: 'Reimagining Rehabilitation',
      subtitle: 'About FyMove',
      description: 'We combine cutting-edge technology with expert medical knowledge to create a new standard in rehabilitation care.',
      watchVideo: 'Watch our story and see how we\'re changing lives through innovative rehabilitation.',
      whyChooseUs: 'Why Choose FyMove?',
      learnMoreAboutUs: 'Learn More About Us',
      mission: {
        title: 'Our Mission',
        content: 'To revolutionize rehabilitation through innovative technology and personalized care, making recovery more accessible, effective, and engaging for everyone.'
      },
      vision: {
        title: 'Our Vision',
        content: 'To become the global leader in digital rehabilitation, creating a world where everyone has access to high-quality recovery programs regardless of location or circumstances.'
      },
      values: {
        title: 'Our Values',
        content: 'Excellence, Innovation, Compassion, and Integrity guide everything we do. We believe in putting patients first and leveraging technology to enhance human care, not replace it.'
      },
      benefits: {
        benefit1: 'Personalized rehabilitation programs',
        benefit2: '24/7 access to expert support',
        benefit3: 'Real-time progress tracking',
        benefit4: 'AI-powered adjustments',
        benefit5: 'Community support network',
        benefit6: 'Evidence-based methodologies'
      },
      features: {
        patientCare: {
          title: 'Patient-Centered Care',
          description: 'We put your needs first, creating personalized rehabilitation programs that adapt to your progress.'
        },
        tracking: {
          title: 'Real-Time Progress Tracking',
          description: 'Monitor your recovery journey with advanced analytics and progress tracking tools.'
        },
        support: {
          title: 'Expert Medical Support',
          description: 'Access to qualified healthcare professionals who guide you through your rehabilitation.'
        }
      }
    },
    stats: {
      experience: 'Years Experience',
      patients: 'Patients Treated',
      successRate: 'Success Rate %',
      therapists: 'Expert Therapists'
    },
    features: {
      whyChoose: {
        title: 'Why Choose FyMove?',
        text: 'We provide personalized rehabilitation programs that adapt to your needs and progress in real-time.',
        button: 'Why Us?'
      },
      smartTracking: {
        title: 'Smart Tracking',
        text: 'Real-time monitoring of your progress with AI-powered adjustments to your program.'
      },
      expertSupport: {
        title: 'Expert Support',
        text: 'Access to professional physiotherapists and rehabilitation experts 24/7.'
      },
      personalizedCare: {
        title: 'Personalized Care',
        text: 'Custom rehabilitation programs tailored to your specific needs and goals.'
      }
    }
  },
  de: {
    navbar: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Leistungen',
      departments: 'Abteilungen',
      doctors: 'Ärzte',
      contact: 'Kontakt',
    },
    hero: {
      subtitle: '20+ Jahre Exzellenz in der Rehabilitation',
      welcome: 'WILLKOMMEN BEI',
      brandName: 'FyMove',
      rehabilitation: 'Rehabilitation neu gedacht für das digitale Zeitalter.',
      tagline: 'Intelligente Erholungsprogramme, auf Sie zugeschnitten.',
      getStarted: 'Loslegen',
      learnMore: 'Mehr erfahren',
      scrollDown: 'Nach unten scrollen',
      loading: 'Lade deine Erfahrung...',
    },
    
    about: {
      title: 'Rehabilitation neu gedacht',
      subtitle: 'Über FyMove',
      description: 'Wir kombinieren modernste Technologie mit medizinischem Fachwissen, um einen neuen Standard in der Rehabilitationsversorgung zu schaffen.',
      watchVideo: 'Sehen Sie unsere Geschichte und erfahren Sie, wie wir durch innovative Rehabilitation Leben verändern.',
      whyChooseUs: 'Warum FyMove wählen?',
      learnMoreAboutUs: 'Mehr über uns erfahren',
      mission: {
        title: 'Unsere Mission',
        content: 'Die Rehabilitation durch innovative Technologie und personalisierte Betreuung zu revolutionieren und die Genesung für jeden zugänglicher, effektiver und ansprechender zu gestalten.'
      },
      vision: {
        title: 'Unsere Vision',
        content: 'Der weltweit führende Anbieter für digitale Rehabilitation zu werden und eine Welt zu schaffen, in der jeder unabhängig von Standort oder Umständen Zugang zu hochwertigen Genesungsprogrammen hat.'
      },
      values: {
        title: 'Unsere Werte',
        content: 'Exzellenz, Innovation, Mitgefühl und Integrität leiten alles, was wir tun. Wir glauben daran, Patienten an erste Stelle zu setzen und Technologie einzusetzen, um die menschliche Betreuung zu verbessern, nicht zu ersetzen.'
      },
      benefits: {
        benefit1: 'Personalisierte Rehabilitationsprogramme',
        benefit2: '24/7 Zugang zu Expertenunterstützung',
        benefit3: 'Echtzeit-Fortschrittsverfolgung',
        benefit4: 'KI-gestützte Anpassungen',
        benefit5: 'Gemeinschaftliches Unterstützungsnetzwerk',
        benefit6: 'Evidenzbasierte Methoden'
      },
      features: {
        patientCare: {
          title: 'Patientenzentrierte Betreuung',
          description: 'Wir stellen Ihre Bedürfnisse an erste Stelle und erstellen personalisierte Rehabilitationsprogramme, die sich an Ihren Fortschritt anpassen.'
        },
        tracking: {
          title: 'Echtzeit-Fortschrittsverfolgung',
          description: 'Überwachen Sie Ihre Genesungsreise mit fortschrittlichen Analysen und Fortschrittsverfolgungstools.'
        },
        support: {
          title: 'Medizinische Expertenunterstützung',
          description: 'Zugang zu qualifizierten Gesundheitsexperten, die Sie durch Ihre Rehabilitation führen.'
        }
      }
    },


    stats: {
      experience: 'Jahre Erfahrung',
      patients: 'Behandelte Patienten',
      successRate: 'Erfolgsrate %',
      therapists: 'Experten-Therapeuten'
    },
    features: {
      whyChoose: {
        title: 'Warum FyMove wählen?',
        text: 'Wir bieten personalisierte Rehabilitationsprogramme, die sich in Echtzeit an Ihre Bedürfnisse und Fortschritte anpassen.',
        button: 'Warum wir?'
      },
      smartTracking: {
        title: 'Intelligente Verfolgung',
        text: 'Echtzeit-Überwachung Ihres Fortschritts mit KI-gestützten Anpassungen an Ihr Programm.'
      },
      expertSupport: {
        title: 'Expertenunterstützung',
        text: 'Zugang zu professionellen Physiotherapeuten und Rehabilitationsexperten rund um die Uhr.'
      },
      personalizedCare: {
        title: 'Personalisierte Betreuung',
        text: 'Maßgeschneiderte Rehabilitationsprogramme, die auf Ihre spezifischen Bedürfnisse und Ziele zugeschnitten sind.'
      }
    }
  }
};