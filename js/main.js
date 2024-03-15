let productName = document.getElementById("ProductName");
let ProductPrice = document.getElementById("ProductPrice");
let ProductCategory = document.getElementById("ProductCategory");
let ProductDescription = document.getElementById("ProductDescription");
let updatedProductIndex = null;

let addButton = document.getElementById("addProduct");
let upDateButton = document.getElementById("updateButton");

let productsContainer;

if (localStorage.getItem("productsOnLocal") != null) {
  productsContainer = JSON.parse(localStorage.getItem("productsOnLocal"));
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}

function addProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDescription()
  ) {
    let product = {
      name: productName.value,
      price: ProductPrice.value,
      category: ProductCategory.value,
      description: ProductDescription.value,
    };
    productsContainer.push(product);
    localStorage.setItem("productsOnLocal", JSON.stringify(productsContainer));
    clearForm();
    displayProducts(productsContainer);
  }
}

function clearForm() {
  productName.value = "";
  ProductPrice.value = "";
  ProductCategory.value = "";
  ProductDescription.value = "";
  removeValidClassesToClearForm();
}

function removeValidClassesToClearForm() {
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  ProductPrice.classList.remove("is-invalid");
  ProductPrice.classList.remove("is-valid");
  ProductCategory.classList.remove("is-invalid");
  ProductCategory.classList.remove("is-valid");
  ProductDescription.classList.remove("is-invalid");
  ProductDescription.classList.remove("is-valid");
}

function displayProducts(list) {
  let cartoona = "";
  for (let i = 0; i < list.length; i++) {
    cartoona += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].description}</td>
                    <td><button class="btn btn-outline-warning" onclick="setProductForUpdate(${i})">Update</button></td>
                    <td><button class="btn btn-outline-danger deleteButton" onclick=(deleteProduct(${i}))>Delete</button></td>
                </tr>
        `;
  }
  document.getElementById("tableData").innerHTML = cartoona;
}

function searchProductsByName(searhTerm) {
  let searchProductsContainer = [];
  for (let i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(searhTerm.toLowerCase())
    ) {
      searchProductsContainer.push(productsContainer[i]);
    }
  }
  displayProducts(searchProductsContainer);
}

function deleteProduct(deletedIndex) {
  productsContainer.splice(deletedIndex, 1);
  localStorage.setItem("productsOnLocal", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
}

function setProductForUpdate(updatedIndex) {
  updatedProductIndex = updatedIndex;
  upDateButton.classList.replace("d-none", "inline");
  addButton.classList.add("d-none");
  productName.value = productsContainer[updatedProductIndex].name;
  ProductPrice.value = productsContainer[updatedProductIndex].price;
  ProductCategory.value = productsContainer[updatedProductIndex].category;
  ProductDescription.value = productsContainer[updatedProductIndex].description;
}

function updateProduct() {
    if (
        validateProductName() &&
        validateProductPrice() &&
        validateProductCategory() &&
        validateProductDescription()
      ) {
          productsContainer[updatedProductIndex].name = productName.value;
          productsContainer[updatedProductIndex].price = ProductPrice.value;
          productsContainer[updatedProductIndex].category = ProductCategory.value;
          productsContainer[updatedProductIndex].description = ProductDescription.value;
          localStorage.setItem("productsOnLocal", JSON.stringify(productsContainer));
          displayProducts(productsContainer);
          clearForm();
          upDateButton.classList.replace("inline", "d-none");
          addButton.classList.remove("d-none");
      }
}

function getElementById(id) {
    return document.getElementById(id);
}

// validation 
function validateInput(inputElement, regex, errorElement, errorMessage) {
    if (regex.test(inputElement.value)) {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        errorElement.innerText = "";
        return true;
    } else {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        inputElement.focus();
        errorElement.innerText = errorMessage;
        return false;
    }
}

function validateProductName() {
    const productNameRegex = /^[a-zA-Z][a-zA-Z0-9 _]{3,20}$/;
    const productNameError = getElementById("ProductNameError");
    return validateInput(productName, productNameRegex, productNameError, "Please Enter a Valid Product Name");
}

function validateProductPrice() {
    const productPriceRegex = /^[0-9]{2,5}$/;
    const productPriceError = getElementById("ProductPriceError");
    return validateInput(ProductPrice, productPriceRegex, productPriceError, "Please Enter a Valid Product Price");
}

function validateProductCategory() {
    const productCategoryRegex = /^[a-zA-Z][a-zA-Z0-9 _]{3,20}$/;
    const ProductCategoryError = getElementById("ProductCategoryError");
    return validateInput(ProductCategory, productCategoryRegex, ProductCategoryError, "Please Enter a Valid Product Category");
}

function validateProductDescription() {
    const productDescriptionRegex = /[a-zA-Z][a-zA-Z0-9 _]{10,500}$/
    const productDescriptionError = getElementById("ProductDescriptionError")
    return validateInput(ProductDescription, productDescriptionRegex, productDescriptionError, "Please Enter a Valid Product Description")
}

addButton.addEventListener("click", function () {
  addProduct();
});

upDateButton.addEventListener("click", function () {
  updateProduct();
});

document.getElementById("searchInput").addEventListener("input", function () {
  searchProductsByName(this.value);
});

productName.addEventListener("input", function () {
  validateProductName();
});
ProductPrice.addEventListener("input", function () {
    validateProductPrice()
});
ProductCategory.addEventListener("input", function () {
  validateProductCategory();
});
ProductDescription.addEventListener("input", function () {
  validateProductDescription();
});
