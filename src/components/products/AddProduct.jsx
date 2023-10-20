import { useState } from "react";
import { useGetUserID } from "../../hooks/useGetUserID.js";
import { app } from "../../config/firebaseStorage.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingSpinner from "../helpers/LoadingSpinner.jsx";
import DescriptionAlerts from "../alert/Alert";

export default function AddProduct({ onProdSub }) {
  const [productInfos, setProductInfos] = useState({
    title: "",
    description: "",
    photos: {
      image: [],
      imageUrl: [],
      fileName: "No selected photo",
      loaded: false, // need to wait for loaded images untill submit
    },
    availability: true,
  });

  const [loading, setLoading] = useState(false); //for loading images

  const [alertErrorMessage, setAlertErrorMessage] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductInfos((prevInfos) => ({
      ...prevInfos,
      [name]: value,
    }));
  };

  const handlePhotoChanges = async (e) => {
    setLoading(true); // Set loading to true before starting the upload
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length > 5) {
      alert("Please select a maximum of 5 photos.");
      return;
    }

    try {
      const urls = await Promise.all(
        selectedImages.map(async (img) => {
          const storage = getStorage();
          const storageRef = ref(storage, "/images/" + img.name);
          const uploadingImg = await uploadBytes(storageRef, img);
          const url = await getDownloadURL(uploadingImg.ref);
          return url;
        })
      );

      setProductInfos((prevInfos) => ({
        ...prevInfos,
        photos: {
          ...prevInfos.photos,
          image: selectedImages,
          imageUrl: urls,
          fileName: selectedImages.map((img) => img.name),
          loaded: true, // Set loaded to true after photos are loaded
        },
      }));
      setLoading(false); // Set loading to false after the upload is complete
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, description, photos } = productInfos;
      const userID = useGetUserID();

      if (!photos.loaded) {
        // Check if photos are not loaded yet
        alert("Please wait until the photos are fully loaded.");
        return;
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/products`, {
        name: title,
        description,
        photos: photos.imageUrl,
        user: userID,
      });

      // Reset form fields
      setProductInfos((prevInfos) => ({
        ...prevInfos,
        title: "",
        description: "",
        photos: {
          image: [],
          imageUrl: [],
          fileName: "No selected photo",
          loaded: false,
        },
      }));

      //fetch updated porducts' list when a product is added
      onProdSub();
    } catch (err) {
      setAlertErrorMessage(true);
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Product title"
          name="title"
          value={productInfos.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Product description"
          name="description"
          value={productInfos.description}
          onChange={handleChange}
        />
        <p>Select a maximum of 5 photos</p>
        <div className="upload-files">
          <input
            type="file"
            multiple
            accept="image/*"
            name="filename"
            onChange={handlePhotoChanges}
          />

          <div className="productPhotos">
            {loading ? (
              <LoadingSpinner />
            ) : productInfos.photos.imageUrl.length > 0 ? (
              productInfos.photos.imageUrl.map((url, index) => (
                <img src={url} key={index} alt={`Uploaded ${index}`} />
              ))
            ) : (
              <CloudUploadIcon className="uploadCloud" />
            )}
          </div>
        </div>
        <button disabled={!productInfos.photos.loaded}>Upload</button>{" "}
        {/* Disable button if photos are not loaded */}
      </form>

      {/* ERROR ALERT */}
      {alertErrorMessage && (
        <DescriptionAlerts
          alertType="error"
          message={error}
          alertAdvice="Try again"
        />
      )}
    </>
  );
}
