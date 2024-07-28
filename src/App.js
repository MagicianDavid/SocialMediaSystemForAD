import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EmployeeList from './components/employee/EmployeeList';
import EmployeeForm from './components/employee/EmployeeForm';
import RoleList from './components/role/RoleList';
import RoleForm from './components/role/RoleForm';
import AuthList from './components/auth/AuthList';
import AuthForm from './components/auth/AuthForm';
import { AuthProvider } from './services/AuthContext';
import Navigation from './components/navigation/Navigation';
import LoginForm from './components/pages/Login';
import RegisterForm from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './components/ErrorPage';
import './App.css';

import UserProfile from './components/pages/UserProfile'
import PostList from './components/pages/PostLists';
import PostDetails from './components/pages/PostDetails';
import FollowerFollowing from './components/pages/FollowerFollowing';
import NotificationList from './components/pages/NotificationList';
import Reports from './components/pages/Reports'
import ReportDetail from './components/pages/ReportDetail'
import AllUserDetails from './components/pages/AllUserDetails';
import UserHistory from './components/pages/UserHistory';

function App() {

    return (
        <AuthProvider>
                <Router>
                    <div className="app-container">
                        <Navigation/>
                        <div className="content">
                            <Routes>
                                <Route path="/" element={<LoginForm/>}/>
                                <Route path="/login" element={<LoginForm/>}/>
                                <Route path="/register" element={<RegisterForm/>}/>
                                <Route path="/error" element={<ErrorPage />} />

                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/employees" element={<EmployeeList />} />
                                <Route path="/roles" element={<RoleList />} />
                                <Route path="/auths" element={<AuthList />} />
                                <Route path="/employees/add" element={<EmployeeForm/>}/>
                                <Route path="/roles/add" element={<RoleForm/>}/>
                                <Route path="/auths/add" element={<AuthForm/>}/>


                                <Route path="/mainmenu" element={<PostList/>}/>
                                <Route path="/profile/:userId" element={<UserProfile/>}/>

                                <Route path="/posts/:postId" element={<PostDetails />} />
                                <Route path="/friends" element={<FollowerFollowing/>}/>
                                <Route path="/notificationlist" element={<NotificationList/>}/>

                                <Route path="/reports" element={<Reports/>}/>
                                <Route path="/report/:reportId" element={<ReportDetail />} />

                                <Route path="/userlists" element={<AllUserDetails/>}/>
                                <Route path="/userdetails/:userId" element={<UserHistory/>} />




                                {/* <Route element={<ProtectedRoute requiredPath="/dashboard" />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/employees" />}>
                                    <Route path="/employees" element={<EmployeeList />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/roles" />}>
                                    <Route path="/roles" element={<RoleList />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/auths" />}>
                                    <Route path="/auths" element={<AuthList />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/employees/add" />}>
                                    <Route path="/employees/add" element={<EmployeeForm/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/employees/edit/:id" />}>
                                    <Route path="/employees/edit/:id" element={<EmployeeForm/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/roles/add" />}>
                                    <Route path="/roles/add" element={<RoleForm/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/roles/edit/:id" />}>
                                    <Route path="/roles/edit/:id" element={<RoleForm/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/auths/add" />}>
                                    <Route path="/auths/add" element={<AuthForm/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/auths/edit/:id" />}>
                                    <Route path="/auths/edit/:id" element={<AuthForm/>}/>
                                </Route> */}

                            </Routes>
                        </div>
                    </div>
                </Router>
        </AuthProvider>
);
}

export default App;
