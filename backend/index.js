const express = require('express')
const app = express()
const port = 3000
const SERVER_STARTED = 'Server started on port: '
const db = admin.firestore();

/* app.get('/', (req, res) => {
    res.send("Hello, World");
}); */

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

function removeChildren(page1, page2){ 
    for (i = 0; i < page2.children.length; i++){
        if(page2.children[i] == page1){
            page2.splice(i, 1);
        }
    }
}

async function addPage(db){
    const ref = await db.collection('stories').add({
        name: '',
        choice: ''
    }); 
    console.log('Add: ', res);
} 

function connectPages(page1, page2){
    page1.addChildren(page2);
    page2.addChildren(page1);
}