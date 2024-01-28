"use client";

import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
} from "react-pro-sidebar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiGlobalFill, RiInkBottleFill } from "react-icons/ri";
import { BiDiamond } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";

import { useRouter } from "next/navigation";
import { SidebarHeader } from "@/components/molecules/SidebarHead";

const menuClasses = {
  root: "ps-menu-root",
  menuItemRoot: "ps-menuitem-root",
  subMenuRoot: "ps-submenu-root",
  button: "ps-menu-button",
  prefix: "ps-menu-prefix",
  suffix: "ps-menu-suffix",
  label: "ps-menu-label",
  icon: "ps-menu-icon",
  subMenuContent: "ps-submenu-content",
  SubMenuExpandIcon: "ps-submenu-expand-icon",
  disabled: "ps-disabled",
  active: "ps-active",
  open: "ps-open",
};

const themes = {
  sidebar: {
    backgroundColor: "#0b2948",
    color: "#8ba1b7",
  },
  menu: {
    menuContent: "#082440",
    icon: "#59d0ff",
    hover: {
      backgroundColor: "#00458b",
      color: "#b6c8d9",
    },
    disabled: {
      color: "#3e5e7e",
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const MySidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされた後に、クライアントサイドであることを設定
    setIsClient(true);
  }, []);

  const router = useRouter();

  // ページ遷移を行う関数
  const navigate = (path: string) => {
    router.push(path);
  };

  const ArrowIcon = collapsed ? IoIosArrowForward : IoIosArrowBack;
  const justifyContent = collapsed ? "justify-center" : "justify-end";

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: themes.menu.icon,
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: hexToRgba(themes.menu.menuContent, 0.9),
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes.menu.disabled.color,
      },
      "&:hover": {
        backgroundColor: hexToRgba(themes.menu.hover.backgroundColor, 0.8),
        color: themes.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <>
      {isClient && (
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          onBreakPoint={setBroken}
          breakPoint="md"
          backgroundColor={hexToRgba(themes.sidebar.backgroundColor, 0.9)}
          rootStyles={{
            color: themes.sidebar.color,
          }}
          className="z-20"
        >
          <div className={`flex ${justifyContent}`}>
            <ArrowIcon
              className="h-6 w-6 text-neutral-500 cursor-pointer hover:scale-110"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>

          <div className="flex flex-col">
            <SidebarHeader />
            <div className="flex-1 mb-12">
              <Menu menuItemStyles={menuItemStyles}>
                <SubMenu label="Charts" icon={<AiOutlineBarChart size={25} />}>
                  <MenuItem> Pie charts</MenuItem>
                  <MenuItem> Line charts</MenuItem>
                  <MenuItem> Bar charts</MenuItem>
                </SubMenu>
                <SubMenu label="Maps" icon={<RiGlobalFill size={25} />}>
                  <MenuItem> Google maps</MenuItem>
                  <MenuItem> Open street maps</MenuItem>
                </SubMenu>
                <SubMenu label="Theme" icon={<RiInkBottleFill size={25} />}>
                  <MenuItem> Dark</MenuItem>
                  <MenuItem> Light</MenuItem>
                </SubMenu>
                <SubMenu label="Components" icon={<BiDiamond size={25} />}>
                  <MenuItem> Grid</MenuItem>
                  <MenuItem> Layout</MenuItem>
                  <SubMenu label="Forms">
                    <MenuItem> Input</MenuItem>
                    <MenuItem> Select</MenuItem>
                    <SubMenu label="More">
                      <MenuItem> CheckBox</MenuItem>
                      <MenuItem> Radio</MenuItem>
                    </SubMenu>
                  </SubMenu>
                </SubMenu>

                <Menu menuItemStyles={menuItemStyles}>
                  <MenuItem
                    icon={<FaShoppingCart size={25} />}
                    onClick={() => navigate("/sample/1")}
                  >
                    Project
                  </MenuItem>
                </Menu>
                <Menu menuItemStyles={menuItemStyles}>
                  <MenuItem
                    icon={<FaShoppingCart size={25} />}
                    onClick={() => navigate("/projects")}
                  >
                    Project
                  </MenuItem>
                </Menu>
              </Menu>
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
};

export default MySidebar;
