/* eslint-disable linebreak-style */
import nc from "next-connect";
import { all } from "@/middlewares/index";
import { getRepSpecs, insertRepSpec } from "@/db/index";

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

// GET RepSpecs

handler.get(async (req, res) => {
  const repSpecs = await getRepSpecs(
    req.db,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  if (req.query.from && repSpecs.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader("cache-control", `public, max-age=${maxAge}`);
  }

  res.send({ repSpecs });
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthenticated");
  }

  if (!req.body.inputReps || !req.body.inputWeight) {
    return res.status(400).send("Enter Weight + Reps Completed");
  }

  const { inputWeight, inputReps } = req.body;
  const oneRepMax = Math.ceil(inputWeight / (1.0278 - 0.0278 * inputReps));

  const repSpec = await insertRepSpec(req.db, {
    creatorId: req.user._id,
    inputWeight: req.body.inputWeight,
    inputReps: req.body.inputReps,
    oneRepMax,
  });

  return res.json({ repSpec });
});

export default handler;
