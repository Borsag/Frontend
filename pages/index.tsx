import { NextRequest } from "next/server"

export default function Home() {
  return (
    <main className={`bg-slate-100 min-h-[100vh] overflow-hidden`}>
      <div className="drawer overflow-hidden">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="lg:hidden w-full navbar bg-white">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-xl font-[Poppins]">Chats</div>
            <div className="flex-none hidden">
              <ul className="menu menu-horizontal">
                <li><a>Add Friends</a></li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 overflow-hidden">
            <div>

              <div className="bg-blue-500 hidden lg:block w-full text-white px-4 py-4">
                <h2 className="text-xl font-[Poppins] tracking-wide">Chats</h2>
              </div>
              <div className="col-span-1 bg-slate-50 h-[100vh] overflow-scroll">
                <div className="py-4">
                  {[234, 345, 5645, 6, 7, 5, 12, 436, 575, 675, 6].map(x => (
                    <div className="flex items-center px-4 gap-2 p-2 hover:bg-slate-200 cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                      <div className="flex-1">
                        <p className="font-semibold font-mono">Nama</p>
                        <p className="text-sm text-gray-500 font-sans">Lorem loremrmowerwermo ipsum dolor sit amet consectetur</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-3 hidden lg:block bg-slate-100">
              <div className="bg-blue-500 text-white px-4 py-4">
                <h2 className="text-xl font-[Poppins] tracking-wide">Nama</h2>
              </div>
              <div className="h-full flex flex-col">
                <div className="bg-gray-200 h-[100vh] overflow-scroll pb-36">

                </div>
                <div className="bg-white w-[100%] px-6 py-3 sticky bottom-0">
                  <div>
                    <input type="text" className="border border-gray-300 w-full px-4 py-2 focus:border-blue-500 font-mono outline-none" placeholder="Tulis sebuah pesan" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
            <li><a>Add Friends</a></li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export function getServerSideProps(ctx: any) {
  // get cookies token
  const { token } = ctx.req.cookies;

  // redirect user to login page if token is not found
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // get user data from token
  return {
    props: {
    }
  }
}