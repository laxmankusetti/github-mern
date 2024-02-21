import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikePages";

import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser, loading } = useAuthContext();
	if(loading) return null;
	
	return (
		<div className='flex'>
			<Sidebar />
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={!authUser ? <LoginPage /> : Navigate('/')} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : Navigate('/')} />
					<Route path='/explore' element={authUser ? <ExplorePage /> : Navigate('/login')} />
					<Route path='/likes' element={authUser ? <LikesPage /> : Navigate('/login')} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;