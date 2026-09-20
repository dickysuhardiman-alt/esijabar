// Achievement Types

import type { WordPressPost } from './wordpress';

export interface Achievement {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  publishedAt: string;
  updatedAt: string;
}

export interface AchievementCard {
  id: number;
  title: string;
  slug: string;
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
}

export interface AchievementDetail extends Achievement {
  relatedAchievements: AchievementCard[];
}

export interface AchievementMeta {
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
}

// WordPress Custom Post Type 'achievement' fields
export interface AchievementCPTFields {
  id: number;
  title: string;
  slug: string;
  content: string;
  date: string;
  modified: string;
  featured_media: number;
  // Custom fields
  subject_name: string;
  competition_name: string;
  category: string;
  year: number;
  result: string;
  status: string;
}

// API Response
export interface AchievementAPIResponse extends WordPressPost {
  acf?: AchievementCPTFields;
}

export type AchievementListAPIResponse = WordPressPost[];

// Result types for achievement
export type AchievementResult =
  | 'Juara 1'
  | 'Juara 2'
  | 'Juara 3'
  | 'Juara Favorit'
  | 'Best Player'
  | 'Best Team'
  | 'Runner Up'
  | 'Semi Finalis'
  | 'Quarter Finalis'
  | 'Peserta'
  | string;

// Placeholder for development
export interface AchievementPlaceholder {
  id: number;
  title: string;
  slug: string;
  subjectName: string;
  competitionName: string;
  category: string;
  year: number;
  result: string;
  featuredImage: string | null;
}
