export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  name: string;
  company: string | null;
  rating: number;
  message: string;
  status: ReviewStatus;
  created_at: string;
}

export interface ReviewInsert {
  name: string;
  company?: string;
  rating: number;
  message: string;
}
