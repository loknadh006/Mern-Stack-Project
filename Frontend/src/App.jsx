import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";
import LoginPage from "./Pages/Loginpage";
import { AdminRoute } from "./components/PrivateRoute";


function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      {/* Navbar Component would go here */}
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/create" element={
          <AdminRoute>
            <CreatePage />
          </AdminRoute>
        }/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Box>
  );
}

export default App;
