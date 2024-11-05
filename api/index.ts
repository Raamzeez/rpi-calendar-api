import express from "express";
import path from "path";
import fs from "fs";
import fetchEvents from "../fetchEvents";
import helmet from "helmet";

const app = express();
app.use(helmet());

app.get("/", (_, res) => {
  res.send("./index.html");
});

app.get("/getEvents", (_, res) => {
  try {
    const data = fs.readFileSync(path.join("/tmp", "events.json"), "utf8");
    const events = JSON.parse(data);
    res.json(events);
  } catch (error) {
    res.status(500).send("Failed to load events");
  }
});

app.get("/scrapeEvents", async (_, res) => {
  try {
    const scrapedEvents = await fetchEvents();
    const data = JSON.stringify(scrapedEvents, null, 2);
    fs.writeFileSync(path.join("/tmp", "events.json"), data, "utf8"); // Save to /tmp, Vercel's writable area
    res.send(scrapedEvents);
  } catch (error) {
    res.status(500).send("Failed to scrape events");
  }
});

module.exports = app;
