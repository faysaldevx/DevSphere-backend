import express from "express";
import cors from "cors";

const app = express();

const port = 8000;
app.use(cors());
app.use(express.json());


import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
import { createRemoteJWKSet, jwtVerify } from "jose";

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient = await connectToMongoDB();
const db = mongoClient.db("devsphere");
const eventsCollection = db.collection("events");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ msg: "Unauthorized!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ msg: "Unauthorized!" });
  }

  const JWKS = createRemoteJWKSet(
    new URL(`${process.env.CLIENT_URL}/api/auth/jwks`),
  );

  try {
    const { payload } = await jwtVerify(token, JWKS);

    next();
  } catch (error) {
    return res.status(500).send({ msg: "Server Error!" });
  }
};

app.post("/event", async (req, res) => {
  const data = req.body;
  const result = await eventsCollection.insertOne(data);
  res.send(result);
});

app.get("/events", async (req, res) => {
  const events = await eventsCollection.find().toArray();

  res.send(events);
});

app.get("/events/:id", async (req, res) => {
  const id = req.params.id;

  const event = await eventsCollection.findOne({ _id: new ObjectId(id) });

  res.send(event);
});

app.delete("/events/:id", async (req, res) => {
  const id = req.params.id;

  const result = await eventsCollection.deleteOne({
    _id: new ObjectId(id),
  });

  res.send(result);
});


app.patch("/events/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await eventsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: data },
  );

  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Hello World from PH..");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
export default app;