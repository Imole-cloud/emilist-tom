import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useUnsaveMaterial = () => {
  const { currentUser } = useContext(AuthContext);
  const [issLoading, setIsLoading] = useState<boolean>(false);
  const [unsaveRerenderr, setRerenderr] = useState<boolean>(true);
  const router = useRouter();

  const handleUnsaveMaterial = async (materialId: string) => {
    if (!currentUser) {
      return router.push("/login");
    }
    try {
      setIsLoading(true);
      await axiosInstance.get(`/material/unlike-product/${materialId}`);
      toast.success(`Material removed from saved.`, toastOptions);
      setRerenderr((prev) => !prev);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log("error unsaving material", error);
      promiseErrorFunction(error);
    }
  };
  return {
    issLoading,
    handleUnsaveMaterial,
    unsaveRerenderr,
  };
};
