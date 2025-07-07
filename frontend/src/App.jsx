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
import EditPage from "./pages/EditPage";
import TercapaiPage from "./pages/TercapaiPage";

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
    return <Loading />;
  }

  return (
    <>
      <Loading />
      {authUser == null ? (
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      ) : (
        <div className="relative min-h-screen w-full overflow-hidden">

          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed -z-10"
            style={{ backgroundImage: `url(${tampilan})` }}
          ></div>

          <div className="flex min-h-screen">
            <Sidebar signOut={signout} />
            <main className="w-full ml-52 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/goals/create" element={<AddPage />} />
                <Route path="/goal/:id" element={<DetailPage />} />
                <Route path="/goal/edit/:id" element={<EditPage />} />
                <Route path="/tercapai" element={<TercapaiPage />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
