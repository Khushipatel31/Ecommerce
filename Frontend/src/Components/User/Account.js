import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Account = () => {
  const { user, isUpdated } = useSelector((state) => state.userSlice);
  return (
    <div className="flex flex-col items-center justify-center h-full pt-14 pb-14 ">
      <div className="flex gap-4 py-9 px-8 items-center">
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 mr-40 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={user.profileUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Link to="/me/update">
            <button className="bg-fuchsia-950 mr-40 hover:bg-fuchsia-900  text-white py-2 px-4 rounded-md mt-14">Edit profile</button>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="p-2 pt-3  text-xl font-bold">Name :</div>
          <div className="p-2 text-xl">{user.name}</div>
          <div className="p-2 text-xl font-bold">Email :</div>
          <div className="p-2 text-xl">{user.email}</div>
          <div className="flex flex-col gap-4 mt-11">
            <Link to="/edit-profile">
              <button className="bg-fuchsia-950 hover:bg-fuchsia-900 text-white py-2 w-[15vw] px-4 rounded-md">Edit Profile</button>
            </Link>
            <Link to='/password/update'>
              <button className="bg-fuchsia-950 hover:bg-fuchsia-900 text-white py-2 px-4 rounded-md">Change Password</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
