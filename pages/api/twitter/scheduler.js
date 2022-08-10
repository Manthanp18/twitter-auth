import Dotenv from "dotenv";
import TinyURL from "tinyurl";
import NodeSchedule from "node-schedule";
import Twitter from "twitter-lite";
Dotenv.config();

const client = new Twitter({
  subdomain: "api",
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: token.twitter.accessToken,
  access_token_secret: token.twitter.refreshToken,
});
const tweets = require("../tweets.json");

let count = 0;

console.log("Iniciando...");
const date = new Date(2022, 7, 20, 4, 55, 0).toLocaleDateString("ist");
const scheduler = NodeSchedule.scheduleJob(date, () => {
  if (tweets[count]) {
    let { hashtags, title, link } = tweets[count];

    TinyURL.shorten(link, (shortenedUrl) => {
      let hashtagsString = "";

      hashtags.forEach((element) => (hashtagsString += "#" + element + " "));

      const tweet = {
        status: `${title} ${shortenedUrl} ${hashtagsString}`,
      };

      client.post("statuses/update", tweet, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Publicação #${count}: '${title}' realizada`);
        }
        ++count;
      });
    });
  } else {
    scheduler.cancel();
    console.log("Todos os tweets foram publicados");
  }
});
