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
          collectionIDs.push({
            "id" : collection.id, 
            "info": collection.document('config').data()
            })
        }
        res.status(200).send({stories: collectionIDs})
      });

});

// Create a new story
pageRouter.post('/create', async (req, res) => {

    // Create collection doc
    try {
        const docRef = await storiesReference.collection(req.name).doc('config').set({
            title: req.title,
            author: req.author,
            zoom: req.zoom,
            position: {"x" : req.pos.x, "y" : pos.y}
        })
    } catch (e) {
        res.status(500).send({"msg": e})
    }

    res.status(200).send({"msg": "New story created"})

})

pageRouter.get('/:title', async (req, res) => {
    const story_title = req.params["title"]
    try {
        const storyPages = await storiesReference.collection(story_title).get()
        const pagesMap = storyPages.docs.map((doc) => doc.data());
        const configPage = pagesMap.filter(doc => doc.id == 'config')
        pagesMap = pagesMap.filter(doc => doc.id !== 'config')
        res.status(200).send({"story" : pagesMap})
    } catch (e) {
        res.status(500).sendStatus({"msg": e})
    }
})

module.exports = pageRouter
