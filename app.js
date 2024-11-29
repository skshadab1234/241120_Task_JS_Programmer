// Data Initialization
const bigCatsTable = [
    {
        species: "Big Cats",
        name: "Tiger",
        size: "10 ft",
        location: "Asia",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg"
    },
    {
        species: "Big Cats",
        name: "Lion",
        size: "8 ft",
        location: "Africa",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
    },
];

const dogsTable = [
    {
        species: "Dogs",
        name: "German Shepherd",
        size: "2 ft",
        location: "Germany",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/German_Shepherd_-_DSC_0346_%2810096362833%29.jpg/220px-German_Shepherd_-_DSC_0346_%2810096362833%29.jpg"
    },
    {
        species: "Dogs",
        name: "Labrador",
        size: "2 ft",
        location: "UK",
        image: "https://m.media-amazon.com/images/I/81CLcokYe+L.jpg"
    },
];

// 
const bigFishTable = [
    {
        species: "Big Fish",
        name: "Humpback Whale",
        size: "15 ft",
        location: "Atlantic Ocean",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4XFAygTTp4wFFKdQrFtQpGkLS8n8zUULIjUMPnpgCyQcHYzELeNp_2pVHpSVZN_eoFFw&usqp=CAU"
    },
    {
        species: "Big Fish",
        name: "Tiger Shark",
        size: "8 ft",
        location: "Ocean",
        image: "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRi35Ryargm_blttafswbco6xAeo_58vtzfsLCWlxE1mhbum8P5eTwitPcMuk0xjIFSs0A2o76lEXiRg18o5U8"
    },
];

const tables = {
    bigCatsTable,
    dogsTable,
    bigFishTable,
};

let currentEditIndex = null;
let currentTable = null;

// Render Tables
function renderTable(tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);

    // Check if tableBody exists
    if (!tableBody) {
        console.error(`Table body not found for tableId: ${tableId}`);
        return;
    }

    console.log(tables)
    tableBody.innerHTML = ""; // Clear previous rows

    tables[tableId].forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.species}</td>
                <td>${item.name}</td>
                <td><img src="${item.image}" alt="${item.name}" /></td>
                <td>${item.size}</td>
                <td>${item.location}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editAnimal('${tableId}', ${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAnimal('${tableId}', ${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}


// Open Form
function openForm(tableId) {
    currentTable = tableId;
    currentEditIndex = null;
    document.getElementById("addForm").reset();
    const modal = new bootstrap.Modal(document.getElementById("addModal"));
    modal.show();
}

// Add/Edit Animal
document.getElementById("addForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const size = `${document.getElementById("size").value} ft`;
    const location = document.getElementById("location").value;
    const image = document.getElementById("image").value;

    console.log(currentTable, 'tables[currentTable]')
    if (currentEditIndex !== null) {
        // Edit Mode
        tables[currentTable][currentEditIndex] = { species: currentTable, name, size, location, image };
    } else {
        // Add Mode
        tables[currentTable].push({ species: currentTable, name, size, location, image });
    }

    renderTable(currentTable);
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
});

// Edit Animal
function editAnimal(tableId, index) {
    currentTable = tableId;
    currentEditIndex = index;

    const animal = tables[tableId][index];
    document.getElementById("name").value = animal.name;
    document.getElementById("size").value = parseFloat(animal.size);
    document.getElementById("location").value = animal.location;
    document.getElementById("image").value = animal.image;

    const modal = new bootstrap.Modal(document.getElementById("addModal"));
    modal.show();
}

// Delete Animal
function deleteAnimal(tableId, index) {
    tables[tableId].splice(index, 1);
    renderTable(tableId);
}

// Initial Render
renderTable("bigCatsTable");
renderTable("dogsTable");
renderTable("bigFishTable");
