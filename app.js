const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");
require("dotenv/config");

const casesRoutes = require("./routes/case");
const articlesRoutes = require("./routes/article");

const app = express();

app.use(bodyParser.json());

app.use("/cases", casesRoutes);

app.use("/articles", articlesRoutes);

app.get("/", (req, res) => {
  res.send("We are on home");
});

// apple app site association
app.get("/apple-app-site-association", (req, res) => {
  res.header("Content-Type", "application/json");
  let info = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "NT25M6QA49.com.SupremeNow.SupremeNow",
          paths: ["*"],
        },
      ],
    },
  };
  res.send(JSON.stringify(info, null, 3));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
