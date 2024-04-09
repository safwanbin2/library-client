const SearchedBookCard = ({ book, handleAddBook }) => {
  const handleAdd = (
    title,
    author,
    pageCount,
    language,
    genre,
    releasedDate,
    description,
    image
  ) => {
    const data = {
      title,
      author,
      pageCount,
      language,
      genre,
      releasedDate,
      description,
      image,
    };

    handleAddBook(data, "googlebook");
  };

  return (
    <div className="flex flex-wrap gap-6 my-10 justify-center">
      {book?.map((item, index) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;

        const description = item.volumeInfo.description || "N/A";
        const title = item?.volumeInfo.title;
        const author = item.volumeInfo.authors?.[0];

        if (thumbnail != undefined) {
          return (
            <div
              key={index}
              className=" md:flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 md:h-[200px]  w-[400px]"
            >
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-48 md:w-[150px] md:rounded-none md:rounded-s-lg"
                src={thumbnail}
                alt
              />
              <div className="flex flex-col justify-between py-4 md:py-0 px-4 gap-6 relative">
                <div className="">
                  <h5 className=" text-base font-bold tracking-tight text-gray-900 ">
                    {title.slice(0, 50)}
                  </h5>
                  <p className=" font-normal text-gray-700 text-sm ">
                    By <span className="font-semibold">{author}</span>
                  </p>
                  <p className="text-sm">
                    {item.volumeInfo.publisher}
                    <span>{item.volumeInfo.publishedDate}</span>
                  </p>
                </div>
                <button
                  className="bg-blue-600 text-white p-1 rounded-sm"
                  onClick={() =>
                    handleAdd(
                      title,
                      author,
                      item.volumeInfo.pageCount,
                      item.volumeInfo.language,
                      // item.volumeInfo.categories?.[0],
                      "Medical",
                      item.volumeInfo.publishedDate,
                      description,
                      thumbnail
                    )
                  }
                >
                  Add book
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default SearchedBookCard;
