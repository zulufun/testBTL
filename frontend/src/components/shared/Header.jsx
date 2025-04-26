import React, { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <div className="relative flex items-center">
                <HiOutlineSearch 
                    fontSize={20} 
                    className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" 
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
                />
            </div>
            <div className="flex items-center gap-2 mr-2">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={classNames(
                                    open && 'bg-gray-100',
                                    'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                                )}
                            >
                                <HiOutlineBell fontSize={24} />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-sm">
                                    <div className="p-4">
                                        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                                        <ul className="mt-2 space-y-2">
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-3"></span>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-700">Your meeting is scheduled for 3 PM</p>
                                                    <p className="text-xs text-gray-500">5 minutes ago</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-3"></span>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-700">You received a message from Alex</p>
                                                    <p className="text-xs text-gray-500">15 minutes ago</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-3"></span>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-700">System update completed</p>
                                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="flex items-center">
                            <div
                                className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                            >
                                <span className="sr-only">User Profile</span>
                            </div>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => navigate('/profile')}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        )}
                                    >
                                        Profile
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => navigate('/settings')}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        )}
                                    >
                                        Settings
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => navigate('/logout')}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        )}
                                    >
                                        Logout
                                    </div>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    );
};

export default Header;
        