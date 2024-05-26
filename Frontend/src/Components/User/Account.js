import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../actions/userAction";
import Swal from "sweetalert2";
const Account = () => {
  const { user,error } = useSelector((state) => state.userSlice);
  useEffect(()=>{
    if(error){
      Swal.fire({
        title: `${error.response.data.message}`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/")
        }
      });
    }
  },[user])
  return (

    <div className="flex flex-col items-center justify-center h-full pt-14 pb-14 ">
      <div className="flex gap-4 py-9 px-8 items-center">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 mr-40 rounded-full overflow-hidden flex-shrink-0">
            {
              user &&   <img
              src={user.profileUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            }
          
          </div>
          
        </div>
        <div className="flex flex-col">
          <div className="p-2 pt-3  text-xl font-bold">Name :</div>
          <div className="p-2 text-xl">{user && user.name}</div>
          <div className="p-2 text-xl font-bold">Email :</div>
          <div className="p-2 text-xl">{user && user.email}</div>
          <div className="flex flex-col gap-4 pt-2">
          <Link to="/me/update">
          <button className="bg-fuchsia-950 hover:bg-fuchsia-900 text-white mt-5 mr-36 py-2 w-[15vw] px-4 rounded-md">Edit Profile</button>
          </Link>
            <Link to='/password/update'>
            <button className="bg-fuchsia-950 hover:bg-fuchsia-900 text-white mt-5 mr-36 py-2 w-[15vw] px-4 rounded-md">Change Password</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
