import React, { Fragment, useEffect, useState } from "react";

import Icon from "src/components/base/Icon";
import MobileMenu from "src/components/modules/MobileMenu";
import Sidebar from "../Sidebar";
import { authSelector, getCookie, getLinkedinConnectionStatus, setDarkMode } from "src/store/Auth";
import { useAppSelector, useAppDispatch } from "src/hook/redux/useStore";
import { Link } from "react-router-dom";
import Button from "src/components/base/Button";
import { extensionUrl } from "src/pages/Main/Automation/Builder/TemplateFormOptions";
import "./index.scss";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { dark } = useAppSelector(authSelector);

  const handleSetDarkMode = (val: boolean) => dispatch(setDarkMode(val));

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const darkMode = localStorage.getItem("darkMode");

  const { cookieInfo, linkedinConnectionStatus } = useAppSelector(authSelector);

  const handleChange = (val: boolean) => {
    if (val) {
      handleSetDarkMode(true);
      localStorage.setItem("darkMode", "true");
    } else {
      handleSetDarkMode(false);
      localStorage.setItem("darkMode", "false");
    }
  };

  const getCookieInfo = async () => {
    try {
      dispatch(getCookie());
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const getLinkedinConnectionStatusInfo = async () => {
    try {
      dispatch(getLinkedinConnectionStatus());
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCookieInfo();
      getLinkedinConnectionStatusInfo();
    }, 20000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    handleSetDarkMode(darkMode === "true" ? true : false);
  }, [darkMode]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleExtensionClick = async () => {
    window.open(extensionUrl, "_blank");
  };

  return (
    <div
      id='main'
      className='relative h-screen pb-10 overflow-x-hidden overflow-y-auto bg-bodyBgColor dark:bg-bodyBgColor-dark'
    >
      <MobileMenu setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <Sidebar />
      <div className='fixed top-0 z-50 flex items-center justify-start pl-12 mr-12 phone:hidden'>
        <div className='flex items-center justify-center h-65'>
          <Icon
            name='Logo'
            className='flex-none w-35 h-35'
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
        </div>
      </div>
      <div className='fixed top-0 left-0 text-center justify-center w-full' style={{ zIndex: 990 }}>
        {linkedinConnectionStatus && Object.keys(linkedinConnectionStatus).length !== 0 ? (
          <div className='text-center'>
            <p
              className={`text-white px-12 py-4 ${
                linkedinConnectionStatus.connected ? "" : "dark:bg-red-600 bg-red-500"
              }`}
            >
              {linkedinConnectionStatus.connected ? (
                <>
                  {/* `Linkedin Successfully Connected ${linkedinConnectionStatus.last_updated_at}` */}
                </>
              ) : (
                <div className='flex text-center justify-center pt-4'>
                  <span className='pr-8 text-center pt-4 pb-8'>
                    Your Linkedin is not integrated so nothing will run until it is integrated.
                  </span>
                  <div className='installExtensionReminder' id='installExtensionReminder'></div>
                  <span className='mx-8'>
                    <Link to='/linkedin'>
                      <Button buttonStyle='primary' className='dark:bg-gray-999 dark:text-white'>
                        Integrate Linkedin
                      </Button>
                    </Link>
                  </span>
                </div>
              )}
            </p>
          </div>
        ) : null}
        {cookieInfo && Object.keys(cookieInfo).length !== 0 ? (
          <div></div>
        ) : // <div className='text-center'>
        //   <p
        //     className={`text-white px-12 py-4 ${
        //       cookieInfo.cookie_invalid ? "dark:bg-red-600 bg-red-500" : ""
        //     }`}
        //   >
        //     {cookieInfo.cookie_invalid ? (
        //       <div className='flex text-center justify-center pt-4'>
        //         <span className='pr-8 text-center pt-4 pb-8'>
        //           Your cookie is not updated so nothing will run until it is updated.
        //         </span>
        //         <div className='installExtensionReminder' id='installExtensionReminder'></div>
        //         <span className='mx-8'>
        //           {/* <Link to='/linkedin'>
        //               <Button buttonStyle='primary' className='dark:bg-gray-999 dark:text-white'>
        //                 Update Cookie
        //               </Button>
        //             </Link> */}
        //           <Fragment>
        //             <div
        //               className='extensionReminder_link head_button_notification'
        //               id='getCookieExtension'
        //               data-notcookie={false}
        //               data-addcookie={false}
        //               onClick={(e) => {
        //                 toast.info("Loading...");
        //                 if (e.currentTarget.id === "getCookieExtension") {
        //                   window.open(extensionUrl);
        //                 }
        //               }}
        //             >
        //               <span className='notification_label'>Install Chrome Extension</span>
        //             </div>
        //           </Fragment>
        //         </span>
        //         <span className='mx-8'>
        //           {/* <Link to='/linkedin'>
        //             <Button
        //               buttonStyle='primary'
        //               className='dark:bg-gray-999 dark:text-white'
        //               onClick={handleExtensionClick}
        //             >
        //               Chrome Extension For Cookie Update
        //             </Button>
        //           </Link> */}
        //         </span>
        //       </div>
        //     ) : (
        //       // `Cookie Active updated ${cookieInfo.cookie_last_updated_at}`
        //       <></>
        //     )}
        //     {/* ? "Cookie Expired"
        //       : `Cookie Active updated ${cookieInfo.cookie_last_updated_at}`} */}
        //   </p>
        // </div>
        null}
      </div>
      <div className='relative' style={{ zIndex: 991 }}>
        <div className='fixed top-25 right-70'>
          <div className='flex items-center gap-6 text-neutral-800 dark:bg-neutral-300'>
            <Icon
              name={dark ? "Sun" : "Moon"}
              className={`dark:bg-bodyBgColor-dark bg-bodyBgColor dark:text-gray-200 text-gray-800 ${
                dark ? "w-30 h-30" : "w-26 h-26"
              }`}
              onClick={() => handleChange(dark ? false : true)}
            />
          </div>
        </div>
      </div>
      <div className='h-full pr-16 pl-76 pt-70 md:pl-120 md:pr-60'>{children}</div>
    </div>
  );
};

export default MainLayout;
