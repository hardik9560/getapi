export type Role = 'USER' | 'SELLER' | 'ADMIN';
export type ComponentStatus = 'DRAFT' | 'UNDER_REVIEW' | 'PUBLISHED' | 'REJECTED';
export type LicenseType = 'PERSONAL' | 'TEAM' | 'ENTERPRISE';

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: Role;
  bio?: string;
  website?: string;
  githubUrl?: string;
  twitterUrl?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  componentCount: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  teamPrice: number;
  enterprisePrice: number;
  category: Category;
  categoryId: string;
  tags: Tag[];
  images: string[];
  previewUrl?: string;
  videoUrl?: string;
  fileUrl: string;
  documentation?: string;
  version: string;
  framework: string;
  styling: string;
  status: ComponentStatus;
  featured: boolean;
  downloadCount: number;
  averageRating: number;
  reviewCount: number;
  creator: User;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  helpful: number;
  user: User;
  userId: string;
  componentId: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  userId: string;
  component: ComponentItem;
  componentId: string;
  licenseType: LicenseType;
  price: number;
  stripePaymentId?: string;
  invoiceUrl?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  component: ComponentItem;
  componentId: string;
  licenseType: LicenseType;
}

export interface WishlistItem {
  id: string;
  component: ComponentItem;
  componentId: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  discountAmount?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  active: boolean;
}

export interface Changelog {
  id: string;
  version: string;
  changes: string;
  componentId: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: User;
  category: string;
  tags: string[];
  readingTime: string;
  publishedAt: string;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  frameworks: string[];
  stylings: string[];
  ratings: number;
  licenseTypes: string[];
  dateRange: string;
  freeOnly: boolean;
  searchQuery: string;
  sortBy: string;
}

// ─── API Marketplace ─────────────────────────────────────────────────────────

export type ApiStatus = 'DRAFT' | 'UNDER_REVIEW' | 'PUBLISHED' | 'DEPRECATED';
export type ApiAuthType = 'API_KEY' | 'OAUTH2' | 'BEARER' | 'BASIC' | 'NONE';
export type ApiPricingModel = 'FREE' | 'PAY_PER_CALL' | 'SUBSCRIPTION' | 'FREEMIUM';

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  apiCount: number;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'WS';
  path: string;
  description: string;
}

export interface ApiItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  baseUrl: string;
  version: string;
  category: ApiCategory;
  categoryId: string;
  tags: Tag[];
  authType: ApiAuthType;
  pricingModel: ApiPricingModel;
  price: number;
  teamPrice: number;
  enterprisePrice: number;
  freeCallsPerMonth: number;
  endpoints: ApiEndpoint[];
  documentation: string;
  codeSnippet: string;
  status: ApiStatus;
  featured: boolean;
  callCount: number;
  averageRating: number;
  reviewCount: number;
  uptime: number;
  latencyMs: number;
  creator: User;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

