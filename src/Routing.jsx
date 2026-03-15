import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Posts from './pages/Posts/Posts'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import AuthGuard from './Guards/AuthGuard/AuthGuard'
import LogoutGuard from './Guards/LogoutGuard/LogoutGuard'
import PostDetails from './pages/PostDetails/PostDetails'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Feed from './pages/Feed/Feed'
import SavedPosts from './pages/SavedPosts/SavedPosts'
import Notifications from './pages/Notifications/Notifications'
import UserProfile from './pages/UserProfile/UserProfile'

export const router = createBrowserRouter([
    {path:'/', element:<Layout/>, children:[
        {path:'/', element:<LogoutGuard><Posts/></LogoutGuard>},
        {path:'/postDetails/:id', element:<LogoutGuard><PostDetails/></LogoutGuard>},
        {path:'/profile', element:<LogoutGuard><Profile/></LogoutGuard>},
        {path:'/feed', element:<LogoutGuard><Feed/></LogoutGuard>},
        {path:'/saved', element:<LogoutGuard><SavedPosts/></LogoutGuard>},
        {path:'/notifications', element:<LogoutGuard><Notifications/></LogoutGuard>},
        {path:'/userProfile/:id', element:<LogoutGuard><UserProfile/></LogoutGuard>},
        {path:'login', element:<AuthGuard><Login/></AuthGuard>},
        {path:'register', element:<AuthGuard><Register/></AuthGuard>},
        {path:'changePassword', element:<LogoutGuard><ChangePassword/></LogoutGuard>},
        {path:'*', element:<NotFound/>}
    ]}
])
