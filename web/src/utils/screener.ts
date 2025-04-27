import { type Screener } from '../models/screener';

export async function fetchScreener(): Promise<Screener> {
  const response = await fetch('/api/screener');
  if (!response.ok) {
    throw new Error('Failed to fetch screener');
  }
  return await response.json();
}
