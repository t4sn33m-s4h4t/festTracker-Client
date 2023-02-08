import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Footer from "./components/footer/footer";
import RunningFest from "./pages/running/Running";
import UpcomingFest from "./pages/upComing/Upcoming";
import PopularFest from "./pages/popular/Popular"
import AdminPanel from "./pages/adminPanel/admin";
import MobileMenu from "./components/mobileMenu/mobileMenu";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/running-fests">
        <RunningFest />
        </Route>
        <Route path="/upcoming-fests">
        <UpcomingFest />
        </Route>
        <Route path="/popular-fests">
        <PopularFest />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/tasneem"><AdminPanel></AdminPanel></Route>
        <Route path="/create-fest">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
        
      </Switch>
        <MobileMenu />
        <Footer />
    </Router>
  );
}

export default App;
