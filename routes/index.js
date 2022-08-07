const express = require("express");
const path = require("path");
const router = express.Router();
const URL = require("../models/url");
const { makeShortUrl } = require("./makeshorturl");

require(path.join(__dirname, "..", "db.js"));
require("dotenv").config();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const domain = process.env.WEBSITE;
router.get("/", async function (req, res) {
  let count = domain + "/count";
  res.render("homepage.hbs", {
    website: domain,
    count: count,
  });
});

router.get("/makeShortUrl", makeShortUrl);

router.get("/:url", async function (req, res) {
  let url = req.params.url;
  let redirect = domain + "/count";

  if (url == "countNumber") {
    let one = await countNumber(req.query.url);
    return res.send(String(one));
  }
  if (url == "count") return res.render("count.hbs", { website: domain });
  let website = domain;
  let check = await URL.findOne({ url: url });
  if (check == null) return res.redirect(website);
  await URL.updateOne({ url }, { $inc: { count: 1 } });

  let urlTo = "https://" + check.redirectTo;
  return res.redirect(urlTo);
});

router.post("/shortedUrl", (req, res) => {
  let url = req.body.url;
  let redirect = req.body.redirect;
  res.render("shortedUrl.hbs", {
    original: url,
    link: domain + "/" + redirect,
    website: domain,
  });
});

async function countNumber(count) {
  let check = await URL.findOne({ url: count });
  if (check == null) return false;
  else return check.count;
}

module.exports = router;
