import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector, useDispatch } from "react-redux";
import SidebarLink from "./sidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { AiOutlineMenu } from "react-icons/ai";

function SideBar() {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return <div className="spinner" />;
  }

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button for Mobile */}
      <button onClick={toggleSidebar} className="lg:hidden p-4 text-white">
        <AiOutlineMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:transform-none lg:static lg:inset-0 transition-transform duration-300 ease-in-out bg-richblack-800 lg:min-w-[300px] text-white flex-col border-r-[1px] border-r-richblack-700 min-h-[calc(100vh-3.5rem)] py-10 z-20`}
      >
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} IconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto mb-6 h-[1px] w-10/12 bg-richblack-600" />

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            IconName="VscSettingsGear"
          />
          <button
            onClick={handleLogout}
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default SideBar;
