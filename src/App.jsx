
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Mainbar/Main.jsx";
import PassportWidget from './components/PassportWidget';

function App() {
  return (
    // <>-called fragment//</>
    <>
    <Sidebar />
    <Main/>
       <PassportWidget />
    </>
  );
}



export default App
