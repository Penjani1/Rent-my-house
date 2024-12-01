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
        images: ["Images/cool.jpeg", "Images/kitchen.webp", "Images/living room.jpg"],
    },
    {
        location: "Chawama",
        ownerName: "Evans kaira",
        phone: "+260 973638653",
        email: "boysonkaira@gmail.com",
        price: "K900",
        description: "A cozy home with 2 bedrooms near schools and shops.",
        images: ["Images/rent.jpeg", "Images/kitchen.webp", "Images/living room.jpg"],
    },
    {
        location: "Garden house",
        ownerName: "Adess Musonda",
        phone: "+260 779287128",
        email: "adessmusonda@gmail.com",
        price: "K1500",
        description: "A spacious house with 3 bedrooms, garden, and parking.",
        images: ["Images/place.jpg", "Images/kitchen.webp", "Images/living.jpg"],
    },
    {
        location: "Lilayi",
        ownerName: "Bertha Kaira",
        phone: "+260 766111621",
        email: "berthakaira@gmail.com",
        price: "K900",
        description: "A cozy home with 2 bedrooms near schools and shops.",
        images: ["Images/big house.webp", "Images/kitchen.webp", "Images/living.jpg"],
    },
];

function showHouseDetails(location, ownerName, phone, email, description, images) {
    selectedProperty = { location, ownerName, phone, email, images };
    currentImageIndex = 0;
    document.getElementById("house-description").textContent = description;
    updateImage();
    document.getElementById("house-details-modal").style.display = "block";
}

function updateImage() {
    const currentImage = selectedProperty.images[currentImageIndex];
    document.getElementById("current-house-image").src = currentImage;
}

function nextImage() {
    if (currentImageIndex < selectedProperty.images.length - 1) {
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

function showPaymentModal() {
    if (!selectedProperty) {
        alert("No property selected!");
        return;
    }
    closeModal("house-details-modal");
    document.getElementById("payment-modal").style.display = "block";
}

function processPayment() {
    alert("Payment Successful!");
    closeModal("payment-modal");
    showOwnerDetails();
}

function showOwnerDetails() {
    if (!selectedProperty) {
        alert("No property selected!");
        return;
    }

    document.getElementById("modal-location").textContent = selectedProperty.location;
    document.getElementById("modal-owner").textContent = selectedProperty.ownerName;
    document.getElementById("modal-phone").textContent = selectedProperty.phone;
    document.getElementById("modal-email").textContent = selectedProperty.email;

    document.getElementById("owner-modal").style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Search functionality
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
                <img src="${p.images[0]}" alt="House for rent">
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
                    p.images
                );
            propertyList.appendChild(propertyDiv);
        });
    } else {
        noResultsMessage.classList.remove("hidden");
    }
}

document.getElementById("post-house-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.getElementById("location").value;
    const ownerName = document.getElementById("owner-name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    // Get selected images from the file input
    const imagesInput = document.getElementById("images");
    const files = imagesInput.files;
    const images = [];

    // Read the images as data URLs
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = function () {
            images.push(reader.result); // Add base64 string to images array
            if (images.length === files.length) {
                const newProperty = {
                    location,
                    ownerName,
                    phone,
                    email,
                    price: `K${price}`,
                    description,
                    images,
                };

                properties.push(newProperty);
                document.getElementById("post-house-form").reset();
                searchProperties();

                alert("Your house has been posted!");
            }
        };
        reader.readAsDataURL(files[i]); // Convert the image to base64 string
    }
});

function initializeProperties() {
    searchProperties();
}

initializeProperties();
