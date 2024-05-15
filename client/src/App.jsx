import React from "react";
import { Toaster } from "react-hot-toast";

import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import SignupPage from "./pages/SignupPage";
import { useAuthContext } from "./context/AuthContext";
import AccountPage from "./pages/AccountPage";
import BookingsPage from "./pages/BookingsPage";
import AccommodationsPage from "./pages/AccommodationsPage";
import ProfileHeader from "./layouts/ProfileHeader";
import Account from "./pages/Account";
import AccommodationHeader from "./layouts/AccommodationHeader";
import AddPlace from "./pages/AddPlace";
import MyPlaces from "./pages/MyPlaces";

import axios from "axios";
import PlacePage from "./pages/PlacePage";
import PlaceView, { placeLoader } from "./pages/PlaceView";
import EditPage from "./pages/EditPage";

axios.defaults.withCredentials = true;

const App = () => {
  const { authUser } = useAuthContext();

  // axios.defaults.withCredentials = true;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            // element={authUser ? <IndexPage /> : <Navigate to={"/login"} />}
            element={<IndexPage />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/place/:id"
            loader={placeLoader}
            // element={!authUser ? <Navigate to={"/"} /> : <PlaceView />}
            element={<PlaceView />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignupPage />}
          />
          <Route path="/account" element={<ProfileHeader />}>
            <Route
              path="/account"
              element={authUser ? <AccountPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/account/profile"
              element={authUser ? <Account /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/account/bookings"
              element={authUser ? <BookingsPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/account/accommodations"
              element={
                authUser ? <AccommodationsPage /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path={`/account/accommodations/places/${authUser?.id}/:id`}
              element={authUser ? <PlacePage /> : <Navigate to={"/login"} />}
              loader={placeLoader}
            />
            <Route
              path={`/account/accommodations/places/edit/:id`}
              element={authUser ? <EditPage /> : <Navigate to={"/login"} />}
              loader={placeLoader}
            />
            <Route
              path="/account/accommodations"
              element={
                authUser ? <AccommodationHeader /> : <Navigate to={"/login"} />
              }
            >
              <Route
                path="/account/accommodations/add"
                element={authUser ? <AddPlace /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/account/accommodations"
                element={
                  authUser ? <AccommodationsPage /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path={`/account/accommodations/places/${authUser?.id}`}
                element={authUser ? <MyPlaces /> : <Navigate to={"/login"} />}
              />
            </Route>
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={authUser ? <IndexPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/place/:id"
            element={!authUser ? <Navigate to={"/"} /> : <PlaceView />}
            // loader={placeLoader}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignupPage />}
          />
          <Route path="/account" element={<ProfileHeader />}>
            <Route
              path="/account"
              element={authUser ? <AccountPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/account/profile"
              element={authUser ? <Account /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/account/bookings"
              element={authUser ? <BookingsPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/account/accommodations"
              element={
                authUser ? <AccommodationsPage /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="/account/accommodations"
              element={
                authUser ? <AccommodationHeader /> : <Navigate to={"/login"} />
              }
            >
              <Route
                path="/account/accommodations/add"
                element={authUser ? <AddPlace /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/account/accommodations"
                element={
                  authUser ? <AccommodationsPage /> : <Navigate to={"/login"} />
                }
              />
              <Route
                path={`/account/accommodations/places/${authUser?.id}`}
                element={authUser ? <MyPlaces /> : <Navigate to={"/login"} />}
              />
              <Route
                path={`/account/accommodations/places/${authUser?.id}/:id`}
                element={authUser ? <PlacePage /> : <Navigate to={"/login"} />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
