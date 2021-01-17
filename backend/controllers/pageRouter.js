const express = require('express')
const admin = require('firebase-admin')
const db = require('../firestore')

const pageRouter = express.Router()
const storiesReference = db.collection('data').doc('stories')

const genTitleHash = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}

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
            "id" : collection.id
            })
        }
        res.status(200).send({stories: collectionIDs})
      });

});

// Create a new story
pageRouter.post('/create', async (req, res) => {

    // Create collection doc
    const titleID = genTitleHash()

    try {
        const docRef = await storiesReference.collection(titleID).doc('config').set({
            title: req.body.title,
            author: req.body.author,
            zoom: 0,
            position: {"x" : 0, "y" : 0}
        })
        const ref = await storiesReference.collection(titleID).add({
            'choice': '',
            position: {
                'x': 0,
                'y': 0
            },
            'content': '',
                links: []
            })

        res.status(200).send({"msg": "New story created", "id": titleID, parentNode: ref.id})

    } catch (e) {
        console.log("Error thrown", e)
        res.status(500).send({"msg": e})
    }

})

pageRouter.get('/:titleID', async (req, res) => {
    const storyTitleID = req.params["titleID"]

    try {
        const storyPages = await storiesReference.collection(storyTitleID).get()
        const pagesMap = storyPages.docs.map((doc) => doc.data());
        // const configPage = pagesMap.filter(doc => doc.id == 'config')
        // pagesMap = pagesMap.filter(doc => doc.id !== 'config')
        res.status(200).send({"story" : pagesMap})

    } catch (e) {
        res.status(500).sendStatus({"msg": e})
    }
})

// Update story config data
pageRouter.post('/update/:titleID', async (req, res) => {
    const storyTitle = req.params["titleID"]
    console.log(storyTitle)
    const configDoc = await storiesReference.collection(storyTitle).doc('config').get()

    try {
        //console.log("config doc", configDoc)
        if (!configDoc.exists) {
            throw Error("Config doc doesn't exist")
        }
        const configObj = configDoc.data()
        //console.log(configObj)

        // Assigning editable fields
        const title = req.body.title !== null ? req.body.title : configObj.title
        const author = req.body.author !== null ? req.body.author : configObj.author
        const posX = req.body.position.x !== null ? req.body.position.x : configObj.position.x
        const posY = req.body.position.y !== null ? req.body.position.y : configObj.position.y
        const publish = req.body.published !== null ? req.body.published : configObj.published

        // Securing user-uneditable fields 
        const parent = configObj.parent
        const zoom = configObj.zoom
        // Update the doc in firestore
        const result = await storiesReference.collection(storyTitle).doc('config').set({
            'title' : title,
            'author' : author,
            'parent' : parent,
            'zoom' : zoom,
            'position' : {
                'x' : posX,
                'y' : posY
            },
            'published' : publish
        })

        console.log("Story successfully updated ", result)
        res.status(200).send({msg: "story config successfully updated"})

    } catch (e) {
        console.error("Error updating story config", e)
        res.status(500).send({msg: e.toString()})
    }
})

// Update page data
pageRouter.post('/update/:title/:docID', async (req, res) => {
    const storyTitle = req.params['title']
    const docID = req.params['docID']

    if (storyTitle === null || docID === null) {
        res.status(500).send({msg: "storyTitle and docID were not passed"})
        return
    }

    const configDoc = storiesReference.collection(storyTitle).doc('config')

    try {
        const docObj = await configDoc.get()
        if (!doc.exists) {
            throw Error("Config doc doesn't exist")
        }

        // Assigning editable fields
        const choice = req.body.choice !== null ? req.body.choice : docObj.choice
        const posX = req.body.position.x !== null ? req.body.position.x : docObj.position.x
        const posY = req.body.position.y !== null ? req.body.position.y : docObj.position.y
        const content = req.body.content !== null ? req.body.content : docObj.content

        const links = req.body.links !== null ? res.body.links : docObj.links

        // Update the doc in firestore
        const result = await configDoc.set({
            'choice': choice,
            position: {
                'x': posX,
                'y': posY
            },
            'content': content,
            links: links
        })

        console.log("Node successfully updated ", result)
        res.status(200).send({msg: "Document"})

    } catch (e) {
        console.error("Error updating document", e)
        res.status(500).send({msg: e})
    }

})

// Create a new node

pageRouter.post('/add/:title', async (req, res) => {
    const title = req.params["title"]
    if (title == null) {
        res.status(500).send({msg: "Incorrect title sent"})
    }

    try {
        const ref = await storiesReference.collection(title).add({
            'choice': req.body.choice !== null ? req.body.choice : '',
            position: {
                'x': req.body.position.x !== null ? req.body.position.x : 0,
                'y': req.body.position.y !== null ? req.body.position.y : 0
            },
            'content': req.body.content !== null ? req.body.content : '',
            links: req.body.links !== null ? req.body.links : []
        })
        res.status(200).send({msg: "New Node Created Successfully"})
    } catch(e) {
        res.status(500).send({msg: e})
    }

});

// Connect two nodes
pageRouter.post('/connect/:title', async (req, res) => {
    const title = req.params["title"]
    if (title == null) {
        res.status(500).send({msg: "Title not sent"})
    }

    const parent = req.parent
    const child = req.child
    if (req.parent == null || req.child == null) {
        res.status(500).send({msg: "Data incomplete"})
    }

    try {
        const parentDoc = storiesReference.doc(parent)
        const childDoc = storiesReference.doc(child)
        if (!parentDoc.exists) {
            throw "Parent doesn't exist!"
        }
        if (!childDoc.exists) {
            throw "Child doesn't exist "
        }

        const parentUnionRes = await parentDoc.update({
            links: admin.firestore.FieldValue.arrayUnion(child)
        })

        res.status(200).send({msg: "Successfully added connection"})

    } catch(e) {
        res.status(500).send({msg: e})
    }
})

// Delete the document

pageRouter.post('/delete/:title/:docID', async (req, res) => {
    const title = req.params['title']
    const docID = req.params['docID']
    if (title == null || docID == null) {
        res.status(500).send({msg: "Title not sent"})
    }

    try {
        const deleteRes = await storiesReference.collection(title).doc(docID).delete()
        // Iterate through nodes and find and delete the reference
        const nodes = await storiesReference.collection(title).get()
        nodes.foreach(async (node) => {
            if (node.links.includes(docID)) {
                const removeLinkRes = await storiesReference.collection(title).doc(node.id).update({
                    links: firebase.firestore.FieldValue.arrayRemove(docID)
                })
            }
        })

        res.status(200).send({msg: "Node deleted successfully"})
    } catch (e) {
        res.status(500).send({msg: e})
    }
})


module.exports = pageRouter