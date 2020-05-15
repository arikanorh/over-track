import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const app = admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const updateSessionStats = functions.region('europe-west3').firestore.document('users/{userid}/games/{gameid}').onWrite(
    async (change, context) => {
        const uid = context.params.userid;
        const data = change.after.data();

        const sessionid = data?.sessionid;

        const response = await app.firestore().collection('users/' + uid + "/games").where('sessionid', '==', sessionid).get();

        const docs = response.docs;

        const total = docs.length;
        const win = docs.filter(e => e.data().status === 'WIN').length;
        const lose = docs.filter(e => e.data().status === 'LOSE').length;
        const tie = docs.filter(e => e.data().status === 'TIE').length;
        const stats = {
            total, win, lose, tie
        };

        return app.firestore().collection('users/' + uid + '/sessions').doc(sessionid).set(stats, { merge: true })
    }
)

export const updateLastGameOfNewSession = functions.region('europe-west3').firestore.document('users/{userid}/sessions/{sessionid}').onCreate(
    async (snapshot, context) => {
        const uid = context.params.userid;
  
        const started = snapshot.data()?.started;

        const previousSessionResponse = await app.firestore().collection('users/' + uid + "/sessions").where('started', '<', started).orderBy('started','desc').limit(1).get();
        
        const previousSessionId = previousSessionResponse.docs[0].id

        const response = await app.firestore().collection('users/' + uid + "/games").where('sessionid', '==', previousSessionId).orderBy('timestamp','desc').limit(1).get();



        const docs = response.docs;

        const doc = docs[0];

        return snapshot.ref.set({last_game:doc.data()},{merge:true})
        
    }
)
