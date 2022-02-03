const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const addTimeStamp = functions.firestore
  .document("/library/{id}")
  .onCreate((snap, context) => {
    const data = snap.data();
    if (data) {
      return snap.ref.set(
        {
          lastChecked: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  });

exports.addTimeStamp = addTimeStamp;
