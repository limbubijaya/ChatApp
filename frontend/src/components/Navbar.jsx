import React from "react";
import authStore from "../store/authStore";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { authUser, logout } = authStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 backdrop-blur-xl bg-base-100/80">
      <div className="container mx-auto px-4 h-12">
        <div className="flex items-center justify-between h-full">
          <div className="flex-grow flex items-center justify-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:text-cyan-200"
            >
              <h1
                className="text-2xl text-white hover:text-cyan-200"
                style={{ fontFamily: "Orbitron" }}
              >
                Chat.io
              </h1>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-6">
            {authUser && (
              <button className="flex gap-2" onClick={logout}>
                <span className="hidden sm:inline font-bold text-white hover:text-cyan-200">
                  Logout
                </span>
                <MdLogout className="text-white text-2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
