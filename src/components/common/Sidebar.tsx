import {
    ChartPieIcon,
    Cog6ToothIcon,
    // DevicePhoneMobileIcon,
    HomeIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import logo from '../../assets/dashlogo.png';
import { Link } from 'react-router-dom';
import { WrenchScrewdriverIcon } from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/20/solid';
// import {getUser} from "../../utils/constants.ts";
// import {useState} from "react";

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Bids', href: '/marktetplace', icon: ShoppingBagIcon, current: false },
    { name: 'Service Provider', href: '/shop', icon: ShoppingCartIcon, current: false },
    // { name: 'Apps', href: '/apps', icon: DevicePhoneMobileIcon, current: false },
    { name: 'Statistics', href: '/stats', icon: ChartPieIcon, current: false },
    { name: 'Market place', href: '/market', icon: ChartPieIcon, current: false },
    { name: 'My Services', href: '/myservices', icon: WrenchScrewdriverIcon, current: false },
    { name: 'Users', href: '/users', icon: UserCircleIcon, current: false },  
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Sidebar() {
    // const user = getUser();
    // {user?.UserType}
    console.log("navigation1", navigation);
    // if(user?.UserType === "user") {
    //     navigation.push({ name: 'Service Provider', href: '/shop', icon: ShoppingCartIcon, current: false })
    // }else{
    //     navigation.push({ name: 'Bids', href: '/marktetplace', icon: ShoppingBagIcon, current: false })
    // }
    // console.log("navigation2", JSON.stringify(navigation));
    // const [menu, setMenu] = useState();
    //
    // const uniqueArray = [...new Set(navigation.map(item => item.name))]
    //     .map(name => navigation.find(item => item.name === name));
    // console.log(uniqueArray);
    // setMenu(uniqueArray);
    return (
        <>
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">

                        {/* import logo from '../../assets/logo.png'; */}
                        <img src={logo} className="h-18 w-auto mt-8 mb-4"></img>
                    </div>
                    <nav className="flex flex-1 flex-col pt-4">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-indigo-700 text-white'
                                                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                        'h-6 w-6 shrink-0',
                                                    )}
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </li>

                            <li className="mt-auto">
                                <Link
                                    to="/settings"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                >
                                    <Cog6ToothIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                    />
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </>

    );
}
export default Sidebar;