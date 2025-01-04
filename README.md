# RPI Calendar Scraper v1.0

An API for retrieving all events on the Rensselaer Polytechnic Institute (RPI) academic calendar, either from a cached daily result for quicker response times or by performing a real-time scrape of the RPI academic calendar website.

## Event JSON Example

```json
{
  "startDate": "2024-10-12T04:00:00.000Z",
  "endDate": "2024-10-25T04:00:00.000Z",
  "description": "Late Degree application (paper) for December 2024 graduation, if did not apply in SIS, will begin being accepted."
}
```

## Event JSON Type

```typescript
{
  "startDate": string,
  "endDate": Date | null,
  "description": string
}
```

## API Endpoints

### `/getEvents`
- **Return Type:** `Event[]`
- **Description:** Returns an array of all events on the school calendar for the latest academic year.
- **Notes:** Uses a cached result on the server, which is updated at least once daily at midnight. This provides response times up to 5x faster than real-time scraping.

## Setup and Usage

1. **Installation:** Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/Raamzeez/rpi-calendar-api.git
   cd rpi-calendar-scraper
   npm install

2. **Add Environment Variables:** Create a ```.env``` file in the root directory and supply the credentials

   ```bash
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=
   ```

3. **Running the Server:** Start the server to make the API endpoints available.

   ```bash
   npm run start
   ```
   
4. **Accessing the API:** Once the server is running, you can access the following endpoints:

   - **`/getEvents`**: Returns cached events for quicker response times.

   Use these endpoints by sending a GET request to the server's URL followed by the endpoint path.


