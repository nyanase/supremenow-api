const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");
require("dotenv/config");

const casesRoutes = require("./routes/case");
const articlesRoutes = require("./routes/article");
const timerCheckerRoutes = require("./routes/timerChecker");

const app = express();

app.use(bodyParser.json());

app.use("/cases", casesRoutes);

app.use("/articles", articlesRoutes);

app.use("/timer-checker", timerCheckerRoutes);

app.get("/", (req, res) => {
  res.send("We are on home");
});

app.get("/link", (req, res) => {
  res.redirect("https://apps.apple.com/us/app/supremenow/id1560924187");
});

app.get("/link/:docket", (req, res) => {
  res.redirect("https://apps.apple.com/us/app/supremenow/id1560924187");
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
          paths: ["/link/*"],
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
