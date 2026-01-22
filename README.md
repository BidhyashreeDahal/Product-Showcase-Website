# Brewline Supply — Coffee Bar Showcase

A professional coffee-bar ecommerce showcase built with Next.js, Contentful, and Tailwind CSS. The site includes a product catalog, filtering, cart, and support pages with a warm, minimal brand aesthetic.

## Features

- Coffee-bar themed UI with Tailwind CSS
- Product catalog with search, category filter, and pagination
- Product detail pages with highlights, shipping/returns, and customer notes
- Cart flow + mock checkout page
- Support pages (FAQ, Care Guide, Shipping & Returns, Contact)
- Content managed in Contentful

## Tech Stack

- Next.js (Pages Router)
- Tailwind CSS
- Contentful (content + management)

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
JWT_SECRET=your_jwt_secret
```

## Contentful Model (Product)

Required fields:

- `title` (Short text)
- `description` (Long text)
- `category` (Short text)
- `price` (Number)
- `image` (Asset or URL)

Optional:

- `author` (Short text) — used for permissions

Recommended categories:

- `Brew Tools`
- `Ceramics`
- `Storage`
- `Accessories`

## Pages

- `/` Home
- `/products` Shop
- `/products/[id]` Product detail
- `/cart` Cart
- `/checkout` Mock checkout
- `/care-guide` Care guide
- `/shipping` Shipping & returns
- `/faq` FAQ
- `/contact` Contact

## Screenshots

Add screenshots here when ready:

```
![Home](./docs/home.png)
![Shop](./docs/shop.png)
```

## Deployment

Deploy on Vercel or any Node.js hosting provider. Ensure environment variables are set in the hosting platform.
