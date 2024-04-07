import React, { useState } from "react";
import logo from "../../../Assets/logo.png";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {  logout } from "../../../actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.userSlice);
  const {cartItems}=useSelector((state)=>state.cartSlice)
  const handleShow = () => {
    setShow(!show);
  };
  const logoutt = () => {
    dispatch(logout(dispatch));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  }
  return (
    <header className="shadow-md h-20 w-full z-50  relative   ">
      <div className="px-4 h-full flex items-center justify-between">
        <div className="w-40 md:w-20">
          <img src={logo} alt="img"></img>
        </div>
        <div className="flex items-center gap-4     md:gap-7 ">
          <nav className="flex gap-8 items-center  md:gap-3 ">
            <div className="mr-60 bg-fuchsia-950 rounded">
              <form onSubmit={submitHandler} >
                <input
                  type="text"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search a product"
                  className="outline-fuchsia-950 border h-fit pb-1 border-fuchsia-950 px-2 py-1  w-80 rounded-tl rounded-bl"
                ></input>
                <button type="submit" className="relative bg-fuchsia-950 rounded-tr rounded-br text-white py-2 px-2  ">
                  <FaSearch />
                </button>
              </form>

            </div>
            <Link to={"/"}>Home</Link>
            <Link to={"products"}>
              <div>Products</div>
            </Link>
            <Link to={"contact"}>Contact</Link>
            <div>Contact</div>
            <div>About</div>
          </nav>
          <Link to={"cart"}>
            <div className="text-fuchsia-950 text-2xl relative">
              <FaShoppingCart />
              <div className="absolute  text-white bg-red-500 h-4 text-xs -top-2 -right-1 rounded-xl px-1 ">
                {cartItems.length}
              </div>
            </div>
          </Link>
          {
            !isAuthenticated ? <div
              className="  text-slate text-2xl cursor-pointer"
            >
              <div className="text-fuchsia-950">
                <Link to={"login"}  ><FaUser /></Link>
              </div>

            </div> : <div
              className="  text-slate text-2xl cursor-pointer"
              onClick={handleShow}
            >
              <div className="text-fuchsia-950 rounded-full w-10 h-10 overflow-hidden">
                <img src={user.profileUrl} className=" " />
              </div>
              {show && (
                <div className="absolute right-2 text-xs text-center   bg-white py-2 px-1 sgadow drop-shadow-md">
                  {
                    user.role === 'admin' && <Link to={"dashboard"}> <p className="whitespace-nowrap p-1 cursor-pointer  ">
                      Dashboard
                    </p></Link>
                  }
                  <Link to={"orders"}> <p className="whitespace-nowrap p-1 cursor-pointer  ">
                    Order
                  </p></Link>
                  <Link to={"account"}> <p className="whitespace-nowrap p-1 cursor-pointer  ">
                    Profile
                  </p></Link>
                  <Link to={""} onClick={logoutt}><p className="whitespace-nowrap p-1 cursor-pointer ">Logout</p></Link>
                </div>
              )}
            </div>
          }


        </div>
      </div>
    </header>
  );
};
export default Header;
