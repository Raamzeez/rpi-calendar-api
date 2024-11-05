import { chromium } from "playwright";
import Event from "./models/Event";

const fetchEvents = async (): Promise<Event[] | Error> => {
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://registrar.rpi.edu/academic-calendar");

    const events: Event[] = [];

    const tables = await page.locator(".table-responsive.col-md-12").all();

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const title = table.locator("h2");
      const year = (await title.innerText()).split(" ")[1];
      const rows = await table.locator("tbody tr td").all();
      for (let j = 0; j < rows.length; j += 3) {
        const startDateText = await rows[j].innerText();
        const description = await rows[j + 2].innerText();
        const splitDates = startDateText.split(" - ");
        const startDate = new Date(splitDates[0] + " " + year);
        const endDate =
          splitDates.length > 1 ? new Date(splitDates[1] + " " + year) : null;
        events.push({ startDate, endDate, description });
      }
    }
    await browser.close();
    return events;
  } catch (err) {
    if (err instanceof Error) {
      return new Error(err.message);
    } else {
      return new Error("An unknown error occurred");
    }
  }
};

export default fetchEvents;
