## Frontend Focused

I'm a frontend focused developer, so working on the frontend part as of now. One another reason is I'm more comfortable with nodejs , express than python.

I've also created the backend functionalities, but its in nextjs apis iteself. you can still review my code as frontend focused developer.

## Getting Started

Get started by installing the required packages and then starting the server using the following commands.

```bash
npm install
npm run dev
```

## Documentation

### Features 
#### Drag and drop feature
This feature is done with the help of library [react-dnd](https://react-dnd.github.io/react-dnd/examples/sortable/simple)

#### Overlay to display image in fullsize
-Custom created component . Works with variable, open (isOpen) . When clicked on an image, modal will open, and inside the component, we are monitoring keyboard press event and if it matches with `ESC key` open variable is set to false. 
- Also added an `X` icon to close the modal.

#### Cards as grid
- Tailwind grid function is used for this
- ```grid grid-cols-3```

#### Auto Save

- Created state variables for isSaving, lastSaved, data etc in a hook called useAutoSave . 
- Saved the lastSaved time in localstorage as of now.
- On calling on api, managed the loading state.

### API 
- Created POST and GET apis.
- POST will save the data to mongo
- GET will check if data exist , if not, it will save the dummy data. If data exists, it will return the data.
- No authentications have been added to the apis for now.


