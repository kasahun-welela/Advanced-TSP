"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo-el.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Animation variants
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 right-0 bg-white dark:bg-slate-800  z-50 tracking-widest">
        <div className="flex justify-between items-center py-2 md:max-w-[80%] max-w-[90%] mx-auto">
          <Link href="/">
            {" "}
            <Image src={logo} alt="E-learning logo" width={70} height={70} />
          </Link>
          <div className="flex items-center gap-8">
            <ul className="flex justify-end gap-6 items-center dark:text-white">
              <li>
                <Link
                  href="/"
                  className={`text-base md:text-lg font-medium ${
                    path === "/" ? "text-primary font-semibold" : ""
                  } hover:font-semibold hover:text-primary transition-all duration-200`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-base md:text-lg font-medium ${
                    path === "/about" ? "text-primary font-semibold" : ""
                  } hover:font-semibold hover:text-primary transition-all duration-200`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#courses"
                  className={`text-base md:text-lg font-medium ${
                    path === "#courses" ? "text-primary font-semibold" : ""
                  } hover:font-semibold hover:text-primary transition-all duration-200`}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className={`text-base md:text-lg font-medium ${
                    path === "/contact-us" ? "text-primary font-semibold" : ""
                  } hover:font-semibold hover:text-primary transition-all duration-200`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`text-base md:text-lg font-medium ${
                    path === "/faq" ? "text-primary font-semibold" : ""
                  } hover:font-semibold hover:text-primary transition-all duration-200`}
                >
                  {"FAQ's"}
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className="text-base md:text-lg font-medium  hover:text-primary/80 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/create-account"
                className="bg-primary text-white px-6 md:px-8  py-3 rounded-lg text-base md:text-lg font-medium hover:bg-primary/80 transition-all duration-200"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="bg-white dark:bg-slate-800  flex justify-between items-center px-5 md:hidden py-5 fixed top-0 left-0 right-0  z-50 transition-all duration-300">
        <Link href="/">
          <Image src={logo} alt="E-learning logo" height={50} width={50} />
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleMenuClick}
            className="text-primary dark:text-white"
          >
            <i className="ri-menu-line text-2xl "></i>
          </button>
        </div>
      </div>

      {/* Mobile menu nav list */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="fixed inset-y-0 left-0 w-[75%] bg-white dark:bg-slate-800  z-50 overflow-y-auto"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="text-primary font-bold flex justify-between items-center p-4">
                <h1>E-learning</h1>
                <button
                  onClick={closeMenu}
                  className="text-primary dark:text-white"
                >
                  <i className="ri-close-line text-2xl "></i>
                </button>
              </div>
              <ul className="space-y-4 p-4">
                <li>
                  <Link
                    className={`${
                      path === "/" ? "text-primary font-semibold" : ""
                    } hover:text-primary`}
                    href="/"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "/about" ? "text-primary font-semibold" : ""
                    } hover:text-primary`}
                    href="/about"
                    onClick={closeMenu}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "/#courses" ? "text-primary font-semibold" : ""
                    } hover:text-primary`}
                    href="/#courses"
                    onClick={closeMenu}
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "/contact-us" ? "text-primary font-semibold" : ""
                    } hover:text-primary`}
                    href="/contact-us"
                    onClick={closeMenu}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${
                      path === "/faq" ? "text-primary font-semibold" : ""
                    } hover:text-primary`}
                    href="/faq"
                    onClick={closeMenu}
                  >
                    {"FAQ's"}
                  </Link>
                </li>
              </ul>
              <div className="p-4 space-y-4 border-t">
                <Link
                  href="/signin"
                  className="block  hover:text-primary/80"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  href="/create-account"
                  className="block bg-primary text-white px-6 py-2 rounded-lg text-center hover:bg-primary/80"
                  onClick={closeMenu}
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
