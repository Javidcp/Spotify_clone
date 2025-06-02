import {useState} from 'react'
import SideBar from './SideBar'
import MainHome from './MainHome'

const Home = () => {

    const [full, setFull] = useState(false)

    return (
        <div className='w-[100%] min-h-[89vh] bg-black flex p-1'>
            <div className={` px-1 ${full === true ? 'w-[40%]': 'w-[6.5%]'}`}>
                <SideBar full={full} setFull={setFull} />
            </div>
            <div className="w-[100%] ml- px-1">
                <MainHome/>
            </div>
        </div>
    )
}

export default Home