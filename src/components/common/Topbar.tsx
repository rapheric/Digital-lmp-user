import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChartPieIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { getUser, getAccessToken } from "../../utils/constants";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { useEffect } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  // { name: "Team", href: "/users", icon: UsersIcon, current: false },
  {
    name: "Bids",
    href: "/marktetplace",
    icon: ShoppingBagIcon,
    current: false,
  },
  {
    name: "Service Provider",
    href: "/shop",
    icon: ShoppingCartIcon,
    current: false,
  },
  { name: "Apps", href: "/apps", icon: DevicePhoneMobileIcon, current: false },
  { name: "Statistics", href: "/stats", icon: ChartPieIcon, current: false },
];

function TopBar() {
  const user = getUser();
  const token = getAccessToken();
  const [open, setOpen] = useState(false);
  const {
    data: userData,
    refetch: refetchUserDetails,
    isLoading,
  } = useLoadUserQuery(
    null,
    { skip: !token } // Only query if token is present
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const activity = [
    {
      id: 1,
      type: "created",
      person: { name: "Chelsea Hagon" },
      date: "7d ago",
      dateTime: "2023-01-23T10:32",
    },
    {
      id: 2,
      type: "edited",
      person: { name: "Chelsea Hagon" },
      date: "6d ago",
      dateTime: "2023-01-23T11:03",
    },
    {
      id: 3,
      type: "sent",
      person: { name: "Chelsea Hagon" },
      date: "6d ago",
      dateTime: "2023-01-23T11:24",
    },
    {
      id: 4,
      type: "commented",
      person: {
        name: "Chelsea Hagon",
        imageUrl:
          "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      comment:
        "Called client, they reassured me the invoice would be paid by the 25th.",
      date: "3d ago",
      dateTime: "2023-01-23T15:56",
    },
    {
      id: 5,
      type: "viewed",
      person: { name: "Alex Curren" },
      date: "2d ago",
      dateTime: "2023-01-24T09:12",
    },
    {
      id: 6,
      type: "paid",
      person: { name: "Alex Curren" },
      date: "1d ago",
      dateTime: "2023-01-24T09:20",
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("dlmp-access");
    localStorage.removeItem("user-profile");
    navigate("/");
  };

  useEffect(() => {
    if (token && !user && !isLoading) {
      refetchUserDetails();
      console.log("userdata is here full", userData);
      console.log("userdata is here", userData?.Data);
      localStorage.setItem("user-profile", JSON.stringify(userData?.Data));
    }
  }, [token, refetchUserDetails, user, userData, isLoading]);

  return (
    <>
      <Drawer title="Notifications" onClose={onClose} open={open}>
        <ul role="list" className="space-y-6">
          {activity.map((activityItem, activityItemIdx) => (
            <li key={activityItem.id} className="relative flex gap-x-4">
              <div
                className={classNames(
                  activityItemIdx === activity.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              >
                <div className="w-px bg-gray-200" />
              </div>
              {activityItem.type === "commented" ? (
                <>
                  <img
                    alt=""
                    src={activityItem.person.imageUrl}
                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                  />
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {activityItem.person.name}
                        </span>{" "}
                        commented
                      </div>
                      <time
                        dateTime={activityItem.dateTime}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {activityItem.date}
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {activityItem.comment}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                    {activityItem.type === "paid" ? (
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-indigo-600"
                      />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                    )}
                  </div>
                  <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {activityItem.person.name}
                    </span>{" "}
                    {activityItem.type} the invoice.
                  </p>
                  <time
                    dateTime={activityItem.dateTime}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {activityItem.date}
                  </time>
                </>
              )}
            </li>
          ))}
        </ul>
      </Drawer>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-blue-700 lg:hidden bg-white border-2 border-blue-500"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>

        {/* Separator */}
        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 bg-white">
          <form action="#" method="GET" className="relative flex flex-1"></form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-blue-600 hover:text-gray-500 bg-white"
              onClick={showDrawer}
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="-m-1.5 flex items-center p-1.5 bg-white">
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="h-8 w-8 rounded-full bg-gray-50"
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    aria-hidden="true"
                    className="ml-4 text-sm font-semibold leading-6 text-blue-600 capitalize"
                  >
                    {user?.fullName}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 text-gray-700"
                  />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to={"/profile"}
                    className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                  >
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <a
                    className="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>

            <Dialog
              open={sidebarOpen}
              onClose={setSidebarOpen}
              className="relative z-50 lg:hidden"
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />

              <div className="fixed inset-0 flex">
                <DialogPanel
                  transition
                  className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                >
                  <TransitionChild>
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                      <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="-m-2.5 p-2.5"
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          aria-hidden="true"
                          className="h-6 w-6 text-white"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
                        className="h-8 w-auto"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                          >
                            <Cog6ToothIcon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
export default TopBar;
