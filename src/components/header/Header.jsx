import { useEffect, useState } from "react";

import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";

import { useNavigate, useLocation } from "react-router-dom";

import "./Style.scss";

import logo from "../../assets/movieplex-logo1.png";
import ContentWrapper from "../../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavbar = () => {
    if (window.scrollY > 300) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const serachQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 2000);
    }
  };

  const navigationHandler = (type) => {
    if (type == "movie") {
      navigate("explore/movie");
    } else if (type == "tv") {
      navigate("explore/tv");
    } else if (type == "people") {
      navigate("explore/people");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem" onClick={() => navigationHandler("people")}>
            Popular People
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch className="mobileMenuItem" onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              className="mobileMenuItem"
              onClick={() => setMobileMenu(false)}
            />
          ) : (
            <SlMenu className="mobileMenuItem" onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for Movie or TV show"
                onKeyUp={serachQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose
                className="mobileMenuItem"
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
