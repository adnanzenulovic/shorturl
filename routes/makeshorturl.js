const URL = require("../models/url");

module.exports.makeShortUrl = async (req, res) => {
  let url = req.query.url;
  let pattern = new RegExp(
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  if (pattern.test(url)) {
    let random = (Math.random() + 1).toString(36).substring(7);
    let good = false;
    while (!good) {
      let check = await URL.findOne({ url: random });
      if (random == "count") continue;
      if (check == null) good = true;
    }
    let linkToSend = new URL({ url: random, redirectTo: url });
    await linkToSend.save();
    return res.send({ link: random, url: url });
  } else return res.send(false);
};
