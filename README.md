# Choose your Adventure

## Inspiration 
The inspiration for Story++ came from my love of books and the notion that choose-your-own adventure stories are an engaging and interesting way to enjoy a story. From Dungeon's and Dragon's to Episode and other games we play as children and adults, the ability to make your own decisions to drive the story has made choose-your own adventure stories commonplace in video games, books, movies, board games and more.

## What it does

Story++ is a platform to allow users to easily create, share and read Choose-your-adventure stories. Using a flowchart style graphical interface writers can create and piece together different chapters in their story, create choices for their readers while having a birds eye view of everything.

Similarly, users can read through chapters of the story, following the trail that the writer has left for them. They can select choices on each page, which will take them to what the writer has designed. Players can play multiple stories, experiment with their choices or engage with it however they see best.

Finally, we have a share feature that allows users to publish their story and aggregates it on a main page for everyone to see.

## How it was built

Our frontend is built using React and our Backend is a node.js REST API hosted on GCP Cloud Run. 

We used Firestore as our database, as it allowed us to represent a graph easily. Since all of our stories are graphs, and each of their representing these structures can be difficult in a database, so we found a way to represent all of our nodes in this graphical structure in efficiently. Firestore is hosted on GCP

Here, we store different pages in a story as documents, which are organized into collections (a book). Within each option, the choice, content, links, and position are stored as well in order to bring the reader to the next one.
 
## What we learned 
- We learned how to work with Firestore and GCP.
- Some members of the team were new to React and Node, so we learned how to use those frameworks.
- Representing complex data structures in databases, like graphs.

##Challenges we ran into
- Conceptualizing and implementing a graph based data structures in NoSQL
- Getting GCP to work

## Things we're proud of
- Implementing a canvas like flowchart board for writers to construct their stories and ensuring that it persists in the backend.
- Storing a directed graph in Firestore efficiently enough that we can do full traversals in polynomial time.

Domain Name for Domain Name Prize: storyplusplus.space
