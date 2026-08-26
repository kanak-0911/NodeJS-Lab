// Lab-05: Food Delivery Tracker
// Task 3 - Promise Version

function placeOrder(item) {
    return new Promise((resolve, reject) => {
        console.log(`Order placed: ${item}`);

        setTimeout(() => {
            const success = Math.random() > 0.2; // ~80% chance

            if (success) {
                resolve(`${item} is out for delivery!`);
            } else {
                reject(`Sorry, the restaurant could not prepare ${item}`);
            }
        }, 2000);
    });
}

placeOrder('Burger')
    .then((message) => console.log(message))
    .catch((error) => console.log(error));