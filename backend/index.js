const express = require('express')
const app = express()
const port = 3000
const SERVER_STARTED = 'Server started on port: '

/* app.get('/', (req, res) => {
    res.send("Hello, World");
}); */

const db = new Firestore({
    projectId: 'adventure-story-301904',
    keyFilename: 'adventure-story-301904-a988dcece07e.json',
});

app.listen(port, () => {
    console.log(SERVER_STARTED + port);
}); 

async function removePage(db){
    const admin = require('firebase-admin');
    const FieldValue = admin.firestore.FieldValue;
    const ref = db.collection('stories').doc('');
    const res = await ref.update({
        capital: FieldValue.delete()
    });
    console.log('Update: ', res);
} 

async function unConnect (db){
    const messageRef = db.collection('stories').doc('ts1').remove('config');
}

async function addPage(db){
    const ref = await db.collection('stories').add({
        Title: '',
        Author: '',
        Parent: '',
        Zoom: '',
        Position:{x:float , y:float},
        Published: true
    }); 
    console.log('Add: ', res);
} 

async function connectPage(db){
    const messageRef = db.collection('stories').doc('ts1').collection('config');
}