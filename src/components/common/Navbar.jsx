import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/brainwave-academy-logo-white-transparent.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constant";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { FaChevronDown } from "react-icons/fa";
import ProfileDropdown from "../../components/core/Auth/ProfileDropdown";
import { ImSearch } from "react-icons/im";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Error while fetching the data", error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setDropdownOpen(false);
    }
  };

  return (
    <div>
      <div className="h-14 mx-auto flex flex-row justify-evenly lg:p-0 p-2 items-center border-b-[1px] border-b-richblack-700 transition-all duration-200">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" height={50} width={190} loading="lazy" />
        </Link>

        <nav>
          <ul className="hidden lg:flex gap-x-6 text-richblack-25 ">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="flex flex-row items-center gap-2 group">
                      <p>{link.title}</p>
                      <FaChevronDown />
                      <div
                        className="invisible absolute left-[47%] top-[3%] z-[1000] flex w-[200px] 
                        translate-x-[-50%] translate-y-[3em] flex-col rounded-lg
                       bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 
                        group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                      >
                        <div
                          className="absolute left-[48%] top-0 -z-10 h-6 w-6 
                          translate-x-[80%] translate-y-[-40%] 
                          rotate-45 select-none rounded bg-richblack-5"
                        />
                        {subLinks?.length ? (
                          <>
                            {subLinks.map((subLink, index) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={index}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p
                        className={`${
                          matchRoute(link.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-x-4 text-richblack-100">
          {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <div className="relative flex items-center gap-x-4">
              <Link to="/dashboard/cart" className="flex items-center">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid place-items-center h-5 w-5 rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="bg-richblack-800 ml-3 py-2 px-4 rounded-lg border border-richblack-700">
                Login
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="bg-richblack-800 py-2 px-4 rounded-lg border border-richblack-700">
                Signup
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}

          <button className="lg:hidden" onClick={handleMenuToggle}>
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-start">
          <div className="w-64 bg-richblack-800 p-4">
            <button onClick={handleMenuToggle} className="mb-4 text-right">
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>
            <ul className="flex flex-col gap-y-4">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="text-richblack-25">
                  {link.title === "Catalog" ? (
                    <div className="flex flex-col">
                      <button
                        className="flex items-center gap-2"
                        onClick={handleDropdownToggle}
                      >
                        {link.title} <FaChevronDown />
                      </button>
                      {dropdownOpen && (
                        <div className="mt-2 flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900">
                          {subLinks.length ? (
                            subLinks.map((subLink, index) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-2 pl-2 hover:bg-richblack-50"
                                key={index}
                                onClick={handleMenuToggle}
                              >
                                {subLink.name}
                              </Link>
                            ))
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to={link.path} onClick={handleMenuToggle}>
                      <p
                        className={`${
                          matchRoute(link.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {token === null && (
              <div className="mt-4 flex flex-col gap-y-2">
                <Link to={"/login"} onClick={handleMenuToggle}>
                  <button className="bg-richblack-800 text-white py-2 px-4 w-full rounded-lg border border-richblack-700">
                    Login
                  </button>
                </Link>
                <Link to={"/signup"} onClick={handleMenuToggle}>
                  <button className="bg-richblack-800 text-white py-2 px-4 w-full rounded-lg border border-richblack-700">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex-grow" onClick={handleMenuToggle} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
