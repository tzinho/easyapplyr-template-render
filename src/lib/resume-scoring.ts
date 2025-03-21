import lodash from "lodash";

interface ScoreResult {
  score: number;
  feedback: string;
}

export const calculateSummaryScore = (summary: string): ScoreResult => {
  let score = 0;
  const feedback: string[] = [];

  // Length check (ideal: 100-200 characters)
  const length = summary.length;
  if (length < 1) {
    feedback.push(
      "× It is advisable to fill in the summary with your previous experiences.",
    );
  } else if (length >= 100 && length <= 200) {
    score += 20;
    feedback.push("✓ Good summary length");
  } else if (length < 100) {
    feedback.push("× Summary is too short. Aim for 100-200 characters");
  } else {
    feedback.push("× Summary is too long. Keep it under 200 characters");
  }

  // Keywords check
  const professionalKeywords = [
    "experienced",
    "skilled",
    "professional",
    "expertise",
    "accomplished",
  ];
  const keywordsFound = professionalKeywords.filter((word) =>
    summary.toLowerCase().includes(word.toLowerCase()),
  );
  score += keywordsFound.length * 5;
  if (keywordsFound.length > 0) {
    feedback.push(`✓ Found ${keywordsFound.length} professional keyword(s)`);
  } else {
    feedback.push("× Consider adding professional keywords");
  }

  // Personal pronouns check
  const personalPronouns = ["i", "me", "my", "mine"];
  const hasPronouns = personalPronouns.some((pronoun) =>
    new RegExp(`\\b${pronoun}\\b`, "i").test(summary),
  );
  if (!hasPronouns) {
    score += 15;
    feedback.push("✓ Good job avoiding personal pronouns");
  } else {
    feedback.push("× Remove personal pronouns from summary");
  }

  return {
    score: Math.min(score, 100),
    feedback: feedback.join("\n"),
  };
};

export const calculateOverallScore = (
  summaryScore: number,
  bulletAnalysis: Record<string, { pass: boolean }>,
): number => {
  const bulletPoints = Object.values(bulletAnalysis).filter(
    (item) => item.pass,
  ).length;
  const maxBulletPoints = Object.keys(bulletAnalysis).length;
  const bulletScore = (bulletPoints / maxBulletPoints) * 70; // Bullet points are 70% of total score
  const weightedSummaryScore = summaryScore * 0.3; // Summary is 30% of total score

  return Math.round(bulletScore + weightedSummaryScore);
};

const buzzwords = [
  "inovação",
  "transformação digital",
  "inteligência artificial",
  "machine learning",
  "big data",
  "cloud computing",
  "blockchain",
  "metaverso",
  "realidade aumentada",
  "realidade virtual",
  "internet das coisas",
  "cybersegurança",
  "tecnologia disruptiva",
  "api",
  "plataforma",
  "algoritmo",
  "agilidade",
  "escalabilidade",
  "data driven",
  "metodologias ágeis",
  "startup",
  "empreendedorismo",
  "sinergia",
  "otimização",
  "performance",
  "impacto",
  "sustentabilidade",
  "colaboração",
  "empoderamento",
  "liderança",
  "proativo",
  "resiliência",
  "pensamento crítico",
  "networking",
  "mentoria",
  "cultura organizacional",
  "roi",
  "retorno sobre o investimento",
  "experiência do usuário",
  "ux",
  "ui",
  "engajamento",
  "branding",
  "marketing digital",
  "conteúdo relevante",
  "influenciador digital",
  "storytelling",
  "posicionamento de marca",
  "comunidade",
  "tráfego orgânico",
  "seo",
  "otimização para mecanismos de busca",
  "mindset",
  "competências",
  "habilidades",
  "desenvolvimento pessoal",
  "protagonismo",
  "flexibilidade",
  "versatilidade",
  "inclusão",
  "diversidade",
  "propósito",
  "jornada",
];

export const analyzeNumberOfBullets = (bullets: string[]): AnalyseItem => {
  const pass = bullets.length >= 3 && bullets.length <= 10;
  return {
    pass,
    highlightWords: bullets,
    title: "Quantidade de items",
    message:
      bullets.length < 3
        ? "Adicione mais itens (tente ter pelo menos 3)."
        : bullets.length > 10
          ? "Considere reduzir o número de itens (tente ter no máximo 10)."
          : "Bom número de itens!",
  };
};

export const analyzeActiveVoice = (bullets: string[]): AnalyseItem => {
  const passiveIndicators = [
    "foi",
    "foram",
    "sido",
    "sendo",
    "é",
    "são",
    "era",
    "eram",
  ];
  const hasPassiveVoice = bullets.some((b) =>
    passiveIndicators.some((word) => new RegExp(`\\b${word}\\b`, "i").test(b)),
  );

  const highlightWords: string[] = lodash
    .concat(
      ...passiveIndicators.map((passiveIndicator) => {
        return bullets.map((b) => {
          const match = new RegExp(`\\b${passiveIndicator}\\b`, "i").exec(b);
          return match ? match[0] : null;
        });
      }),
    )
    .filter((pronoun) => !!pronoun) as string[];

  return {
    pass: !hasPassiveVoice,
    highlightWords: [...new Set(highlightWords)],
    title: "Use uma voz ativa",
    message: hasPassiveVoice
      ? "Considere usar mais voz ativa em seus itens."
      : "Bom uso de voz ativa!",
  };
};

export const analyzeBuzzwords = (bullets: string[]): AnalyseItem => {
  const hasBuzzwords = bullets.some((bullet) => {
    const wordsInBullet = bullet.toLowerCase().split(/\b/); // Split using word boundaries
    const cleanedWords = wordsInBullet.filter((word) => word.trim() !== ""); // Remove empty strings

    return buzzwords.some((buzzword) => {
      return cleanedWords.includes(buzzword);
    });
  });

  return {
    pass: !hasBuzzwords,
    highlightWords: [],
    title: "Remova as palavras da moda",
    message: hasBuzzwords
      ? "Considere substituir palavras da moda por descrições mais específicas e significativas."
      : "Bom trabalho evitando palavras da moda genéricas!",
  };
};

interface AnalyseItem {
  pass: boolean;
  title: string;
  message: string;
  highlightWords: string[];
}

export const analyzePersonalPronouns = (bullets: string[]): AnalyseItem => {
  const pronouns = [
    "eu",
    "me",
    "meu",
    "minha",
    "meus",
    "minhas",
    "nós",
    "nosso",
    "nossa",
    "nossos",
    "nossas",
  ];
  const hasPronouns = bullets.some((b) =>
    pronouns.some((pronoun) => new RegExp(`\\b${pronoun}\\b`, "i").test(b)),
  );

  const highlightWords: string[] = lodash
    .concat(
      ...pronouns.map((pronoun) => {
        return bullets.map((b) => {
          const match = new RegExp(`\\b${pronoun}\\b`, "i").exec(b);
          return match ? match[0] : null;
        });
      }),
    )
    .filter((pronoun) => !!pronoun) as string[];

  return {
    pass: !hasPronouns,
    title: "Remova os pronomes pessoais",
    highlightWords: [...new Set(highlightWords)],
    message: hasPronouns
      ? "Remova os pronomes pessoais para manter um tom profissional."
      : "Bom trabalho por evitar pronomes pessoais!",
  };
};

export const analyzeQuantification = (bullets: string[]): AnalyseItem => {
  // const hasNumbers = /\d/.test(bullets.join(""));
  const hasNumbers = bullets.every((b) => /\d/.exec(b));
  const highlightWords = bullets.filter((b) => !/\d/.exec(b));

  if (highlightWords.length) {
    console.log(
      "every",
      bullets.every((b) => /\d/.exec(b)),
      highlightWords,
    );
  }

  return {
    pass: hasNumbers,
    highlightWords,
    title: "Inserir quantificação",
    message: hasNumbers
      ? "Bom uso de dados numéricos!"
      : "Tente incluir números para quantificar suas conquistas (ex: aumentou as vendas em 25%).",
  };
};
