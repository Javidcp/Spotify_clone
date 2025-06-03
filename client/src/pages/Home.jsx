
import SideBar from './SideBar'
import MainHome from './MainHome'

const Home = () => {



    return (
        <div className='w-[100%] bg-black min-h-[86vh] rounded-md overflow-hidden flex '>
            
            <div className="w-[100%] ">
                <MainHome/>
            </div>
        </div>
    )
}

export default Home