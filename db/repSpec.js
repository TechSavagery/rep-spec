import { nanoid } from "nanoid";

export async function getRepSpecs(db, from = new Date(), by, limit) {
  return db
    .collection("repSpecs")
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ createdAt: -1 })
    .limit(limit || 10)
    .toArray();
}

export async function insertRepSpec(
  db,
  { creatorId, inputReps, inputWeight, oneRepMax }
) {
  return db
    .collection("repSpecs")
    .insertOne({
      _id: nanoid(12),
      creatorId,
      createdAt: new Date(),
      inputReps,
      inputWeight,
      oneRepMax,
    })
    .then(({ ops }) => ops[0]);
}
