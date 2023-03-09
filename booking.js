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
