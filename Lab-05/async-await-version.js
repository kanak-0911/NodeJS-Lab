// Lab-05: Food Delivery Tracker
// Task 5 - Async/Await Version

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

async function completeOrder() {
    try {
        const item1 = await placeOrder('Pasta');
        const item2 = await trackOrder(item1);
        const item3 = await confirmDelivery(item2);

        console.log(`Delivered: ${item3}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

completeOrder();