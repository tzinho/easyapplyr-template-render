import natural from "natural";
import { buzzwords } from "buzzwords";
import { fillers } from "fillers";
// import { removeStopwords } from "stopword";
import extractor from "keyword-extractor";

const { WordTokenizer } = natural;

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  experience: {
    company: string;
    position: string;
    duration: string;
    bullets: string[];
  }[];
}

export const extractKeywords = (text: string): string[] => {
  const keywords = extractor.extract(text, {
    language: "english",
    remove_duplicates: true,
    return_changed_case: true,
    remove_digits: true,
  });

  return keywords;
};

export const detectGrammaticalErrors = (text: string): string[] => {
  return [];
};

export const analyzeBulletPoints = (bullets: string[]): string[] => {
  const recommendations: string[] = [];

  bullets.forEach((bullet, index) => {
    const wordCount = bullet.split(" ").length;

    if (wordCount < 5) {
      recommendations.push(
        `Bullet ${index + 1} is too short. Add more details.`,
      );
    } else if (wordCount > 20) {
      recommendations.push(`Bullet ${index + 1} is too long. Be more concise.`);
    }
  });

  return recommendations;
};

export const detectBuzzwords = (text: string): string[] => {
  const tokenizer = new WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());
  return words.filter((word) => buzzwords.includes(word));
};

export const suggestActionVerbs = (bullet: string): string => {
  const weakVerbs = ["worked on", "helped", "did", "made"];
  const strongVerbs = ["developed", "designed", "implemented", "optimized"];

  weakVerbs.forEach((verb, index) => {
    if (bullet.includes(verb)) {
      bullet = bullet.replace(verb, strongVerbs[index] || strongVerbs[0]);
    }
  });

  return bullet;
};

export const calculateReadabilityScore = (text: string): number => {
  return 0;
};

export const analyzeSentiment = (
  text: string,
): { sentence: string; sentiment: string }[] => {
  return [];
};

export const extractKeywordsWithCustomStopwords = (
  text: string,
  customStopwords: string[] = [],
): string[] => {
  const tokenizer = new WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());
  const defaultStopwords = [
    "the",
    "is",
    "at",
    "which",
    "on",
    "for",
    "in",
    "of",
  ];
  const stopwords = [...defaultStopwords, ...customStopwords];
  const keywords = words.filter((word) => !stopwords.includes(word));
  return [...new Set(keywords)];
};

export const calculateSimilarity = (
  resume: string,
  jobDescription: string,
): number => {
  const getWords = (text: string) => {
    const tokenizer = new WordTokenizer();
    return new Set(tokenizer.tokenize(text.toLowerCase()));
  };

  const resumeWords = getWords(resume);
  const jobWords = getWords(jobDescription);

  const intersection = [...resumeWords].filter((word) => jobWords.has(word));
  const union = new Set([...resumeWords, ...jobWords]);

  return (intersection.length / union.size) * 100;
};

export const analyzeResume = (data: ResumeData) => {
  const allBullets = data.experience
    .flatMap((exp) => exp.bullets)
    .filter((bullet) => bullet.trim() !== "");

  const analysis = {
    "Bullet Point Length": analyzeBulletLength(allBullets),
    Punctuation: analyzePunctuation(allBullets),
    Quantification: analyzeQuantification(allBullets),
    "Number of Bullets": analyzeNumberOfBullets(allBullets),
    "Bullet Strength": analyzeBulletStrength(allBullets),
    Buzzwords: analyzeBuzzwords(allBullets),
    "Personal Pronouns": analyzePersonalPronouns(allBullets),
    "Active Voice": analyzeActiveVoice(allBullets),
    "Filler Words": analyzeFillerWords(allBullets),
  };

  return analysis;
};

const analyzeBulletLength = (bullets: string[]) => {
  const idealMinLength = 50;
  const idealMaxLength = 100;
  const shortBullets = bullets.filter((b) => b.length < idealMinLength);
  const longBullets = bullets.filter((b) => b.length > idealMaxLength);

  return {
    pass: shortBullets.length === 0 && longBullets.length === 0,
    message:
      shortBullets.length > 0
        ? "Some bullets are too short. Add more detail to fully communicate your achievements."
        : longBullets.length > 0
          ? "Some bullets are too long. Try to be more concise while maintaining impact."
          : "Great bullet point lengths!",
  };
};

const analyzePunctuation = (bullets: string[]) => {
  const properlyPunctuated = bullets.every((b) => b.trim().endsWith("."));
  return {
    pass: properlyPunctuated,
    message: properlyPunctuated
      ? "Good job on punctuation!"
      : "Make sure all bullet points end with a period for professionalism.",
  };
};

const analyzeQuantification = (bullets: string[]) => {
  const hasNumbers = /\d/.test(bullets.join(""));
  return {
    pass: hasNumbers,
    message: hasNumbers
      ? "Good use of numerical data!"
      : "Try to include numbers to quantify your achievements (e.g., increased sales by 25%).",
  };
};

const analyzeNumberOfBullets = (bullets: string[]) => {
  const pass = bullets.length >= 3 && bullets.length <= 10;
  return {
    pass,
    message:
      bullets.length < 3
        ? "Add more bullet points (aim for at least 3)."
        : bullets.length > 10
          ? "Consider reducing the number of bullet points (aim for maximum 10)."
          : "Good number of bullet points!",
  };
};

const analyzeBulletStrength = (bullets: string[]) => {
  const strongWords = [
    "achieved",
    "improved",
    "increased",
    "developed",
    "led",
    "managed",
    "created",
  ];

  const hasStrongWords = bullets.some((b) =>
    strongWords.some((word) => b.toLowerCase().includes(word)),
  );

  return {
    pass: hasStrongWords,
    message: hasStrongWords
      ? "Good use of strong action verbs!"
      : "Try using stronger action verbs to highlight your achievements.",
  };
};

const analyzeBuzzwords = (bullets: string[]) => {
  const hasBuzzwords = bullets.some((b) =>
    buzzwords.some((word) => b.toLowerCase().includes(word)),
  );

  return {
    pass: !hasBuzzwords,
    message: hasBuzzwords
      ? "Consider replacing buzzwords with more specific, meaningful descriptions."
      : "Good job avoiding generic buzzwords!",
  };
};

const analyzePersonalPronouns = (bullets: string[]) => {
  const pronouns = ["i", "me", "my", "mine", "we", "our", "ours"];
  const hasPronouns = bullets.some((b) =>
    pronouns.some((pronoun) => new RegExp(`\\b${pronoun}\\b`, "i").test(b)),
  );

  return {
    pass: !hasPronouns,
    message: hasPronouns
      ? "Remove personal pronouns to maintain a professional tone."
      : "Good job avoiding personal pronouns!",
  };
};

const analyzeActiveVoice = (bullets: string[]) => {
  const passiveIndicators = ["was", "were", "been", "being", "is", "are"];
  const hasPassiveVoice = bullets.some((b) =>
    passiveIndicators.some((word) => new RegExp(`\\b${word}\\b`, "i").test(b)),
  );

  return {
    pass: !hasPassiveVoice,
    message: hasPassiveVoice
      ? "Consider using more active voice in your bullet points."
      : "Good use of active voice!",
  };
};

const analyzeFillerWords = (bullets: string[]) => {
  const hasFillerWords = bullets.some((b) =>
    fillers.some((word) => new RegExp(`\\b${word}\\b`, "i").test(b)),
  );

  return {
    pass: !hasFillerWords,
    message: hasFillerWords
      ? "Remove filler words to make your statements more impactful."
      : "Good job avoiding filler words!",
  };
};

export const calculateKeywordMatch = (
  resumeText: string,
  jobDescription: string,
): number => {
  const extractKeywords = (text: string): string[] => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 2);
  };

  const jobKeywords = new Set(extractKeywords(jobDescription));
  const resumeKeywords = new Set(extractKeywords(resumeText));

  const matchedKeywords = Array.from(jobKeywords).filter((word) =>
    resumeKeywords.has(word),
  );

  return jobKeywords.size > 0
    ? (matchedKeywords.length / jobKeywords.size) * 100
    : 0;
};
