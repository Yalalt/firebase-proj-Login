import React, { useEffect, useState } from "react";
import { Auth } from "./components/auth.js";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import "./App.css";

const App = () => {
  const [productList, setProductList] = useState([]);

  // new product state
  const [newProductName, setNewProductName] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newStock, setNewStock] = useState(0);
  const [newSale, setNewSale] = useState(0);

  // update product state
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedReleaseDate, setUpdatedReleaseDate] = useState("");

  // File upload State
  const [fileUpload, setFileUpload] = useState(null);

  const productsCollectionRef = collection(db, "products");

  const getProductsList = async () => {
    // READ data
    try {
      const data = await getDocs(productsCollectionRef);

      const filteredData = data.docs.map((prod) => ({
        ...prod.data(),
        id: prod.id,
      }));
      setProductList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const onSubmitProduct = async () => {
    try {
      await addDoc(productsCollectionRef, {
        name: newProductName,
        releaseDate: newReleaseDate,
        brand: newBrand,
        category: newCategory,
        price: newPrice,
        stock: newStock,
        sale: newSale,
        userId: auth?.currentUser?.uid,
      });

      getProductsList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
  };

  const updateProductNameHandler = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, { name: updatedProductName });
      getProductsList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductDateHandler = async (id) => {
    try {
      const productDoc = doc(db, "products", id);
      await updateDoc(productDoc, { releaseDate: updatedReleaseDate });
      getProductsList();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadingFileHandler = async () => {
    try {
      if (!fileUpload) return;

      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>E-Commerce welcome</h1>
      <Auth />
      <div className="formInputProduct">
        <input
          type="text"
          placeholder="Product name..."
          name="name"
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date..."
          name="releasedate"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />

        {/* <input type="checkbox" />
        <label>is New product?</label> */}

        <input
          type="text"
          placeholder="Brand..."
          name="brand"
          onChange={(e) => setNewBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category..."
          name="category"
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price..."
          name="price"
          onChange={(e) => setNewPrice(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Stock..."
          name="stock"
          onChange={(e) => setNewStock(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Sale..."
          name="sale"
          onChange={(e) => setNewSale(Number(e.target.value))}
        />

        <button type="submit" onClick={onSubmitProduct}>
          Add Product
        </button>
      </div>
      <div>
        {productList &&
          productList.map((item, index) => (
            <div className="productsGroup" key={index}>
              <h4>{item.name}</h4>
              <button onClick={() => deleteProduct(item.id)}>Delete</button>
              <br />
              <br />
              <input
                type="text"
                name="prodName"
                placeholder="Edit name..."
                onChange={(e) => setUpdatedProductName(e.target.value)}
              />
              <button onClick={() => updateProductNameHandler(item.id)}>
                Update name
              </button>

              <p>Date: {item.releaseDate}</p>
              <input
                type="number"
                name="releaseDate"
                placeholder="Edit date..."
                onChange={(e) => setUpdatedReleaseDate(e.target.value)}
              />
              <button onClick={() => updateProductDateHandler(item.id)}>
                Update date
              </button>

              <p>Price: {item.price}</p>
              <input type="number" name="price" placeholder="Edit price..." />
              <button>Update price</button>

              <p>Stocck: {item.stock}</p>
              <input type="number" name="stock" placeholder="Edit stock..." />
              <button>Update stock</button>

              <p>Sale: {item.sale}</p>
              <input type="number" name="sale" placeholder="Edit sale..." />
              <button>Update sale</button>

              <p>Brand: {item.brand}</p>
              <input type="text" name="brand" placeholder="Edit brand..." />
              <button>Update brand</button>

              <p>Category: {item.category}</p>
              <input
                type="text"
                name="category"
                placeholder="Edit category..."
              />
              <button>Update category</button>
            </div>
          ))}
      </div>
      {/*  Image Upload */}
      <br/> <br/>
      <div>
        <input
          type="file"
          name="imageInput"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={() => uploadingFileHandler()}>Image upload</button>
      </div>
    </div>
  );
};

export default App;
