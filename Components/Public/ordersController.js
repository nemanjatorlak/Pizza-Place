const { Order } = require('../../Models/Order');
const { User } = require('../../Models/User');
const { Ingredient } = require('../../Models/Ingredient');
const { Pizza } = require('../../Models/Pizza');

module.exports.getRecentOrders = async (req, res) => {
    // Find Last 5 Orders
    const recentOrders = await Order.find().sort({orderPlacedAt:-1}).limit(5).lean();
    
    if (!recentOrders) {
        throw new Error("No recent orders");
    }

    // Send response
    return res.status(200).send({
        message: 'The most recent orders successfully found!',
        results: recentOrders,
    });
};

module.exports.getOrders = async (req, res) => {
    const orders = await Order.find().sort({orderPlacedAt:-1}).lean();
    
    if (!orders) {
        throw new Error("No orders were found");
    }

    // Send response
    return res.status(200).send({
        message: 'Orders successfully retrieved!',
        results: orders,
    });
};

module.exports.getOrder = async (req, res) => {
    const { orderID } = req.params;

    // Find Order
    const order = await Order.findById(orderID).lean();
    
    if (!order) {
        throw new Error("Order not found");
    }

    // Send response
    return res.status(200).send({
        message: 'Order successfully found!',
        results: order,
    });
};

module.exports.completeOrder = async (req, res) => {
    const { orderID } = req.params;

    // Find Order
    const order = await Order.findOneAndUpdate({ orderID }, { $set: { completed: True }}).lean();
    
    if (!order) {
        throw new Error("Order not found");
    }

    // Send response
    return res.status(200).send({
        message: 'Order successfully found!',
        results: order,
    });
};

module.exports.placeOrder = async (req, res) => {
    const { firstName, lastName, address, phoneNumber, pineapple, olives, bacon, onions, mushrooms, pepperoni, tomatoSauce, cheese, size } = req.body;
    
    const numberOfActiveOrders = await Order.count({ completed: false }).limit(30).lean();
    
    if (numberOfActiveOrders > 15) {
        throw new Error("Maximum number of orders reached. Please wait for an order to be filled.");
    }

    const user = await User.findOne({ firstName, lastName, address }).lean();
    
    if (!user) {
        user = await new User({
            firstName,
            lastName,
            address,
            phoneNumber,
            role: 'User',
          }).save();
    }

    let ingredients = [pineapple, olives, bacon, onions, mushrooms, pepperoni, tomatoSauce, cheese]

    const ingredientsInfo = await Ingredient.aggregate([
        {
            $group: { 
            name: { $in: ingredients },
            priceTotal: { $sum: "$price" },
            timeTotal: { $sum: "$time" }
            }
        }
    ])

    const pizzaInfo = await Pizza.findOne({ size }).lean();

    let totalOrderTime = ingredientsInfo.timeTotal + pizzaInfo.price

    const order = await new Order({
        user,
        price: ingredientsInfo.priceTotal,
        ingredients,
        totalOrderTime,
        completed: False,
    }).save()

    // Send response
    return res.status(200).send({
        message: 'Order placed',
        results: order,
    });
};