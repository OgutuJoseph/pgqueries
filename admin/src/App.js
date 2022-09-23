import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import NewStudent from './pages/new/students/New';
import NewTeacher from './pages/new/teachers/New';
// import NewRoom from './pages/new/room';
import { studentInputs, teacherInputs, hotelInputs, roomInputs } from './formSource';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { studentColumns, teacherColumns, hotelColumns, roomColumns } from './datatablesource';

function App() {

  const { darkMode } = useContext(DarkModeContext)

  const ProtectedRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    if (!user)
    {
      return <Navigate to='/login' />
    }

    return children;

  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} /> 
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />   
            <Route path='students'>
              <Route index element={<ProtectedRoute><List columns={studentColumns} /></ProtectedRoute>} />
              <Route path=':userId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewStudent inputs={studentInputs} title='Add New Student' /></ProtectedRoute>} />
            </Route>
            <Route path='hotels'>
              <Route index element={<ProtectedRoute><List columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=':hotelId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewHotel/></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />   
            <Route path='login' element={<Login />} /> 
            <Route path='students'>
              <Route index element={<List columns={studentColumns} />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<NewStudent inputs={studentInputs} title='Add New Student' />} />
            </Route>
            <Route path='teachers'>
              <Route index element={<List columns={teacherColumns} />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<NewTeacher inputs={teacherInputs} title='Add New Teacher' />} />
            </Route>
            {/* <Route path='hotels'>
              <Route index element={<List columns={hotelColumns} />} />
              <Route path=':hotelId' element={<Single />} />
              <Route path='new' element={<NewHotel />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
