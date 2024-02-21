import Search from '../components/Search';
import SortRepos from '../components/SortRepos';
import ProfileInfo from '../components/ProfileInfo';
import Repos from '../components/Repos';
import Spinner from '../components/Spinner';

import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';


const HomePage = () => {

	const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [sortType, setSortType] = useState('recent');


	const getUserProfileAndRepos = useCallback(async(username='laxmankusetti') => {
		setLoading(true);
		try {

			const res = await fetch(`/api/user/profile/${username}`);

			const { userProfile, repos } = await res.json();

			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			
			setUserProfile(userProfile)
			setRepos(repos)

		} catch (error) {
			console.log(error.message)
			toast.error(error.message)
		}finally{
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		getUserProfileAndRepos()
	}, [getUserProfileAndRepos]);

	const onSearch = async (e, username) => {
		e.preventDefault();

		setLoading(true);
		setRepos([]);
		setUserProfile(null)
	
		const { profile, reposList } = await getUserProfileAndRepos(username);
		setUserProfile(profile);
		setRepos(reposList)

		setLoading(false)
	}

	const onSort = (sortType) => {
		if(sortType === 'recent'){
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
		}else if(sortType === 'stars'){
			repos.sort((a, b) => (b.stargazers_count) - (a.stargazers_count))
		}else if(sortType === 'forks'){
			repos.sort((a, b) => (b.forks_count) - (a.forks_count))
		}
		setSortType(sortType)
		setRepos([...repos])
	}

	// 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

	return (
		<div className='m-4'>
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} /> }
				{!loading && <Repos repos={repos} />}
				{ loading && <Spinner /> }
			</div>
		</div>
	);
};

export default HomePage;