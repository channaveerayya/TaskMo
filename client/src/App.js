import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import Header from "./components/Header"
import Jobs from "./components/Jobs"
import theme from "./Theme"
import LoginPage from "./pages/LoginPage"
import { Provider } from "react-redux"
import setAuthToken from "./utils/setAuthToken"
import store from "./store"
import { loadUser } from "./actions/auth"
import PrivateRouting from "./routes/PrivateRouting"
import Alert from "./components/Alert"
import ProfilePage from "./pages/ProfilePage"
import AddJobPage from "./pages/AddJobPage"
import EditProfile from "./pages/EditProfile"
import AppliedJobPage from "./pages/AppliedJobPage"
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Alert />
          <Route exact path="/" component={Jobs} />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route
              exact
              path="/register"
              component={() => <LoginPage register={true} />}
            />
            <PrivateRouting exact path="/profile" component={ProfilePage} />
            <PrivateRouting exact path="/addJob" component={AddJobPage} />
            <PrivateRouting exact path="/editProfile" component={EditProfile} />

            <PrivateRouting
              exact
              path="/appliedJob"
              component={AppliedJobPage}
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App
