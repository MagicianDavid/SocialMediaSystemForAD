import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserList from './components/user/UserList';
import UserForm from './components/user/UserForm';
import UserProfile from "./components/user/UserProfile";
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

import PostList from './components/pages/PostLists';
import PostDetails from './components/pages/PostDetails';
import FollowerFollowing from './components/pages/FollowerFollowing';
import NotificationList from './components/pages/NotificationList';
import Reports from './components/report/Reports'
import UserHistory from './components/pages/UserHistory';
import Lobby from './components/pages/Lobby'
import ScrollPosts from "./components/pages/TestPageable";
import LabelList from "./components/Label/LabelList";
import LabelForm from './components/Label/LabelForm';

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

                                {/* Delete post or comments not implemented yet*/}
                                {/* lays parts */}

                                <Route path="/postsPageable" element={<ScrollPosts />} />
                                <Route path="/userProfile/:id?" element={<UserProfile />} />
                                 {/* Not protected yet */}
                                 <Route path="/postsdetails/:id" element={<PostDetails />} />
                                <Route path="/lobby" element={<Lobby/>} />
                                <Route path="/:id/friends" element={<FollowerFollowing/>}/>
                                <Route path="/labellist" element={<LabelList/>} />
                                <Route path="/labels/edit/:id" element={<LabelForm/>} />
                                <Route path="/labels/add" element={<LabelForm/>} />


                                <Route element={<ProtectedRoute requiredPath="/mainmenu" />}>
                                    <Route path="/mainmenu" element={<PostList/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/friends" />}>
                                    <Route path="/friends" element={<FollowerFollowing/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/notificationlist" />}>
                                    <Route path="/notificationlist" element={<NotificationList/>}/>
                                </Route>
{/* 
                                <Route element={<ProtectedRoute requiredPath="/users/reportdetail/:id" />}>
                                    <Route path="/users/reportdetail/:reportId" element={<ReportDetail />} />
                                </Route> */}

                                <Route element={<ProtectedRoute requiredPath="/userdetails/:userId" />}>
                                    <Route path="/userdetails/:userId" element={<UserHistory/>} /> 
                                </Route>


                                <Route element={<ProtectedRoute requiredPath="/users/reports" />}>
                                    <Route path="/users/reports" element={<Reports/>}/>
                                </Route>

                                {/* David parts */}
                                <Route element={<ProtectedRoute requiredPath="/dashboard" />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/users" />}>
                                    <Route path="/users" element={<UserList />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/roles" />}>
                                    <Route path="/roles" element={<RoleList />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/auths" />}>
                                    <Route path="/auths" element={<AuthList />} />
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/users/add" />}>
                                    <Route path="/users/add" element={<UserForm/>}/>
                                </Route>

                                <Route element={<ProtectedRoute requiredPath="/users/edit/:id" />}>
                                    <Route path="/users/edit/:id" element={<UserForm/>}/>
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
                                </Route> 

                            </Routes>
                        </div>
                    </div>
                </Router>
        </AuthProvider>
);
}

export default App;
