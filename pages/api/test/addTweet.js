import connectMongo from "../../../utils/connectMongo";
import Tweet from "../../../modals/testModal";

export default async function addTweet(req, res) {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("CREATING DOCUMENT");

    const tweet = await Tweet.create(req.body);
    console.log("CREATED DOCUMENT");

    res.json({ tweet });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
