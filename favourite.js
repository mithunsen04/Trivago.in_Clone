let arr = JSON.parse(localStorage.getItem("Hotel")) || [];
document.querySelector("#stayy").textContent = arr.length + " Stays";

display(arr);

function display(arr) {
  let container = document.querySelector("#items");
  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement("div");

    let banner = document.createElement("img");
    banner.src = arr[i].hotelThumbnail;

    let textsDiv = document.createElement("div");

    //let search = localStorage.getItem("searchQuerry");
    let city = document.createElement("p");
    city.textContent = arr[i].hotelName;

    let checkIn = localStorage.getItem("checkInDate");
    let checkOut = localStorage.getItem("checkOutDate");

    let duration = document.createElement("p");
    duration.setAttribute("id", "info");
    duration.textContent =
      "Dates:" + getDay(checkIn) + " to " + getDay(checkOut);
    textsDiv.append(city, duration);
    var make = document.createElement("button");
    make.addEventListener("click", function () {
      bookitem(arr[i]);
    });
    make.setAttribute("class", "book");
    make.innerHTML = "Book Now " + ` `;

    div.append(banner, textsDiv, make);
    container.append(div);
  }
}

function getDay(a) {
  let date = new Date(a);
  let month = date.toLocaleString("default", { month: "short" });
  let num = "";
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] == "-") {
      break;
    }

    num += a[i];
  }

  let gen = "";
  for (let i = num.length - 1; i >= 0; i--) {
    gen += num[i];
  }

  return gen + " " + month;
}
function bookitem(elem) {
  localStorage.setItem("bookingdata", JSON.stringify(elem));
  window.location.href = "booking.html";
}
