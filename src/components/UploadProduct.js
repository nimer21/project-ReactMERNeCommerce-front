import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "./../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "./../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "./../common/index";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  //const [uploadProductImageInput, setUploadProductImageInput] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //setData({ ...data, [e.target.name]: e.target.value });
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    //setUploadProductImageInput(file.name);
    //console.log("file", file);

    const uploadImageCloudinary = await uploadImage(file);
    //setData({...data, productImage: [uploadImageCloudinary.url] });
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
    //console.log("uploadImageCloudinary", uploadImageCloudinary.url);
  };
  const handleDeleteProductImage = async (index) => {
    //console.log("Image index", index);
    const updatedProductImages = [...data.productImage];
    updatedProductImages.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: [...updatedProductImages] }));
    //setData((prev) => ({...prev, productImage: updatedProductImages }));
  };

  {
    /**upload product */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("data", data);
    const {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
    } = data;
    if (
      !productName ||
      !brandName ||
      !category ||
      !productImage.length ||
      !description ||
      !price ||
      !sellingPrice
    ) {
      alert("All fields are required!");
      return;
    }
    // upload product to the server
    //...
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
        sellingPrice,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
      // reset form data
      // close modal
      //window.location.reload();
    }

    if (responseData.error) {
      //throw new Error(`HTTP error! status: ${response.status}`);
      toast.error(responseData?.message);
    }

    // clear form data
    setData({
      productName: "",
      brandName: "",
      category: "",
      productImage: [],
      description: "",
      price: "",
      sellingPrice: "",
    });
    onClose();
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="brandName" className="mt-3">
            BrandName Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brandName name"
            value={data.brandName}
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            value={data.category}
            name="category"
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((ele, index) => {
              return (
                <option key={ele.value + index} value={ele.value}>
                  {ele.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Uplaod Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  placeholder="Upload"
                  onChange={handleUploadProduct}
                ></input>
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div key={el} className="inline-block mr-3">
                      {/**<img src={el} alt="Product Image" className="h-24 w-24 object-cover" />*/}
                      <div className="relative group">
                        <img
                          className="bg-slate-100 border cursor-pointer"
                          src={el}
                          width={80}
                          height={80}
                          alt={el}
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />
                        <div
                          className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                          onClick={() => handleDeleteProductImage(index)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            rows={3}
            onChange={handleOnChange}
            required
            name="description"
            value={data.description}
            placeholder="enter product description"
          ></textarea>
          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>
      {/**display image full screen */}
      {openFullScreenImage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        </div>
      )}
    </div>
  );
};

export default UploadProduct;
