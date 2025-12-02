export interface User {
  id: string;
  google_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: Date;
}

export interface LearningEntry {
  id: string;
  user_id: string;
  language: string;
  original_text: string;
  pronunciation_data: PronunciationWord[];
  created_at: Date;
}

export interface PronunciationCache {
  id: string;
  language: string;
  word: string;
  ipa: string;
  audio_url: string | null;
  created_at: Date;
}

export interface PronunciationWord {
  word: string;
  ipa: string;
  audioUrl: string;
}

export interface PronounceRequest {
  text: string;
  language: string;
}

export interface PronounceResponse {
  words: PronunciationWord[];
}

export interface AnalyzeRequest {
  text: string;
  language: string;
}

export interface AnalyzeResponse {
  words: PronunciationWord[];
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}