let selectedProperty = null;
let currentImageIndex = 0;

const properties = [
    {
        location: "Twin Park",
        ownerName: "Isaac Kaira",
        phone: "+260 972580619",
        email: "isaackaila@gmail.com",
        price: "K1000",
        description: "A spacious house with 3 bedrooms, garden, and parking.",
        listingImages: ["Images/cool.jpeg"],
        detailsImages: ["Images/kitchen.webp", "Images/living room.jpg"],
    },
    {
        location: "Chawama",
        ownerName: "Evans kaira",
        phone: "+260 973638653",
        email: "boysonkaira@gmail.com",
        price: "K900",
        description: "A cozy home with 2 bedrooms near schools and shops.",
        listingImages: ["Images/rent.jpeg"],
        detailsImages: ["Images/kitchen.webp", "Images/living room.jpg"],
    },
    {
        location: "Garden house",
        ownerName: "Adess Musonda",
        phone: "+260 779287128",
        email: "adessmusonda@gmail.com",
        price: "K1500",
        description: "A spacious house with 3 bedrooms, garden, and parking.",
        listingImages: ["Images/place.jpg"],
        detailsImages: ["Images/kitchen.webp", "Images/living room.jpg"],
    },
    {
        location: "Lilayi",
        ownerName: "Bertha Kaira",
        phone: "+260 766111621",
        email: "berthakaira@gmail.com",
        price: "K900",
        description: "A cozy home with 2 bedrooms near schools and shops.",
        listingImages: ["Images/big house.webp"],
        detailsImages: ["Images/kitchen.webp", "Images/living room.jpg"],
    },
];

/// Function to show house details
function showHouseDetails(location, ownerName, phone, email, description, listingImages, detailsImages) {
    selectedProperty = { location, ownerName, phone, email, listingImages, detailsImages };
    currentImageIndex = 0;
    document.getElementById("house-description").textContent = description;
    updateImage();
    document.getElementById("house-details-modal").style.display = "block";
}

// Function to update the displayed image
function updateImage() {
    const currentImage = selectedProperty.detailsImages[currentImageIndex];
    document.getElementById("current-house-image").src = currentImage;
}

function nextImage() {
    if (currentImageIndex < selectedProperty.detailsImages.length - 1) {
        currentImageIndex++;
        updateImage();
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImage();
    }
}

// Function to show payment modal
function showPaymentModal() {
    closeModal("house-details-modal");
    document.getElementById("payment-modal").style.display = "block";
}

// Function to process payment
function processPayment() {
    alert("Payment Successful!");
    closeModal("payment-modal");
    showOwnerDetails();
}

// Function to show owner details
function showOwnerDetails() {
    document.getElementById("modal-location").textContent = selectedProperty.location;
    document.getElementById("modal-owner").textContent = selectedProperty.ownerName;
    document.getElementById("modal-phone").textContent = selectedProperty.phone;
    document.getElementById("modal-email").textContent = selectedProperty.email;
    document.getElementById("owner-modal").style.display = "block";
}

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Function to search properties based on user input
function searchProperties() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const propertyList = document.getElementById("property-list");
    const noResultsMessage = document.getElementById("no-results");

    propertyList.innerHTML = "";
    const filteredProperties = properties.filter(
        (p) =>
            p.location.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
    );

    if (filteredProperties.length > 0) {
        noResultsMessage.classList.add("hidden");
        filteredProperties.forEach((p) => {
            const propertyDiv = document.createElement("div");
            propertyDiv.className = "property";
            propertyDiv.innerHTML = `
                <img src="${p.listingImages[0]}" alt="House for rent">
                <div class="property-details">
                    <p><strong>Location:</strong> ${p.location}</p>
                    <p><strong>Price:</strong> ${p.price} per month</p>
                </div>
            `;
            propertyDiv.onclick = () =>
                showHouseDetails(
                    p.location,
                    p.ownerName,
                    p.phone,
                    p.email,
                    p.description,
                    p.listingImages,
                    p.detailsImages
                );
            propertyList.appendChild(propertyDiv);
        });
    } else {
        noResultsMessage.classList.remove("hidden");
    }
}

// Form submission event to handle the house posting
document.getElementById("post-house-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.getElementById("location").value;
    const ownerName = document.getElementById("owner-name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    const listingImagesInput = document.getElementById("listing-images");
    const detailsImagesInput = document.getElementById("details-images");

    const listingFiles = listingImagesInput.files;
    const detailsFiles = detailsImagesInput.files;

    const listingImages = [];
    const detailsImages = [];

    // Read listing images
    for (let i = 0; i < listingFiles.length; i++) {
        const reader = new FileReader();
        reader.onloadend = function () {
            listingImages.push(reader.result);
            if (listingImages.length === listingFiles.length && detailsImages.length === detailsFiles.length) {
                const newProperty = {
                    location,
                    ownerName,
                    phone,
                    email,
                    price: `K${price}`,
                    description,
                    listingImages,
                    detailsImages,
                };

                properties.push(newProperty);
                document.getElementById("post-house-form").reset();
                searchProperties();
                alert("Your house has been posted!");
            }
        };
        reader.readAsDataURL(listingFiles[i]);
    }

    // Read house details images
    for (let i = 0; i < detailsFiles.length; i++) {
        const reader = new FileReader();
        reader.onloadend = function () {
            detailsImages.push(reader.result);
            if (listingImages.length === listingFiles.length && detailsImages.length === detailsFiles.length) {
                const newProperty = {
                    location,
                    ownerName,
                    phone,
                    email,
                    price: `K${price}`,
                    description,
                    listingImages,
                    detailsImages,
                };

                properties.push(newProperty);
                document.getElementById("post-house-form").reset();
                searchProperties();
                alert("Your house has been posted!");
            }
        };
        reader.readAsDataURL(detailsFiles[i]);
    }
});

// Initialize properties
function initializeProperties() {
    searchProperties();
}

initializeProperties();
