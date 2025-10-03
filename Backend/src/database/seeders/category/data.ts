export const CATEGORIES_DATA = [
  
  //Clothing Backend
  {
    id: "b1f7b77d-1ff7-4d66-ae63-31811cd067e0",
    name: 'Clothing, Shoes & Accessories',
    slug: 'clothing-shoes-accessories',
    subcategories: [
      {
        id: "a1d35d1e-4475-4c24-98bc-c678bb3d319e",
        name: 'Dresses',
        gender: ['Female', 'Kids'],
        subcategoryItems: [
          { id: "cfed1f8d-4b9b-4553-92c5-dc2be01c38b7", name: 'Casual Dresses', tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "d47f23a4-1cf5-4a39-9b79-6cd25c7f462d", name: 'Formal Dresses', tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "c53f5378-e3b3-45b1-a129-e2c4067c8509", name: 'Summer Dresses', tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern", "season"], tag_defaults: { ar_type: "body-tracking", gender: "women", season: "summer" } },
        ],
      },
      {
        id: "3f7ed738-cbf9-46a7-9f39-0c77502e17b2",
        name: "Tops",
        subcategoryItems: [
          { id: "7cd4a02e-becb-4865-aabb-b87a18dce2c0", name: "Blouses", slug: "blouses", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "9d826402-b7be-4329-97fc-bd64934eb233", name: "T-Shirts", slug: "t-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "f357256e-983f-46c7-a2f2-3f0d5ae5b348", name: "Sweaters", slug: "sweaters", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "1cb97a29-ec59-45c6-8a56-0a1e8f62e6d7", name: "Cardigans", slug: "cardigans", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "ada4f6d3-c1a2-4567-92b7-430226b3ca47", name: "Casual Shirts", slug: "casual-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "1de0fd99-62b6-4386-8c92-8ca4db389599", name: "Dress Shirts", slug: "dress-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "9c41b539-ec2c-4b49-91c2-6b8f18534c40", name: "Polo Shirts", slug: "polo-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
        ],
      },
      {
        id: "d7c1a1c3-cda0-4686-bf84-e70241e383b3",
        name: "Bottoms",
        gender: ["Male", "Female", "Kids"],
        subcategoryItems: [
          { id: "e18d4a1b-bb01-4b19-87c2-f6be3e273d68", name: "Jeans", tags_required: [ "ar_type", "age_group", "gender", "season", "occasion", "material" ], optional_tags: ["color", "pattern"], tag_defaults: { "ar_type": "body-tracking" } },
          { id: "b888c11c-b62d-4be4-9756-4151a05692f9", name: "Trousers" },
          { id: "b888c11c-b62d-4be4-9756-4151a05692f9", name: "Shorts", tags_required: [ "ar_type", "age_group", "gender", "season", "occasion", "material" ], optional_tags: ["color", "pattern"], tag_defaults: { "ar_type": "body-tracking" } },
          { id: "8f6db2a2-5ac9-4fa7-9802-d742c5f1a230", name: "Skirts", tags_required: [ "ar_type", "age_group", "gender", "season", "occasion", "material" ], optional_tags: ["color", "pattern"], tag_defaults: { "ar_type": "body-tracking", gender: "women" }},
          { id: "d49a2804-0665-4b50-9d8e-1e7b423f26b2", name: "Pants", slug: "pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" }, 
            child: [
              { id: "e8d641c8-c9f2-491a-96e0-0259b3c3c734", name: "Dress Pants", slug: "dress-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "62b3d30b-d023-45a8-8e62-c1f03f3938b8", name: "Chinos", slug: "chinos", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "a6f8749c-f233-4f9e-a61f-b3a537f1e7d0", name: "Joggers", slug: "joggers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "4d1a9e3f-67c8-47b2-8a9d-b84e1c28f3a5", name: "Cargos", slug: "cargos", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          },
        ]
      },
      {
        id: "9c93e575-8e62-49de-a3d9-16b61c31be2d",
        name: "Outerwear",
        gender: ["Male", "Female", "Kids"],
        subcategoryItems: [
          { id: "aba0a755-cf5d-4657-b017-8d014a539d43", name: "Jackets", slug: "jackets", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "e66fd981-7ec0-4d34-b7fa-b4b682f96e30", name: "Coats", slug: "coats", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "5dbdf1d5-bbfc-402f-806d-e4d049500c7f", name: "Blazers", tags_required: [ "ar_type", "age_group", "gender", "season", "occasion", "material" ], optional_tags: ["color", "pattern"], tag_defaults: { "ar_type": "body-tracking" }},
          { id: "ef324850-c5c5-41d9-bc0f-f8b4b8f37a07", name: "Vests", tags_required: [ "ar_type", "age_group", "gender", "season", "occasion", "material" ], optional_tags: ["color", "pattern"], tag_defaults: { "ar_type": "body-tracking" } },
          { id: "fde3b457-48a3-4e7c-9c19-43e1f53b738a", name: "Hoodies", tags_required: [ "ar_type", "age_group", "gender", "season", "occasion", "material" ], optional_tags: ["color", "pattern"], tag_defaults: { "ar_type": "body-tracking" }},
          { id: "4a3b8f17-c5d7-4be9-b64e-29b5341d7905", name: "Suits", slug: "suits", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
        ]
      },
      {
        id: "69e7fd69-6ec4-4792-94f2-b39e4826c96f",
        name: "Activewear",
        gender: ["Male", "Female", "Kids"],
        subcategoryItems: [
          { id: "750f3a2d-2b19-4de3-b7b7-4f6b3f22e4d2", name: "Leggings", slug: "leggings", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "b543b93c-7d88-4b8d-ae5f-507b0cb11b7a", name: "Sport Bras", slug: "sport-bras", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "3c6814a9-b1c3-4a2f-8c74-9001daeea578", name: "Track Pants", slug: "track-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "2df96d8f-b8f9-4711-8f89-f72f167e78da", name: "Workout Tops", slug: "workout-tops", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "d7424957-f23b-4c95-85c7-e318e91f9a56", name: "Yoga Pants", slug: "yoga-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "36e0ab1f-f44d-4e3f-9785-1d2f8c3c4e9b", name: "Sports Shorts", slug: "sports-shorts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "f32175e8-3401-4c53-8bd6-5b8cb2b2744a", name: "Joggers", slug: "joggers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "e3b9c2e5-502d-430c-8e73-4f5ea6e82b3c", name: "Sweatshirts", slug: "sweatshirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
          { id: "3d2e0cba-78f1-41c7-ae4b-0b8129b4e4cd", name: "Compression Wear", slug: "compression-wear", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
        ]
      },
      {
        id: "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
        name: "Eyewear",
        subcategoryItems: [
          { id: "e09b241e-4c16-4e74-b120-55e4b55e5e0a", name: "Prescription Glasses", slug: "prescription-glasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "7f2e0a43-2d39-4ec9-808f-47f1eb7385f7", name: "Sunglasses", slug: "sunglasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "f329c04d-1ef5-4db3-a37c-583e4a7c9f7b", name: "Blue Light Glasses", slug: "blue-light-glasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "2d1cfe2b-d69f-40b8-9061-0ec74c8f1b1b", name: "Kids' Eyewear", slug: "kids-eyewear", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking", age_group: "kids" } },
        ]
      },
      {
        id: "86d2b4c8-b195-4de8-b47f-8e5d98c0f5ae",
        name: "Intimates",
        gender: ["Female"],
        subcategoryItems: [
          { id: "f5a7b94c-23d9-42e8-8375-b1a9f7e5d8c3", name: "Bras", slug: "bras", tags_required: ["ar_type", "age_group", "gender", "season", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "2d3202f1-5972-4a2e-bbdf-61af41769dc3", name: "Panties", slug: "panties", tags_required: ["ar_type", "age_group", "gender", "season", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
          { id: "7fae12d0-9635-43fb-aaf4-362ed92c1234", name: "Boxers", slug: "boxers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "men" } },
          { id: "83b2f5a7-d94f-481b-832e-7e3b94a2f8c1", name: "Briefs", slug: "briefs", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "men" } },
          { id: "8b24c7f9-83d5-4a2f-985c-7e4f3812b390", name: "Sleepwear", slug: "sleepwear", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
        ]
      },
      {
        id: "9fc437c1-640c-48d6-92d4-8e9b7b2c367b",
        name: "Shoes",
        gender: ["Male", "Female", "Kids"],
        subcategoryItems: [
          { id: "215cfe87-5dc3-4b9b-80b9-01a7e99f7dc8", name: "Sandals", slug: "sandals", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
          { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", name: "Flats", slug: "flats", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
          { id: "3c7f41d2-4d88-42b6-8f5a-86b9f3d23eb9", name: "Heels", slug: "heels", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking", gender: "women" } },
          { id: "8g3f1b54-3e40-5fd0-919g-58g2fc8496g8", name: "Boots", slug: "boots", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
          { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", name: "Sneakers", slug: "sneakers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
          { id: "e2b4f987-3218-403a-9024-c8d7b23f18a4", name: "Athletic Shoes", slug: "athletic-shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
          { id: "4d3b5c84-59f7-46b1-9a7f-3724d9b2f087", name: "Formal Shoes", slug: "formal-shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
          { id: "829dcb34-e7a9-4a5c-84f5-7381a2b3093f", name: "Casual Shoes", slug: "casual-shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
        ]
      },
      {
        id: "02f35b89-9f7b-4e6c-88c4-e7f4d23872e1",
        name: "Accessories",
        slug: "accessories",
        gender: ["Male", "Female", "Kids"],
        subcategoryItems: [
          {
            id: "a7e1f5d6-c9b2-4d83-9a4f-5c8e2b1d7f3e",
            name: "Bags",
            slug: "bags", 
            subcategoryItemChildren: [
              { id: "52d6e93f-09cb-4861-82f9-7b14e9c5f2a7", name: "Handbags", slug: "handbags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { "ar_type": "static" }},
              { id: "b3f2e1c4-d5a6-4b78-9e01-2f3c4a5b6d7e", name: "Backpacks", slug: "backpacks", tags_required: [ "ar_type", "gender", "material", "indoor_outdoor" ], tag_defaults: { "ar_type": "static" } },
              { id: "e9d8c7b6-5a4f-3e21-0c9b-8a7d6e5c4b3a", name: "Crossbody Bags", slug: "crossbody-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { "ar_type": "static" } },
              { id: "f4e3d2c1-a5b6-7c8d-9e01-2a3b4c5d6e7f", name: "Shoulder Bags", slug: "shoulder-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { "ar_type": "static" } }, 
              { id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", name: "Tote Bags", slug: "tote-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { "ar_type": "static" } },
              { id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c", name: "Clutches", slug: "clutches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            id: "d9e8c7b6-a5f4-3e21-0c9b-8a7d6e5c4b3a",
            name: "Jewelry & Watches",
            subcategoryItemChildren: [
              { id: "a43e7f92-5c87-49d3-9f72-3e5b947f81d2", name: "Earrings", slug: "earrings", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", name: "Necklaces", slug: "necklaces", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "83f4a75c-92d3-42a5-88f9-4e7c5b2f381a", name: "Rings", slug: "rings", tags_required: ["ar_type", "gender", "material", "safety_certified"], optional_tags: ["gemstone"], tag_defaults: { ar_type: "hand-tracking" } },
              { id: "8b24c7f9-83d5-4a2f-985c-7e4f3812b390", name: "Bracelets", slug: "bracelets", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "4f8b2c07-3e98-4d87-9c5a-5e9d437e8f3a", name: "Plated Jewelry", slug: "plated-jewelry", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "hand-tracking" } },
              { id: "829dcb34-e7a9-4a5c-84f5-7381a2b3093f", name: "Men's Watches", slug: "mens-watches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "men" } },
              { id: "4d3b5c84-59f7-46b1-9a7f-3724d9b2f087", name: "Women's Watches", slug: "womens-watches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "women" } },
              { id: "e2b4f987-3218-403a-9024-c8d7b23f18a4", name: "Smartwatches", slug: "smartwatches", tags_required: ["ar_type", "gender", "material"], tag_defaults: { ar_type: "hand-tracking" } },
              { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", name: "Watch Bands & Accessories", slug: "watch-bands-accessories", tags_required: ["ar_type", "gender", "material"], tag_defaults: { ar_type: "hand-tracking" } },
            ]
          },
          {
            id: "42f97c8a-b9f3-4e5b-832f-98134c7e5a8b",
            name: "Headwear",
            subcategoryItemChildren: [
              { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", name: "Hats", slug: "hats", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "326dgf98-6ed4-5c0c-91c0-12b8f88g8ed9", name: "Caps", slug: "caps", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "9fc437c1-640c-48d6-92d4-8e9b7b2c367b", name: "Beanies", slug: "beanies", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
            ]
          },
          {
            id: "2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
            name: "Seasonal Accessories",
            subcategoryItemChildren: [
              { id: "e18d4a1b-bb01-4b19-87c2-f6be3e273d68", name: "Gloves", slug: "gloves", tags_required: ["ar_type", "gender", "season", "material", "safety_certified"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "hand-tracking" } },
              { id: "d7c1a1c3-cda0-4686-bf84-e70241e383b3", name: "Scarves", slug: "scarves", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "d5a8c4b1-8b21-4d37-9d7a-1f8e9c2b3d64", name: "Socks", slug: "socks", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "9c93e575-8e62-49de-a3d9-16b61c31be2d", name: "Ties", slug: "ties", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ]
          },
          {
            id: "4f8b2c07-3e98-4d87-9c5a-5e9d437e8f3a",
            name: "Wallets & Belts",
            subcategoryItemChildren: [
              { id: "1db0843f-bbf5-4a4b-9082-1a81dc7bf934", name: "Wallets", slug: "wallets", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "static" } },
              { id: "1cb97a29-ec59-45c6-8a56-0a1e8f62e6d7", name: "Belts", slug: "belts", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking" } },
            ]
          }
        ]
      },
    ],
  },

  //Electronics Backend
  {
    id: "9a3ff078-60f5-4f1c-b6c7-0c5976ec6c5f",
    name: "Electronics",
    subcategories: [
      {
        id: "ec80f7d7-bfd1-4b79-8b07-04ad8f84850b",
        name: "Mobile Phones & Accessories",
        subcategoryItems: [
          { id: "d312a97f-2b27-4bfe-bf8d-5c1fdd5b1b79", name: "Smartphones", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["brand"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "f23b7c69-dc3e-4f64-9ac4-8c48f6780ecb", name: "Cases & Covers", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "56d49b33-5a6a-42d7-950d-505a9b0fdf62", name: "Screen Protectors", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "780a69a9-98b8-44d5-a8f9-c44bf9dcbf78", name: "Chargers & Cables", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "10c30a2f-5d3a-469c-bdf3-0e3e4b853a87", name: "Power Banks", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
        ]
      },
      {
        id: "302f2156-dfbc-497d-8f87-bfa13d76e94b",
        name: "Computers & Accessories",
        subcategoryItems: [
          { id: "8b88334c-9531-42d9-a5fd-d4303d3c31a7", name: "Laptops", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["brand"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "5157a66a-e90e-4e5b-bf88-e76cf598cfbb", name: "Desktops", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "c8034c21-6254-4717-bc9e-e2d9bafc7032", name: "Monitors", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "b5473b6b-4d3d-4987-b8a4-504bd650ff80", name: "Keyboards & Mice", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "2d7a7d73-81d9-43b3-9b35-cb2b236c2ea6", name: "Printers & Scanners", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
        ]
      },
      {
        id: "0ed8f771-8d8d-4d48-9379-c1a5e70f989e",
        name: "Home Entertainment",
        subcategoryItems: [
          { id: "c87ba601-c1b7-4b52-a1c8-d8ec3b7b0a18", name: "Televisions", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "77c5ab4b-beb5-4e43-b71f-0c83a02b16af", name: "Sound Systems", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "5c3a74d9-1f9e-4bfb-833f-02a32c10874c", name: "Streaming Devices", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "7b32f0d6-8e1b-4413-8b91-2552648b7dc5", name: "Blu-ray & DVD Players", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
        ]
      },
      {
        id: "0fa9db70-0a8e-4f99-a67e-d8a2a2335e90",
        name: "Cameras & Photography",
        subcategoryItems: [
          { id: "61ae3d0a-efb2-485e-8ff5-c0b79d53c75e", name: "Digital Cameras", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "10fcf01f-3ae5-49ab-b2c6-c0217b3b5641", name: "Lenses", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "84e9ed1b-d12d-4948-96b2-78728e34e5e8", name: "Tripods", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "fc0dcf91-cd0d-4f34-b5fc-874e59ea9d6f", name: "Camera Accessories", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
        ]
      },
      {
        id: "b3e34b9d-5f3b-4c7b-8b5e-0c3d9a78f4b5",
        name: "Smart Home Devices",
        subcategoryItems: [
          { id: "f5d0a6c7-3b9e-4a8f-b5c4-2d0a6c7d9e4a", name: "Smart Lights", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "a9e8b7c6-2a1d-4b8c-8d1e-2a4c9b3d5f8e", name: "Smart Speakers", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "d1c2b3a4-8e9f-4d1c-b5a7-9e4b1c8f3e0d", name: "Security Cameras", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "e4f5d6c7-1a2b-4d3e-8c5f-6a7e8b9f1d0a", name: "Smart Plugs & Switches", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
          { id: "f8a7b9c1-4d3e-4f5c-8a2b-1c4d9e7f8a9b", name: "Smart Thermostats", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
        ]
      }
    ]
  },

  //Furniture Backend
  {
    id: "0ff2b00f-9b29-4e32-bbb1-d83d0a416b84",
    name: "Home, Furniture & Appliances",
    slug: "home-furniture-appliances",
    subcategories: [
      {
        id: "26ccfa5e-8ffb-4c68-b09f-9c730b577b5b",
        name: "Furniture",
        slug: "furniture",
        subcategoryItems: [
          {
            id: "fef93787-b22b-4e9e-bf85-32885d376f02",
            name: "Sofas",
            slug: "sofas",
            subcategoryItemChildren: [
              { id: "02e69a1f-38e5-426d-beea-867380902c88", name: "Sectional Sofas", slug: "sectional-sofas", tags_required: ["ar_type", "indoor_outdoor", "material", "accessible"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor", "accessible": false } },
              { id: "5402cd68-3d48-4adf-b5e5-1775d611e767", name: "Loveseats", slug: "loveseats", tags_required: ["ar_type", "indoor_outdoor", "material", "accessible"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor", "accessible": false } },
              { id: "e6c3f7e6-09b9-44fa-b8d3-dbeec64409de", name: "Recliners", slug: "recliners", tags_required: ["ar_type", "indoor_outdoor", "material", "accessible"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor", "accessible": true } },
              { id: "3570bf56-db8d-423e-8321-c6451b4119c8", name: "Chesterfields", slug: "chesterfields", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "824d7240-6841-4ad5-97c7-3a0eb00762e6", name: "Sleeper Sofas", slug: "sleeper-sofas", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "5ca0908f-5324-4e72-84c2-6556aa4fa658", name: "Modular Sofas", slug: "modular-sofas", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "d42af060-79c1-44a5-8971-d014425ca803",
            name: "Chairs & Seating",
            slug: "chairs-seating",
            subcategoryItemChildren: [
              { id: "6b0007fe-a568-4ac8-a662-93c33bb94b3e", name: "Accent Chairs", slug: "accent-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "da7cfa84-9557-44f8-a1af-baaea7ff1014", name: "Armchairs", slug: "armchairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "4cd717fc-85a7-4e2e-8461-41ba72569348", name: "Club Chairs", slug: "club-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "7e60b534-62ca-40cc-a56d-af450e8a40c3", name: "Ottomans & Poufs", slug: "ottomans-poufs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "a2b93fa2-4e46-4335-b976-8dbf28e8e8a9",
            name: "Tables",
            slug: "tables",
            subcategoryItemChildren: [
              { id: "d62fd072-d47d-4fa1-b31d-b1cc5b28ad90", name: "Coffee Tables", slug: "coffee-tables", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "60920e79-6f97-45d3-abcb-dd88914e55f3", name: "End Tables", slug: "end-tables", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "bf9d0e3a-ae29-4a0b-86bb-93d9cf1c730e", name: "Console Tables", slug: "console-tables", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "378a54cd-5a59-449b-bf43-4e62f2c214e4",
            name: "Media & Storage",
            slug: "media-storage",
            subcategoryItemChildren: [
              { id: "17c8d78c-b19f-4f3f-bd45-482d0b0c5d11", name: "TV Stands", slug: "tv-stands", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "a0d92de3-59cd-4a07-8a56-f0f441045319", name: "Bookcases", slug: "bookcases", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "662737cf-8a24-4eb5-8e61-b2951908aa8d", name: "Storage Cabinets", slug: "storage-cabinets", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ],
          }
        ]
      },
      {
        id: "f45e9246-0ef5-4996-b2f9-71c27ad98371",
        name: "Bedroom",
        slug: "bedroom", // 👈 Added slug for 'Bedroom'
        subcategoryItems: [
          {
            id: "2bdc4f4b-6f5c-45bb-8572-27a973b1c9e6",
            name: "Beds",
            slug: "beds", // 👈 Added slug for 'Beds'
            subcategoryItemChildren: [
              { id: "36a28079-9502-45b3-b0c2-0e9d2c0bcbd6", name: "Platform Beds", slug: "platform-beds", tags_required: ["ar_type", "indoor_outdoor", "material", "accessible"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor", "accessible": false } },
              { id: "21903dc8-ef6c-4a34-b221-47a8b4b4f637", name: "Upholstered Beds", slug: "upholstered-beds", tags_required: ["ar_type", "indoor_outdoor", "material", "accessible"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor", "accessible": false } },
              { id: "cb4b2b28-0b1c-4163-b9c8-8ccdd67a0236", name: "Canopy Beds", slug: "canopy-beds", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "0d6158b7-2beb-4b0d-8583-18acb3338a4a", name: "Storage Beds", slug: "storage-beds", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "5a15a4bf-8ef9-4113-ae4f-b9ede7178d1d", name: "Adjustable Beds", slug: "adjustable-beds", tags_required: ["ar_type", "indoor_outdoor", "material", "accessible"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor", "accessible": true } }
            ]
          },
          {
            id: "4c63e2e1-f6f6-44bc-a496-21907337081d",
            name: "Dressers & Chests",
            slug: "dressers-chests", // 👈 Added slug for 'Dressers & Chests'
            subcategoryItemChildren: [
              { id: "f78bd691-cd05-4195-b38a-71065c914ea7", name: "6-Drawer Dressers", slug: "6-drawer-dressers", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "db256369-53f5-4c2b-b1ea-e4c506fe3305", name: "Chests of Drawers", slug: "chests-of-drawers", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "5a8dbb56-5d36-41aa-a8d9-fc748dd97e38",
            name: "Nightstands & Side Tables",
            slug: "nightstands-side-tables", // 👈 Added slug for 'Nightstands & Side Tables'
            subcategoryItemChildren: [
              { id: "bceebfde-665b-4f5d-a4bc-55068dc10b1a", name: "Single Drawer Nightstands", slug: "single-drawer-nightstands", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "5e9e56a3-5842-4f74-bc24-0ce6b08de3f3", name: "Double Drawer Nightstands", slug: "double-drawer-nightstands", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "ec2c0f78-6d5a-4053-b46b-3e45c7b0df90",
            name: "Wardrobes & Armoires",
            slug: "wardrobes-armoires", // 👈 Added slug for 'Wardrobes & Armoires'
            subcategoryItemChildren: [
              { id: "d2e1bd8b-c009-45e3-b3d8-ff61b9f25c3d", name: "2-Door Wardrobes", slug: "2-door-wardrobes", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "95346994-dca3-4892-92b2-1a1c03c3112c", name: "Sliding Door Wardrobes", slug: "sliding-door-wardrobes", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          }
        ]
      },
      {
        id: "47b4e7f5-4891-4147-818e-f255d650bdb7",
        name: "Office",
        slug: "office", // 👈 Added slug for 'Office'
        subcategoryItems: [
          {
            id: "8abfbbd7-0fcb-43d6-9111-6a5a42c0702b",
            name: "Desks",
            slug: "desks", // 👈 Added slug for 'Desks'
            subcategoryItemChildren: [
              { id: "9215688d-a05f-444e-ab96-c8ff54a2b504", name: "Writing Desks", slug: "writing-desks", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "5a384129-b8f1-448b-b8ca-ac1fd66f7610", name: "Standing Desks", slug: "standing-desks", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "d1f7b773-de48-44fc-9380-f6f9c8d9c7fd", name: "Executive Desks", slug: "executive-desks", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "5c1e5db5-2745-4d1e-b18b-9ff81cd83367",
            name: "Office Chairs",
            slug: "office-chairs", // 👈 Added slug for 'Office Chairs'
            subcategoryItemChildren: [
              { id: "f57a60c3-ec74-4f05-85d5-490885885851", name: "Ergonomic Chairs", slug: "ergonomic-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "983beb19-8289-4f4d-8282-0e6944bac291", name: "Task Chairs", slug: "task-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "5aad749a-08f4-42d7-a608-cd05e17a91d8", name: "Executive Chairs", slug: "executive-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ]
          },
          {
            id: "fce90567-8d9e-413e-9c17-021111256c66",
            name: "Storage",
            slug: "storage", // 👈 Added slug for 'Storage'
            subcategoryItemChildren: [
              { id: "51ca1adb-7cfc-4861-ad68-fdf5440662e8", name: "Filing Cabinets", slug: "filing-cabinets", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "36e55d3e-6d5e-46d3-afa6-3942cf88181b", name: "Bookcases & Shelving", slug: "bookcases-shelving", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ],
          }
        ]
      },
      {
        id: "497b2f65-1f53-4adf-8902-d82fa8d18ea4",
        name: "Outdoor",
        slug: "outdoor", // 👈 Added slug for 'Outdoor'
        subcategoryItems: [
          {
            id: "3de1373d-940e-47d2-b94d-ebfdd48fe3be",
            name: "Seating Sets",
            slug: "seating-sets", // 👈 Added slug for 'Seating Sets'
            subcategoryItemChildren: [
              { id: "3c71d8af-12bb-4dbf-b6c7-b7bb9f5cda90", name: "Patio Sets", slug: "patio-sets", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
              { id: "c4752303-edf7-4a3a-914b-bf9968bca34d", name: "Sling Chairs", slug: "sling-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
              { id: "dae7d09f-cdae-4cf7-8d3b-b547fbf9550a", name: "Chaise Lounges", slug: "chaise-lounges", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
              { id: "34a71bfe-4388-4c2e-8a50-b7969e706387", name: "Adirondack Chairs", slug: "adirondack-chairs", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } }
            ],
          },
          {
            id: "2d3e4f5c-6b7a-4c8d-9f0e-1a2b3c4d5e6f",
            name: "Tables",
            slug: "tables", // 👈 Added slug for 'Tables'
            subcategoryItemChildren: [
              { id: "77867f34-14ce-4762-9dc5-ccafe10f52cb", name: "Dining Tables", slug: "dining-tables", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
              { id: "d0e1b2c3-4a5f-4b6c-8a7d-e9f0d1a2b3c4", name: "Bistro Tables", slug: "bistro-tables", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } }
            ],
          },
          {
            id: "c1d2e3f4-5a6b-4c7d-8e9f-01a2b3c4d5e6",
            name: "Shade & Shelter",
            slug: "shade-shelter", // 👈 Added slug for 'Shade & Shelter'
            subcategoryItemChildren: [
              { id: "a9b8c7d6-e5f4-4a3b-9d8c-7e6f5d4c3b2a", name: "Umbrellas", slug: "umbrellas", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
              { id: "b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e", name: "Gazebos", slug: "gazebos", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } }
            ],
          },
          {
            id: "e9f8d7c6-a5b4-4c3d-9e2f-1a2b3c4d5e6f",
            name: "Storage",
            slug: "outdoor-storage", // 👈 Added slug for 'Storage' (prefixed to avoid conflict)
            subcategoryItemChildren: [
              { id: "d9e8f7a6-b5c4-4d3e-9f0a-1b2c3d4e5f6a", name: "Deck Boxes", slug: "deck-boxes", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
              { id: "e7f6d5a4-c3b2-4c1d-8e9f-0a1b2c3d4e5f", name: "Garden Sheds", slug: "garden-sheds", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } }
            ],
          }
        ]
      },
      {
        id: "f8d7c6b5-a4e3-4d21-9b0a-1c2d3e4f5a6b",
        name: "Home Decor",
        slug: "home-decor", // 👈 Added slug for 'Home Decor'
        subcategoryItems: [
          {
            id: "f2a3b4c5-d6e7-8f90-a1b2-c3d4e5f6a7b8",
            name: "Lighting",
            slug: "lighting", // 👈 Added slug for 'Lighting'
            subcategoryItemChildren: [
              { id: "1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6", name: "Ceiling Fixtures", slug: "ceiling-fixtures", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e", name: "Wall Sconces", slug: "wall-sconces", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f", name: "Table Lamps", slug: "table-lamps", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f90", name: "Floor Lamps", slug: "floor-lamps", tags_required: ["ar_type", "indoor_outdoor", "material"], optional_tags: ["style"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ],
          },
          {
            id: "a9b8c7d6-e5f4-4d3c-9b8a-7c6f5d4e3a2b",
            name: "Wall Art & Mirrors",
            slug: "wall-art-mirrors", // 👈 Added slug for 'Wall Art & Mirrors'
            subcategoryItemChildren: [
              { id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f90a1", name: "Paintings", slug: "paintings", tags_required: ["ar_type", "indoor_outdoor", "material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f90a1b2", name: "Sculptures", slug: "sculptures", tags_required: ["ar_type", "indoor_outdoor", "material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f90a1b2c3", name: "Mirrors", slug: "mirrors", tags_required: ["ar_type", "indoor_outdoor", "material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } }
            ],
          },
          {
            id: "b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e",
            name: "Kitchen & Dining",
            slug: "kitchen-dining", // 👈 Added slug for 'Kitchen & Dining'
            subcategoryItemChildren: [
              { id: "8b9c0d1e-2f3a-4b5c-6d7e-8f90a1b2c3d4", name: "Cookware", slug: "cookware", tags_required: ["ar_type", "material"], tag_defaults: { "ar_type": "static" } },
              { id: "9c0d1e2f-3a4b-5c6d-7e8f-90a1b2c3d4e5", name: "Dinnerware", slug: "dinnerware", tags_required: ["ar_type", "material"], tag_defaults: { "ar_type": "static" } },
              { id: "0d1e2f3a-4b5c-6d7e-8f90-a1b2c3d4e5f6", name: "Appliances", slug: "appliances", tags_required: ["ar_type", "indoor_outdoor", "material"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "indoor" } },
              { id: "1e2f3a4b-5c6d-7e8f-90a1-b2c3d4e5f60d", name: "Storage Containers", slug: "storage-containers", tags_required: ["ar_type", "material"], tag_defaults: { "ar_type": "static" } }
            ],
          }
        ]
      },
    ],
  },

  //Health Backend
  {
    id: "e9bd737d-7c3e-4506-80a0-f47b06b03c4d",
    name: 'Beauty, Health & Pets',
    subcategories: [
      // Skincare
      {
        id: "c550b6c6-1945-4b98-816c-cd4db7f931f3",
        name: "Skincare",
        subcategoryItems: [
          { id: "d2552ae7-4f5c-4038-8f49-b6cb07a6169e", name: "Cleansers", slug: "cleansers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "7b8e30b0-cb38-42fc-9e42-4545e8cceac2", name: "Moisturizers", slug: "moisturizers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "ee3b5744-d734-4a5f-84e5-c785705cd2af", name: "Serums", slug: "serums", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "5b56302e-d2e6-4e50-8d16-0a8c85c1742c", name: "Masks", slug: "masks", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "b2f6e91d-4f11-4a87-b9c1-54e7d44c9b3a", name: "Toners", slug: "toners", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "c18d19a2-72c6-4d1a-8e2b-f8f4133458e6", name: "Eye Creams", slug: "eye-creams", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "a5c7f8e3-54b9-4d2c-8a1a-8f13456b9c7e", name: "Sunscreens (SPF)", slug: "sunscreens", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "d8c1e4c7-1d2a-4f5e-8b6c-6a7b8e9d4a3c", name: "Acne Treatments", slug: "acne-treatments", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "e1f9a2b5-3d4e-4f6c-8a7b-9c8d1e2f3a4b", name: "Anti-Aging Treatments", slug: "anti-aging-treatments", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }
        ]
      },

      // Skincare Tools
      {
        id: "f9d7c6b4-2a1e-4c8d-8b4e-7e9a8f3d1b2c",
        name: "Skincare Tools",
        subcategoryItems: [
          { id: "a7c2b5d4-9e1f-4b6c-8f9d-1e2c3b4a5d6e", name: "Rollers", slug: "rollers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
          { id: "b3f8c7a6-2d1e-4c5a-8b9d-4e1a2f3c5d6b", name: "Facial Brushes", slug: "facial-brushes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
          { id: "c4b9d8a7-e1f2-4c3d-8e5a-9b6a7c8d9e1f", name: "LED Devices", slug: "led-devices", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
        ]
      },

      // Makeup
      {
        id: "a447cd79-d503-4816-924d-34b9db78f108",
        name: "Makeup",
        subcategoryItems: [
          {
            id: "d1e7c5b9-4a2e-4f8d-8b3c-6a7b8e9d4a1c",
            name: "Face",
            subcategoryItemChildren: [
              { id: "f27d3773-d2d1-40b2-b567-18089442fcb7", name: "Foundations", slug: "foundations", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "bb8af3eb-94e4-4c8f-a9e6-0c08c64f28d6", name: "Concealers", slug: "concealers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "8bdbba63-29a3-4560-bfd2-019b82dd4a12", name: "Powders", slug: "powders", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "c0ff1f85-e819-4c09-94c1-40c15152eaf1", name: "Blushes & Highlighters", slug: "blushes-&-highlighters", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }
            ]
          },
          {
            id: "b9c8a7d6-e1f2-4c3d-8e5a-9b6a7c8d9e2f",
            name: "Eyes",
            subcategoryItemChildren: [
              { id: "2746a2ed-cac7-4c34-a33b-fc8d79bc6d6e", name: "Eyeshadows", slug: "eyeshadows", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "24cc744f-bf3f-4db4-a60b-41d6635df914", name: "Mascaras", slug: "mascaras", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "7d700de6-0124-4a69-8e5c-cd77e7b9b124", name: "Eyeliners & Brow Products", slug: "eyeliners-&-brow-products", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }
            ]
          },
          {
            id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d",
            name: "Lips",
            subcategoryItemChildren: [
              { id: "52c10ad4-209c-482e-9aeb-376e4aa54f11", name: "Lipsticks", slug: "lipsticks", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "a4c2f8e6-b9d1-4e7c-8a3f-1d9e2b5c6a7e", name: "Lip Glosses", slug: "lip-glosses", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "e6f9d3b8-2a1c-4b4d-9e7f-1c3a8b4d6e9f", name: "Lip Liners", slug: "lip-liners", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }
            ]
          },
          {
            id: "7728f440-4e04-42ef-b9b4-d0c051337748",
            name: "Makeup Tools & Removers",
            subcategoryItemChildren: [
              { id: "d7f8a9c1-4b2e-4d5a-8e9f-1c2a3b4d5e6f", name: "Brushes & Sponges", slug: "brushes-&-sponges", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "b1c3d5e7-2a4b-4f6c-8a9d-1e3f5a7b9c1d", name: "Makeup Removers", slug: "makeup-removers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
            ]
          }
        ]
      },

      // Personal Care
      {
        id: "e5f9a2b1-3d7e-4c5d-8b9a-1f2e3d4c5a6b",
        name: "Personal Care",
        subcategoryItems: [
          {
            id: "aae5ac37-58c4-4502-9c8c-d9db6fdbe8aa",
            name: "Haircare",
            subcategoryItemChildren: [
              { id: "b2d67251-1e8c-4390-bfc3-6a105cdab3cb", name: "Shampoos & Conditioners", slug: "shampoos-&-conditioners", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "594a09da-b73e-44d7-9aa2-7d0950bff67a", name: "Hair Treatments & Masks", slug: "hair-treatments-&-masks", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "155f940b-5f02-470c-b6aa-130bd76961b6", name: "Styling Tools", slug: "styling-tools", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
            ]
          },
          {
            id: "f8d7c6b5-1a2e-4c3d-8e4a-9b6a7c8d9e2f",
            name: "Bath & Body",
            subcategoryItemChildren: [
              { id: "a2b3c4d5-e6f7-4a8b-9c1d-2e3f4a5b6c7d", name: "Body Washes", slug: "body-washes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "c8d9e1f2-3a4b-4c5d-6e7a-8b9c1d2e3f4a", name: "Body Lotions & Scrubs", slug: "body-lotions-&-scrubs", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
            ]
          },
          {
            id: "d9e8f7c6-5a4b-4c3d-2e1f-1a2b3c4d5e6f",
            name: "Shaving & Hair Removal",
            subcategoryItemChildren: [
              { id: "f2c1d3e4-5a6b-4c7d-8e9f-1a2b3c4d5e6f", name: "Razors & Shaving Creams", slug: "razors-&-shaving-creams", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Hair Removal Devices", slug: "hair-removal-devices", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
            ]
          },
          {
            id: "7748f268-e744-42cd-bb8c-999ef10378ea",
            name: "Fragrances & Scents",
            subcategoryItemChildren: [
              { id: "e283e781-3a34-4b5d-91b1-09a9fa4ec2e1", name: "Perfumes", slug: "perfumes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "9612aa1c-8837-42b5-a856-1dcf2c0a9b7a", name: "Body Sprays", slug: "body-sprays", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "e9f7a2b1-3d5e-4c6b-8a7f-9d1c2a3b4e5f", name: "Deodorant", slug: "deodorant", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
            ]
          },
          {
            id: "b1c2d3e4-5a6b-4c7d-8e9f-1a2b3c4d5e7f",
            name: "Oral Care & Hygiene",
            subcategoryItemChildren: [
              { id: "9be4e746-6a3b-46d0-b142-6a8c33a536da", name: "Toothbrushes & Pastes", slug: "toothbrushes-&-pastes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } },
              { id: "e8f7c6d5-a4b3-4c2e-8d9b-1a2b3c4d5e6f", name: "Hygiene Essentials", slug: "hygiene-essentials", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }
            ]
          }
        ]
      },

      // Health & Wellness
      {
        id: "8536a833-b2f6-4ae0-a51b-530dcde99077",
        name: "Health & Wellness",
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "81d3021a-13c4-48b0-bb20-658cd9f35a74", name: "Vitamins & Supplements", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
          { id: "1bd839f0-d108-4f3a-a55c-235d5b49b0c1", name: "Medical Equipment", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
          { id: "fc1bfa55-16d2-4f16-b9e2-3487c42b2d5f", name: "Fitness Equipment", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
          { id: "2aa6b6b4-83b0-4cb7-9b99-13e40b640ef8", name: "Health Monitors", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }
        ]
      },

      // Pet Supplies
      {
        id: "a9e6754b-d72b-4d4f-b6e8-2c3f71c4a03e",
        gender: ['Male', 'Female', 'Kids'],
        name: "Pet Supplies",
        subcategoryItems: [
          {
            id: "708785c4-b7d7-4b27-92b1-3e1a3dc78b90",
            name: "Dogs",
            subcategoryItemChildren: [
              { id: "9be4e746-6a3b-46d0-b142-6a8c33a536da", name: "Food & Treats", slug: "dog-food-treats", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
              { id: "b8c7a6d5-e4f3-4c2d-9e1b-3a4d5e6f7a8b", name: "Leashes", slug: "dog-leashes", tags_required: ["ar_type","material","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } },
              { id: "c1a2b3d4-e5f6-4c7d-8e9f-1a2b3c4d5e7a", name: "Beds & Furniture", slug: "dog-beds-furniture", tags_required: ["ar_type","material","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }
            ]
          },
          {
            id: "0038c0a2-9c9d-482e-9b04-3e945f8c495e",
            name: "Cats",
            subcategoryItemChildren: [
              { id: "5d112e59-126c-4e17-8f8d-0b8819b065f2", name: "Food & Treats", slug: "cat-food-treats", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
              { id: "d9e8f7c6-a5b4-4c3e-8d2f-1a3b5c7d9e1f", name: "Toys", slug: "cat-toys", tags_required: ["ar_type","safety_certified"], tag_defaults: { ar_type: "static" } },
              { id: "e6d5c4b3-a2f1-4e8c-9d7b-1a2c3b4d5e6f", name: "Furniture", slug: "cat-furniture", tags_required: ["ar_type","material","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } },
              { id: "f7a6b5c4-d3e2-4f1d-9c8a-1b2c3d4e5f6a", name: "Litter", slug: "cat-litter", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }
            ]
          },
          { id: "7814a377-9a24-455e-b5d6-26d134b62f04", name: "Fish & Aquatic Pets", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
          { id: "1f14f741-5768-4a77-906e-53fa8b87b8a3", name: "Small Animals", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } },
          { id: "baf0a457-472f-47e4-b87c-65fa40464f78", name: "Birds", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }
        ]
      }
    ],
  },

  //Kids & Toys
  {
    id: "6e264d8a-669b-43d1-933e-e6a3504f2f4c",
    name: "Kids & Toys",
    subcategories: [
    {
      id: "43b350f9-a86d-4729-b69c-29d91f868213",
      name: "Kids Clothing",
      subcategoryItems: [
        { id: "10c4d2e7-a859-4d3f-a316-c70e7a2b9d8c", name: "Girls", slug: "girls", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "kids", gender: "women" } },
        { id: "4e9d5c8a-7b3c-4e1f-8b2d-9a0e6c1b5d4f", name: "Boys", slug: "boys", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "kids", gender: "men" } }
      ]
    },
    {
      id: "9f3f4e8b-4a5c-4d2d-8b3a-1e2f3a4b5c6d",
      name: "Toys",
      subcategoryItems: [
        { id: "a5c7f8e3-54b9-4d2c-8a1a-8f13456b9c7a", name: "Educational", slug: "educational", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } },
        { id: "d8c1e4c7-1d2a-4f5e-8b6c-6a7b8e9d4a3b", name: "Learning", slug: "learning", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } },
        { id: "e1f9a2b5-3d4e-4f6c-8a7b-9c8d1e2f3a4c", name: "STEM", slug: "stem", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } },
        { id: "f9d7c6b4-2a1e-4c8d-8b4e-7e9a8f3d1b2d", name: "Action Figures", slug: "action-figures", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } },
        { id: "a7c2b5d4-9e1f-4b6c-8f9d-1e2c3b4a5d6e", name: "Dolls & Accessories", slug: "dolls-&-accessories", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } },
        { id: "b3f8c7a6-2d1e-4c5a-8b9d-4e1a2f3c5d6b", name: "Outdoor", slug: "outdoor", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } },
        { id: "c4b9d8a7-e1f2-4c3d-8e5a-9b6a7c8d9e1f", name: "Playhouses", slug: "playhouses", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } },
        { id: "d1e7c5b9-4a2e-4f8d-8b3c-6a7b8e9d4a1c", name: "Slides", slug: "slides", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } },
        { id: "f27d3773-d2d1-40b2-b567-18089442fcb7", name: "Swings", slug: "swings", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }
      ]
    }
  ]
  },

  //Recipes Backend
  {
    name: "Recipes",
    id: "e4f7d2a1-c8b5-4a3e-8c6f-9d2a1c7b5e4d",
    subcategories: [
      {
        name: "Trending Weeknight Dinners",
        id: "b7c2a1e4-d9f8-4e3a-b1c2-5d4e7f6a8b9c",
        subcategoryItems: [
          { name: "Chicken Alfredo", id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5d", slug: "chicken-alfredo", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Chicken Tacos", id: "c1a2b3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", slug: "chicken-tacos", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Fried Rice (Chicken/Vegetable)", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1c", slug: "fried-rice", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Baked Salmon", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5a", slug: "baked-salmon", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Stir-Fry Noodles (Lo Mein/Chow Mein)", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f4", slug: "stir-fry-noodles", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Shrimp Scampi", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p5", slug: "shrimp-scampi", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        name: "Comfort Classics",
        id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1a",
        subcategoryItems: [
          { name: "Lasagna", id: "c1b2a3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p6", slug: "lasagna", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Spaghetti Bolognese", id: "a0b9c8d7-e6f5-4a2b-9c8d-7e6f5a4b3c2d", slug: "spaghetti-bolognese", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Beef Chili", id: "d4c3b2a1-e9f8-4e7a-b6c5-2d1e4f3a5b6c", slug: "beef-chili", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Mac & Cheese", id: "e2d1c4b3-a6f5-4e8d-9c2b-1a0e5f4d3c2b", slug: "mac-and-cheese", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Beef Stew", id: "b3c2a1d4-e5f6-4a7b-8c9d-1e2f3a4b5c6e", slug: "beef-stew", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Chicken Parmesan", id: "f8e7d6c5-b4a3-4b2c-9d1e-8a7b6c5d4e3f", slug: "chicken-parmesan", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        name: "Breakfast & Brunch",
        id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3d",
        subcategoryItems: [
          { name: "Pancakes", id: "b9c8a7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5a", slug: "pancakes", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "French Toast", id: "a0b1c2d3-e4f5-4g6h-i7j8-k9l0m1n2o3p4", slug: "french-toast", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Omelette", id: "c1b2a3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p7", slug: "omelette", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Breakfast Burritos", id: "d2e1f4a3-b6c5-4d8e-9f0a-1b2c3d4e5f6g", slug: "breakfast-burritos", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Avocado Toast with Eggs", id: "a3b2c1d4-e5f6-4g7h-i8j9-k0l1m2n3o4p8", slug: "avocado-toast-eggs", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        name: "Baking & Desserts",
        id: "d93c76ae-654c-499d-aed8-3b72c69fd50b",
        subcategoryItems: [
          { name: "Chocolate Chip Cookies", id: "e5f4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1b", slug: "chocolate-chip-cookies", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Brownies", id: "a7b6c5d4-e3f2-4a1b-9c0d-8e7f6a5b4c3d", slug: "brownies", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Banana Bread", id: "f1e2d3c4-b5a6-4c7b-8d9e-0f1a2b3c4d5e", slug: "banana-bread", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Cheesecake", id: "b2c1a3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p9", slug: "cheesecake", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Cupcakes", id: "a8b7c6d5-e4f3-4a2b-9c1d-8e7f6a5b4c3e", slug: "cupcakes", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        name: "Global Favorites",
        id: "c3256b0f-3e45-498e-a834-df8b6b1d6759",
        subcategoryItems: [
          {
            name: "Italian",
            id: "a5b4c3d2-e1f0-4a9b-8c7d-6e5f4d3c2b1a",
            "subcategoryItemChildren": [
              { name: "Carbonara", id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6f", slug: "carbonara", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Margherita Pizza", id: "d3c2b1a4-e5f6-4g7h-i8j9-k0l1m2n3o4p0", slug: "margherita-pizza", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Mexican",
            id: "e9f8d7c6-b5a4-4c3d-9e2b-1a0e9f8d7c6b",
            "subcategoryItemChildren": [
              { name: "Tacos al Pastor", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1d", slug: "tacos-al-pastor", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Chicken Enchiladas", id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3e", slug: "chicken-enchiladas", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Indian",
            id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p1",
            "subcategoryItemChildren": [
              { name: "Butter Chicken", id: "e4f3d2c1-b0a9-8c7d-6e5f-4d3c2b1a0d9c", slug: "butter-chicken", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Chana Masala", id: "f1d2c3e4-a5b6-4c7d-8e9f-0a1b2c3d4e5f", slug: "chana-masala", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Chinese",
            id: "f6e5d4c3-b2a1-4e7a-b6c5-2d1e4f3a5b6d",
            "subcategoryItemChildren": [
              { name: "Kung Pao Chicken", id: "b3c2a1d4-e5f6-4a7b-8c9d-1e2f3a4b5c6f", slug: "kung-pao-chicken", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Mapo Tofu", id: "e1f2d3c4-b5a6-4c7b-8d9e-0f1a2b3c4d5f", slug: "mapo-tofu", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Japanese",
            id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5f",
            "subcategoryItemChildren": [
              { name: "Chicken Teriyaki", id: "d1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5g", slug: "chicken-teriyaki", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Katsu Curry", id: "a2b3c4d5-e6f7-4a8b-9c1d-2e3f4a5b6c7e", slug: "katsu-curry", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Thai",
            id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6g",
            "subcategoryItemChildren": [
              { name: "Pad Thai", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f5", slug: "pad-thai", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Green Curry", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p2", slug: "green-curry", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Mediterranean",
            id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1e",
            "subcategoryItemChildren": [
              { name: "Greek Salad + Chicken", id: "c1a2b3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6h", slug: "greek-chicken-salad", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Shakshuka", id: "e2d1c4b3-a6f5-4e8d-9c2b-1a0e5f4d3c2c", slug: "shakshuka", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          }
        ]
      },
      {
        name: "Appliance-Guided",
        id: "4b5b8328-909c-4e7f-aafe-d4d7e5b0e457",
        subcategoryItems: [
          {
            name: "Air Fryer",
            id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p3",
            "subcategoryItemChildren": [
              { name: "Air Fryer Chicken Wings", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5b", slug: "air-fryer-chicken-wings", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Air Fryer Salmon", id: "a3b2c1d4-e5f6-4g7h-i8j9-k0l1m2n3o4p9", slug: "air-fryer-salmon", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Instant Pot / Pressure Cooker",
            id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f6",
            "subcategoryItemChildren": [
              { name: "Instant Pot Beef Chili", id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6j", slug: "instant-pot-beef-chili", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Instant Pot Butter Chicken", id: "c1a2b3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6k", slug: "instant-pot-butter-chicken", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Oven & Sheet Pan",
            id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1f",
            "subcategoryItemChildren": [
              { name: "Sheet-Pan Chicken & Veggies", id: "e9f8d7c6-b5a4-4c3d-9e2b-1a0e9f8d7c6c", slug: "sheet-pan-chicken-veggies", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Roasted Salmon & Potatoes", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p4", slug: "roasted-salmon-potatoes", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          },
          {
            name: "Stovetop & Wok",
            id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3f",
            "subcategoryItemChildren": [
              { name: "Beef Stir-Fry", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5c", slug: "beef-stir-fry", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
              { name: "Fried Rice", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f7", slug: "fried-rice-stovetop", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
            ]
          }
        ]
      },
      {
        name: "Meal Prep & Bowls",
        id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5g",
        subcategoryItems: [
          { name: "Chicken Burrito Bowls", id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6l", slug: "chicken-burrito-bowls", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Teriyaki Chicken Bowls", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1g", slug: "teriyaki-chicken-bowls", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Mediterranean Grain Bowls", id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3g", slug: "mediterranean-grain-bowls", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { name: "Korean Beef Bowls", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p5", slug: "korean-beef-bowls", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      }
    ]
  },

  //Sports Backend
  {
    name: "Sports, Fitness & Outdoors",
    id: "426ad39f-5df5-4a69-b1a8-c63fbe61ec10",
    subcategories : [
      {
        name: "Fitness Equipment",
        id: "328c6f42-9a13-4c6a-95b1-e7d18f732aa8",
        subcategoryItems: [
          { id: "dfc54366-e8d5-4c98-bc48-65e4d524c456", name: "Cardio Machines", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "09c9803e-bf5c-4c68-bcf0-fb74830238f3", name: "Treadmills", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "9f8760f6-90e4-448b-a3d4-dba6433eddf2", name: "Exercise Bikes", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "48b96fa5-0ef9-4115-a7aa-4e458e28eeb2", name: "Strength Training", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "eb85d9da-e2e1-4e3e-bf35-d0218e68f8f4", name: "Dumbbells", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "a27ac7ef-d6c6-462c-a553-f11d7d18d285", name: "Weight Benches", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "f2b28152-680b-471d-92f5-e3e51d790632", name: "Fitness Accessories", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "69a8a342-f67f-41df-aad2-038fa3268a98", name: "Yoga Mats", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "03c45395-476c-4d5d-8e7d-25d66f5f6dd6", name: "Resistance Bands", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        name: "Outdoor Recreation",
        id: "cfd4a5c7-3d89-4328-940d-344a2674a70f",
        subcategoryItems: [
          { id: "2c03da59-6649-42da-bb22-5277f5bff87c", name: "Camping", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "c6d9fb12-f344-47d8-8dbb-2eaa690b3ebc", name: "Tents", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "0b9b8569-f47c-401f-a0e7-b9b50e3b258f", name: "Sleeping Bags", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "f5e91dc4-cc55-4069-99a2-9a2716a58990", name: "Hiking", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "7baffd16-8465-4f1b-90d1-612b4b32c1a7", name: "Poles", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "ac4ed5ee-38c1-4761-bb48-ef8c528e7860", name: "Gear", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "3c911690-b0b6-4ee3-a41b-b6a8f8fdf4a0", name: "Water Sports", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "d41900d8-e426-4e48-aadb-93ea2683fc06", name: "Kayaks", tags_required: ["ar_type", "indoor_outdoor"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor" } },
          { id: "3e0f2416-6b72-4871-8a41-97e16fce3142", name: "Life Jackets", tags_required: ["ar_type", "indoor_outdoor", "safety_certified"], tag_defaults: { "ar_type": "static", "indoor_outdoor": "outdoor", "safety_certified": true } }
        ]
      },
      {
        name: "Team Sports",
        id: "c0e70967-d22b-4525-8b27-3bdef606e289",
        gender: ["Male", "Female", "Kids"],
        subcategoryItems: [
          { id: "b3241e97-2e9c-45b2-97a4-c2602256604a", name: "Soccer", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "7b946045-4001-4cd6-8c4d-13e86da47426", name: "Balls", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "e6ef6e1f-73c2-4639-bd4f-2b05a30b1c5a", name: "Apparel", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], tag_defaults: { "ar_type": "body-tracking" } },
          { id: "88eeb0f8-b473-4e66-aed5-4a022b2c37c4", name: "Basketball", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "6273cc4b-bc2e-4c55-88d8-5af4185291c2", name: "Shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], tag_defaults: { "ar_type": "feet-tracking" } },
          { id: "e045c3ab-73e2-4d4f-b32e-1e8f1f67d77b", name: "Tennis", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "c25cba42-78ea-4f5e-83af-2827bc320c16", name: "Rackets", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      }
    ]
  },

  //Automotive Backend
  {
    name: "Automotive",
    id: "f4b6c0c5-85e7-4c43-98c3-816b8b17e8cf",
    subcategories: [
      {
        name: "Vehicle Parts & Accessories",
        id: "b83443dc-20da-4fd9-a09f-d7b3443e7ad2",
        subcategoryItems: [
          { id: "a76e501c-2de0-4ff2-97b1-530c9db48676", name: "Car Electronics", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "9d9285b4-cf78-4243-a6ec-056164ee4b77", name: "GPS", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "c7f42050-211f-4d80-a5a5-6c279d88dc4e", name: "Stereos", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "df490b59-6f1d-4d95-8224-21a8e1352e34", name: "Tools & Equipment", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "b47ff7c5-580d-4a04-92c1-7f1f04089ef3", name: "Wrenches", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "146c681f-8159-4601-b1d6-d4b18ec9dce3", name: "Jacks", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "1ef03cb0-67b1-4dc5-8a64-fc8dfc83b7d6", name: "Replacement Parts", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "8502e056-80f5-4aa8-9146-53a3b12d5e6c", name: "Brakes", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "6b6bc201-bc94-47b1-a65a-56494c03371a", name: "Batteries", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "a02f2b1b-768c-49f5-b207-1bb5bfa16214", name: "Interior Accessories", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "03e9dd4f-853c-4a57-a9c2-d6f6d84e59e2", name: "Floor Mats", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "76b66f65-b3f2-485f-a934-f9f5f6cbe540", name: "Exterior Accessories", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "cdbd08f2-6d77-4807-8859-9b5ea7e23e0b", name: "Car Covers", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "20a7db2c-b4c7-4bd1-8bc6-6f8c3dc6e6de", name: "Bike Racks", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        id: "20a7db2c-b4c7-4bd1-8bc6-6f8c3dc6e6de",
        name: "Auto Customization",
        subcategoryItems: [
          { id: "03d8d7b3-c1f9-4610-8b1b-410a5160a0a5", name: "Wheels & Rims", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "9b52412e-bc92-4860-9d79-d6e7a3d32b70", name: "Seat Covers", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "6d9e03d4-b78f-4f2a-b7e1-886d34e9e436", name: "Wraps & Decals", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      }
    ]
  },

  //Special Needs Backend
  {
    name: "Special Needs & Accessibility",
    id: "c9b589fa-96c6-46c7-a98b-ea2068a5e937",
    subcategories: [
      {
        id: "2b10ab5d-c140-45d6-9de6-b43234b14a2a",
        name: "Mobility Aids",
        subcategoryItems: [
          { id: "b4aa65df-dc8b-4d66-931d-e9c728ec73ff", name: "Wheelchairs", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "8ae9935f-14b1-46ab-a3f7-d719c4ed3db2", name: "Walkers", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "5b4f5d7c-2673-45e2-b302-68b43e8e44de", name: "Canes", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "a765eb54-410c-4b3d-b3b4-2b4ae0fb2c64", name: "Mobility Scooters", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } }
        ]
      },
      {
        name: "Daily Living Aids",
        id: "a79a48d6-8ed9-4b35-9f8d-3b825b8724d5",
        subcategoryItems: [
          { id: "8b23b799-fb9c-4e6e-97ff-0e843d209659", name: "Dressing Aids", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "db312734-e146-4d03-9705-ea501c1333a2", name: "Eating Aids", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "6cfaaf73-9b2b-4bd4-a4c8-81e6fba32f13", name: "Bathing Aids", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "7b35bcf0-13e2-4943-b8f2-e19e2a5e6f68", name: "Communication Aids", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } }
        ]
      },
      {
        name: "Accessibility Equipment",
        id: "d0c9b924-9293-45b3-905c-7fa5241dc132",
        subcategoryItems: [
          { id: "fab927ab-c569-4d5f-b637-d4c6ed154a54", name: "Ramps", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "81a6c2cc-45de-4e1c-b676-90b1b1e09c06", name: "Lifts", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } },
          { id: "517fd112-58c7-4111-9cbf-fdf5c4c2bb0e", name: "Accessible Furniture", tags_required: ["ar_type", "accessible"], tag_defaults: { "ar_type": "static", "accessible": true } }
        ]
      },
      {
        id: "e4a2503d-2f08-4e6f-b25c-0c1a8a2d1d0f",
        name: "Eyecare & Vision Aids",
        subcategoryItems: [
          { id: "c1f7a1b3-4f9e-4c7a-9a0d-8e5f2a1b3c4d", name: "Reading Glasses", tags_required: ["ar_type"], tag_defaults: { "ar_type": "face-tracking" } },
          { id: "f5d9c2e0-8b1a-4d6c-8e3b-9c8f7a6d5b4e", name: "Contact Lens Care", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "b0a6e3d2-7c9b-4e8a-9f5a-2c4d6b8e0f1a", name: "Eye Drops & Treatments", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "a8c5f4e1-3d7b-4a9c-9f2e-0c1b3d5e7f9a", name: "Blue Light Filters", tags_required: ["ar_type"], tag_defaults: { "ar_type": "face-tracking" } },
          { id: "d7b4a6c9-8e5f-4d3a-8b1c-2f9e0a8d7c6b", name: "Magnifiers & Low Vision Aids", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "f9e0b1c3-6a8d-4b7e-9f0a-3c5d7e9f1a2b", name: "Eye Patches & Shields", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      }
    ]
  },

  //Maternity Backend
  {
    name: "Maternity & Prenatal Care",
    id: "b12911d2-5286-49a6-8431-6c3e1c8b3b9b",
    gender: [
      "Female"
    ],
    subcategories: [
      {
        name: "Maternity Clothing",
        id: "bf5d468a-cfb0-47c1-b1d6-2fce6bb5c241",
        subcategoryItems: [
          { id: "e8d8e6c6-c2bb-4053-b5b2-e9075b5946f7", name: "Dresses", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], tag_defaults: { "ar_type": "body-tracking", "age_group": "adult", gender: "women" } },
          { id: "688b69a1-612c-4bd1-8451-0d735e64b7d4", name: "Tops", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], tag_defaults: { "ar_type": "body-tracking", "age_group": "adult", gender: "women" } },
          { id: "6acb8fb6-6820-4235-9cc6-f66f7b527a7f", name: "Bottoms", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], tag_defaults: { "ar_type": "body-tracking", "age_group": "adult", gender: "women" } }
        ]
      },
      {
        name: "Prenatal Care",
        id: "ef89b1d6-e556-408f-b4f1-d60b0ae39380",
        subcategoryItems: [
          { id: "4bf4b308-0b37-4ee1-9255-8c413dc634b6", name: "Vitamins", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "91bd093d-115f-4d95-82f0-3c3c2d5e6e80", name: "Support Bands", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } },
          { id: "9bc8e2dc-6819-4d70-a8f8-5c82ed830d96", name: "Pregnancy Pillows", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      },
      {
        name: "Baby Essentials",
        id: "de012745-2743-4b4b-a469-f7b5f7a5e8c4",
        subcategoryItems: [
          { id: "d93c76ae-654c-499d-aed8-3b72c69fd50b", name: "Clothing", tags_required: ["ar_type", "age_group", "gender", "material"], tag_defaults: { "ar_type": "body-tracking", "age_group": "baby" } },
          { id: "4b5b8328-909c-4e7f-aafe-d4d7e5b0e457", name: "Diapers", tags_required: ["ar_type", "age_group", "gender", "safety_certified"], tag_defaults: { "ar_type": "static", "age_group": "baby" } },
          { id: "c3256b0f-3e45-498e-a834-df8b6b1d6759", name: "Feeding", tags_required: ["ar_type", "age_group", "gender"], tag_defaults: { "ar_type": "static", "age_group": "baby" } },
          { id: "2edb6a23-6e6d-44a7-94cf-f66ec5d857b7", name: "Nursery", tags_required: ["ar_type", "material", "accessible"], tag_defaults: { "ar_type": "static" } }
        ]
      }
    ]
  },

  //Senior care Backend
  {
    id: "785fbee8-74f6-469f-a59b-9039969c4e13",
    name: "Senior Care",
    subcategories: [
      {
        id: "412ec064-8b2e-4521-8c56-f3a742854324",
        name: "Health & Wellness",
        gender: [
          "Male",
          "Female"
        ],
        subcategoryItems: [
          { id: "c3747f8f-50c7-4168-b3c2-cc8a328e40b2", name: "Supplements", tags_required: ["ar_type", "age_group"], tag_defaults: { "ar_type": "static", "age_group": "senior" } },
          { id: "73a41941-891e-403e-b53f-ded234949ba8", name: "Monitors", tags_required: ["ar_type", "age_group"], tag_defaults: { "ar_type": "static", "age_group": "senior" } },
          { id: "a6d22dfb-40de-4ca5-88bb-36caeaff3b9d", name: "Mobility Aids", tags_required: ["ar_type", "age_group", "accessible", "safety_certified"], tag_defaults: { "ar_type": "static", "age_group": "senior", "accessible": true, "safety_certified": true } },
          { id: "02ea08b4-7ab7-465d-9a05-a8b11b1433dd", name: "Vision & Hearing", tags_required: ["ar_type", "age_group"], tag_defaults: { "ar_type": "static", "age_group": "senior" } }
        ]
      },
      {
        id: "4e79cf49-84e3-49eb-8453-b9ad412b5d9d",
        name: "Comfort & Care",
        gender: [
          "Male",
          "Female"
        ],
        subcategoryItems: [
          { id: "3e2cf0cb-0db0-45be-98c7-585da5d5a48a", name: "Recliners", tags_required: ["ar_type", "age_group", "accessible"], tag_defaults: { "ar_type": "static", "age_group": "senior", "accessible": true } },
          { id: "6a79b8f5-3e37-454e-8fc4-de8efb407254", name: "Cushions", tags_required: ["ar_type", "age_group"], tag_defaults: { "ar_type": "static", "age_group": "senior" } },
          { id: "2b706c34-7cbe-419c-afc0-42bc9cedbd5a", name: "Adjustable Beds", tags_required: ["ar_type", "age_group", "accessible"], tag_defaults: { "ar_type": "static", "age_group": "senior", "accessible": true } },
          { id: "d0c2f399-9228-40af-9914-faacd023ab07", name: "Daily Living Aids", tags_required: ["ar_type", "age_group", "accessible"], tag_defaults: { "ar_type": "static", "age_group": "senior", "accessible": true } }
        ]
      },
      {
        id: "1eb7dd80-805d-4b50-a305-f6a9633e6e26",
        name: "Recreation & Leisure",
        subcategoryItems: [
          { id: "9db34332-ea0b-492b-aa38-931e5ea3e410", name: "Puzzles", tags_required: ["ar_type", "age_group"], tag_defaults: { "ar_type": "static", "age_group": "senior" } },
          { id: "26e80424-db5d-49d1-a83e-4ed850fa5941", name: "Books", tags_required: ["ar_type"], tag_defaults: { "ar_type": "static" } }
        ]
      }
    ]
  }
];