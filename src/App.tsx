import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";
import { StandartPage } from "./pages/StandartPage";
import { PrivateRoute } from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/login" exact>
        <LogIn />
      </Route>
      <PrivateRoute path="/me">
        <StandartPage />
      </PrivateRoute>
    </div>
  );
}

export default App;
