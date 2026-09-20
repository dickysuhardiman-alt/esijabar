// WordPress Common Types

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: {
      thumbnail?: { source_url: string };
      medium?: { source_url: string };
      medium_large?: { source_url: string };
      large?: { source_url: string };
      full?: { source_url: string };
    };
  };
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: {
    24?: string;
    48?: string;
    96?: string;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent?: number;
  count?: number;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface WordPressPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featured_media: number;
  featured_image_url?: string;
  featured_image_alt?: string;
  author: number;
  author_name?: string;
  categories: number[];
  category_names?: string[];
  tags: number[];
  status: string;
  link: string;
  _embedded?: {
    author?: WordPressAuthor[];
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: (WordPressCategory | WordPressTag)[][];
  };
}

export interface WordPressPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  date: string;
  modified: string;
  featured_media: number;
  featured_image_url?: string;
  featured_image_alt?: string;
  parent: number;
  status: string;
  link: string;
}

export interface WordPressResponse<T> {
  data: T;
  status: number;
  statusText?: string;
}

export interface WordPressError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
  offset?: number;
}

export interface PaginationMeta {
  total_pages: number;
  total_items: number;
  current_page: number;
  per_page: number;
}

export interface WordPressListResponse<T> {
  items: T[];
  meta: PaginationMeta;
}
