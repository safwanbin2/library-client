import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import { FaCamera } from "react-icons/fa";
import unknown from "../../../assets/unknown.jpg";
import config from "../../../config";
import { toast } from "sonner";
import LoadingScreen from "../../LoadingScreen";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setloading] = useState(false);

  const { user, userDB } = useContext(AuthContext);

  const handleImageChange = async (e) => {
    // const file = e.target.files[0];
    // if (file) {
    //   setloading(true);
    //   const formdata = new FormData();
    //   formdata.append("image", file);
    //   console.log(formdata);
    //   fetch(`${config.base_url}/users/upload?email=${user?.email}`, {
    //     method: "POST",
    //     body: formdata,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       if (!data?.success) {
    //         setloading(false);
    //         return toast.error(data.message);
    //       }
    //       setSelectedImage(data.data.photo);
    //       toast.success("Uploaded Successfully");
    //       setloading(false);
    //     })
    //     .catch((err) => {
    //       setloading(false);
    //       console.log(err);
    //       toast.error("Something went wrong");
    //     });
    // }
  };

  return (
    <>
      <div className="relative">
        {loading ? (
          <img
            src={unknown}
            alt=""
            className="rounded-full size-24 border-4 border-primary"
          />
        ) : selectedImage ? (
          <img
            src={selectedImage}
            alt=""
            className="rounded-full size-24 border-4 border-primary"
          />
        ) : (
          <img
            src={
              selectedImage
                ? selectedImage
                : userDB?.photo
                ? userDB?.photo
                : user?.photoURL
                ? user?.photoURL
                : unknown
            }
            alt=""
            className="rounded-full size-24 border-4 border-primary"
          />
        )}
        <label
          htmlFor="fileInput"
          className="inline-block p-2 rounded-full  border-4 border-base-100 bg-secondary hover:bg-primary transition-all duration-300 cursor-pointer absolute bottom-0 right-0"
        >
          <input
            id="fileInput"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className="hidden"
            onChange={handleImageChange}
          />
          <FaCamera className="text-white" />
        </label>
      </div>
    </>
  );
};

export default UploadImage;
