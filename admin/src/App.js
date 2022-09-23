import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import NewStudent from './pages/new/students/New';
import NewTeacher from './pages/new/teachers/New';
import NewDepartment from './pages/new/departments/New';
import { studentInputs, teacherInputs, departmentInputs } from './formSource';
import './style/dark.scss';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { studentColumns, teacherColumns, departmentColumns, } from './datatablesource';

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
              <Route path=':studentId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewStudent inputs={studentInputs} title='Add New Student' /></ProtectedRoute>} />
            </Route>
            <Route path='teachers'>
              <Route index element={<ProtectedRoute><List columns={teacherColumns} /></ProtectedRoute>} />
              <Route path=':teacherId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewTeacher inputs={teacherInputs} title='Add New Teacher' /></ProtectedRoute>} />
            </Route>
            <Route path='departments'>
              <Route index element={<ProtectedRoute><List columns={departmentColumns} /></ProtectedRoute>} />
              <Route path=':departmentId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewDepartment inputs={studentInputs} title='Add New Department' /></ProtectedRoute>} />
            </Route>
            <Route path='scores'>
              <Route index element={<ProtectedRoute><List columns={scoreColumns} /></ProtectedRoute>} />
              <Route path=':scoreId' element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path='new' element={<ProtectedRoute><NewScore/></ProtectedRoute>} />
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
              <Route path=':studentId' element={<Single />} />
              <Route path='new' element={<NewStudent inputs={studentInputs} title='Add New Student' />} />
            </Route>
            <Route path='teachers'>
              <Route index element={<List columns={teacherColumns} />} />
              <Route path=':teacherId' element={<Single />} />
              <Route path='new' element={<NewTeacher inputs={teacherInputs} title='Add New Teacher' />} />
            </Route>
            <Route path='departments'>
              <Route index element={<List columns={departmentColumns} />} />
              <Route path=':departmentId' element={<Single />} />
              <Route path='new' element={<NewDepartment inputs={departmentInputs} title='Add New Department' />} />
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
