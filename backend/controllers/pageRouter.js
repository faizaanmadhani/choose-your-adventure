const express = require('express');
const admin = require('firebase-admin');
const db = require('../firestore');

const pageRouter = express.Router();
const storiesReference = db.collection('data').doc('stories');

const genTitleHash = () => {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return '_' + Math.random().toString(36).substr(2, 9);
};

// Pull a field from config node of a test story
pageRouter.get('/test', async (req, res) => {
	const docRef = await db.collection('test_story').doc('config');
	docRef
		.get()
		.then(function(doc) {
			if (doc.exists) {
				console.log('Document data:', doc.data());
				res.send(doc.data());
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		})
		.catch(function(error) {
			console.log('Error getting document:', error);
		});
});

// Get all stories
pageRouter.get('/', async (req, res) => {
	var collectionIDs = [];

	const documentRef = db.collection('data').doc('stories');
	documentRef.listCollections().then(async (collections) => {
		for (let collection of collections) {
			const configRef = await collection.doc('config').get();
			if (!configRef.exists) {
				res.status(500).send({ msg: 'Story does not have config node' });
				return;
			}

			collectionIDs.push({
				id: collection.id,
				title: configRef.data().title,
				author: configRef.data().author
			});
		}
		res.status(200).send({ stories: collectionIDs });
	});
});

// Create a new story
pageRouter.post('/create', async (req, res) => {
	// Create collection doc
	const titleID = genTitleHash();

	try {
		// Add collection for story and associated config file
		const ref = await storiesReference.collection(titleID).add({
			choice: 'The Beginning of the End :)',
			position: {
				x: 0,
				y: 250
			},
			content: '',
			links: []
		});

		// Add the default first node
		const docRef = await storiesReference.collection(titleID).doc('config').set({
			title: req.body.title,
			author: req.body.author,
			zoom: 0,
			position: { x: 0, y: 0 },
			parent: ref.id,
			published: false
		});

		res.status(200).send({ msg: 'New story created', id: titleID, parentNode: ref.id });
	} catch (e) {
		console.log('Error thrown', e);
		res.status(500).send({ msg: e });
	}
});

pageRouter.get('/:titleID', async (req, res) => {
	const storyTitleID = req.params['titleID'];

	try {
		const storyPages = await storiesReference.collection(storyTitleID).get();
		const pagesMap = storyPages.docs.map((doc) => {
			var docData = doc.data();
			docData['id'] = doc.id;
			return docData;
		});
		// const configPage = pagesMap.filter(doc => doc.id == 'config')
		// pagesMap = pagesMap.filter(doc => doc.id !== 'config')
		res.status(200).send({ story: pagesMap });
	} catch (e) {
		res.status(500).sendStatus({ msg: e });
	}
});

// Update story config data
pageRouter.post('/update/:titleID', async (req, res) => {
	const storyTitle = req.params['titleID'];
	console.log(storyTitle);
	const configDoc = await storiesReference.collection(storyTitle).doc('config').get();

	try {
		//console.log("config doc", configDoc)
		if (!configDoc.exists) {
			throw Error("Config doc doesn't exist");
		}
		const configObj = configDoc.data();
		//console.log(configObj)

		// Assigning editable fields
		const title = req.body.title !== undefined ? req.body.title : configObj.title;
		const author = req.body.author !== undefined ? req.body.author : configObj.author;
		const posX = req.body.position.x !== undefined ? req.body.position.x : configObj.position.x;
		const posY = req.body.position.y !== undefined ? req.body.position.y : configObj.position.y;
		const publish = req.body.published !== undefined ? req.body.published : configObj.published;
		console.log(req.body.published);

		// Securing user-uneditable fields
		const parent = configObj.parent;
		const zoom = configObj.zoom;
		// Update the doc in firestore
		const result = await storiesReference.collection(storyTitle).doc('config').set({
			title: title,
			author: author,
			parent: parent,
			zoom: zoom,
			position: {
				x: posX,
				y: posY
			},
			published: publish
		});

		console.log('Story successfully updated ', result);
		res.status(200).send({ msg: 'story config successfully updated' });
	} catch (e) {
		console.error('Error updating story config', e);
		res.status(500).send({ msg: e.toString() });
	}
});

// Update page data
pageRouter.post('/update/:title/:docID', async (req, res) => {
	const storyTitle = req.params['title'];
	const docID = req.params['docID'];

	if (storyTitle === undefined || docID === undefined) {
		res.status(500).send({ msg: 'storyTitle and docID were not passed' });
		return;
	}

	const nodeDoc = await storiesReference.collection(storyTitle).doc(docID).get();

	try {
		if (!nodeDoc.exists) {
			throw Error("The document you want to change doesn't exist");
		}
		const docObj = nodeDoc.data();

		// Assigning editable fields
		const choice = req.body.choice !== undefined ? req.body.choice : docObj.choice;
		const posX = req.body.position.x !== undefined ? req.body.position.x : docObj.position.x;
		const posY = req.body.position.y !== undefined ? req.body.position.y : docObj.position.y;
		const content = req.body.content !== undefined ? req.body.content : docObj.content;

		const links = req.body.links !== undefined ? req.body.links : docObj.links;

		// Update the doc in firestore
		const result = await storiesReference.collection(storyTitle).doc(docID).set({
			choice: choice,
			position: {
				x: posX,
				y: posY
			},
			content: content,
			links: links
		});

		console.log('Node successfully updated ', result);
		res.status(200).send({ msg: 'Node updated' });
	} catch (e) {
		console.error('Error updating node', e);
		res.status(500).send({ msg: e });
	}
});

// Create a new node

pageRouter.post('/add/:title', async (req, res) => {
	const title = req.params['title'];
	if (title == undefined) {
		res.status(500).send({ msg: 'No title id sent' });
	}

	try {
		const ref = await storiesReference.collection(title).add({
			choice: req.body.choice !== undefined ? req.body.choice : '',
			position: {
				x: req.body.position.x !== undefined ? req.body.position.x : 0,
				y: req.body.position.y !== undefined ? req.body.position.y : 0
			},
			content: req.body.content !== undefined ? req.body.content : '',
			links: req.body.links !== undefined ? req.body.links : []
		});
		res.status(200).send({ msg: 'New Node Created Successfully', "id" : ref.id });
	} catch (e) {
		res.status(500).send({ msg: e });
	}
});

// Connect two nodes
pageRouter.post('/connect/:title', async (req, res) => {
	const title = req.params['title'];
	if (title == undefined) {
		res.status(500).send({ msg: 'Title not sent' });
	}

	const parent = req.body.parent;
	console.log(parent);
	const child = req.body.child;
	console.log(child);
	if (parent === undefined || child === undefined) {
		res.status(500).send({ msg: 'Data incomplete' });
	}

	try {
		const parentDoc = await storiesReference.collection(title).doc(parent).get();
		const childDoc = await storiesReference.collection(title).doc(child).get();
		if (!parentDoc.exists) {
			throw "Parent doesn't exist!";
		}
		if (!childDoc.exists) {
			throw "Child doesn't exist ";
		}

		const parentUnionRes = await storiesReference.collection(title).doc(parent).update({
			links: admin.firestore.FieldValue.arrayUnion(child)
		});

		res.status(200).send({ msg: 'Successfully added connection' });
	} catch (e) {
		console.log(e);
		res.status(500).send({ msg: e });
	}
});

// Delete the document

pageRouter.post('/delete/:title/:docID', async (req, res) => {
	const title = req.params['title'];
	const docID = req.params['docID'];
	if (title == undefined || docID == undefined) {
		res.status(500).send({ msg: 'Title not sent' });
	}

	try {
		console.log('delete', docID, title);
		const deleteRes = await storiesReference.collection(title).doc(docID).delete();
		// Iterate through nodes and find and delete the reference
		const storyPages = await storiesReference.collection(title).get();
		storyPages.docs.forEach(async (node) => {
			console.log(node.id);
			if (node.data().links !== undefined) {
				const removeLinkRes = await storiesReference.collection(title).doc(node.id).update({
					links: admin.firestore.FieldValue.arrayRemove(docID)
				});
			}
		});

		res.status(200).send({ msg: 'Node deleted successfully' });
	} catch (e) {
		console.log(e);
		res.status(500).send({ msg: e.toString() });
	}
});

module.exports = pageRouter;
