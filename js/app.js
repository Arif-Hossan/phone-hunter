const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = ``;
  //search result title
  const searchResultTitle = document.getElementById("search-result");
  searchResultTitle.classList.remove("d-none");
  searchResultTitle.classList.add("d-block");
  //not found
  const notFoundMessage = document.getElementById("not-found");
  if (phones.length === 0) {
    notFoundMessage.classList.remove("d-none");
  } else {
    notFoundMessage.classList.add("d-none");
  }
  //display only 12 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
      <div class="card shadow h-100 mx-auto" style="width: 16rem;" >
            <img src="${phone.image}" class="card-img-top p-5" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text text-muted">Brand : ${phone.brand}</p>
              <div class="text-center">
              <a onclick="loadPhoneDetail('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" class="btn btn-success bg-opacity-25">Details</a>
              </div>

            </div>
          </div>`;
    phonesContainer.appendChild(phoneDiv);
  });
  //stop spinning loader
  toggleSpinner(false);
};
// process search
const processSearch = (dataLimit) => {
  //start spinning loader
  toggleSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};
// handle button control
document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(12);
});
// search handle using enter button
document
  .getElementById("searchField")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      processSearch(10);
    }
  });
// handle loader
const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};
// show all handle ,this is not the best approach
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

//  load phone details
const loadPhoneDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
};
// display phone details in modal
const displayPhoneDetail = (phone) => {
  console.log(phone);
  //get array (sensors data)
  const sensors = phone.mainFeatures.sensors
    ? phone.mainFeatures.sensors
    : "No Sensor";
    // create sensor item list
   let sensorItem=``;
   sensors.forEach(sensor => {
    sensorItem+=`<li>${sensor}</li>`;

   });
  console.log(sensors);
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = `${phone.name}`;
  const phoneDetailBody = document.getElementById("phone-detail");
  phoneDetailBody.innerHTML = `
<p>Release Date : ${phone.releaseDate ? phone.releaseDate : "Not Found"}</p>
<!--This line dot notation is wrong so this will show not found for result and no data if others is not available
<p>Bluetooth : ${
    phone.others
      ? phone.others?.bluetooth
        ? phone.others.bluetooth
        : "Not Found"
      : "No Data"
  }</p>
-->
<p>Bluetooth : ${
    phone.others
      ? phone.others?.Bluetooth
        ? phone.others.Bluetooth
        : "Not Found"
      : "No Data"
  }</p>
<p>Sensors :</p>
<ul>
${sensorItem}
</ul>
`;
};
// call load phones function
loadPhones("phone");
