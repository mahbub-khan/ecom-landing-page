/*
1. Create a list item for the clicked product
2.Add appropriate tailwind classes to the newly created element 
3. Grab product name and price for the clicked "Add to cart" button
4. Set the product name inside the created list item element
5. Append this list item to it's parent ol in the purchased-products section
6. Pick the total price from it's html element calculate new total price and set it to the total and after discount total html element
7. Set discount apply button to enabled or disabled based on the conditions
*/

let totalPriceValue = 0.0;
let discountValue = 0.0;
let afterDiscountValue = 0.0;

let totalPriceElement = document.getElementById("total-price");
let discountElement = document.getElementById("discount");
let afterDiscountElement = document.getElementById("after-discount");

let couponInputValue = "";
const couponInputElement = document.getElementById("discount-input");
// Grabbing the input field value for the coupon code
couponInputElement.addEventListener("keyup", function (event) {
  couponInputValue = event.target.value;
});

const discountButtonElement = document.getElementById("discount-button");
const makePurchaseButtonElement = document.getElementById(
  "make-purchase-button"
);
const gotoHomeBtnElement = document.getElementById("goto-home");

const purchasedProductsListElement =
  document.getElementById("purchased-products").childNodes[1];

function addToCart(data) {
  //Step-1
  const liElement = document.createElement("li");

  //Step-2
  liElement.classList.add("text-xl", "font-semibold", "pb-1");

  //   Step-3
  const productName = data.parentNode.parentNode.childNodes[3].innerText;

  const productPriceString =
    data.parentNode.parentNode.childNodes[5].innerText.split(" ")[0];
  const productPrice = parseFloat(productPriceString);

  //   Step-4
  liElement.innerText = productName;

  //Step-5
  const productListParent =
    document.getElementById("purchased-products").childNodes[1];
  productListParent.appendChild(liElement);

  //   Step-6
  totalPriceValue += productPrice;
  discountValue = 0.0;

  totalPriceElement.innerText = totalPriceValue;

  discountElement.innerText = discountValue;

  afterDiscountElement.innerText = totalPriceValue;

  //Step-7

  if (totalPriceValue >= 200) {
    discountButtonElement.removeAttribute("disabled");
  } else {
    discountButtonElement.setAttribute("disabled", true);
  }

  couponInputElement.value = "";

  if (totalPriceValue > 0) {
    makePurchaseButtonElement.removeAttribute("disabled");
  } else {
    makePurchaseButtonElement.setAttribute("disabled", true);
  }
}

function applyDiscount() {
  let updatedTotalPrice = parseFloat(afterDiscountElement.innerText);

  if (couponInputValue === "SELL200") {
    discountValue = updatedTotalPrice * 0.2;

    discountElement.innerText = discountValue;

    afterDiscountValue = updatedTotalPrice - discountValue;

    afterDiscountElement.innerText = afterDiscountValue;

    discountButtonElement.setAttribute("disabled", true);
  }
  couponInputElement.value = "";
}

function couponPasted() {
  couponInputValue = "SELL200";
  couponInputElement.value = "SELL200";
}

function gotoHome() {
  totalPriceValue = 0.0;
  totalPriceElement.innerText = totalPriceValue;

  discountValue = 0.0;
  discountElement.innerText = discountValue;

  afterDiscountValue = 0.0;
  afterDiscountElement.innerText = afterDiscountValue;

  purchasedProductsListElement.innerHTML = "";

  discountButtonElement.setAttribute("disabled", true);
  makePurchaseButtonElement.setAttribute("disabled", true);
}
