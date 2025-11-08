# WhatsApp Inventory Bot

A WhatsApp chatbot that integrates with Google Sheets to provide real-time order status and inventory information.

## Features

- 📦 **Order Tracking**: Check order status by order ID
- 📋 **Inventory Management**: Query product availability and stock levels
- 🔄 **Real-time Data**: Connects directly to Google Sheets
- 💬 **WhatsApp Integration**: Works via Twilio WhatsApp API

## Setup Instructions

### 1. Google Sheets Setup

Create a Google Sheet with two tabs:

**Orders Tab:**
| OrderID | CustomerName | Status | Date | Items |
|---------|--------------|--------|------|-------|
| ORDER123 | John Doe | Shipped | 2025-01-15 | Widget x2 |
| ORDER456 | Jane Smith | Processing | 2025-01-16 | Gadget x1 |

**Inventory Tab:**
| ProductName | SKU | Quantity | Location |
|-------------|-----|----------|----------|
| Widget Pro | WGT-001 | 150 | Warehouse A |
| Gadget Plus | GAD-002 | 75 | Warehouse B |

### 2. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON credentials
6. Share your Google Sheet with the service account email (found in JSON)

### 3. Environment Variables

Set the following environment variables in Vercel:

```bash
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_CREDENTIALS={"type":"service_account",...}
```

### 4. WhatsApp Setup (Twilio)

1. Sign up for [Twilio](https://www.twilio.com)
2. Enable WhatsApp sandbox or get approved for WhatsApp Business
3. Configure webhook URL: `https://your-domain.vercel.app/api/webhook`
4. Set HTTP Method to POST

## Usage

Send messages to your WhatsApp bot:

### Check Order Status
- "Check order status ORDER123"
- "Track order #456"
- "Order status ORDER789"

### Check Inventory
- "Check inventory"
- "Stock of Widget Pro"
- "Is Gadget Plus available?"

### Get Help
- Send any other message to see available commands

## Deployment

Deploy to Vercel:

```bash
npm install
npm run build
vercel deploy --prod
```

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to test the bot interface.

## API Endpoints

- `GET /api/webhook` - Health check
- `POST /api/webhook` - WhatsApp webhook (Twilio)
- `POST /api/test` - Test bot responses locally

## Tech Stack

- Next.js 14
- TypeScript
- Google Sheets API
- Twilio WhatsApp API
- Vercel (deployment)