import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx'

const LikeProfile = ({ userProfile }) => {

  const { authUser } = useAuthContext();

  const isOwnProfile = authUser?.username === userProfile.login

  if(!authUser || isOwnProfile) return null;

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/user/like/${userProfile.login}`, {
        method : 'POST',
        credentials : 'include',
      })

      const data = await res.json();

      if(data.error) throw new Error(data.error)
      toast.success(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-500 flex items-center gap-2"
      onClick={handleLike}
    >
      <FaHeart size={16} />
      Like profile
    </button>
  );
};

export default LikeProfile;
