const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with the service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the Firestore service
const db = admin.firestore();

// Fetch data from a Firestore collection
async function fetchMtn() {
  try {
    const snapshot = await db.collection('mtn').get();
    if (snapshot.empty) {
      console.log('No documents found.');
      return [];
    }

    // Collect documents into an array
    const documents = [];
    snapshot.forEach(doc => {
      documents.push(doc.data());
    });

    return documents;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchAirtel() {
  try {
    const snapshot = await db.collection('airtel').get();
    if (snapshot.empty) {
      console.log('No documents found.');
      return [];
    }

    // Collect documents into an array
    const documents = [];
    snapshot.forEach(doc => {
      documents.push(doc.data());
    });

    return documents;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchGlo() {
  try {
    const snapshot = await db.collection('glo').get();
    if (snapshot.empty) {
      console.log('No documents found.');
      return [];
    }

    // Collect documents into an array
    const documents = [];
    snapshot.forEach(doc => {
      documents.push(doc.data());
    });

    return documents;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchMobile() {
  try {
    const snapshot = await db.collection('9mobile').get();
    if (snapshot.empty) {
      console.log('No documents found.');
      return [];
    }

    // Collect documents into an array
    const documents = [];
    snapshot.forEach(doc => {
      documents.push(doc.data());
    });

    return documents;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Export the fetchMtn function
module.exports = {
  fetchMtn,
  fetchAirtel,
  fetchGlo,
  fetchMobile
}
