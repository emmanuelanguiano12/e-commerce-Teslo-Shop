"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";
import { Options } from "./Options";

export const Sidebar = () => {

    const isSideMenuOopen = useUIStore(state => state.isSideMenuOpen);
    const closeSideMenu = useUIStore(state => state.closeSideMenu);

    const {data: session} = useSession()
    const isAutenticated = !!session?.user // doble negación para valor booleano (true, false)

    const isAdmin = session?.user.role === 'admin' //regresa valor boolean

  return (
    <div>
        {/* Background black */}
        {
            isSideMenuOopen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
            )
        }

      {/* Blur */}
      {
        isSideMenuOopen && (
            <div onClick={closeSideMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
        )
      }

      {/* Sidemenu */}
      <nav
        className={
            clsx(
                "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                {
                    "translate-x-full": !isSideMenuOopen
                }
            )
        }
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* Input */}
        <div className="relative mt-14">
            <IoSearchOutline size={20} className="absolute top-2 left-2" />
            <input 
                type="text" 
                placeholder="Buscar"
                className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
            />
        </div>

        {
            isAutenticated && (
                <>
                    <Link 
                        href="/profile"
                        onClick={closeSideMenu}
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoPersonOutline size={30} />
                        <span className="ml-3 text-xl">Perfil</span>
                    </Link>
                    <Link 
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoTicketOutline size={30} />
                        <span className="ml-3 text-xl">Ordenes</span>
                    </Link>
                </>
            )
        }


        {
            isAutenticated && (
                <button 
                    onClick={() => logout()}
                    className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogOutOutline size={30} />
                    <span className="ml-3 text-xl">Salir</span>
                </button>
            )
        }

        {
            !isAutenticated && (
                <Link 
                    href="/auth/login"
                    onClick={closeSideMenu}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogInOutline size={30} />
                    <span className="ml-3 text-xl">Ingresar</span>
                </Link>
            )
        }

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10">
            {
                isAdmin && (
                    <Options />
                )
            }
        </div>

      </nav>
    </div>
  );
};
