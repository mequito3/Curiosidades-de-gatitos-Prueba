export const translations = {
  es: {
    nav: {
      home: "Inicio",
      myFacts: "Mis Curiosidades",
      language: "Idioma",
    },
    hero: {
      title: "Mundo Gatuno",
      subtitle: "Descubre el fascinante y misterioso universo de los felinos con datos curiosos que te sorprenderán.",
      cta: "Ver nueva curiosidad",
      catLovers: "Para Cat-Lovers",
    },
    card: {
      copy: "Copiar",
      copied: "¡Copiado!",
      details: "Detalles",
    },
    common: {
      loading: "Cargando ronroneos...",
      error: "Vaya, algo salió mal. Inténtalo de nuevo.",
    },
    myFacts: {
      empty: "Tu baúl de curiosidades está vacío",
    }
  },
  en: {
    nav: {
      home: "Home",
      myFacts: "My Facts",
      language: "Language",
    },
    hero: {
      title: "Cat World",
      subtitle: "Discover the fascinating and mysterious universe of felines with curious facts that will surprise you.",
      cta: "See new fact",
      catLovers: "For Cat-Lovers",
    },
    card: {
      copy: "Copy",
      copied: "Copied!",
      details: "Details",
    },
    common: {
      loading: "Loading purrs...",
      error: "Oops, something went wrong. Try again.",
    },
    myFacts: {
      empty: "Your fact trunk is empty",
    }
  }
};

export type Language = 'es' | 'en';
export type TranslationKey = keyof typeof translations.es;
