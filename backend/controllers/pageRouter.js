const express = require('express')
const db = require('../firestore')

const pageRouter = express.Router()
const storiesReference = db.collection('data').doc('stories')

// Pull a field from config node of a test story
pageRouter.get('/test', async (req, res) => {
    const docRef = await db.collection('test_story').doc('config')
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            res.send(doc.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
});

// Get all stories
pageRouter.get('/', async (req, res) => {

    var collectionIDs = [];

    const documentRef = db.collection('data').doc('stories')
    documentRef.listCollections().then(collections => {
        for (let collection of collections) {
          collectionIDs.push({"id" : collection.id, "name": collection.doc('config').title})
        }
        res.status(200).send({stories: collectionIDs})
      });

});

// Create a new storys
pageRouter.post('/create', async (req, res) => {
    storiesReference.collection(req.name).doc('config').set({
        title: req.title,
        author: req.author,
        zoom: req.zoom,
        position: [position.x, position.y]
    })
})

module.exports = pageRouter
