import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "react-loading-skeleton/dist/skeleton.css";

import AuthRoute from "./routes/AuthRoute";
import MainRoute from "./routes/MainRoute";
import { useAppDispatch, useAppSelector } from "./hook/redux/useStore";
import { authSelector, getUserInfo } from "./store/Auth";
import SplashScreen from "./components/modules/SplashScreen";
import { SkeletonTheme } from "react-loading-skeleton";
import useFirebase from "./hook/firebase/useFirebase";

const App: React.FC = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const { app, firestore } = useFirebase();

  const { isPending, userInfo, dark } = useAppSelector(authSelector);

  const getUserData = async () => {
    try {
      const res = await dispatch(getUserInfo());
      if (!getUserInfo.fulfilled.match(res)) {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("error: ", error);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    console.log("Firebase App initialized:", app);
    console.log("Firestore instance:", firestore);
  }, [app, firestore]);

  useEffect(() => {
    if (token && !userInfo) {
      getUserData();
    }
  }, [userInfo]);

  return isPending ? (
    <SplashScreen />
  ) : (
    <Suspense fallback={<SplashScreen />}>
      <ToastContainer theme={dark ? "dark" : "light"} />

      <SkeletonTheme
        baseColor={dark ? "#2c2c2c" : "#ebe8e8"}
        highlightColor={dark ? "#272626" : "#e2e1e1"}
      >
        <Router>
          <Routes>
            <Route path='/auth/*' element={<AuthRoute />} />
            <Route path='/*' element={<MainRoute />} />
          </Routes>
        </Router>
      </SkeletonTheme>
    </Suspense>
  );
};

export default App;
