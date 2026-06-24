# Nairobi Rent API 20260624b

A RESTful API providing real-time rental price data for various neighborhoods in Nairobi, Kenya. Designed for integration into real estate and property management applications.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

- `GET /api/rentals`: Fetch all neighborhood rental data.
- `GET /api/rentals/:slug`: Fetch data for a specific neighborhood (e.g., /api/rentals/kilimani).
- `GET /api/summary`: Get statistical summary across all regions.