// TypeScript interface
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