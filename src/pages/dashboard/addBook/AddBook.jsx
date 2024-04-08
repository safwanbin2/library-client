import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import UploadBookImage from "../../../components/dashboard/addBook/UploadBookImage";
import axios from "axios";
import { toast } from "sonner";
import SearchedBookCard from "./SearchedBookCard";
const AddBook = () => {
  const { userDB } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [bookData, setData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddBook = async (data) => {
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
      } else {
        formData.append("googleImage", data.image);
      }
      formData.append("user", userDB?._id);

      const promise = await axios.post(`/books/create`, formData);
      if (promise.status === 200) {
        toast.success(`New book added!`, {
          id: "book",
          duration: 2000,
          position: "top-right",
        });
        reset();
        setImageFile(null);
        setImagePreview(null);
        setLoading(false);
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(
        error.response.data.message || `Failed to add new book`,
        {
          id: "book",
          duration: 2000,
          position: "top-right",
        }
      );
    }
  };

  // AIzaSyBSK3Pnsh-wvplEf7bac88yxhwL7EEPORM

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const fetchData = async (searchValue) => {
    if (searchValue) {
      try {
        setLoadingBooks(true);
        const result = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: "Comedy",
              key: "AIzaSyBSK3Pnsh-wvplEf7bac88yxhwL7EEPORM",
              maxResults: 9,
            },
          }
        );
        setData(result.data.items);
        setLoadingBooks(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData("react");
  }, []);

  console.log({ bookData });

  const debouncedFetchData = debounce(fetchData, 500);

  const onChangeSearch = (event) => {
    const searchValue = event.target.value;
    debouncedFetchData(searchValue);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center gap-5">
        <form
          onSubmit={handleSubmit(handleAddBook)}
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
                defaultValue="English"
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
              <select
                {...register("genre", {
                  required: "Select a Genre",
                })}
                className="border rounded-full focus:outline-none p-2  w-full"
              >
                <option value="Action">Action</option>
                <option value="Thriller">Thriller</option>
                <option value="Epic">Epic</option>
                <option value="Romantic">Romantic</option>
                <option value="Fiction">Fiction</option>
              </select>
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
              {errors.description &&
                errors.description.type === "minLength" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">
                      Description is must be avobe 10 character
                    </span>
                  </label>
                )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
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
          <button
            disabled={loading}
            type="submit"
            className="p-btn rounded-full !py-2 !px-4"
          >
            {loading ? "Adding.." : "Add Book"}
          </button>
        </form>
      </div>
      <div className="mt-10 max-w-xl mx-auto">
        <h2 className="text-center text-xl font-semibold">
          Search and add book
        </h2>

        <div className="form-control">
          <label className="label ps-0"></label>
          <input
            type="text"
            placeholder="Book Title"
            className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            onChange={onChangeSearch}
          />
          {errors.title && (
            <label className="label text-red-400 text-xs ps-0">
              <span className="">{errors.title.message}</span>
            </label>
          )}
        </div>
      </div>
      {loadingBooks ? (
        <p className="text-center mt-10">Searching..</p>
      ) : (
        <SearchedBookCard book={bookData} handleAddBook={handleAddBook} />
      )}
    </>
  );
};

export default AddBook;
