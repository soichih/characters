# deployment

Please view and run `./install.sh` to create a test mongo DB and build / start the character MVC server.

# architecture

./server.js starts up the API server and listens on port 3000. All API endpoints are exposed under /api URL prefix. The server also serves UI components (written in VueJS) under "/". You should be able to open your local browser at http://localhost:3000 to load the UI and UI should connect to the API server also running on http://localhost:3000/api

The API server handles authentication through JWT token. UI has a hardcoded test JWT token so that you can test the functionality of the UI/API. 

# usage

The App will show all registered characters and allows administrator to create new character, and/or edit / delete existing character. The buttons are intentionally left exposed for all users so that you can simulate to see what happens if non-admin performs certain actions.

I did not implement an authentication service, but you can simulate different user role by using menu options available under "Application Test" button.
