import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App=()=>{
  const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
    {
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
	]);

  // useState to toggle dark mode
  const [darkMode,setDarkMode]=useState(false);

  // useState to store search bar content
  const [searchText,setSearchText]=useState('');

  // save to localStorage
  useEffect(() => {
		let savedNotes = 
      localStorage.getItem("react-notes-app-data");

		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			"react-notes-app-data",
			JSON.stringify(notes)
		);
	}, [notes]);


  // Add New note and update array list
  const addNote=(text)=>{
    const date=new Date();
    const newNote={
      id:nanoid(),
      text:text,
      date:date.toLocaleDateString()
    };
    const newNotes=[...notes,newNote];
    setNotes(newNotes);
  };

  // Delete Note 
  const deleteNote=(id)=>{
    const newNotes=notes.filter((note)=>note.id!==id);
    setNotes(newNotes);
  };

  return (

    <div className={`${darkMode && 'dark-mode'}`}>
        <div className="container">
        <Header handleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList 
        notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} 
        handleAddNote={addNote} 
        handleDeleteNote={deleteNote} />
    </div>
    </div>
   

  );
};

export default App;


