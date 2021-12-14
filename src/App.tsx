import { createContext, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import Cookies from 'universal-cookie';
import { PrivateRoute } from './components/Authentication';
import { GlobalStyle } from './components/GlobalStyle';
import { LayoutContent } from './components/LayoutContent';
import { LayoutLogin } from './components/LayoutLogin';
import CreateEvent from './pages/createEvent';
import Dashboard from './pages/dashboard';
import Detail from './pages/detail';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Profile from './pages/profile';

export const UserContext = createContext<any>(undefined);

const App = () => {
  const [user, setUser] = useState(undefined);

  const data = { user, setUser };

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={data}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <LayoutLogin>
                  <Login />
                </LayoutLogin>
              }
            />
            <Route
              path="*"
              element={
                <LayoutLogin>
                  <NotFound />
                </LayoutLogin>
              }
            />
            <Route
              index
              element={
                <PrivateRoute>
                  <LayoutContent>
                    <Dashboard />
                  </LayoutContent>
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <LayoutContent>
                    <Dashboard />
                  </LayoutContent>
                </PrivateRoute>
              }
            />
            <Route
              path="detail"
              element={
                <PrivateRoute>
                  <LayoutContent>
                    <Detail />
                  </LayoutContent>
                </PrivateRoute>
              }
            />
            <Route
              path="createEvent"
              element={
                <PrivateRoute>
                  <LayoutContent>
                    <CreateEvent />
                  </LayoutContent>
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <LayoutContent>
                    <Profile />
                  </LayoutContent>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;
