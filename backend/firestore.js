const Firestore = require('@google-cloud/firestore')

const db = new Firestore({
    projectId: 'adventure-story-301904',
    keyFilename: 'adventure-story-301904-a988dcece07e.json',
});

module.exports = db