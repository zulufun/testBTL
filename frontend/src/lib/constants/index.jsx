import {
	HiOutlineViewGrid,
} from 'react-icons/hi'
import { FaRegFileAlt } from "react-icons/fa";
import { BsExclamationDiamond } from "react-icons/bs";
import { MdDevices } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import path from 'path';

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},

    {
        key: 'Report',
        label: 'Report',
        path: '/report',
		icon: <FaRegFileAlt />

        
    },
	{
        key: 'Risk Management',
        label: 'Risk Management',
        path: '/risk-management',
		icon: <BsExclamationDiamond />

        
    },
	{
		key: 'My Devices',
		label: 'My Devices',
		path: '/my-devices',
		icon: <MdDevices />

	},
	{
		key: 'About',
		label: 'About',
		path: '/about',
		icon:<CiCircleInfo />

	}



    

]

