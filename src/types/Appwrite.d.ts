// Appwrite.d.ts
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $collectionId: string;
  $databaseId: string;
  $permissions: string[];
}

export interface NewsArticle extends AppwriteDocument {
  headlines: string;
  lead: string;
  "paragraph-1": string;
  "paragraph-2": string;
  "paragraph-3": string;
  img: string;
  pullquote: string;
  published: boolean;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface HomepageNewsProps {
  maxArticles?: number;
  showFeatured?: boolean;
  compact?: boolean;
}

export interface AboutArticle extends AppwriteDocument {
  headlines: string;
  lead: string;
  img: string;
  pullquote?: string;
  "paragraph-1": string;
  "paragraph-2": string;
  "paragraph-3": string;
  timeline_img_1?: string;
  timeline_img_2?: string;
  timeline_img_3?: string;
  years_tradition?: number;
  active_members?: number;
  number_of_teams?: number;
  cta_primary_text?: string;
  cta_secondary_text?: string;
  cta_primary_link?: string;
  cta_secondary_link?: string;
}

export interface Team extends AppwriteDocument {
  team_name: string; // f.eks. "J2019" eller "G2018"
  coach_name: string;
  coach_email: string;
  coach_phone: string;
  age_group: number; // f.eks. 2019, 2018 for sortering
  description?: string; // Valgfri beskrivelse av laget
  is_active: boolean;
}

// Storage-relaterte types (nye)
export interface StorageFile extends AppwriteDocument {
  bucketId: string;
  name: string;
  signature: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

export interface DownloadConfig {
  bucketId: string;
  fileId: string;
  fileName?: string;
}