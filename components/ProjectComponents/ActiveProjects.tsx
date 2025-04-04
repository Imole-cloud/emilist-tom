"use client";

import Link from "next/link";
import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetProjectByStatus } from "@/hooks/useGetProjectByStatus useGetProjectByStatus";
import { formatDueDate, formatStartDate } from "@/helpers";

const ActiveProjects = () => {
  const { currentUser, userLoading } = useContext(AuthContext);

  const {
    isLoading,
    allProjects,
    search,
    handleChange,
    getAllProjectsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  } = useGetProjectByStatus();

  useEffect(() => {
    if (currentUser) {
      getAllProjectsByStatus("active");
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
          {allProjects.length < 1 ? (
            <div className="text-gray-500">
              <h6 className="text-xl text-[#282828]">
                {" "}
                You do not have any project at the moment
              </h6>
              <p>Keep track of all active project here.</p>
            </div>
          ) : (
            <>
              {allProjects?.map((project: any, index: number) => (
                <Link
                  key={index}
                  href={
                    project?.type === "biddable"
                      ? `/dashboard/project/info/biddable/${project?._id}`
                      : project?.type === "regular"
                      ? `/dashboard/project/info/regular/${project?._id}`
                      : `/dashboard/project/info/direct/${project?._id}`
                  }
                  className="col-span-2 w-full min-w-full max-md:col-span-3 border-[1px] border-[#D0CFCF] rounded-[10px] p-6 max-sm:px-3 flex justify-between items-center max-md:flex-col gap-4 max-md:justify-start max-md:items-start"
                >
                  <div className="flex ">
                    <h6 className="sm:text-lg font-semibold truncate">
                      {project?.title && project?.title}
                    </h6>
                  </div>
                  <div className="rounded-[20px] flex justify-end items-center gap-8 max-sm:gap-3">
                    <div className="flex flex-col gap-2 max-sm:hidden">
                      <p className="text-[#5E625F]  text-[14px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                        Milestone
                      </p>
                      <h6 className="text-[#303632]  text-[16px] font-[700]  max-sm:text-[13px]  whitespace-nowrap">
                        {project?.milestoneProgress &&
                          project?.milestoneProgress}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2 max-md:hidden">
                      <p className="text-[#5E625F]  text-[14px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                        Start Date
                      </p>
                      <h6 className="text-[#303632]  text-[16px] font-[700]  max-sm:text-[13px]  whitespace-nowrap">
                        {project?.startDate &&
                          formatStartDate(project?.startDate)}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[#5E625F]  text-[14px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                        Due date
                      </p>
                      <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                        <p className="text-[#25C269]  text-[14px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                          {project?.milestoneDueDate &&
                            formatDueDate(project?.milestoneDueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 max-sm:hidden">
                      <p className="text-[#5E625F]  text-[14px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                        Project Due date
                      </p>
                      <div className=" flex items-center justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-[20px]">
                        <p className="text-[#25C269]  text-[14px] font-[500] max-sm:text-[12px] whitespace-nowrap">
                          {project?.overallDueDate &&
                            formatDueDate(project?.overallDueDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
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

export default ActiveProjects;
