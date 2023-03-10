window.onload = function () {
  let bookElm = JSON.parse(localStorage.getItem("bookingdata"));
  display(bookElm);
};

function display(data) {
  let container = document.querySelector("#head");
  let image = document.createElement("img");
  image.src = data.hotelThumbnail;
  image.className = "slide";
  image.id = "headImage";
  container.append(image);
  let imageArray = data.Photos;
  let i = 0;
  setInterval(function () {
    if (i == imageArray.length) {
      i = 0;
    }
    container.innerHTML = "";
    let image1 = document.createElement("img");
    image1.src = imageArray[i];
    image1.className = "slide";
    image1.id = "headImage";
    container.append(image1);
    i++;
  }, 3000);

  let name = document.querySelector("#name");
  name.textContent = data.hotelName;

  let description = document.querySelector("#desc");
  description.textContent = data.descriptionOfHotel.substring(0, 188) + " ...";

  let rating = document.querySelector("#rating");
  rating.textContent = data.rating.overall;

  let allReviews = document.querySelector("#all");
  let review = Number.parseInt(data.review);
  let tag = "";
  if (review > 1000) {
    tag = "Excellent";
  } else {
    tag = "Good";
  }

  allReviews.textContent = `(${review} Reviews) . ${tag}`;
  setData(data);
}

function setData(data) {
  //containers to push
  let nights = document.querySelector("#night");
  let duration = document.querySelector("#fromTo");
  let userPref = document.querySelector("#userPref");
  let roomPrice = document.querySelector("#roomPrice");
  let price = document.querySelector("#price1");
  let discount = document.querySelector("#discount");

  let total = document.querySelector("#total");

  let checkIn = localStorage.getItem("checkInDate");
  let checkOut = localStorage.getItem("checkOutDate");
  let roomsData = localStorage.getItem("rooms_number");
  console.log("Rooms", roomsData);
  //taking out data
  let guests = JSON.parse(localStorage.getItem("totalGuest"));
  let bill = Number.parseInt(data.bookingCost);
  let nightVal = findDuration(checkIn, checkOut);
  //processing data
  let actual = bill * nightVal;
  let durationVal = `${getDay(checkIn)} to ${getDay(checkOut)}`;
  let userprefVal = `${roomsData} Rooms, ${guests} Guests`;
  let roompriceVal = `Room price for ${nightVal} Night X ${guests} Guests`;
  let priceVal = actual;
  let discountVal = (actual * 5) / 100;

  let totalVal = actual - discountVal + 100;

  console.log(totalVal);

  //pushing data
  nights.textContent = nightVal;
  duration.textContent = durationVal;
  userPref.textContent = userprefVal;
  roomPrice.textContent = roompriceVal;
  price.textContent = "₹" + priceVal;
  discount.textContent = "₹" + discountVal;

  total.textContent = "₹" + totalVal;
}

function findDuration(a, b) {
  console.log(a, b);
  let date1 = new Date(a);
  let date2 = new Date(b);
  var diff = Math.abs(date2.getTime() - date1.getTime());
  var duration = Math.ceil(diff / (1000 * 3600 * 24));
  console.log(duration);
  return duration;
}

function getDay(a) {
  let date = new Date(a);
  let month = date.toLocaleString("default", { month: "short" });
  let day = date.getDate().toString();
  console.log(day);
  return day + " " + month;
}

function generateOtp() {
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += Math.floor(Math.random() * 9);
  }

  localStorage.setItem("OTP", OTP);
  return OTP;
}

function isValid(email) {
  if (!email || email.length < 2) return false;

  for (let i = 0; i < email.length; i++) {
    if (email[i] == " ") {
      return false;
    }

    if (email[i] == "@") {
      return true;
    }
  }
}

document
  .querySelector("#otpButton")
  .addEventListener("click", async function clicker() {
    let email = document.querySelector("#userEmail").value;
    if (email == 0) {
      alert("Fill details");
      return;
    }
    if (!isValid(email)) {
      alert("Invalid Email");
      return;
    }

    let OTP = generateOtp();
    let status = await otpRequest(OTP, email);
    if (status != 200) {
      alert("There is an issue sending OTP try again");
      return;
    }

    alert("OTP has been sent", OTP);

    let otpElem = document.querySelector("#otp");
    let emailElem = document.querySelector("#emailVerify");
    otpElem.style.display = "grid";
    emailElem.style.opacity = "50%";
    emailElem.style.pointerEvents = "none";
    document.querySelector("#otpButton").removeEventListener("click", clicker);
  });

document.querySelector("#otpVerify").onclick = function () {
  let OTP = localStorage.getItem("OTP");

  let phone = document.querySelector("#userPhone").value;
  let email = document.querySelector("#userEmail").value;
  let userOtp = document.querySelector("#otpValue").value;

  if (userOtp != OTP) {
    alert("Incorrect OTP");
    return;
  }

  if (email == 0 || phone.length < 10) {
    alert("Fill all the blocks");
    return;
  }

  document.querySelector(
    "#heading"
  ).innerHTML = ` <i style = "color:green" class="fa-solid fa-circle-check"></i> Your Details`;

  document.querySelector("#ext").innerHTML = getDetails(email, phone);
  document.querySelector("#paymentDetails").style.opacity = "100%";
  document.querySelector("#paymentOptions").style.display = "flex";
  payAthotel();
};

function getDetails(email, phone) {
  return `<div id="yourDetails">
      
      <div> Email: ${email} </div>
      <div style="border:1px solid black;"> </div>
      <div> Phone No: ${phone} </div>
      </div>`;
}

let pay1 = document.querySelector("#opt1");
let pay2 = document.querySelector("#opt2");

pay1.onclick = function () {
  let state1 = pay1.className;
  let state2 = pay2.className;
  if (pay1.className == "setBlue") {
    pay1.className = state1;
    pay2.className = state2;
  } else {
    pay1.className = state2;
    pay2.className = state1;
  }

  payAthotel();
};

pay2.onclick = function () {
  let state1 = pay1.className;
  let state2 = pay2.className;
  if (pay2.className == "setBlue") {
    pay1.className = state1;
    pay2.className = state2;
  } else {
    pay1.className = state2;
    pay2.className = state1;
  }

  payNow();
};

function payAthotel() {
  document.querySelector("#pay").innerHTML = "";
  document.querySelector(
    "#pay"
  ).innerHTML = `<button id="final"> Confirm Booking </button>`;
  document.querySelector("#final").addEventListener("click", Confirm);
}

function payNow() {
  document.querySelector("#pay").innerHTML = "";
  document.querySelector(
    "#pay"
  ).innerHTML = `<p> <i class="fa-solid fa-credit-card"></i> Add new card </p>
      <div style="display: grid; gap: 10px;">
          <input type="number" id="card" placeholder="Card">
          <input type="text" id="holder" placeholder="Enter cardholder name">
          <div style="display: flex; justify-content: space-between;">
              <input type="date" placeholder="Valid thru" id="validity">
              <input type="number" placeholder="CVV" id="cvv">
          </div>
      </div>
  
      <button id="final" style="margin-top: 20px; padding-left: 20px; padding-right: 20px"> Pay </button>`;
  document.querySelector("#final").addEventListener("click", payAndbook);
}

async function Pay(cvv) {
  return new Promise(function (accept, reject) {
    setTimeout(function () {
      if (cvv == "123") {
        accept("Payment Successful");
      } else {
        reject("Payment Denied!");
      }
    }, 6000);
  });
}

function payAndbook() {
  let card = document.querySelector("#card").value;
  let holder = document.querySelector("#holder").value;
  let date = document.querySelector("#validity").value;
  let cvv = document.querySelector("#cvv").value;

  if (
    card.length != 16 ||
    holder.length < 0 ||
    date.length < 0 ||
    cvv.length != 3
  ) {
    alert("Invalid card details");
    return;
  }

  document.querySelector("#pay").innerHTML = "";
  document.querySelector("#pay").innerHTML = `<div class="main">
      <p> Paying Securely ...  </p> 
      <div class="circle"> </div>
      </div>`;

  document.querySelector("#opt1").style.opacity = "50%";
  document.querySelector("#opt1").style.pointerEvents = "none";
  document.querySelector("#opt2").style.opacity = "50%";
  document.querySelector("#opt2").style.pointerEvents = "none";

  newPayment(cvv);
}

async function newPayment(cvv) {
  try {
    let response = await Pay(cvv);

    if (response == "Payment Successful") {
      success(response);
    } else {
      rejected(response);
    }
  } catch (err) {
    console.log(err);
    rejected(err);
  }
}

function success(message) {
  document.querySelector("#pay").innerHTML = "";
  document.querySelector("#pay").innerHTML = `<p> ${message} </p>
      <button id="final"> Confirm Booking </button>`;
  document.querySelector("#final").addEventListener("click", Confirm);
}

function rejected(message) {
  document.querySelector("#pay").innerHTML = "";
  document.querySelector("#pay").innerHTML = `<p> ${message} </p>
      <button id="final"> Try Again </button>`;
  document.querySelector("#final").addEventListener("click", payNow);
  document.querySelector("#opt1").style.opacity = "100%";
  document.querySelector("#opt1").style.pointerEvents = "auto";
  document.querySelector("#opt2").style.opacity = "100%";
  document.querySelector("#opt2").style.pointerEvents = "auto";
}

function Confirm() {
  alert("Booking Successful");
  window.location.href = "../index.html";
}
