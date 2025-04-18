"use client";

import Image from "next/image";
import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetJobByStatus } from "@/hooks/useGetJobByStatus";
import Link from "next/link";

const PausedJobs = () => {
  const { currentUser, userLoading } = useContext(AuthContext);
  const {
    isLoading,
    allJobs,
    search,
    handleChange,
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  } = useGetJobByStatus();

  useEffect(() => {
    if (currentUser) {
      getAllJobsByStatus("paused");
    }
  }, [currentUser]);

  return (
    <>
      {isLoading || userLoading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh] w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-10">
          {allJobs?.length < 1 ? (
            <div className="">
              <h6 className="sm:text-xl"> No paused job</h6>
              <p className="max-sm:text-sm">
                Keep track of all paused jobs here.
              </p>
            </div>
          ) : (
            <>
              {allJobs?.map((job: any, index: number) => (
                <div
                  key={index}
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b max-md:flex-col gap-4 max-md:justify-start max-md:items-start"
                >
                  <div className="flex ">
                    <Link
                      href={
                        job?.type === "biddable"
                          ? `/dashboard/job/active/info/biddable/${job._id}`
                          : job?.type === "regular"
                          ? `/dashboard/job/active/info/regular/${job._id}`
                          : `/dashboard/job/active/info/direct/${job._id}`
                      }
                      className="sm:text-xl font-semibold hover:text-primary-green transition-all duration-300"
                    >
                      {job?.title && job?.title}
                    </Link>
                  </div>
                  <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium max-sm:text-xs whitespace-nowrap">
                        Milestone
                      </p>
                      <h6 className="font-bold max-sm:text-sm  whitespace-nowrap">
                        {job?.milestoneProgress && job?.milestoneProgress}
                      </h6>
                    </div>

                    <div className="flex-c flex-col gap-2">
                      <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
                        Paused
                      </p>
                      <div className=" flex-c justify-center bg-[#FFF5EB] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-xl">
                        <Image
                          src="/assets/icons/pause.svg"
                          alt="menu"
                          width={20}
                          height={24}
                          className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className=" flex-c justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-xl">
                        <p className="text-primary-green  text-xs font-medium whitespace-nowrap">
                          Activate
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-span-2 w-full min-w-full max-md:col-span-3">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={handlePageChange}
                  extraClassName="justify-content-start"
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PausedJobs;
