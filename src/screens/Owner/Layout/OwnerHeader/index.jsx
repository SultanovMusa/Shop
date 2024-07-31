'use client'

import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { SearchAdmin, Logout } from "@/assets/icons/Icons"

import { CustomInput } from "@/components/UI/Input"
import { customToast } from "@/components/Natification"
import toast from "react-hot-toast"

import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export const OwnerHeader = () => {  
    const router = useRouter()

    const handleLogout = () => {
        // Cookies.remove('TOKEN_DATA')
        router.push('/')
    }

    const {value} = useSelector(state => state.helper)

    return (
        <header className="fixed top-0 w-full h-[60px] bg-white flex justify-center items-center shadow-md">
            <div className="w-full flex justify-between items-center gap-8 px-8">
                <h1
                onClick={() => toast.succ }
                className="text-2xl text-adminBlue font-medium cursor-pointer">
                    LOGOTYPE
                </h1>
                <CustomInput
                    placeholder='Искать...'
                    Icon={SearchAdmin}
                    isLoading={false}
                    disabled={false}
                    color="bg-transparent"
                    width="w-[60%]"
                />
                <div className="flex gap-2 items-center cursor-pointer">
                    <span className="text-[#676767] text-sm">Выход</span>
                    <span onClick={handleLogout} className="hover:translate-x-1"><Logout /></span>
                </div>
            </div>
        </header>
    )
}