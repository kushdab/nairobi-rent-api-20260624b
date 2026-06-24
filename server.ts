import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

interface RentalData {
  id: string;
  neighborhood: string;
  slug: string;
  averageRent1BR: number;
  averageRent2BR: number;
  averageRent3BR: number;
  currency: string;
  lastUpdated: string;
  demandLevel: 'Low' | 'Medium' | 'High';
}

const nairobiRentals: RentalData[] = [
  {
    id: '1',
    neighborhood: 'Kilimani',
    slug: 'kilimani',
    averageRent1BR: 45000,
    averageRent2BR: 75000,
    averageRent3BR: 110000,
    currency: 'KES',
    lastUpdated: '2026-06-24',
    demandLevel: 'High'
  },
  {
    id: '2',
    neighborhood: 'Westlands',
    slug: 'westlands',
    averageRent1BR: 55000,
    averageRent2BR: 90000,
    averageRent3BR: 140000,
    currency: 'KES',
    lastUpdated: '2026-06-24',
    demandLevel: 'High'
  },
  {
    id: '3',
    neighborhood: 'Lang\'ata',
    slug: 'langata',
    averageRent1BR: 30000,
    averageRent2BR: 45000,
    averageRent3BR: 65000,
    currency: 'KES',
    lastUpdated: '2026-06-24',
    demandLevel: 'Medium'
  },
  {
    id: '4',
    neighborhood: 'Karen',
    slug: 'karen',
    averageRent1BR: 70000,
    averageRent2BR: 120000,
    averageRent3BR: 220000,
    currency: 'KES',
    lastUpdated: '2026-06-24',
    demandLevel: 'Medium'
  },
  {
    id: '5',
    neighborhood: 'Roysambu',
    slug: 'roysambu',
    averageRent1BR: 18000,
    averageRent2BR: 28000,
    averageRent3BR: 40000,
    currency: 'KES',
    lastUpdated: '2026-06-24',
    demandLevel: 'High'
  }
];

// Get all rentals
app.get('/api/rentals', (req: Request, res: Response) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: nairobiRentals
  });
});

// Get specific neighborhood
app.get('/api/rentals/:slug', (req: Request, res: Response) => {
  const item = nairobiRentals.find(r => r.slug === req.params.slug.toLowerCase());
  if (!item) {
    return res.status(404).json({ success: false, message: 'Neighborhood not found' });
  }
  res.json({ success: true, data: item });
});

// Get Summary Statistics
app.get('/api/summary', (req: Request, res: Response) => {
  const totalItems = nairobiRentals.length;
  const avg1BR = nairobiRentals.reduce((acc, curr) => acc + curr.averageRent1BR, 0) / totalItems;
  
  res.json({
    success: true,
    stats: {
      totalNeighborhoods: totalItems,
      averageNairobi1BR: Math.round(avg1BR),
      currency: 'KES',
      marketStatus: 'Bullish'
    }
  });
});

// Root check
app.get('/', (req: Request, res: Response) => {
  res.send('Nairobi Rent API is operational.');
});

app.listen(PORT, () => {
  console.log(`[server]: API is running at http://localhost:${PORT}`);
});