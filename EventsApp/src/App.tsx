import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import EventList from "./pages/event/EventList";
import EventForm from "./pages/event/EventForm";
import ParticipantList from "./pages/participant/ParticipantList";
import ParticipantForm from "./pages/participant/ParticipantForm";


function App () {
  return(
    <>
    <NavBar/>
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<EventList/>}/>
        <Route path="/events/new" element={<EventForm/>}/>
        <Route path="/events/:id/edit" element={<EventForm/>}/>
        <Route path="/participants" element={<ParticipantList/>}/>
        <Route path="/participants/new" element={<ParticipantForm/>}/>
        <Route path="/participants/:id/edit" element={<ParticipantForm/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App;