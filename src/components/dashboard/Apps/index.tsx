import Sidebar from '../../common/Sidebar';
import TopBar from '../../common/Topbar';


export default function Index() {
  
  return (
    <>
      <div className='w-full'>
        
        <Sidebar></Sidebar>

        <div className="lg:pl-72">
          <TopBar></TopBar>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8 text-red-700">




              <h3 className="text-base font-semibold leading-6 text-gray-900">apps page</h3>



            </div>


          </main>
        </div>

      </div>
    </>


  )
}
