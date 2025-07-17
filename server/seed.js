import mongoose from 'mongoose';
import connectSeedDB from './config/db.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

await connectSeedDB();

// 1. Clear existing data
await Product.deleteMany({});
await Order.deleteMany({});

// 2. Insert sample products
const sampleProducts = [
  {
    name: 'Forest Mug',
    price: 18,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Eco Tote Bag',
    price: 25,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bamboo Bottle',
    price: 30,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Leaf Notebook',
    price: 12,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Wooden Sunglasses',
    price: 45,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

const products = await Product.insertMany(sampleProducts);
console.log('Sample products seeded!');

// 3. Insert sample orders
const sampleOrders = [
  {
    customerName: 'Alice Green',
    email: 'alice@example.com',
    address: '123 Forest Lane, Green City',
    items: [
      { name: products[0].name, price: products[0].price, quantity: 2 },
      { name: products[2].name, price: products[2].price, quantity: 1 },
    ],
  },
  {
    customerName: 'Bob Woods',
    email: 'bob@example.com',
    address: '456 Bamboo Ave, Eco Town',
    items: [
      { name: products[1].name, price: products[1].price, quantity: 1 },
      { name: products[3].name, price: products[3].price, quantity: 3 },
    ],
  },
  {
    customerName: 'Carol Leaf',
    email: 'carol@example.com',
    address: '789 Leaf Rd, Natureville',
    items: [
      { name: products[4].name, price: products[4].price, quantity: 1 },
      { name: products[0].name, price: products[0].price, quantity: 1 },
    ],
  },
];

await Order.insertMany(sampleOrders);
console.log('Sample orders seeded!');

// 4. Graceful exit
await mongoose.disconnect();
console.log('Seeding complete. Connection closed.');
process.exit(0);