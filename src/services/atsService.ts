/**
 * ATS Service
 * Handles all ATS scoring and analysis business logic
 */

import { calculateATSScore, ATSScore } from '../utils/atsScoreCalculator';
import { supabase } from '../utils/supabaseClient';

export interface ResumeAnalysisData {
  name: string;
  title: string;
  sections: any[];
  skills: any[];
  experiences: any[];
  educations: any[];
  projects: any[];
}

/**
 * Analyze resume and calculate ATS score
 */
export const analyzeResume = (resumeData: ResumeAnalysisData): ATSScore => {
  return calculateATSScore(resumeData);
};

/**
 * Save ATS score to database
 */
export const saveATSScore = async (
  userEmail: string,
  score: ATSScore,
  resumeData: ResumeAnalysisData
): Promise<boolean> => {
  try {
    if (!supabase) return false;

    const { error } = await supabase
      .from('ats_scores')
      .insert([{
        user_email: userEmail,
        score: score.total,
        breakdown: score.breakdown,
        recommendations: score.recommendations,
        resume_data: resumeData,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error saving ATS score:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveATSScore:', error);
    return false;
  }
};

/**
 * Get ATS score history for a user
 */
export const getATSScoreHistory = async (userEmail: string) => {
  try {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('ats_scores')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ATS score history:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getATSScoreHistory:', error);
    return [];
  }
};

/**
 * Compare current score with historical averages
 */
export const compareWithHistory = async (
  userEmail: string,
  currentScore: number
): Promise<{
  average: number;
  improvement: number;
  percentile: number;
}> => {
  try {
    const history = await getATSScoreHistory(userEmail);
    
    if (history.length === 0) {
      return {
        average: currentScore,
        improvement: 0,
        percentile: 50
      };
    }

    const scores = history.map(h => h.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const improvement = currentScore - average;
    
    // Calculate percentile
    const sortedScores = [...scores, currentScore].sort((a, b) => a - b);
    const rank = sortedScores.indexOf(currentScore) + 1;
    const percentile = (rank / sortedScores.length) * 100;

    return {
      average: Math.round(average),
      improvement: Math.round(improvement),
      percentile: Math.round(percentile)
    };
  } catch (error) {
    console.error('Error in compareWithHistory:', error);
    return {
      average: currentScore,
      improvement: 0,
      percentile: 50
    };
  }
};

