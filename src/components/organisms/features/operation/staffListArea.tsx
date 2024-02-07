"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useStoreStaff } from "@/hooks/useStoreStaff";
import { Sidebar } from "react-pro-sidebar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { StoreStaff } from "@/types/model/staff";
import { useReservation } from "@/hooks/useReservation";

type Inputs = {
  searchName: string;
};

const StaffListArea = () => {
  const [collapsed, setCollapsed] = useState(true);
  // サイドバーの内容表示フラグ
  const [showContent, setShowContent] = useState<boolean>(!collapsed);

  const { register, watch, reset } = useForm<Inputs>({
    defaultValues: {
      searchName: "",
    },
  });
  const searchName = watch("searchName");

  useEffect(() => {
    // collapsedがfalseになった場合、テキストの表示を遅延させる
    if (!collapsed) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300);
      // クリーンアップ関数でタイマーをクリア
      return () => clearTimeout(timer);
    }
    // collapsedがtrueの場合は、テキストを即座に非表示にする
    setShowContent(false);
  }, [collapsed]);

  const { storeStaffs, activeStaffs, handleToggleActiveStaff } =
    useStoreStaff();
  const { isStaffInProgress } = useReservation();

  const displayStaffs = useMemo(() => {
    return storeStaffs?.filter((staff) => {
      return (
        staff.lastName.includes(searchName) ||
        staff.firstName?.includes(searchName)
      );
    });
  }, [storeStaffs, searchName]);

  const toggleActiveFlag = async (staff: StoreStaff) => {
    await handleToggleActiveStaff(staff);
  };

  const ArrowIcon = collapsed ? IoIosArrowBack : IoIosArrowForward;
  const justifyContent = collapsed ? "justify-center" : "justify-start ml-2";

  return (
    <Sidebar
      collapsed={collapsed}
      collapsedWidth="60px"
      className="bg-blue-100"
    >
      <div className={`flex ${justifyContent}`}>
        <ArrowIcon
          className="h-6 w-6 text-neutral-500 cursor-pointer hover:scale-110"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* 開いてる時 */}
      {!collapsed && (
        <>
          {/* 検索フォーム */}
          <div className="flex flex-col justify-start">
            <form className="flex items-center justify-between bg-white rounded-md p-2 m-3 shadow-lg flex-1 relative">
              <AiOutlineSearch className="h-6 w-6 text-gray-400" />
              <input
                {...register("searchName")}
                type="text"
                className="flex-1 mx-1 outline-none"
                placeholder="Search"
              />
              <AiOutlineClose
                onClick={() => reset()}
                className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-500 absolute right-2"
              />
              <button type="submit" hidden>
                Search
              </button>
            </form>
          </div>

          {/* スタッフ一覧 */}
          {displayStaffs?.map((staff) => (
            <div key={staff.staffId} className="p-3 flex">
              <div className={collapsed ? "w-full" : "w-1/5 flex items-center"}>
                <Image
                  className={`rounded-full cursor-pointer transition-transform`}
                  height={34}
                  width={34}
                  alt="Avatar"
                  src={"/images/img.png"}
                  priority
                />
              </div>
              {showContent && (
                <div className="w-4/5 flex items-center justify-between mx-3">
                  <div>
                    {staff.lastName} {staff.firstName}
                  </div>
                  <div>
                    <Switch
                      checked={staff.isActive}
                      onChange={() => toggleActiveFlag(staff)}
                      className={`${
                        !staff.isActive
                          ? "bg-gray-200"
                          : isStaffInProgress(staff.staffId) // 対応中かどうか
                            ? "bg-blue-200" // 対応中の場合
                            : "bg-blue-600" // 対応中でない場合
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                      disabled={isStaffInProgress(staff.staffId)}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`${
                          staff.isActive ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* 閉じてる時 */}
      {/* 活動中のスタッフ一覧 */}
      {collapsed &&
        activeStaffs?.map((staff) => (
          <div key={staff.staffId} className="p-3 flex">
            <div className={collapsed ? "w-full" : "w-1/5 flex items-center"}>
              <Image
                className={`rounded-full cursor-pointer transition-transform`}
                height={34}
                width={34}
                alt="Avatar"
                src={"/images/img.png"}
                priority
              />
            </div>
          </div>
        ))}
    </Sidebar>
  );
};

export default StaffListArea;
