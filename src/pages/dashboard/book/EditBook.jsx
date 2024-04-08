import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import UploadBookImage from "../../../components/dashboard/addBook/UploadBookImage";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
const EditBook = () => {
  const { userDB } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const bookId = useLoaderData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const { data: book, refetch } = useQuery({
    queryKey: [bookId],
    queryFn: async () => {
      const res = await axios.get(`/books/single/${bookId}`);

      Object.keys(res.data.data).forEach((key) => {
        setValue(key, res.data.data[key]);
      });

      return res.data.data;
    },
  });

  // console.log({ book });

  const handleEditBook = async (data) => {
    delete data?._id;
    delete data?.user;
    delete data?.image;
    delete data?.reviews;
    delete data?.createdAt;
    delete data?.updatedAt;
    delete data?.__v;

    console.log(data);

    setLoading(true);
    try {
      const formData = new FormData();

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          formData.append(key, data[key]);
        }
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // console.log({ data });

      const promise = await axios.patch(`/books/update/${bookId}`, formData);
      if (promise.status === 200) {
        toast.success(`Book updated!`, {
          id: "book",
          duration: 2000,
          position: "top-right",
        });
        setLoading(false);
        navigate(-1);
        refetch();
        setImageFile(null);
        setImagePreview(null);
        // setData([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(
        error.response.data.message || `Failed to update book`,
        {
          id: "book",
          duration: 2000,
          position: "top-right",
        }
      );
    }
  };
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <h2 className="text-xl font-semibold">Edit Book</h2>
      <form
        onSubmit={handleSubmit(handleEditBook)}
        className="mt-2 w-full space-y-2 md:space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Title</span>
            </label>
            <input
              {...register("title", {
                required: "Title is required",
              })}
              type="text"
              placeholder="Movie Title"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.title && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.title.message}</span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Author</span>
            </label>
            <input
              {...register("author", {
                required: "Provide author name",
              })}
              type="text"
              placeholder="Author Name"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.author && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.author.message}</span>
              </label>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Page</span>
            </label>
            <input
              {...register("page", {
                required: "Provide page count",
              })}
              type="number"
              placeholder="Page count"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.page && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.page.message}</span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Language</span>
            </label>
            <input
              {...register("language", {
                required: "Provide a language",
              })}
              type="text"
              placeholder="Language"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.language && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.language.message}</span>
              </label>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Genre</span>
            </label>
            <input
              {...register("genre", {
                required: "Provide a Genre",
              })}
              type="text"
              placeholder="Genre"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.genre && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.genre.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label ps-0">
              <span className="">Release Date</span>
            </label>
            <input
              {...register("releaseDate", {
                required: "Can not be empty",
              })}
              type="date"
              placeholder="release date"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.releaseDate && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.releaseDate.message}</span>
              </label>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Description</span>
            </label>
            <textarea
              {...register("description", {
                required: "Add a description",
                minLength: 10,
              })}
              type="text"
              placeholder="Description"
              rows="4"
              className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.description && errors.description.type === "required" && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">Description is required</span>
              </label>
            )}
            {errors.description && errors.description.type === "minLength" && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">
                  Description is must be avobe 10 character
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Image</span>
            </label>
            <UploadBookImage
              imageFile={imageFile}
              setImageFile={setImageFile}
              setImagePreview={setImagePreview}
            />
          </div>
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-32 h-w-32"
              />
            </div>
          )}
        </div>
        <button type="submit" className="p-btn rounded-full !py-2 !px-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBook;
