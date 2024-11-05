import dotenv from "dotenv";
dotenv.config();
import express from "express";
import fetchEvents from "../fetchEvents";
import helmet from "helmet";
import AWS from "aws-sdk";

const app = express();
app.use(helmet());

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

app.get("/", (_, res) => {
  res.send("./index.html");
});

app.get("/getEvents", async (_, res) => {
  try {
    const params = {
      Bucket: "rpicalendarevents",
      Key: "events.json",
    };
    const data = await s3.getObject(params).promise();

    if (data.Body) {
      const events = JSON.parse(data.Body.toString("utf-8"));
      res.json(events);
    } else {
      res.status(500).send("File content is empty.");
    }
  } catch (error) {
    res.status(500).send("Failed to load events");
  }
});

app.get("/scrapeEvents", async (_, res) => {
  try {
    const scrapedEvents = await fetchEvents();
    res.send(scrapedEvents);
  } catch (error) {
    console.error("Error writing to S3:", error);
    res.status(500).send("Failed to scrape events");
  }
});

module.exports = app;
