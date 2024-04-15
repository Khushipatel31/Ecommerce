import React from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar bg-white flex flex-col py-16 w-64 border border-r-2 h-screen border-b-0 ">
      <Link to="/admin/dashboard" className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl">
        <p>
          <DashboardIcon className="inline-block mr-2" /> Dashboard
        </p>
      </Link>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
        className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl"
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products" className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>
          <Link to="/admin/product" className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
      <Link to="/admin/orders" className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl">
        <p className="self-center">
          <ListAltIcon className="inline-block mr-2" />
          Orders
        </p>
      </Link>
      <Link to="/admin/users" className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl">
        <p>
          <PeopleIcon className="inline-block mr-2" /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className="text-black  font-light text-sm transition-all duration-500 py-8 px-8 hover:text-tomato transform hover:text-xl">
        <p>
          <RateReviewIcon className="inline-block mr-2" />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
