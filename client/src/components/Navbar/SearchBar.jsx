import { IoIosFolderOpen, IoIosSearch  } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const SearchBar =() => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center bg-zinc-900 text-white rounded-full px-4 py-2   h-12">
        <IoIosSearch  className="text-zinc-400" size={28} />
        <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent outline-none border-none text-sm placeholder-zinc-400 ml-3 flex-grow"
        />
        <button onClick={() => navigate('/search')} className="hidden md:block">
            <IoIosFolderOpen className="text-white cursor-pointer border-l-1 pl-2" size={25} />
        </button>
        </div>
    );
}

export default SearchBar