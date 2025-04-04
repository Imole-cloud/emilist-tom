import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useContext, useState } from "react";

import toast from "react-hot-toast";

import { MaterialDetailType } from "@/types";
import { buildingMaterials } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import {
  formatInputTextNumberWithCommas,
  removeCommas,
} from "@/helpers/formatInputTextNumberWithCommas";

export const useListNewMaterial = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("NGN");
  const [location, setLocation] = useState("");
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<any>([]);
  const [category, setCategory] = useState<null | string>("");
  const [subCategory, setSubCatgory] = useState("");
  const [materialDetails, setMaterialsDetails] = useState<MaterialDetailType>({
    product_name: "",
    brand: "",
    description: "",
    quantity_available: "",
    price: "",
    supplier: "",
    location: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMaterialsDetails({
      ...materialDetails,
      [name]:
        name === "price" || name === "quantity_available"
          ? formatInputTextNumberWithCommas(value)
          : value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setCategory(selectedName);
  };

  // Get the selected category's subcategories
  const selectedMaterial = buildingMaterials.find(
    (material) => material.name === category
  );

  //   handle image change state
  const onSelectFile = (e: any) => {
    const selectedFiles = e.target.files;
    const newImages = [...selectedImageFiles];
    const selectedFilesArray = Array.from(selectedFiles);
    const invalidFiles: any = [];
    let totalImages = newImages.length + selectedFilesArray.length;

    if (totalImages > 5) {
      toast.error(`You can only select up to 5 images.`, toastOptions);
      e.target.value = null;
      return;
    }

    selectedFilesArray.forEach((file: any) => {
      const fileSize = Math.round(file.size / 1024);
      const fileType = file.type.split("/")[1];
      if (!["jpeg", "jpg", "png"].includes(fileType)) {
        invalidFiles.push(file.name);
      } else if (fileSize > 2000) {
        invalidFiles.push(file.name);
      } else {
        // Check if the file is already added
        if (!newImages.some((img) => img.name === file.name)) {
          newImages.push(file);
        }
      }
    });

    if (invalidFiles.length > 0) {
      let errorMessage = "";
      invalidFiles.forEach((fileName: string) => {
        errorMessage += `${fileName} `;
      });
      errorMessage += invalidFiles.length === 1 ? "is" : "are";
      errorMessage +=
        " not a valid JPEG, JPG, or PNG file or exceeds the maximum size of 2mb.";
      toast.error(`${errorMessage}`, toastOptions);
      e.target.value = null;
    }

    // Update state with valid files only
    const imagesArray = newImages.map((file: any) => URL.createObjectURL(file));
    setSelectedImages(imagesArray);
    setSelectedImageFiles(newImages);
  };

  const handleImageDelete = (index: any) => {
    const newImages = [...selectedImageFiles];
    newImages.splice(index, 1);
    setSelectedImageFiles(newImages);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const {
      product_name,
      brand,
      description,
      quantity_available,
      price,
      supplier,
    } = materialDetails;

    if (
      !product_name ||
      !category ||
      !subCategory ||
      !brand ||
      !description ||
      !quantity_available ||
      !price ||
      !supplier ||
      !location
    ) {
      toast.error(`Fill all input fields`, toastOptions);
      return;
    }

    if (selectedImages.length === 0 || selectedImageFiles.length === 0) {
      toast.error(`Please select an image`, toastOptions);
      return;
    }
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
      throw new Error("Google Maps API key is not defined.");
    }
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${googleMapsApiKey}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      toast.error(
        `Please enter a valid address from the suggestions.`,
        toastOptions
      );
      return;
    }
    setLoading(true);
    try {
      const materialPayload: any = {
        name: product_name,
        category,
        subCategory,
        brand,
        description,
        availableQuantity: removeCommas(quantity_available.toString()),
        price: removeCommas(price.toString()),
        storeName: supplier,
        location,
        currency,
      };
      const formData = new FormData();
      for (const property in materialPayload) {
        formData.append(property, materialPayload[property]);
      }

      selectedImageFiles.forEach((file: any) => formData.append("files", file));
      await axiosInstance.post(`/material/create-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Product successfully uploaded`, toastOptions);
      setMaterialsDetails({
        product_name: "",
        brand: "",
        description: "",
        quantity_available: "",
        price: "",
        supplier: "",
        location: "",
      });
      router.push("/dashboard/material/my-listed-materials");
      setCategory("");
      setSubCatgory("");
      setLocation("");
      setSelectedImageFiles([]);
      setSelectedImages([]);
    } catch (error: any) {
      console.log("error listing new material", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    materialDetails,
    loading,
    selectedImages,
    onSelectFile,
    handleImageDelete,
    setSelectedImages,
    subCategory,
    setSubCatgory,
    handleCategoryChange,
    selectedMaterial,
    setCurrency,
    currency,
    location,
    setLocation,
  };
};
