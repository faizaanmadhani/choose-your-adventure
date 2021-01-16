const express = require('express')
const app = express()
const port = 3000
const SERVER_STARTED = 'Server started on port: '
const PAGES_ARRAY = []; 

/* app.get('/', (req, res) => {
    res.send("Hello, World");
}); */

app.listen(port, () => {
    console.log(SERVER_STARTED + port);
});

function removePage(page){
    var index = PAGES_ARRAY.indexOf(page);
    if(index > -1){
        PAGES_ARRAY.splice(index, 1); //removing it from list of pages
    } 

    var i = 0;
    while (i < page.children.length){
       removeChildren(page, page.children[i]); //removing it from connected pages
    }
}

function removeChildren(page1, page2){ 
    for (i = 0; i < page2.children.length; i++){
        if(page2.children[i] == page1){
            page2.splice(i, 1);
        }
    }
}

function addPage(){
    Page newPage = new Page;
    PAGES_ARRAY.push(newPage);
    console.log(PAGES_ARRAY);
}

class Page{
    constructor(text, children){
        this.text = new String("Text");
        this.children = new Array();
    }

    setText(choice){
        this.text = choice;
    } 

    addChildren(choice){
        this.children.push(choice);
        choice.children.push(this.Page);
    }
}