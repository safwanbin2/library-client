import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import { FaCamera } from "react-icons/fa";
import unknown from "../../../assets/unknown.jpg";
import { toast } from "sonner";
import axios from "axios";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setloading] = useState(false);

  const { userDB } = useContext(AuthContext);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setloading(true);
    if (file) {
      const formdata = new FormData();
      formdata.append("image", file);

      const result = await axios.patch(`/users/image/${userDB?._id}`, formdata);

      if (result?.data?.statusCode === 200) {
        toast.success("Image updated!");
        setloading(false);
      }
    }
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
            src={userDB?.image}
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
