import Twitter from "twitter-lite";
import { getSession } from "next-auth/client";
import { getToken } from "next-auth/jwt";

export default async (req, res) => {
  // const body = JSON.parse(req.body);
  console.log(req.body);

  let thread=[]

  const array = req.body.forEach((item)=>thread.push(item.bucketitem))
   console.log(thread)

  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const client = new Twitter({
    subdomain: "api",
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: token.twitter.accessToken,
    access_token_secret: token.twitter.refreshToken,
  });

  async function tweetThread(thread) {
    let lastTweetID = "";
    for (const status of thread) {
      const tweet = await client.post("statuses/update", {
        status: status,
        in_reply_to_status_id: lastTweetID,
        auto_populate_reply_metadata: true,
      });
      lastTweetID = tweet.id_str;
    }
  }
  // const thread = ["First tweet", "Second tweet", "Third tweet"];
  tweetThread(thread).catch(console.error);
};
