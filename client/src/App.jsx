// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import ProtectedRoutes from "./utils/ProtectedRoutes";
// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import UserCard from "./components/UserCard";
// import ProtectedAdmin from "./utils/ProtectedAdmin";
// import Admin from "./pages/Admin";
// import Dispaly from "./pages/Display";
// import Keywordsearch from "./pages/KeywordSearch";
// import Tables from "./components/Tables";
// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" exact element={<Login />} />
//         <Route path="/signup" exact element={<Signup />} />
//         <Route path="/test" exact element={<Keywordsearch />} />

//         <Route
//           path="/home"
//           exact
//           element={<ProtectedRoutes component={Home} />}
//         />
//         <Route
//           path="/result"
//           exact
//           element={<ProtectedRoutes component={Dispaly} />}
//         />
//         <Route
//           path="/keyword"
//           exact
//           element={<ProtectedRoutes component={Keywordsearch} />}
//         />
//         <Route
//           path="/table"
//           exact
//           element={<ProtectedRoutes component={Tables} />}
//         />
//         <Route path="/admin" element={<ProtectedAdmin component={Admin} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserCard from "./components/UserCard";
import ProtectedAdmin from "./utils/ProtectedAdmin";
import Admin from "./pages/Admin";
import Dispaly from "./pages/Display";
import Keywordsearch from "./pages/KeywordSearch";
import Tables from "./components/Tables";
import DbUpdate from "./pages/DbUpdate";
import HeaderList from "./components/HeaderList";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/test" exact />

        <Route
          path="/home"
          exact
          element={<ProtectedRoutes component={Home} />}
        />
        <Route
          path="/result"
          exact
          element={<ProtectedRoutes component={Dispaly} />}
        />
        <Route
          path="/keyword"
          exact
          element={<ProtectedRoutes component={Keywordsearch} />}
        />
        <Route
          path="/table"
          exact
          element={<ProtectedRoutes component={Tables} />}
        />
        <Route path="/admin" element={<ProtectedAdmin component={Admin} />} />
        <Route
          path="/upload"
          element={<ProtectedAdmin component={DbUpdate} />}
        />

        <Route
          path="/header"
          element={<ProtectedAdmin component={HeaderList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
