import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import Details from './Components/Dashboard/Details';
import Tasks from './Components/Dashboard/Tasks';
import PublicSite from './Components/PublicSite/PublicSite';
import RSVPForm from './Components/PublicSite/rsvpform';
import PrivacyPolicy from './Components/PublicSite/Wigits/Privacy-Policy/privacy-policy';
import useToken from './Components/App/useToken';
import { bridalParty, wedding,  weddingVenue, faq, weddingDayInvite, weddingReceptionInvite} from './Components/PublicSite/Components/Data/data';

function App() {

  return (

    <div className="wrapper">

      <Router>

        <Routes>

          <Route path="/managemywedding/" element={<Dashboard useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} />} />
          <Route path="/managemywedding/details" element={<Details useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} />} />
          <Route path="/managemywedding/tasks" element={<Tasks useToken={ useToken } bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} />} />
          <Route path="/" element={<PublicSite bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue} faq={ faq } weddingDayInvite={ weddingDayInvite } weddingReceptionInvite={ weddingReceptionInvite } />} />
          <Route path="/rsvp" element={<RSVPForm headerOn={true} bridalParty={bridalParty} wedding={wedding} weddingVenue={weddingVenue}/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy headerOn={true} bridalParty={bridalParty} />} />

        </Routes>

      </Router>

    </div>

  );

}

export default App;