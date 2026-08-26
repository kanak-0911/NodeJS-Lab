// Lab-05: Food Delivery Tracker
// Task 4 - Promise Chaining

function placeOrder(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Order Placed: ${item}`);
            resolve(item);
        }, 1000);
    });
}

function trackOrder(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Preparing: ${item}`);
            resolve(item);
        }, 1000);
    });
}

function confirmDelivery(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Out for Delivery: ${item}`);
            resolve(item);
        }, 1000);
    });
}

placeOrder('Pasta')
    .then((item) => trackOrder(item))
    .then((item) => confirmDelivery(item))
    .then((item) => console.log(`Delivered: ${item}`))
    .catch((error) => console.log(`Error: ${error}`));