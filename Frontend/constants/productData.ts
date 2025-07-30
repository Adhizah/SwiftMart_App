const productData = [
  // Electronics & Devices
  {
    id: 1,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Electronics & Devices",
    image: require("@/assets/images/smartphone.jpg"),
    mediaType: "image",
    name: "Smartphone Pro X15",
    price: "1200.99",
    originalPrice: "1499.99",
    rating: "4.5 (320)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "The Smartphone Pro X15 features a blazing fast processor, 5G connectivity, and a stunning 120Hz OLED display. Capture every moment with its triple-lens AI camera and enjoy all-day battery life.\n\nKey Features:\n• 6.7-inch 120Hz OLED display\n• 256GB/512GB storage options\n• Triple-lens AI camera system (108MP + 12MP + 8MP)\n• 5G, Wi-Fi 6E, Bluetooth 5.2\n• 4500mAh battery with 65W fast charging\n• Face recognition and in-display fingerprint sensor",
    variants: [
      {
        color: "black",
        sizes: ["256GB", "512GB"],
        image: require("@/assets/images/smartphone.jpg"),
        price: "1200.99"
      },
      {
        color: "white",
        sizes: ["256GB", "512GB"],
        image: require("@/assets/images/smartphone.jpg"),
        price: "1200.99"
      }
    ],
    reviews: [
      {
        reviewerName: "Claire Thompson",
        rating: 5,
        comment: "Absolutely love this phone! The camera is incredible and battery lasts me all day, even with heavy use.",
        date: "12 days ago",
        images: [require("@/assets/images/smartphone.jpg")]
      },
      {
        reviewerName: "James Lee",
        rating: 4,
        comment: "Great performance and display, but I wish it came with more color options.",
        date: "23 days ago",
        images: []
      },
      {
        reviewerName: "Priya Patel",
        rating: 5,
        comment: "Switched from another brand and I'm impressed. Super fast and the screen is gorgeous!",
        date: "3 days ago",
        images: [require("@/assets/images/smartphone.jpg"), require("@/assets/images/laptop.jpeg")]
      }
    ]
  },
  {
    id: 2,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Electronics & Devices",
    image: require("@/assets/images/laptop.jpeg"),
    mediaType: "image",
    name: "UltraBook 14 Pro",
    price: "999.99",
    originalPrice: "1299.99",
    discount: "23",
    rating: "4.7 (210)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "UltraBook 14 Pro is a lightweight powerhouse with a 14-inch Retina display, 16GB RAM, and 1TB SSD. Perfect for professionals and students alike.\n\nKey Features:\n• 14-inch Retina display\n• 16GB RAM, 1TB SSD\n• Thunderbolt 4, Wi-Fi 6\n• Backlit keyboard, fingerprint reader\n• All-day battery life (up to 18 hours)",
    variants: [
      {
        color: "gray",
        sizes: ["14-inch"],
        image: require("@/assets/images/laptop.jpeg"),
        price: "999.99"
      },
      {
        color: "black",
        sizes: ["14-inch"],
        image: require("@/assets/images/laptop.jpeg"),
        price: "999.99"
      }
    ],
    reviews: [
      {
        reviewerName: "Alex Morgan",
        rating: 5,
        comment: "Super fast and light. Battery easily lasts a full workday. Highly recommend for remote work!",
        date: "5 days ago",
        images: [require("@/assets/images/laptop.jpeg")]
      },
      {
        reviewerName: "Linda Zhao",
        rating: 4,
        comment: "Great laptop, but the speakers could be better. Display is top-notch though!",
        date: "8 days ago",
        images: []
      }
    ]
  },

  // Sports & Fitness
  {
    id: 3,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Sports & Fitness",
    image: require("@/assets/images/yogamat.jpeg"),
    mediaType: "image",
    name: "EcoYoga Pro Mat",
    price: "49.99",
    originalPrice: "79.99",
    rating: "4.8 (150)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 }
    ],
    description: "EcoYoga Pro Mat is made from eco-friendly materials and provides excellent grip for all types of yoga and pilates.\n\nKey Features:\n• Non-slip, textured surface\n• Eco-friendly, biodegradable material\n• 6mm thick for extra comfort\n• Lightweight and easy to carry\n• Odor-free and easy to clean",
    reviews: [
      {
        reviewerName: "Sophie Dubois",
        rating: 5,
        comment: "Very comfortable and doesn't slip, even during hot yoga!",
        date: "2 days ago",
        images: [require("@/assets/images/yogamat.jpeg")]
      },
      {
        reviewerName: "Carlos Mendez",
        rating: 4,
        comment: "Good value for the price. Would love more color options.",
        date: "6 days ago",
        images: []
      }
    ]
  },
  {
    id: 4,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Sports & Fitness",
    image: require("@/assets/images/dumbellset.jpeg"),
    mediaType: "image",
    name: "Dumbbell Set",
    price: "129.99",
    originalPrice: "199.99",
    discount: "35",
    rating: "4.6 (98)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Adjustable dumbbell set for strength training at home.\n\nKey Features:\n• Adjustable weights\n• Ergonomic grip\n• Durable construction",
    reviews: [
      {
        reviewerName: "Mike",
        rating: 4,
        comment: "Solid set, easy to adjust weights.",
        date: "7 days ago"
      }
    ]
  },

  // Computer & Accessories
  {
    id: 5,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Computer & Accessories",
    image: require("@/assets/images/mechanicalkeyboard.jpeg"),
    mediaType: "image",
    name: "Mechanical Keyboard",
    price: "89.99",
    originalPrice: "129.99",
    rating: "4.9 (180)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "A tactile mechanical keyboard with customizable RGB lighting.\n\nKey Features:\n• Blue, brown, or red switches\n• Customizable RGB backlight\n• Detachable USB-C cable\n• Durable double-shot keycaps",
    variants: [
      {
        color: "black",
        sizes: ["Full Size", "Tenkeyless"],
        image: require("@/assets/images/mechanicalkeyboard.jpeg"),
        price: "89.99"
      },
      {
        color: "white",
        sizes: ["Full Size", "Tenkeyless"],
        image: require("@/assets/images/mechanicalkeyboard.jpeg"),
        price: "89.99"
      }
    ],
    reviews: [
      {
        reviewerName: "Sam",
        rating: 5,
        comment: "Best keyboard I've ever used! The keys feel amazing.",
        date: "3 days ago"
      }
    ]
  },
  {
    id: 6,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Computer & Accessories",
    image: require("@/assets/images/gamingmouse.jpeg"),
    mediaType: "image",
    name: "Gaming Mouse",
    price: "49.99",
    originalPrice: "79.99",
    discount: "37",
    rating: "4.8 (140)",
    condition: "used",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "High-precision gaming mouse with customizable buttons.\n\nKey Features:\n• Adjustable DPI\n• RGB lighting\n• Ergonomic design\n• Programmable buttons",
    reviews: [
      {
        reviewerName: "Chris",
        rating: 4,
        comment: "Great for gaming, fits well in my hand.",
        date: "8 days ago"
      }
    ]
  },

  // Beauty & Personal Care
  {
    id: 7,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Beauty & Personal Care",
    image: require("@/assets/images/facecream.jpeg"),
    mediaType: "image",
    name: "Face Cream",
    price: "29.99",
    originalPrice: "49.99",
    rating: "4.7 (220)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Hydrating face cream for all skin types.\n\nKey Features:\n• Moisturizes and nourishes skin\n• Non-greasy formula\n• Dermatologist tested",
    reviews: [
      {
        reviewerName: "Lily",
        rating: 5,
        comment: "My skin feels so soft and hydrated!",
        date: "1 day ago"
      }
    ]
  },
  {
    id: 8,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Beauty & Personal Care",
    image: require("@/assets/images/hairdryer.jpeg"),
    mediaType: "image",
    name: "Hair Dryer",
    price: "59.99",
    originalPrice: "99.99",
    discount: "40",
    rating: "4.6 (180)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Powerful hair dryer with multiple heat settings.\n\nKey Features:\n• Ionic technology\n• Cool shot button\n• Lightweight design",
    reviews: [
      {
        reviewerName: "Emma",
        rating: 4,
        comment: "Dries my hair quickly and doesn't frizz.",
        date: "4 days ago"
      }
    ]
  },

  // Office & Stationery
  {
    id: 9,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Office & Stationery",
    image: require("@/assets/images/notebookset.jpeg"),
    mediaType: "image",
    name: "Notebook Set",
    price: "19.99",
    originalPrice: "29.99",
    rating: "4.8 (90)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Set of 3 premium notebooks for school or office.\n\nKey Features:\n• Thick, bleed-resistant paper\n• Durable cover\n• Compact size",
    reviews: [
      {
        reviewerName: "Olivia",
        rating: 5,
        comment: "Love these notebooks! Great quality paper.",
        date: "6 days ago"
      }
    ]
  },
  {
    id: 10,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Office & Stationery",
    image: require("@/assets/images/deskorganiser.jpeg"),
    mediaType: "image",
    name: "Desk Organizer",
    price: "39.99",
    originalPrice: "59.99",
    discount: "33",
    rating: "4.7 (110)",
    condition: "used",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Keep your desk tidy with this multi-compartment organizer.\n\nKey Features:\n• Multiple compartments\n• Sturdy build\n• Modern design",
    reviews: [
      {
        reviewerName: "Noah",
        rating: 4,
        comment: "Keeps my desk clutter-free!",
        date: "10 days ago"
      }
    ]
  },

  // Home & Living
  {
    id: 11,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Home & Living",
    image: require("@/assets/images/sofa.jpeg"),
    mediaType: "image",
    name: "Sofa",
    price: "499.99",
    originalPrice: "799.99",
    rating: "4.6 (75)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Comfortable 3-seater sofa with plush cushions.\n\nKey Features:\n• Removable covers\n• Solid wood frame\n• Available in multiple colors",
    variants: [
      {
        color: "gray",
        sizes: ["2-seater", "3-seater"],
        image: require("@/assets/images/sofa.jpeg"),
        price: "499.99"
      },
      {
        color: "beige",
        sizes: ["2-seater", "3-seater"],
        image: require("@/assets/images/sofa.jpeg"),
        price: "499.99"
      }
    ],
    reviews: [
      {
        reviewerName: "Sophia",
        rating: 5,
        comment: "Super comfy and looks great in my living room!",
        date: "9 days ago"
      }
    ]
  },
  {
    id: 12,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Home & Living",
    image: require("@/assets/images/diningtable.jpeg"),
    mediaType: "image",
    name: "Dining Table",
    price: "699.99",
    originalPrice: "999.99",
    discount: "30",
    rating: "4.5 (60)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Elegant dining table for up to 6 people.\n\nKey Features:\n• Solid wood construction\n• Easy to assemble\n• Scratch-resistant surface",
    reviews: [
      {
        reviewerName: "Liam",
        rating: 4,
        comment: "Sturdy and stylish. Perfect for family dinners.",
        date: "12 days ago"
      }
    ]
  },

  // Fashion
  {
    id: 13,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Fashion",
    image: require("@/assets/images/leatherjacket.jpeg"),
    mediaType: "image",
    name: "Leather Jacket",
    price: "149.99",
    originalPrice: "199.99",
    rating: "4.8 (120)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Classic leather jacket for a timeless look.\n\nKey Features:\n• Genuine leather\n• Slim fit\n• Multiple pockets",
    variants: [
      {
        color: "black",
        sizes: ["S", "M", "L", "XL"],
        image: require("@/assets/images/leatherjacket.jpeg"),
        price: "149.99"
      },
      {
        color: "brown",
        sizes: ["S", "M", "L", "XL"],
        image: require("@/assets/images/leatherjacket.jpeg"),
        price: "149.99"
      }
    ],
    reviews: [
      {
        reviewerName: "Mason",
        rating: 5,
        comment: "Fits perfectly and looks awesome!",
        date: "15 days ago"
      }
    ]
  },
  {
    id: 14,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Fashion",
    image: require("@/assets/images/sneakers.jpeg"),
    mediaType: "image",
    name: "Sneakers",
    price: "99.99",
    originalPrice: "149.99",
    discount: "33",
    rating: "4.7 (200)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Trendy sneakers for everyday wear.\n\nKey Features:\n• Breathable mesh upper\n• Cushioned sole\n• Available in multiple colors",
    variants: [
      {
        color: "white",
        sizes: ["7", "8", "9", "10"],
        image: require("@/assets/images/sneakers.jpeg"),
        price: "99.99"
      },
      {
        color: "blue",
        sizes: ["7", "8", "9", "10"],
        image: require("@/assets/images/sneakers.jpeg"),
        price: "99.99"
      }
    ],
    reviews: [
      {
        reviewerName: "Ella",
        rating: 5,
        comment: "Super comfortable and stylish!",
        date: "20 days ago"
      }
    ]
  },

  // Automotive & Tools
  {
    id: 15,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Automotive & Tools",
    image: require("@/assets/images/vacuumcleaner.jpeg"),
    mediaType: "image",
    name: "Car Vacuum Cleaner",
    price: "79.99",
    originalPrice: "129.99",
    rating: "4.6 (85)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Portable vacuum cleaner for your car interior.\n\nKey Features:\n• Cordless operation\n• Powerful suction\n• Easy to empty",
    reviews: [
      {
        reviewerName: "Aiden",
        rating: 4,
        comment: "Makes cleaning my car so much easier!",
        date: "18 days ago"
      }
    ]
  },
  {
    id: 16,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Automotive & Tools",
    image: require("@/assets/images/toolset.jpeg"),
    mediaType: "image",
    name: "Tool Set",
    price: "99.99",
    originalPrice: "149.99",
    discount: "33",
    rating: "4.7 (110)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Comprehensive tool set for home repairs.\n\nKey Features:\n• Includes wrenches, screwdrivers, pliers, and more\n• Durable case\n• Rust-resistant finish",
    reviews: [
      {
        reviewerName: "Lucas",
        rating: 5,
        comment: "Has every tool I need for small repairs.",
        date: "22 days ago"
      }
    ]
  },

  // Groceries & Essentials
  {
    id: 17,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Groceries & Essentials",
    image: require("@/assets/images/organicrice.jpeg"),
    mediaType: "image",
    name: "Organic Rice",
    price: "19.99",
    originalPrice: "29.99",
    rating: "4.8 (90)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Premium organic rice for healthy meals.\n\nKey Features:\n• Grown without pesticides\n• Rich in nutrients\n• Fluffy texture",
    reviews: [
      {
        reviewerName: "Grace",
        rating: 5,
        comment: "Tastes great and cooks perfectly every time!",
        date: "25 days ago"
      }
    ]
  },
  {
    id: 18,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Groceries & Essentials",
    image: require("@/assets/images/cookingoil.jpeg"),
    mediaType: "image",
    name: "Cooking Oil",
    price: "9.99",
    originalPrice: "14.99",
    discount: "33",
    rating: "4.7 (110)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Healthy cooking oil for everyday use.\n\nKey Features:\n• High smoke point\n• Cholesterol free\n• Light flavor",
    reviews: [
      {
        reviewerName: "Henry",
        rating: 4,
        comment: "Good quality oil, doesn't overpower food.",
        date: "28 days ago"
      }
    ]
  },

  // Kids & Toys
  {
    id: 19,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Kids & Toys",
    image: require("@/assets/images/buildingblocks.jpeg"),
    mediaType: "image",
    name: "Building Blocks",
    price: "29.99",
    originalPrice: "49.99",
    rating: "4.8 (120)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Colorful building blocks for creative play.\n\nKey Features:\n• Safe for children\n• Bright colors\n• Encourages creativity",
    reviews: [
      {
        reviewerName: "Zoe",
        rating: 5,
        comment: "My kids love these blocks!",
        date: "30 days ago"
      }
    ]
  },
  {
    id: 20,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Kids & Toys",
    image: require("@/assets/images/stuffedanimal.jpeg"),
    mediaType: "image",
    name: "Stuffed Animal",
    price: "19.99",
    originalPrice: "29.99",
    discount: "33",
    rating: "4.7 (90)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Soft and cuddly stuffed animal for kids.\n\nKey Features:\n• Plush material\n• Machine washable\n• Perfect for bedtime",
    reviews: [
      {
        reviewerName: "Jack",
        rating: 5,
        comment: "So soft and cute! My daughter sleeps with it every night.",
        date: "32 days ago"
      }
    ]
  },

  // New products
  {
    id: 21,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Electronics & Devices",
    image: require("@/assets/images/ipad.jpeg"),
    mediaType: "image",
    name: "Tablet Air 11",
    price: "599.99",
    originalPrice: "699.99",
    rating: "4.6 (95)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Tablet Air 11 is ultra-lightweight with a vibrant 11-inch display and all-day battery life.\n\nKey Features:\n• 11-inch Retina display\n• 128GB storage\n• 4G LTE\n• 10-hour battery life",
    reviews: [
      {
        reviewerName: "Derek",
        rating: 5,
        comment: "Perfect for reading and streaming!",
        date: "2 days ago"
      }
    ]
  },
  {
    id: 22,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Home & Living",
    image: require("@/assets/images/modernlamp.jpeg"),
    mediaType: "image",
    name: "Modern Table Lamp",
    price: "39.99",
    originalPrice: "39.99",
    rating: "4.4 (40)",
    condition: "new",
    shippingOptions: [
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "A stylish table lamp with adjustable brightness for your home or office.\n\nKey Features:\n• Adjustable brightness\n• Energy efficient LED\n• Minimalist design",
    reviews: [
      {
        reviewerName: "Fatima",
        rating: 4,
        comment: "Looks great on my desk!",
        date: "5 days ago"
      }
    ]
  },
  {
    id: 23,
    sellerId: 1,
    promoId: null,
    promoPrice: null,
    category: "Fashion",
    image: require("@/assets/images/jeans.jpg"),
    mediaType: "image",
    name: "Classic Blue Jeans",
    price: "59.99",
    originalPrice: "79.99",
    rating: "4.5 (180)",
    condition: "new",
    shippingOptions: [
      { type: 'Standard', duration: '5-10 days', price: 0 },
      { type: 'Express', duration: '2-5 days', price: 9.99 }
    ],
    description: "Classic blue jeans with a comfortable fit and timeless style.\n\nKey Features:\n• 100% cotton\n• Slim fit\n• Machine washable",
    reviews: [
      {
        reviewerName: "Marta",
        rating: 5,
        comment: "Great fit and quality!",
        date: "1 day ago"
      }
    ]
  },
];

export default productData;
