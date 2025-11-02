# Backend API Documentation

This document outlines the API endpoints and data structures that your backend needs to implement to receive quote requests from the website forms.

## API Endpoint

### POST `/api/quotes`

Receives quote submissions from both landscape and construction quote forms.

**URL**: `http://localhost:3000/api/quotes`

**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Response Format**:
```json
{
  "success": true,
  "message": "Quote request received successfully",
  "quoteId": "optional-unique-id"
}
```

## Data Structures

### Landscape Quote Request

When `formType` is `"landscape_quote"`, the request body will contain:

```json
{
  "formType": "landscape_quote",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "403-555-1234",
  "service": "Lawn Maintenance",
  "message": "I need weekly lawn mowing service",
  "yardAreaSqft": "1500",
  "yardAreaSqm": "139",
  "mapLat": "51.0447",
  "mapLng": "-114.0719",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Field Descriptions**:
- `formType`: Always `"landscape_quote"` for landscape quotes
- `name`: Customer's full name (required)
- `email`: Customer's email address (required)
- `phone`: Customer's phone number (optional, can be `null`)
- `service`: Selected service type (required)
- `message`: Additional message from customer (optional, can be `null`)
- `yardAreaSqft`: Yard area in square feet from map measurement (optional, can be `null`)
- `yardAreaSqm`: Yard area in square meters from map measurement (optional, can be `null`)
- `mapLat`: Latitude from map location (optional, can be `null`)
- `mapLng`: Longitude from map location (optional, can be `null`)
- `timestamp`: ISO 8601 timestamp of submission

### Construction Quote Request

When `formType` is `"construction_quote"`, the request body will contain:

```json
{
  "formType": "construction_quote",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "403-555-5678",
  "address": "123 Main Street, Calgary, AB",
  "serviceType": "concrete-patios",
  "projectDetails": "I want a 20x15 concrete patio in my backyard",
  "approximateSize": "300",
  "preferredTimeline": "3-6months",
  "budgetRange": "10000-25000",
  "additionalInfo": "Would like to include built-in seating",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Field Descriptions**:
- `formType`: Always `"construction_quote"` for construction quotes
- `name`: Customer's full name (required)
- `email`: Customer's email address (required)
- `phone`: Customer's phone number (required)
- `address`: Project address (required)
- `serviceType`: Selected construction service (required)
  - Possible values: `"concrete-patios"`, `"wood-decks"`, `"concrete-sidewalks"`, `"concrete-driveways"`, `"multiple"`
- `projectDetails`: Detailed project description (optional, can be `null`)
- `approximateSize`: Approximate size in square feet (optional, can be `null`)
- `preferredTimeline`: Preferred project timeline (optional, can be `null`)
  - Possible values: `"asap"`, `"1-2months"`, `"3-6months"`, `"6+months"`, `"flexible"`
- `budgetRange`: Budget range (optional, can be `null`)
  - Possible values: `"under-5000"`, `"5000-10000"`, `"10000-25000"`, `"25000-50000"`, `"over-50000"`, `"not-sure"`
- `additionalInfo`: Additional information (optional, can be `null`)
- `timestamp`: ISO 8601 timestamp of submission

## Example Backend Implementation

### Node.js/Express Example

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/quotes', async (req, res) => {
  try {
    const quoteData = req.body;
    
    // Validate required fields
    if (!quoteData.name || !quoteData.email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }
    
    // Handle different form types
    if (quoteData.formType === 'landscape_quote') {
      // Process landscape quote
      // Save to database, send email, etc.
      console.log('Landscape Quote:', quoteData);
    } else if (quoteData.formType === 'construction_quote') {
      // Process construction quote
      // Save to database, send email, etc.
      console.log('Construction Quote:', quoteData);
    }
    
    // Save to database (example)
    // const savedQuote = await QuoteModel.create(quoteData);
    
    // Send email notification (example)
    // await sendEmailNotification(quoteData);
    
    res.status(200).json({
      success: true,
      message: 'Quote request received successfully',
      quoteId: 'optional-id'
    });
    
  } catch (error) {
    console.error('Error processing quote:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Python/Flask Example

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/quotes', methods=['POST'])
def receive_quote():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('name') or not data.get('email'):
            return jsonify({
                'success': False,
                'message': 'Name and email are required'
            }), 400
        
        # Handle different form types
        if data.get('formType') == 'landscape_quote':
            # Process landscape quote
            print('Landscape Quote:', data)
        elif data.get('formType') == 'construction_quote':
            # Process construction quote
            print('Construction Quote:', data)
        
        # Save to database, send email, etc.
        
        return jsonify({
            'success': True,
            'message': 'Quote request received successfully',
            'quoteId': 'optional-id'
        }), 200
        
    except Exception as e:
        print(f'Error processing quote: {e}')
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
```

## Error Handling

The frontend expects these response formats:

### Success Response
```json
{
  "success": true,
  "message": "Quote request received successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- `200`: Success
- `400`: Bad Request (missing required fields)
- `500`: Internal Server Error

## CORS Configuration

Make sure your backend allows requests from your frontend domain. For development (localhost), you can use:

```javascript
// Express
app.use(cors({
  origin: 'http://localhost:8000', // Your frontend URL
  credentials: true
}));
```

## Production Deployment

When deploying to production:

1. Update the `API_BASE_URL` in both `quote.html` and `construction-quote.html`:
   ```javascript
   const API_BASE_URL = 'https://your-production-backend.com';
   ```

2. Update CORS settings to allow your production frontend domain

3. Consider adding rate limiting to prevent spam

4. Implement email notifications (using nodemailer, sendgrid, etc.)

5. Add database storage (MongoDB, PostgreSQL, etc.)

## Testing

You can test the endpoint using curl:

```bash
# Test Landscape Quote
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "landscape_quote",
    "name": "Test User",
    "email": "test@example.com",
    "service": "Lawn Maintenance"
  }'

# Test Construction Quote
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "construction_quote",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "403-555-1234",
    "address": "123 Test St",
    "serviceType": "concrete-patios"
  }'
```


