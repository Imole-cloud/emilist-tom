import Image from "next/image";

import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";

import { toastOptions } from "@/helpers";

interface EditFormThreeProps {
  setProfilePicturFile: (file: File | null) => void;
  profilePicture: string;
  setProfilePicture: (file: string) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const EditFormThree = ({
  setProfilePicturFile,
  profilePicture,
  setProfilePicture,
  nextPage,
  prevPage,
}: EditFormThreeProps) => {
  const handleDelete = () => {
    setProfilePicturFile(null);
    setProfilePicture("");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Allowed file types
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      const maxSizeInMB = 2 * 1024 * 1024; //2MB

      // Check file size
      if (file.size > maxSizeInMB) {
        toast.error("File exceeds the 3MB size limit.", toastOptions);
        return;
      }

      // Check file type
      if (!validExtensions.includes(file.type)) {
        toast.error(
          "Unsupported file type. Only jpg, jpeg, and png are allowed.",
          toastOptions
        );
        return;
      }

      setProfilePicturFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    if (!profilePicture) {
      return toast.error("Please select a profile image", toastOptions);
    }
    nextPage();
  };

  return (
    <section className="max-md:padding-x h-screen overflow-y-auto">
      <div className="md:pl-[500px] w-full">
        <div className="pt-28 max-md:pt-24 max-md:pb-15 px-10 w-full max-md:px-5 max-sm:px-3">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="expert-reg-title">Edit your profile photo</h1>
            <p className="py-4 max-w-[550px]">
              Upload the best business pictures here.
            </p>
            <div className="grid grid-cols-5 gap-6 w-full">
              <div className="col-span-3 max-lg:col-span-5 max-md:col-span-3 max-sm:col-span-5 w-full">
                <div className="w-full shadow-lg flex-c flex-col justify-center  py-5 rounded-lg">
                  <div className="w-[216px] h-[210px] bg-[#ECECEC] rounded flex-c justify-center">
                    {profilePicture ? (
                      <div className="w-full h-full relative">
                        {profilePicture && (
                          <Image
                            src={profilePicture}
                            alt="upload"
                            width={30}
                            height={30}
                            className="object-cover w-full h-full"
                          />
                        )}
                        <button className="absolute bottom-0 right-0 bg-primary-green p-2">
                          <span className="" onClick={handleDelete}>
                            <CgCloseR />
                          </span>
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="profile-pic"
                        className="w-full h-full cursor-pointer"
                      >
                        <input
                          id="profile-pic"
                          type="file"
                          onChange={handleChange}
                          name="file"
                          className="invisible h-[1px] w-[1px]"
                          style={{ fontSize: "16px" }}
                        />
                      </label>
                    )}
                  </div>

                  <div className="flex justify-end max-sm:justify-center col-span-4 mt-4 cursor-pointer">
                    <label
                      htmlFor="profile-pic"
                      className="custom-btn cursor-pointer"
                    >
                      Upload
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-span-2 max-md:col-span-2 max-lg:hidden max-md:flex max-sm:hidden">
                <div className="w-full shadow-lg flex flex-col justify-center py-5 rounded-lg border-l-8 border-primary-green px-4">
                  <h3 className="text-[18px] font-medium leading-2xl max-sm:text-lg">
                    Photo Tips
                  </h3>
                  <ul className="py-3 px-4 list-disc flex flex-col gap-2">
                    <li className="max-sm:text-sm">
                      A photo of your face works better than a logo
                    </li>
                    <li className="max-sm:text-sm">Make sure to smile.</li>
                    <li className="max-sm:text-sm">
                      Try to use a solid background
                    </li>
                  </ul>
                  <div className="w-full">
                    <Image
                      src="/assets/images/profice-picture-guide.png"
                      alt="upload"
                      width={88}
                      height={88}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-5  col-span-5 pb-24 pt-4">
                <button className="custom-btn" onClick={prevPage}>
                  Back
                </button>
                <button className="custom-btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditFormThree;
