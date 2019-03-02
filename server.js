const PORT = process.env.PORT || 5000;
const appName = "botAndPusher";
const distPath = `/dist/${appName}`;

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
// const cors = require("cors");
require("dotenv").config();
const shortId = require("shortid");
const dialogFlow = require("./dialogFlow");

const app = express();
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.CLUSTER,
  encrypted: true
});

const botTagName = "@" + process.env.BOT_CALLNAME;

app.post("/message", async (req, res) => {
  // simulate actual db save with id and createdAt added
  const chat = {
    ...req.body,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  };
  // trigger this update to our pushers listeners
  pusher.trigger("chat-group", "chat", chat);

  // check if this message was invoking our bot, /bot
  // then the bot will respond with its message
  if (chat.message.startsWith(botTagName)) {
    const message = chat.message.split(botTagName)[1];
    const response = await dialogFlow.send(message);
    pusher.trigger("chat-group", "chat", {
      message: `@${chat.displayName} ${
        response.data.result.fulfillment.speech
      }`,
      displayName: botTagName,
      email: "bot@we.com",
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    });
  }

  res.send(chat);
});

app.post("/join", (req, res) => {
  const chat = {
    ...req.body,
    id: shortId.generate(),
    type: "joined",
    createdAt: new Date().toISOString()
  };
  // trigger this update to our pushers listeners
  pusher.trigger("chat-group", "chat", chat);
  res.send(chat);
});

// For production deployment
if (process.env.NG_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, distPath)));
  // Handle React routing, return all requests to React app
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, distPath, "index.html"));
  });
}

const IP = process.env.IP;
app.listen(PORT, () => console.log(`Listening at IP: ${IP} | Port: ${PORT}`));
