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
