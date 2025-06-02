import { IoIosFolderOpen, IoIosSearch  } from "react-icons/io";


const SearchBar =() => {
    return (
        <div className="hidden md:flex items-center bg-zinc-900 text-white rounded-full px-4 py-2  w-[500px] h-12">
        <IoIosSearch  className="text-zinc-400" size={28} />
        <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent outline-none border-none text-sm placeholder-zinc-400 ml-3 flex-grow"
        />
        <IoIosFolderOpen className="text-white cursor-pointer border-l-1 pl-2" size={25} />
        </div>
    );
}

export default SearchBar