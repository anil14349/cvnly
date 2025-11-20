interface ATSScoreResult {
  score: number;
  recommendations: string[];
  breakdown: {
    keywords: number;
    format: number;
    sections: number;
    length: number;
    readability: number;
  };
}

export const calculateATSScore = (resumeData: {
  name: string;
  title: string;
  sections: any[];
  skills: any[];
  experiences: any[];
  educations: any[];
  projects: any[];
}): ATSScoreResult => {
  const recommendations: string[] = [];
  const breakdown = {
    keywords: 0,
    format: 0,
    sections: 0,
    length: 0,
    readability: 0,
  };

  // 1. Keywords Analysis (25 points)
  const allText = JSON.stringify(resumeData).toLowerCase();
  const commonKeywords = [
    'managed', 'developed', 'created', 'implemented', 'designed',
    'improved', 'increased', 'reduced', 'achieved', 'delivered',
    'led', 'collaborated', 'analyzed', 'optimized', 'coordinated'
  ];
  const keywordMatches = commonKeywords.filter(keyword => allText.includes(keyword)).length;
  breakdown.keywords = Math.min(25, (keywordMatches / commonKeywords.length) * 25);

  if (breakdown.keywords < 15) {
    recommendations.push('Add more action verbs and industry-specific keywords to improve ATS compatibility');
  }

  // 2. Format Analysis (20 points)
  let formatScore = 20;

  // Check for proper sections
  const hasSections = resumeData.sections.length >= 4;
  if (!hasSections) {
    formatScore -= 5;
    recommendations.push('Include at least 4 major sections (Summary, Experience, Education, Skills)');
  }

  // Check for contact information
  const hasContactInfo = resumeData.name && resumeData.title;
  if (!hasContactInfo) {
    formatScore -= 5;
    recommendations.push('Ensure your name and professional title are clearly stated');
  }

  breakdown.format = Math.max(0, formatScore);

  // 3. Sections Completeness (25 points)
  let sectionsScore = 0;

  if (resumeData.experiences && resumeData.experiences.length > 0) {
    sectionsScore += 8;
  } else {
    recommendations.push('Add work experience to strengthen your resume');
  }

  if (resumeData.educations && resumeData.educations.length > 0) {
    sectionsScore += 7;
  } else {
    recommendations.push('Include your educational background');
  }

  if (resumeData.skills && resumeData.skills.length > 0) {
    sectionsScore += 7;
  } else {
    recommendations.push('Add relevant skills to improve keyword matching');
  }

  if (resumeData.projects && resumeData.projects.length > 0) {
    sectionsScore += 3;
  }

  breakdown.sections = sectionsScore;

  // 4. Content Length (15 points)
  const wordCount = allText.split(/\s+/).length;
  let lengthScore = 0;

  if (wordCount < 200) {
    lengthScore = 5;
    recommendations.push('Your resume is too short. Aim for 300-600 words for optimal length');
  } else if (wordCount >= 200 && wordCount <= 600) {
    lengthScore = 15;
  } else if (wordCount > 600 && wordCount <= 800) {
    lengthScore = 12;
  } else {
    lengthScore = 8;
    recommendations.push('Your resume may be too long. Consider condensing to 600-800 words');
  }

  breakdown.length = lengthScore;

  // 5. Readability (15 points)
  let readabilityScore = 15;

  // Check for quantifiable achievements
  const hasNumbers = /\d+/.test(allText);
  if (!hasNumbers) {
    readabilityScore -= 5;
    recommendations.push('Add quantifiable achievements (numbers, percentages, metrics) to demonstrate impact');
  }

  // Check for bullet points in experiences
  const totalBulletPoints = resumeData.experiences.reduce((acc, exp) =>
    acc + (exp.achievements?.length || 0), 0);

  if (totalBulletPoints < 6) {
    readabilityScore -= 5;
    recommendations.push('Use more bullet points to improve readability (aim for 3-5 per role)');
  }

  breakdown.readability = Math.max(0, readabilityScore);

  // Calculate total score
  const totalScore = Math.round(
    breakdown.keywords +
    breakdown.format +
    breakdown.sections +
    breakdown.length +
    breakdown.readability
  );

  // Add general recommendations based on score
  if (totalScore < 60) {
    recommendations.unshift('Your resume needs significant improvement for ATS systems');
  } else if (totalScore < 80) {
    recommendations.unshift('Your resume is good but can be optimized further for ATS systems');
  } else {
    recommendations.unshift('Excellent! Your resume is well-optimized for ATS systems');
  }

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    recommendations,
    breakdown,
  };
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};
