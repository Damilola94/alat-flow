export interface Invoice {
  id: string;
  amount: string;
  due?: string;
  badge?: string;
  variant?: "pink" | "purple";
}