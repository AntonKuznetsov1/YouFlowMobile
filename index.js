let phones = [];
let audios = [];
let accesories = [];
let prices = {
    memory0: 0,
    memory1: 30,
    memory2: 70
};
const tax = 0.15;

function createPhone(model, memory0, memory1, memory2, price) {
    let phone = {
        model: model,
        memory: [memory0, memory1, memory2],
        price: price
    };
    phones.push(phone);
}

function createAudio(model, price) {
    let audio = { model: model, price: price };
    audios.push(audio);
}

function createAccesory(model, price) {
    let accesory = { model: model, price: price };
    accesories.push(accesory);
}

function checkDevice(deviceValue, itemSelect, memorySelect) {
    itemSelect.innerHTML = "";
    memorySelect.innerHTML = "";

    let relevantArray;
    if (deviceValue === "Phone") {
        relevantArray = phones;
        memorySelect.style.display = "block";
    } else {
        relevantArray = deviceValue === "Audio" ? audios : accesories;
        memorySelect.style.display = "none";
    }

    if (relevantArray) {
        relevantArray.forEach((item) => {
            let option = document.createElement("option");
            option.textContent = item.model;
            itemSelect.appendChild(option);
        });
    }

    itemSelect.addEventListener("change", function () {
        updateMemoryOptions(itemSelect.value, memorySelect);
    });
}

function updateMemoryOptions(selectedModel, memorySelect) {
    memorySelect.innerHTML = "";

    let selectedPhone = phones.find(phone => phone.model === selectedModel);
    if (selectedPhone) {
        selectedPhone.memory.forEach(mem => {
            let option = document.createElement("option");
            option.textContent = mem;
            memorySelect.appendChild(option);
        });
    }
}

function calculate() {
    let selectedModel = itemSelect.value;
    let deviceType = deviceSelector.value;
    let basePrice = 0;
    let extraMemoryCost = 0;

    if (deviceType === "Phone") {
        let selectedMemory = memorySelect.value;
        let selectedPhone = phones.find(phone => phone.model === selectedModel);
        if (!selectedPhone) {
            output.textContent = "Please select a valid phone.";
            return;
        }
        basePrice = selectedPhone.price;
        let memoryIndex = selectedPhone.memory.indexOf(selectedMemory);
        extraMemoryCost = memoryIndex !== -1 ? prices[`memory${memoryIndex}`] : 0;
    } else {
        let selectedItem = deviceType === "Audio" ? audios.find(audio => audio.model === selectedModel) : accesories.find(accesory => accesory.model === selectedModel);
        if (!selectedItem) {
            output.textContent = `Please select a valid ${deviceType.toLowerCase()}.`;
            return;
        }
        basePrice = selectedItem.price;
    }

    let totalBeforeTax = basePrice + extraMemoryCost;
    let totalWithTax = totalBeforeTax + (totalBeforeTax * tax);

    output.textContent = `Total Price: $${totalWithTax.toFixed(2)} (Tax included)`;
}

createPhone("F1", "128gb", "256gb", "512gb", 899);
createPhone("F12", "256gb", "512gb", "1024gb", 999);
createPhone("F2", "256gb", "512gb", "1024gb", 1099);
createPhone("F3", "128gb", "256gb", "512gb", 699);
createPhone("F4", "64gb", "128gb", "256gb", 249);
createPhone("XFlow", "128gb", "256gb", "512gb", 549);
createPhone("Flip", "128gb", "256gb", "512gb", 1099);
createPhone("Fold", "256gb", "512gb", "1024gb", 1899);

createAudio("Sound Mini", 49);
createAudio("Sound Pro", 149);
createAudio("Sound Max", 239);

createAccesory("F2 Wooden Case", 29);
createAccesory("Wireless Charger", 15);
createAccesory("Flow Watch", 259);

let deviceSelector = document.getElementById("device");
let itemSelect = document.getElementById("itemSelect");
let memorySelect = document.getElementById("memorySelect");
let output = document.getElementById("output");

function initializePage() {
    checkDevice(deviceSelector.value, itemSelect, memorySelect);

    if (deviceSelector.value === "Phone" && phones.length > 0) {
        let defaultPhone = phones[0];
        updateMemoryOptions(defaultPhone.model, memorySelect);
        itemSelect.value = defaultPhone.model;
    }
}

deviceSelector.addEventListener("change", function () {
    checkDevice(deviceSelector.value, itemSelect, memorySelect);
});

window.addEventListener("DOMContentLoaded", initializePage);

const button = document.querySelector("button");
button.addEventListener("click", calculate);
