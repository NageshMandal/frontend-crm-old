import Avatar from "react-avatar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "src/components/base/Icon";
import MenuItem from "src/components/base/MenuItem";
import SideMenu from "src/components/modules/SideMenu";
import { authSelector, logout } from "src/store/Auth";
import { menuPaths } from "src/routes/menuPaths";
import { paths } from "src/routes/path";
import { useAppSelector, useAppDispatch } from "src/hook/redux/useStore";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate(paths.auth.login);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleCreateAutomation = () => {
    navigate(paths.main.automation.create);
  };

  const { userInfo, isPending } = useAppSelector(authSelector);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='fixed z-40 flex-col hidden h-screen border-r phone:flex bg-contentColor dark:bg-contentColor-dark border-borderColor dark:border-borderColor-dark'
    >
      <div
        className={`relative flex flex-col h-screen transition-all duration-400  ${
          open ? "w-210" : "w-60"
        }`}
      >
        <div className='flex items-center justify-start mx-12 border-b dark:border-borderColor-dark border-borderColor'>
          <div className='flex items-center justify-center h-65'>
            <Icon name='Logo' className='w-35 h-35' onClick={() => setOpen((prev) => !prev)} />
          </div>
          <h2
            className={`text-30 text-primary font-medium leading-30 pl-6 transition-all  overflow-hidden select-none ${
              open ? "w-full" : "w-0"
            }`}
          >
            Salestools
          </h2>
        </div>
        <MenuItem
          open={open}
          className='mx-8 mt-25'
          label='Create Automation'
          onClick={() => handleCreateAutomation()}
        />
        <SideMenu open={open} list={menuPaths} handleChangeOpen={() => setOpen(false)} />
        <div className='absolute bottom-0 flex items-end flex-1 pb-10'>
          {isPending ? null : (
            <div
              className={`mt-20 px-5 mx-5 py-8 border border-transparent rounded-md flex justify-start gap-6 items-center  cursor-pointer select-none flex-1 transition-all duration-200 hover:border hover:border-borderHoverColor hover:dark:border-borderHoverColor-dark ${
                open ? "border dark:border-borderColor-dark border-borderColor" : ""
              }`}
              onClick={() => handleLogout()}
            >
              <Avatar
                color='#ec87bf'
                textSizeRatio={1}
                name={`${userInfo?.first_name} ${userInfo?.last_name}`}
                size='35'
                round
              />
              <div
                className={`overflow-hidden flex flex-wrap justify-between items-center transition-all duration-100 , ${
                  open ? "w-140" : "w-0"
                }`}
              >
                <div className='font-medium text-16 whitespace-nowrap dark:text-gray-300'>
                  {`${userInfo?.first_name} ${userInfo?.last_name}`}
                  {""}
                </div>
                <Icon
                  name='FiLogOut'
                  className={"flex-none w-20 h-20 dark:text-gray-300 text-gray-800"}
                />
                <div>LogOut</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
