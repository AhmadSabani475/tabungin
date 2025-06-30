import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/auth/action";
import Loading from "./components/ui/Loading";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import tampilan from "./assets/Tampilan.jpg";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);
  const signout = () => {
    dispatch(asyncUnsetAuthUser());
  };
  if (isPreload) {
    return null;
  }
  if (authUser == null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }
  return (
    <>
      <Loading />
      <div
        style={{ backgroundImage: `url(${tampilan})` }}
        className=" flex bg-cover bg-center min-h-screen  "
      >
        <Sidebar signOut={signout} />
        <main className="w-full p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goals/create" element={<AddPage />} />
            <Route path="/goal/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
