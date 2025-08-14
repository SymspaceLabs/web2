export const categoriesSeedData = [
  //Clothing Backend
  {
    id: "b1f7b77d-1ff7-4d66-ae63-31811cd067e0",
    name: 'Clothing, Shoes & Accessories',
    subcategories: [
      {
        id: "a1d35d1e-4475-4c24-98bc-c678bb3d319e",
        name: 'Dresses',
        gender: ['Female', 'Kids'],
        subcategoryItems: [
          { id: "cfed1f8d-4b9b-4553-92c5-dc2be01c38b7", name: 'Casual Dresses' },
          { id: "d47f23a4-1cf5-4a39-9b79-6cd25c7f462d", name: 'Formal Dresses' },
          { id: "c53f5378-e3b3-45b1-a129-e2c4067c8509", name: 'Summer Dresses' },
        ],
      },
      {
        id: "3f7ed738-cbf9-46a7-9f39-0c77502e17b2",
        name: 'Tops',
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "7cd4a02e-becb-4865-aabb-b87a18dce2c0", name: 'Blouses' },
          { id: "9d826402-b7be-4329-97fc-bd64934eb233", name: 'T-Shirts' },
          { id: "f357256e-983f-46c7-a2f2-3f0d5ae5b348", name: 'Tank tops' },
          { id: "1cb97a29-ec59-45c6-8a56-0a1e8f62e6d7", name: 'Sweaters' },
          { id: "9e02f7ed-ff9d-44f7-827b-89c61e80f309", name: 'Cardigans' },
          { id: "ada4f6d3-c1a2-4567-92b7-430226b3ca47", name: 'Casual Shirts' },
          { id: "1de0fd99-62b6-4386-8c92-8ca4db389599", name: 'Dress Shirts' },
          { id: "9c41b539-ec2c-4b49-91c2-6b8f18534c40", name: 'Polo Shirts' },
        ],
      },
      {
        id: "d7c1a1c3-cda0-4686-bf84-e70241e383b3",
        name: 'Bottoms',
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "e18d4a1b-bb01-4b19-87c2-f6be3e273d68", name: 'Jeans' },
          { id: "b888c11c-b62d-4be4-9756-4151a05692f9", name: 'Trousers' },
          { id: "e09b241e-4c16-4e74-b120-55e4b55e5e0a", name: 'Shorts' },
          { id: "8f6db2a2-5ac9-4fa7-9802-d742c5f1a230", name: 'Skirts' },
          {
            id: "d49a2804-0665-4b50-9d8e-1e7b423f26b2",
            name: "Pants",
            slug: "pants",
              tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"],
              optional_tags: ["color", "pattern"],
              tag_defaults: { ar_type: "body-tracking" },
              subcategoryItemChildren: [
                { id: "e8d641c8-c9f2-491a-96e0-0259b3c3c734", name: "Dress Pants", slug: "dress-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
                { id: "62b3d30b-d023-45a8-8e62-c1f03f3938b8", name: "Chinos", slug: "chinos", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
                { id: "a6f8749c-f233-4f9e-a61f-b3a537f1e7d0", name: "Joggers", slug: "joggers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
                { id: "4d1a9e3f-67c8-47b2-8a9d-b84e1c28f3a5", name: "Cargos", slug: "cargos", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              ],
            },
        ],
      },
      {
        id: "9c93e575-8e62-49de-a3d9-16b61c31be2d",
        name: 'Outerwear',
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "aba0a755-cf5d-4657-b017-8d014a539d43", name: 'Jackets' },
          { id: "e66fd981-7ec0-4d34-b7fa-b4b682f96e30", name: 'Coats' },
          { id: "5dbdf1d5-bbfc-402f-806d-e4d049500c7f", name: 'Blazers' },
          { id: "ef324850-c5c5-41d9-bc0f-f8b4b8f37a07", name: 'Vests' },
          { id: "fde3b457-48a3-4e7c-9c19-43e1f53b738a", name: "Hoodies" },
          { id: "4a3b8f17-c5d7-4be9-b64e-29b5341d7905", name: "Suits" }
        ],
      },
      {
        id: "69e7fd69-6ec4-4792-94f2-b39e4826c96f",
        name: 'Activewear',
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "750f3a2d-2b19-4de3-b7b7-4f6b3f22e4d2", name: 'Leggings' },
          { id: "b543b93c-7d88-4b8d-ae5f-507b0cb11b7a", name: 'Sport bras' },
          { id: "3c6814a9-b1c3-4a2f-8c74-9001daeea578", name: 'Track pants' },
          { id: "2df96d8f-b8f9-4711-8f89-f72f167e78da", name: 'Workout Tops' },
          { id: "d7424957-f23b-4c95-85c7-e318e91f9a56", name: 'Yoga pants' },
          { id: "36e0ab1f-f44d-4e3f-9785-1d2f8c3c4e9b", name: "Sports shorts" },
          { id: "f32175e8-3401-4c53-8bd6-5b8cb2b2744a", name: "Joggers" },
          { id: "a567e980-5f8d-47be-80e9-9a75e88d3f79", name: "Gym Shorts" },
          { id: "e3b9c2e5-502d-430c-8e73-4f5ea6e82b3c", name: "Sweatshirts" },
          { id: "3d2e0cba-78f1-41c7-ae4b-0b8129b4e4cd", name: "Compression Wear" }
        ],
      },
      {
        id: "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d", // Changed from original "86d2b4c8-b195-4de8-b47f-8e5d98c0f5ae"
        name: "Eyewear",
        subcategoryItems: [
          { id: "e09b241e-4c16-4e74-b120-55e4b55e5e0a", name: "Prescription Glasses", slug: "prescription-glasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "7f2e0a43-2d39-4ec9-808f-47f1eb7385f7", name: "Sunglasses", slug: "sunglasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "f329c04d-1ef5-4db3-a37c-583e4a7c9f7b", name: "Blue Light Glasses", slug: "blue-light-glasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
          { id: "2d1cfe2b-d69f-40b8-9061-0ec74c8f1b1b", name: "Kids' Eyewear", slug: "kids-eyewear", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking", age_group: "kids" } },
        ],
      },
      {
        id: "86d2b4c8-b195-4de8-b47f-8e5d98c0f5ae", // This was originally duplicate, but the other instance was changed.
        name: "Intimates",
        gender: ['Female'],
        subcategoryItems: [
          { id: "9f0a8d7c-3b2e-4f1a-8c9d-0e1f2a3b4c5d", name: "Lingerie" }, // Duplicate with Kids' Eyewear, replaced
          { id: "faed8236-48bb-4591-98f7-e86b3ec6b2c8", name: "Sleepwear" },
        ],
      },
      {
        id: "9fc437c1-640c-48d6-92d4-8e9b7b2c367b",
        name: "Shoes",
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "215cfe87-5dc3-4b9b-80b9-01a7e99f7dc8", name: "Sandals" },
          { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", name: "Flats" },
          { id: "3c7f41d2-4d88-42b6-8f5a-86b9f3d23eb9", name: "Heels" },
          { id: "7f2e0a43-2d39-4ec9-808f-47f1eb7385f7", name: "Boots" },
          { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", name: "Sneakers" },
          { id: "e2b4f987-3218-403a-9024-c8d7b23f18a4", name: "Athletic Shoes" },
          { id: "4d3b5c84-59f7-46b1-9a7f-3724d9b2f087", name: "Formal Shoes" },
          { id: "829dcb34-e7a9-4a5c-84f5-7381a2b3093f", name: "Casual Shoes" },
          { id: "94a75b62-f3d5-4c2b-a8b2-2935b08c2e4b", name: "Boots" },
        ],
      },
      {
        id: "02f35b89-9f7b-4e6c-88c4-e7f4d23872e1",
        name: "Accessories",
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          {
            id: "a7e1f5d6-c9b2-4d83-9a4f-5c8e2b1d7f3e",
            name: "Bags",
            subcategoryItemChildren: [
              { id: "52d6e93f-09cb-4861-82f9-7b14e9c5f2a7", name: "Handbags", slug: "handbags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } },
              { id: "b3f2e1c4-d5a6-4b78-9e01-2f3c4a5b6d7e", name: "Backpacks", slug: "backpacks", tags_required: ["ar_type", "gender", "material", "indoor_outdoor"], tag_defaults: { ar_type: "static" } }, // Duplicate, replaced
              { id: "e9d8c7b6-5a4f-3e21-0c9b-8a7d6e5c4b3a", name: "Crossbody Bags", slug: "crossbody-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, // Duplicate, replaced
              { id: "f4e3d2c1-a5b6-7c8d-9e01-2a3b4c5d6e7f", name: "Shoulder Bags", slug: "shoulder-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, // Duplicate, replaced
              { id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", name: "Tote Bags", slug: "tote-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, // Duplicate, replaced
              { id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c", name: "Clutches", slug: "clutches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, // Duplicate, replaced
            ],
          },
          {
            id: "d9e8c7b6-a5f4-3e21-0c9b-8a7d6e5c4b3a", // Changed from original "97c41e5f-d4e8-48b5-b9b2-09c374d8f1e6" to be unique
            name: "Jewelry & Watches",
            subcategoryItemChildren: [
              { id: "a43e7f92-5c87-49d3-9f72-3e5b947f81d2", name: "Earrings", slug: "earrings", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "f2e1d3c4-a5b6-7c8d-9e01-2f3a4b5c6d7e", name: "Necklaces", slug: "necklaces", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } }, // Duplicate, replaced
              { id: "3b2e1d4c-5a6f-7b8c-9d01-e2f3a4b5c6d7", name: "Rings", slug: "rings", tags_required: ["ar_type", "gender", "material", "safety_certified"], optional_tags: ["gemstone"], tag_defaults: { ar_type: "hand-tracking" } }, // Duplicate, replaced
              { id: "8b24c7f9-83d5-4a2f-985c-7e4f3812b390", name: "Bracelets", slug: "bracelets", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } }, // Duplicate, replaced
              { id: "1c2a3b4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d", name: "Plated Jewelry", slug: "plated-jewelry", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "hand-tracking" } }, // Duplicate, replaced
              { id: "4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b", name: "Men's Watches", slug: "mens-watches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "men" } }, // Duplicate, replaced
              { id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e", name: "Women's Watches", slug: "womens-watches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "women" } }, // Duplicate, replaced
              { id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a", name: "Smartwatches", slug: "smartwatches", tags_required: ["ar_type", "gender", "material"], tag_defaults: { ar_type: "hand-tracking" } }, // Duplicate, replaced
              { id: "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c", name: "Watch Bands & Accessories", slug: "watch-bands-accessories", tags_required: ["ar_type", "gender", "material"], tag_defaults: { ar_type: "hand-tracking" } }, // Duplicate, replaced
            ],
          },
          {
            id: "42f97c8a-b9f3-4e5b-832f-98134c7e5a8b",
            name: "Headwear",
            subcategoryItemChildren: [
              { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", name: "Hats", slug: "hats", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "215cfe87-5dc3-4b9b-80b9-01a7e99f7dc8", name: "Caps", slug: "caps", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "9fc437c1-640c-48d6-92d4-8e9b7b2c367b", name: "Beanies", slug: "beanies", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
            ],
          },
          {
            id: "2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b", // Changed from original "f329c04d-1ef5-4db3-a37c-583e4a7c9f7b" to be unique
            name: "Seasonal Accessories",
            subcategoryItemChildren: [
              { id: "e18d4a1b-bb01-4b19-87c2-f6be3e273d68", name: "Gloves", slug: "gloves", tags_required: ["ar_type", "gender", "season", "material", "safety_certified"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "hand-tracking" } },
              { id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f", name: "Scarves", slug: "scarves", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } }, // Duplicate, replaced
              { id: "d5a8c4b1-8b21-4d37-9d7a-1f8e9c2b3d64", name: "Socks", slug: "socks", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b", name: "Ties", slug: "ties", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } }, // Duplicate, replaced
            ],
          },
          {
            id: "4f8b2c07-3e98-4d87-9c5a-5e9d437e8f3a",
            name: "Wallets & Belts",
            subcategoryItemChildren: [
              { id: "1db0843f-bbf5-4a4b-9082-1a81dc7bf934", name: "Wallets", slug: "wallets", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "static" } },
              { id: "1cb97a29-ec59-45c6-8a56-0a1e8f62e6d7", name: "Belts", slug: "belts", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          }
        ],
      },
      {
        id: "1db0843f-bbf5-4a4b-9082-1a81dc7bf934",
        name: "Underwear & Socks",
        gender: ['Male'],
        subcategoryItems: [
          { id: "7fae12d0-9635-43fb-aaf4-362ed92c1234", name: "Boxers" },
          { id: "2d3202f1-5972-4a2e-bbdf-61af41769dc3", name: "Briefs" },
          { id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", name: "Bras" }, // Duplicate, replaced
          { id: "f5a7b94c-23d9-42e8-8375-b1a9f7e5d8c3", name: "Socks" },
          { id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e", name: "Sleepwear" } // Duplicate, replaced
        ],
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
          { id: "d312a97f-2b27-4bfe-bf8d-5c1fdd5b1b79", name: "Smartphones" },
          { id: "f23b7c69-dc3e-4f64-9ac4-8c48f6780ecb", name: "Cases & Covers" },
          { id: "56d49b33-5a6a-42d7-950d-505a9b0fdf62", name: "Screen Protectors" },
          { id: "780a69a9-98b8-44d5-a8f9-c44bf9dcbf78", name: "Chargers & Cables" },
          { id: "10c30a2f-5d3a-469c-bdf3-0e3e4b853a87", name: "Power Banks" }
        ]
      },
      {
        id: "302f2156-dfbc-497d-8f87-bfa13d76e94b",
        name: "Computers & Accessories",
        subcategoryItems: [
          { id: "8b88334c-9531-42d9-a5fd-d4303d3c31a7", name: "Laptops" },
          { id: "5157a66a-e90e-4e5b-bf88-e76cf598cfbb", name: "Desktops" },
          { id: "c8034c21-6254-4717-bc9e-e2d9bafc7032", name: "Monitors" },
          { id: "b5473b6b-4d3d-4987-b8a4-504bd650ff80", name: "Keyboards & Mice" },
          { id: "2d7a7d73-81d9-43b3-9b35-cb2b236c2ea6", name: "Printers & Scanners" }
        ]
      },
      {
        id: "0ed8f771-8d8d-4d48-9379-c1a5e70f989e",
        name: "Home Entertainment",
        subcategoryItems: [
          { id: "c87ba601-c1b7-4b52-a1c8-d8ec3b7b0a18", name: "Televisions" },
          { id: "77c5ab4b-beb5-4e43-b71f-0c83a02b16af", name: "Sound Systems" },
          { id: "5c3a74d9-1f9e-4bfb-833f-02a32c10874c", name: "Streaming Devices" },
          { id: "7b32f0d6-8e1b-4413-8b91-2552648b7dc5", name: "Blu-ray & DVD Players" }
        ]
      },
      {
        id: "0fa9db70-0a8e-4f99-a67e-d8a2a2335e90",
        name: "Cameras & Photography",
        subcategoryItems: [
          { id: "61ae3d0a-efb2-485e-8ff5-c0b79d53c75e", name: "Digital Cameras" },
          { id: "10fcf01f-3ae5-49ab-b2c6-c0217b3b5641", name: "Lenses" },
          { id: "84e9ed1b-d12d-4948-96b2-78728e34e5e8", name: "Tripods" },
          { id: "fc0dcf91-cd0d-4f34-b5fc-874e59ea9d6f", name: "Camera Accessories" }
        ]
      }
    ]
  },

  //Furniture Backend
  {
    id: "0ff2b00f-9b29-4e32-bbb1-d83d0a416b84",
    name: "Home, Furniture & Appliances",
    subcategories: [
      {
        id: "26ccfa5e-8ffb-4c68-b09f-9c730b577b5b",
        name: "Furniture",
        subcategoryItems: [
          {
            id: "fef93787-b22b-4e9e-bf85-32885d376f02",
            name: "Sofas",
            child: [
              {
                name: "Sectional Sofas",
                id: "02e69a1f-38e5-426d-beea-867380902c88"
              },
              {
                name: "Loveseats",
                id: "5402cd68-3d48-4adf-b5e5-1775d611e767"
              },
              {
                id: "e6c3f7e6-09b9-44fa-b8d3-dbeec64409de",
                name: "Recliners"
              },
              {
                name: "Chesterfields",
                id: "3570bf56-db8d-423e-8321-c6451b4119c8"
              },
              {
                name: "Sleeper Sofas",
                id: "824d7240-6841-4ad5-97c7-3a0eb00762e6"
              },
              {
                name: "Modular Sofas",
                id: "5ca0908f-5324-4e72-84c2-6556aa4fa658"
              }
            ]
          },
          {
            id: "d42af060-79c1-44a5-8971-d014425ca803",
            name: "Chairs & Seating",
            child: [
              {
                name: "Accent Chairs",
                id: "6b0007fe-a568-4ac8-a662-93c33bb94b3e"
              },
              {
                name: "Armchairs",
                id: "da7cfa84-9557-44f8-a1af-baaea7ff1014"
              },
              {
                name: "Club Chairs",
                id: "4cd717fc-85a7-4e2e-8461-41ba72569348"
              },
              {
                name: "Ottomans & Poufs",
                id: "7e60b534-62ca-40cc-a56d-af450e8a40c3"
              }
            ],
          },
          {
            id: "a2b93fa2-4e46-4335-b976-8dbf28e8e8a9",
            name: "Tables",
            child: [
              {
                id: "d62fd072-d47d-4fa1-b31d-b1cc5b28ad90",
                name: "Coffee Tables"
              },
              {
                name: "End Tables",
                id: "60920e79-6f97-45d3-abcb-dd88914e55f3"
              },
              {
                name: "Console Tables",
                id: "bf9d0e3a-ae29-4a0b-86bb-93d9cf1c730e"
              }
            ],
          },
          {
            name: "Media & Storage",
            child: [
              {
                id: "17c8d78c-b19f-4f3f-bd45-482d0b0c5d11",
                name: "TV Stands"
              },
              {
                id: "a0d92de3-59cd-4a07-8a56-f0f441045319",
                name: "Bookcases"
              },
              {
                name: "Storage Cabinets",
                id: "662737cf-8a24-4eb5-8e61-b2951908aa8d"
              }
            ],
            id: "378a54cd-5a59-449b-bf43-4e62f2c214e4"
          }
        ]
      },
      {
        id: "f45e9246-0ef5-4996-b2f9-71c27ad98371",
        name: "Bedroom",
        subcategoryItems: [
          {
            id: "2bdc4f4b-6f5c-45bb-8572-27a973b1c9e6",
            name: "Beds",
            child: [
              {
                name: "Platform Beds",
                id: "36a28079-9502-45b3-b0c2-0e9d2c0bcbd6"
              },
              {
                name: "Upholstered Beds",
                id: "21903dc8-ef6c-4a34-b221-47a8b4b4f637"
              },
              {
                name: "Canopy Beds",
                id: "cb4b2b28-0b1c-4163-b9c8-8ccdd67a0236"
              },
              {
                name: "Storage Beds",
                id: "0d6158b7-2beb-4b0d-8583-18acb3338a4a"
              },
              {
                name: "Adjustable Beds",
                id: "5a15a4bf-8ef9-4113-ae4f-b9ede7178d1d"
              }
            ]
          },
          {
            id: "4c63e2e1-f6f6-44bc-a496-21907337081d",
            name: "Dressers & Chests",
            child: [
              {
                name: "6-Drawer Dressers",
                id: "f78bd691-cd05-4195-b38a-71065c914ea7"
              },
              {
                name: "Chests of Drawers",
                id: "db256369-53f5-4c2b-b1ea-e4c506fe3305"
              }
            ]
          },
          {
            id: "5a8dbb56-5d36-41aa-a8d9-fc748dd97e38",
            name: "Nightstands & Side Tables",
            child: [
              {
                name: "Single Drawer Nightstands",
                id: "bceebfde-665b-4f5d-a4bc-55068dc10b1a"
              },
              {
                name: "Double Drawer Nightstands",
                id: "5e9e56a3-5842-4f74-bc24-0ce6b08de3f3"
              }
            ]
          },
          {
            id: "ec2c0f78-6d5a-4053-b46b-3e45c7b0df90",
            name: "Wardrobes & Armoires",
            child: [
              {
                name: "2-Door Wardrobes",
                id: "d2e1bd8b-c009-45e3-b3d8-ff61b9f25c3d"
              },
              {
                name: "Sliding Door Wardrobes",
                id: "95346994-dca3-4892-92b2-1a1c03c3112c"
              }
            ]
          }
        ]
      },
      {
        id: "47b4e7f5-4891-4147-818e-f255d650bdb7",
        name: "Office",
        subcategoryItems: [
          {
            id: "8abfbbd7-0fcb-43d6-9111-6a5a42c0702b",
            name: "Desks",
            child: [
              {
                name: "Writing Desks",
                id: "9215688d-a05f-444e-ab96-c8ff54a2b504"
              },
              {
                name: "Standing Desks",
                id: "5a384129-b8f1-448b-b8ca-ac1fd66f7610"
              },
              {
                name: "Executive Desks",
                id: "d1f7b773-de48-44fc-9380-f6f9c8d9c7fd"
              }
            ]
          },
          {
            id: "5c1e5db5-2745-4d1e-b18b-9ff81cd83367",
            name: "Office Chairs",
            child: [
              {
                name: "Ergonomic Chairs",
                id: "f57a60c3-ec74-4f05-85d5-490885885851"
              },
              {
                name: "Task Chairs",
                id: "983beb19-8289-4f4d-8282-0e6944bac291"
              },
              {
                name: "Executive Chairs",
                id: "5aad749a-08f4-42d7-a608-cd05e17a91d8"
              }
            ]
          },
          {
            name: "Storage",
            child: [
              {
                name: "Filing Cabinets",
                id: "51ca1adb-7cfc-4861-ad68-fdf5440662e8"
              },
              {
                name: "Bookcases & Shelving",
                id: "36e55d3e-6d5e-46d3-afa6-3942cf88181b"
              }
            ],
            id: "fce90567-8d9e-413e-9c17-021111256c66"
          }
        ]
      },
      {
        id: "497b2f65-1f53-4adf-8902-d82fa8d18ea4",
        name: "Outdoor",
        subcategoryItems: [
          {
            name: "Seating Sets",
            child: [
              {
                id: "3c71d8af-12bb-4dbf-b6c7-b7bb9f5cda90",
                name: "Patio Sets"
              },
              {
                name: "Sling Chairs",
                id: "c4752303-edf7-4a3a-914b-bf9968bca34d"
              },
              {
                name: "Chaise Lounges",
                id: "dae7d09f-cdae-4cf7-8d3b-b547fbf9550a"
              },
              {
                name: "Adirondack Chairs",
                id: "34a71bfe-4388-4c2e-8a50-b7969e706387"
              }
            ],
            id: "3de1373d-940e-47d2-b94d-ebfdd48fe3be"
          },
          {
            name: "Tables",
            child: [
              {
                name: "Dining Tables",
                id: "77867f34-14ce-4762-9dc5-ccafe10f52cb"
              },
              {
                name: "Bistro Tables",
                id: "26c85058-8bc5-405e-821a-00813401eced"
              }
            ],
            id: "af7df97b-3b0b-4b1c-820a-00621fa6b9fc"
          },
          {
            name: "Shade & Shelter",
            child: [
              {
                name: "Umbrellas",
                id: "3d19f1c9-d218-45e3-9858-0ee6bc8223bc"
              },
              {
                name: "Gazebos",
                id: "f6ae668e-f7ce-40a9-b732-a739be81533b"
              }
            ],
            id: "4cafadbf-4ca9-476b-9859-daae61abf11d"
          },
          {
            name: "Storage",
            child: [
              {
                name: "Deck Boxes",
                id: "bf4a6563-7d12-447e-ac1d-ca7439046cd6"
              },
              {
                id: "d3c746a6-7ed5-4d99-89c5-059fe09a56a1",
                name: "Garden Sheds"
              }
            ],
            id: "fa1d0870-c85a-4db9-b5b1-66beded42246"
          }
        ]
      },
      {
        id: "e34f58b1-f9ba-4050-90e7-285c1c2e4d71",
        name: "Home Decor",
        subcategoryItems: [
          {
            id: "9ad4a4b4-8967-481f-b9b1-10f3f3b3ec36",
            name: "Lighting",
            child: [
              {
                name: "Ceiling Fixtures",
                id: "e5e8e3b9-fcc6-4daa-8034-b123d9985687"
              },
              {
                name: "Wall Sconces",
                id: "bbfbe2f1-c786-466d-ad8c-7ab288bf5afd"
              },
              {
                name: "Table Lamps",
                id: "a0fed5ef-c040-42af-9c56-77947ff1c712"
              },
              {
                name: "Floor Lamps",
                id: "b35b00fb-c660-40c1-b3c9-05706cc9c8e8"
              }
            ]
          },
          {
            id: "602c854d-144d-4b58-9c19-f2eb528a107b",
            name: "Wall Art & Mirrors",
            child: [
              {
                name: "Paintings",
                id: "421bba80-b4e9-47c7-ab07-2af8a1f98f39"
              },
              {
                name: "Sculptures",
                id: "cdbe8719-8e61-4487-af70-b4a97ee277a9"
              },
              {
                id: "15bf4ea9-d5a4-41b3-8894-c738891d8d42",
                name: "Mirrors"
              }
            ]
          },
          {
            name: "Kitchen & Dining",
            child: [
              {
                name: "Cookware",
                id: "5d477bd4-4b2c-4fe3-88cf-f7c3b7a6293e"
              },
              {
                name: "Dinnerware",
                id: "991509eb-22ca-4a42-b763-5b823d41b690"
              },
              {
                name: "Appliances",
                id: "9d8fa0a2-04dc-4aff-8f6e-89af5ae35348"
              },
              {
                name: "Storage Containers",
                id: "8357688e-f6d6-4bb3-9789-41551ce6de94"
              }
            ],
            id: "bfc88ae0-b94f-45c5-acec-7e4e322348c2"
          }
        ]
      },
      {
        id: "59e873d9-87c3-4f4f-808f-4a3ebf6a743c",
        name: "Kitchen & Dining",
        subcategoryItems: [
          {
            id: "e2f84950-f9a2-4485-a22b-63c52f233c85",
            name: "Cookware"
          },
          {
            id: "d8c241c3-e732-4cf7-8e47-76529d17b5ae",
            name: "Pots & Pans"
          },
          {
            id: "96de0b5e-23ec-4d1c-a645-5f8329b99d30",
            name: "Bakeware"
          },
          {
            id: "4b36da5c-1e8b-4963-a61d-e8cf29924394",
            name: "Tableware"
          },
          {
            id: "c073f7b3-cb7d-4f3a-a894-9e33a7597c0a",
            name: "Dinner Sets"
          },
          {
            id: "2e8f3c86-7bf8-4a7c-9446-f1cfa5d34ad4",
            name: "Glassware"
          },
          {
            id: "758ad15f-0833-4b69-a62c-573b34dc78cb",
            name: "Cutlery"
          },
          {
            id: "2d4b0789-cf4c-4bf4-9c5b-1f8e26b2f02a",
            name: "Kitchen Storage"
          },
          {
            id: "b8302364-2420-4d8f-a63d-ecae34fd0df5",
            name: "Containers"
          },
          {
            id: "fc2b1e57-c3ba-4113-8dfb-e0f9f43d843d",
            name: "Racks & Holders"
          },
          {
            id: "4d4707b1-2bb5-477f-9a72-e151ce672bd3",
            name: "Small Appliances"
          },
          {
            id: "c32c4977-2d9d-44d1-9b3c-36e9852da4b6",
            name: "Toasters"
          },
          {
            id: "10e2c4fb-345e-4f3d-a50e-4fb153d83e20",
            name: "Blenders"
          },
          {
            id: "f8714f3e-7bf9-4f7b-b6a9-d99c83e37cbf",
            name: "Coffee Makers"
          }
        ]
      },
      {
        id: "fd3cbf8c-45c9-42a8-9c4f-ff89b9d6b690",
        name: "Large Appliances",
        subcategoryItems: [
          {
            id: "d39810fb-9ba7-4eb7-b21d-d6a4e1703705",
            name: "Refrigerators"
          },
          {
            id: "8d8d5e2b-53f4-4ea1-b2a4-3f9e824d11b4",
            name: "Washing Machines"
          },
          {
            id: "c3e59b7f-3c9b-4378-b2c5-4f1c3f9a8537",
            name: "Ovens"
          },
          {
            id: "d9273b49-7a49-408d-9349-45cf3879bf04",
            name: "Dishwashers"
          }
        ]
      }
    ]
  },

  //Health Backend
  {
    id: "e9bd737d-7c3e-4506-80a0-f47b06b03c4d",
    name: 'Beauty, Health & Pets',
    subcategories: [
      {
        id: "3e207b2a-86a6-4b24-9dcf-3bb01220d62a",
        name: 'Beauty',
        gender: ['Male', 'Female'],
        subcategoryItems: [
          {
            id: "c550b6c6-1945-4b98-816c-cd4db7f931f3",
            name: "Skincare",
            subCategoryItemChildren: [
              { id: "d2552ae7-4f5c-4038-8f49-b6cb07a6169e", name: "Cleansers", slug: "cleansers" },
              { id: "7b8e30b0-cb38-42fc-9e42-4545e8cceac2", name: "Moisturizers", slug: "moisturizers" },
              { id: "ee3b5744-d734-4a5f-84e5-c785705cd2af", name: "Serums", slug: "serums" },
              { id: "5b56302e-d2e6-4e50-8d16-0a8c85c1742c", name: "Masks", slug: "masks" },
              { id: "b2f6e91d-4f11-4a87-b9c1-54e7d44c9b3a", name: "Toners", slug: "toners" },
              { id: "c18d19a2-72c6-4d1a-8e2b-f8f4133458e6", name: "Eye Creams", slug: "eye-creams" },
              { id: "a5c7f8e3-54b9-4d2c-8a1a-8f13456b9c7e", name: "Sunscreens (SPF)", slug: "sunscreens" },
              { id: "d8c1e4c7-1d2a-4f5e-8b6c-6a7b8e9d4a3c", name: "Acne Treatments", slug: "acne-treatments" },
              { id: "e1f9a2b5-3d4e-4f6c-8a7b-9c8d1e2f3a4b", name: "Anti-Aging Treatments", slug: "anti-aging-treatments" }
            ]
          },
          {
            id: "f9d7c6b4-2a1e-4c8d-8b4e-7e9a8f3d1b2c",
            name: "Skincare Tools",
            subCategoryItemChildren: [
              { id: "a7c2b5d4-9e1f-4b6c-8f9d-1e2c3b4a5d6e", name: "Rollers", slug: "rollers" },
              { id: "b3f8c7a6-2d1e-4c5a-8b9d-4e1a2f3c5d6b", name: "Facial Brushes", slug: "facial-brushes" },
              { id: "c4b9d8a7-e1f2-4c3d-8e5a-9b6a7c8d9e1f", name: "LED Devices", slug: "led-devices" }
            ]
          },
          {
            id: "a447cd79-d503-4816-924d-34b9db78f108",
            name: "Makeup",
            subCategoryItemChildren: [
              {
                id: "d1e7c5b9-4a2e-4f8d-8b3c-6a7b8e9d4a1c",
                name: "Face",
                child: [
                  { id: "f27d3773-d2d1-40b2-b567-18089442fcb7", name: "Foundations", slug: "foundations" },
                  { id: "bb8af3eb-94e4-4c8f-a9e6-0c08c64f28d6", name: "Concealers", slug: "concealers" },
                  { id: "8bdbba63-29a3-4560-bfd2-019b82dd4a12", name: "Powders", slug: "powders" },
                  { id: "c0ff1f85-e819-4c09-94c1-40c15152eaf1", name: "Blushes & Highlighters", slug: "blushes-&-highlighters" }
                ]
              },
              {
                id: "b9c8a7d6-e1f2-4c3d-8e5a-9b6a7c8d9e2f",
                name: "Eyes",
                child: [
                  { id: "2746a2ed-cac7-4c34-a33b-fc8d79bc6d6e", name: "Eyeshadows", slug: "eyeshadows" },
                  { id: "24cc744f-bf3f-4db4-a60b-41d6635df914", name: "Mascaras", slug: "mascaras" },
                  { id: "7d700de6-0124-4a69-8e5c-cd77e7b9b124", name: "Eyeliners & Brow Products", slug: "eyeliners-&-brow-products" }
                ]
              },
              {
                id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d",
                name: "Lips",
                child: [
                  { id: "52c10ad4-209c-482e-9aeb-376e4aa54f11", name: "Lipsticks", slug: "lipsticks" },
                  { id: "a4c2f8e6-b9d1-4e7c-8a3f-1d9e2b5c6a7e", name: "Lip Glosses", slug: "lip-glosses" },
                  { id: "e6f9d3b8-2a1c-4b4d-9e7f-1c3a8b4d6e9f", name: "Lip Liners", slug: "lip-liners" }
                ]
              },
              {
                id: "7728f440-4e04-42ef-b9b4-d0c051337748",
                name: "Makeup Tools & Removers",
                child: [
                  { id: "d7f8a9c1-4b2e-4d5a-8e9f-1c2a3b4d5e6f", name: "Brushes & Sponges", slug: "brushes-&-sponges" },
                  { id: "b1c3d5e7-2a4b-4f6c-8a9d-1e3f5a7b9c1d", name: "Makeup Removers", slug: "makeup-removers" }
                ]
              }
            ]
          },
          {
            id: "e5f9a2b1-3d7e-4c5d-8b9a-1f2e3d4c5a6b",
            name: "Personal Care",
            subCategoryItemChildren: [
              {
                id: "aae5ac37-58c4-4502-9c8c-d9db6fdbe8aa",
                name: "Haircare",
                child: [
                  { id: "b2d67251-1e8c-4390-bfc3-6a105cdab3cb", name: "Shampoos & Conditioners", slug: "shampoos-&-conditioners" },
                  { id: "594a09da-b73e-44d7-9aa2-7d0950bff67a", name: "Hair Treatments & Masks", slug: "hair-treatments-&-masks" },
                  { id: "155f940b-5f02-470c-b6aa-130bd76961b6", name: "Styling Tools", slug: "styling-tools" }
                ]
              },
              {
                id: "f8d7c6b5-1a2e-4c3d-8e4a-9b6a7c8d9e2f",
                name: "Bath & Body",
                child: [
                  { id: "a2b3c4d5-e6f7-4a8b-9c1d-2e3f4a5b6c7d", name: "Body Washes", slug: "body-washes" },
                  { id: "c8d9e1f2-3a4b-4c5d-6e7a-8b9c1d2e3f4a", name: "Body Lotions & Scrubs", slug: "body-lotions-&-scrubs" }
                ]
              },
              {
                id: "d9e8f7c6-5a4b-4c3d-2e1f-1a2b3c4d5e6f",
                name: "Shaving & Hair Removal",
                child: [
                  { id: "f2c1d3e4-5a6b-4c7d-8e9f-1a2b3c4d5e6f", name: "Razors & Shaving Creams", slug: "razors-&-shaving-creams" },
                  { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Hair Removal Devices", slug: "hair-removal-devices" }
                ]
              },
              {
                id: "7748f268-e744-42cd-bb8c-999ef10378ea",
                name: "Fragrances & Scents",
                child: [
                  { id: "e283e781-3a34-4b5d-91b1-09a9fa4ec2e1", name: "Perfumes", slug: "perfumes" },
                  { id: "9612aa1c-8837-42b5-a856-1dcf2c0a9b7a", name: "Body Sprays", slug: "body-sprays" },
                  { id: "e9f7a2b1-3d5e-4c6b-8a7f-9d1c2a3b4e5f", name: "Deodorant", slug: "deodorant" }
                ]
              },
              {
                id: "b1c2d3e4-5a6b-4c7d-8e9f-1a2b3c4d5e7f",
                name: "Oral Care & Hygiene",
                child: [
                  { id: "9be4e746-6a3b-46d0-b142-6a8c33a536da", name: "Toothbrushes & Pastes", slug: "toothbrushes-&-pastes" },
                  { id: "e8f7c6d5-a4b3-4c2e-8d9b-1a2b3c4d5e6f", name: "Hygiene Essentials", slug: "hygiene-essentials" }
                ]
              }
            ]
          }
        ]
      },

      {
        id: "8536a833-b2f6-4ae0-a51b-530dcde99077",
        name: "Health & Wellness",
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "81d3021a-13c4-48b0-bb20-658cd9f35a74", name: "Vitamins & Supplements" },
          { id: "1bd839f0-d108-4f3a-a55c-235d5b49b0c1", name: "Medical Equipment" },
          { id: "fc1bfa55-16d2-4f16-b9e2-3487c42b2d5f", name: "Fitness Equipment" },
          { id: "2aa6b6b4-83b0-4cb7-9b99-13e40b640ef8", name: "Health Monitors" }
        ]
      },

      {
        id: "748647ab-51a8-462c-8c33-7da71598d748",
        name: "Personal Care",
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { id: "708785c4-b7d7-4b27-92b1-3e1a3dc78b90", name: "Oral Care" },
          { id: "5d112e59-126c-4e17-8f8d-0b8819b065f2", name: "Bath & Body" },
          { id: "7814a377-9a24-455e-b5d6-26d134b62f04", name: "Body Wash" },
          { id: "1f14f741-5768-4a77-906e-53fa8b87b8a3", name: "Lotions" },
          { id: "baf0a457-472f-47e4-b87c-65fa40464f78", name: "Hand Sanitizers" },
          { id: "81818e91-f86a-47bb-a4a6-9e87b4b8c2cf", name: "Shaving & Hair Removal" },
          { id: "f5229454-2b30-41a4-8f91-9d8f16f74d3b", name: "Razors" },
          { id: "d9bfb47c-f789-4688-9e67-5121dfc7c5c4", name: "Shaving Cream" },
          { id: "8dcfb41c-e2f6-456c-98df-8f16c4832e56", name: "Hair Removal Devices" }
        ]
      },

      {
        id: "a9e6754b-d72b-4d4f-b6e8-2c3f71c4a03e",
        gender: ['Male', 'Female', 'Kids'],
        name: "Pet Supplies",
        subcategoryItems: [
          {
            id: "708785c4-b7d7-4b27-92b1-3e1a3dc78b90",
            name: "Dogs",
            child: [
              { id: "9be4e746-6a3b-46d0-b142-6a8c33a536da", name: "Food & Treats", slug: "dog-food-treats" },
              { id: "b8c7a6d5-e4f3-4c2d-9e1b-3a4d5e6f7a8b", name: "Leashes", slug: "dog-leashes" },
              { id: "c1a2b3d4-e5f6-4c7d-8e9f-1a2b3c4d5e7a", name: "Beds & Furniture", slug: "dog-beds-furniture" }
            ]
          },
          {
            id: "0038c0a2-9c9d-482e-9b04-3e945f8c495e",
            name: "Cats",
            child: [
              { id: "5d112e59-126c-4e17-8f8d-0b8819b065f2", name: "Food & Treats", slug: "cat-food-treats" },
              { id: "d9e8f7c6-a5b4-4c3e-8d2f-1a3b5c7d9e1f", name: "Toys", slug: "cat-toys" },
              { id: "e6d5c4b3-a2f1-4e8c-9d7b-1a2c3b4d5e6f", name: "Furniture", slug: "cat-furniture" },
              { id: "f7a6b5c4-d3e2-4f1d-9c8a-1b2c3d4e5f6a", name: "Litter", slug: "cat-litter" }
            ]
          },
          { id: "7814a377-9a24-455e-b5d6-26d134b62f04", name: "Fish & Aquatic Pets" },
          { id: "1f14f741-5768-4a77-906e-53fa8b87b8a3", name: "Small Animals" },
          { id: "baf0a457-472f-47e4-b87c-65fa40464f78", name: "Birds" }
        ]
      }
    ],
  },

  //Baby Backend
  {
    name: "Baby, Kids & Toys",
    id: "7e3d391c-3910-49ba-904d-55e3e74338be",
    subcategories: [
      {
        name: "Baby",
        id: "467c4295-ba5f-4ae2-9b01-0e1565143bd3",
        gender: ['Kids'],
        subcategoryItems: [
          { name: "Diapers", id: "4f3052f9-9fe0-4018-bf97-312f4d9b787f" },
          { name: "Disposable Diapers", id: "0e2f6805-e763-4f06-a6c1-99d5d8b967c0" },
          { name: "Cloth Diapers", id: "d71641f3-7355-432b-ba2d-fab2e462bcc0" },
          { name: "Feeding", id: "3022103e-af8f-4cf1-b043-d1bdd18da849" },
          { name: "Bottles", id: "b8ef67d0-4e5a-428f-b7d6-5bbccc43f54e" },
          { name: "Breastfeeding Accessories", id: "fe661fbe-3d66-48ac-a031-e562d169b95e" },
          { name: "Baby Gear", id: "3a917146-0531-4b00-a890-e738eb7a8b3b" },
          { name: "Strollers", id: "4d47a2f7-0999-45e0-bdbe-b1c0777a3ad6" },
          { name: "Car Seats", id: "aa9567c7-001f-4575-b543-59aed7aceecd" },
          { name: "Carriers", id: "d2b5ef6b-6ef8-4015-bffb-e94937a87341" },
          { name: "Nursery", id: "7194a8f3-d60f-45f2-b760-356a3b633718" },
          { name: "Cribs", id: "2bf28ced-4581-45b5-82de-4b3a09c78327" },
          { name: "Changing Tables", id: "8c5b9dc5-199d-4ad0-81c4-4520790c3033" },
          { name: "Baby Monitors", id: "c4f1ecac-3b77-4b13-bef2-27ff7e430b71" }
        ]
      },
      {
        name: "Toys",
        id: "c2a3d6ab-a10e-497d-bbeb-0016b9df6c0c",
        gender: ['Kids', 'Male', 'Female'], // Many toys can be for boys or girls
        subcategoryItems: [
          { name: "Educational", id: "9618f89b-31eb-43ea-8868-cb1cec5f3da1" },
          { name: "Learning Toys", id: "76c0495a-d857-4492-8dc6-392d6e599009" },
          { name: "STEM Toys", id: "06b6d031-5b87-4ce5-8541-3c49dbb87af7" },
          { name: "Action Figures", id: "78d9ac49-78cb-4b97-9c7b-06db3714927e" },
          { name: "Dolls & Accessories", id: "108e10ef-02a7-46fa-8949-889a99376e13" },
          { name: "Outdoor Play", id: "b0522642-c889-42a0-bc80-4a0bd8c72c1d" },
          { name: "Playhouses", id: "3862201f-a660-4ea5-8b79-ef1f8c3e3dec" },
          { name: "Slides", id: "e8c3e56d-7845-4c47-a32d-359a7ac06018" },
          { name: "Swings", id: "56bdefa5-a31d-4d80-98e1-65ad68dfb711" }
        ]
      },
      {
        name: "Kids Clothing",
        id: "bd65878e-63b5-4d97-9f67-480923f879e8",
        gender: ['Kids'],
        subcategoryItems: [
          { name: "Girls", id: "8c47911c-bc1d-4733-81be-c8179bb57847" },
          { name: "Boys", id: "f29b84a1-a268-40d0-805e-d4d169b390d4" }
        ]
      }
    ]
  },

  //Groceries Backend
  {
    name: "Recipes",
    id: "d4227a0d-0707-4fbb-aae7-56e71fc33301",
    subcategories: [
      {
        name: "Fresh Produce",
        id: "747793b6-51d3-46c6-9b10-0fac1d4661bb",
        subcategoryItems: [
          { name: "Fruits", id: "f2440f1e-dd21-4b86-8000-dec7ecdbac63" },
          { name: "Vegetables", id: "5556ca10-fcc3-4ebd-8b95-6f5d40c7e009" }
        ]
      },
      {
        name: "Pantry Staples",
        id: "20c7b675-af74-4d38-86e1-c33f55c58c0d",
        subcategoryItems: [
          { name: "Snacks", id: "385332b9-7f2c-4eb7-8e3a-5cd424624b45" },
          { name: "Beverages", id: "da316995-96f8-40e4-bb91-77126d4e9550" },
          { name: "Tea", id: "85d85b33-cc66-4fd5-a190-f6c0eccf9e26" },
          { name: "Coffee", id: "f5e8389d-fcfa-4661-b7a9-ac87247ac1e1" },
          { name: "Soft Drinks", id: "b596ddfb-46b0-46e7-8ca1-8283bb527075" },
          { name: "Baking", id: "b00cd4d0-865f-4d7a-9374-1beb2933b4cf" },
          { name: "Flour", id: "bb2ae444-bd7b-4c8d-846b-2a42cfa26f5f" },
          { name: "Sugar", id: "a9421c7a-ca14-4f5b-a597-f987eaf6417d" },
          { name: "Baking Mixes", id: "09f5b616-c0e4-4a2c-baa8-eaa60b950e99" }
        ]
      },
      {
        name: "Meat & Seafood",
        id: "ad520439-4209-47bf-b2df-70fa4959df73",
        subcategoryItems: [
          { name: "Fresh Meat", id: "c5ee3142-2286-4968-a654-f230e00b53b6" },
          { name: "Seafood", id: "02edfd71-c7fe-4c09-bc83-911a0d8633cd" }
        ]
      },
      {
        name: "Dairy",
        id: "3b76c223-e8c2-4c92-8d4f-4b0848462cd0",
        subcategoryItems: [
          { name: "Milk", id: "b1b60a48-5a29-45fe-9a56-c8a5ed34961e" },
          { name: "Cheese", id: "5215aabc-bf7d-439a-8d5f-ed2773a38591" },
          { name: "Eggs", id: "b6518a17-d204-4f28-97cf-f7dbf804cd11" }
        ]
      },
      {
        name: "Frozen Foods",
        id: "4a3e1fbe-e780-4b85-972e-bc8c1079e468",
        subcategoryItems: [
          { name: "Vegetables", id: "be3dfec6-2820-4511-9bd5-d3e5b9103356" },
          { name: "Meats", id: "086b34d4-2dc4-4148-bfa7-16c434ca5fab" },
          { name: "Desserts", id: "77e62f7d-5bfb-4a38-bb54-b0c89bfac17a" }
        ]
      }
    ]
  },

  //Sports Backend
  {
    name: "Sports, Fitness & Outdoors",
    id: "426ad39f-5df5-4a69-b1a8-c63fbe61ec10",
    subcategories: [
      {
        name: "Fitness Equipment",
        id: "328c6f42-9a13-4c6a-95b1-e7d18f732aa8",
        subcategoryItems: [
          { name: "Cardio Machines", id: "dfc54366-e8d5-4c98-bc48-65e4d524c456" },
          { name: "Treadmills", id: "09c9803e-bf5c-4c68-bcf0-fb74830238f3" },
          { name: "Exercise Bikes", id: "9f8760f6-90e4-448b-a3d4-dba6433eddf2" },
          { name: "Strength Training", id: "48b96fa5-0ef9-4115-a7aa-4e458e28eeb2" },
          { name: "Dumbbells", id: "eb85d9da-e2e1-4e3e-bf35-d0218e68f8f4" },
          { name: "Weight Benches", id: "a27ac7ef-d6c6-462c-a553-f11d7d18d285" },
          { name: "Fitness Accessories", id: "f2b28152-680b-471d-92f5-e3e51d790632" },
          { name: "Yoga Mats", id: "69a8a342-f67f-41df-aad2-038fa3268a98" },
          { name: "Resistance Bands", id: "03c45395-476c-4d5d-8e7d-25d66f5f6dd6" }
        ]
      },
      {
        name: "Outdoor Recreation",
        id: "cfd4a5c7-3d89-4328-940d-344a2674a70f",
        subcategoryItems: [
          { name: "Camping", id: "2c03da59-6649-42da-bb22-5277f5bff87c" },
          { name: "Tents", id: "c6d9fb12-f344-47d8-8dbb-2eaa690b3ebc" },
          { name: "Sleeping Bags", id: "0b9b8569-f47c-401f-a0e7-b9b50e3b258f" },
          { name: "Backpacks", id: "6b6e1ed1-26a6-4631-8973-f1d6f377a5b1" },
          { name: "Hiking", id: "f5e91dc4-cc55-4069-99a2-9a2716a58990" },
          { name: "Boots", id: "d0f8e994-b0d0-4fa5-85d5-bde229a08a60" },
          { name: "Poles", id: "7baffd16-8465-4f1b-90d1-612b4b32c1a7" },
          { name: "Gear", id: "ac4ed5ee-38c1-4761-bb48-ef8c528e7860" },
          { name: "Water Sports", id: "3c911690-b0b6-4ee3-a41b-b6a8f8fdf4a0" },
          { name: "Kayaks", id: "d41900d8-e426-4e48-aadb-93ea2683fc06" },
          { name: "Life Jackets", id: "3e0f2416-6b72-4871-8a41-97e16fce3142" }
        ]
      },
      {
        name: "Team Sports",
        id: "c0e70967-d22b-4525-8b27-3bdef606e289",
        gender: ['Male', 'Female', 'Kids'],
        subcategoryItems: [
          { name: "Soccer", id: "b3241e97-2e9c-45b2-97a4-c2602256604a" },
          { name: "Balls", id: "7b946045-4001-4cd6-8c4d-13e86da47426" },
          { name: "Apparel", id: "e6ef6e1f-73c2-4639-bd4f-2b05a30b1c5a" },
          { name: "Basketball", id: "88eeb0f8-b473-4e66-aed5-4a022b2c37c4" },
          { name: "Shoes", id: "6273cc4b-bc2e-4c55-88d8-5af4185291c2" },
          { name: "Tennis", id: "e045c3ab-73e2-4d4f-b32e-1e8f1f67d77b" },
          { name: "Rackets", id: "c25cba42-78ea-4f5e-83af-2827bc320c16" },
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
          { name: "Car Electronics", id: "a76e501c-2de0-4ff2-97b1-530c9db48676" },
          { name: "GPS", id: "9d9285b4-cf78-4243-a6ec-056164ee4b77" },
          { name: "Stereos", id: "c7f42050-211f-4d80-a5a5-6c279d88dc4e" },
          { name: "Tools & Equipment", id: "df490b59-6f1d-4d95-8224-21a8e1352e34" },
          { name: "Wrenches", id: "b47ff7c5-580d-4a04-92c1-7f1f04089ef3" },
          { name: "Jacks", id: "146c681f-8159-4601-b1d6-d4b18ec9dce3" },
          { name: "Replacement Parts", id: "1ef03cb0-67b1-4dc5-8a64-fc8dfc83b7d6" },
          { name: "Brakes", id: "8502e056-80f5-4aa8-9146-53a3b12d5e6c" },
          { name: "Batteries", id: "6b6bc201-bc94-47b1-a65a-56494c03371a" },
          { name: "Interior Accessories", id: "a02f2b1b-768c-49f5-b207-1bb5bfa16214" },
          { name: "Seat Covers", id: "9b52412e-bc92-4860-9d79-d6e7a3d32b70" },
          { name: "Floor Mats", id: "03e9dd4f-853c-4a57-a9c2-d6f6d84e59e2" },
          { name: "Exterior Accessories", id: "76b66f65-b3f2-485f-a934-f9f5f6cbe540" },
          { name: "Car Covers", id: "cdbd08f2-6d77-4807-8859-9b5ea7e23e0b" },
          { name: "Bike Racks", id: "20a7db2c-b4c7-4bd1-8bc6-6f8c3dc6e6de" }
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
        name: "Mobility Aids",
        id: "2b10ab5d-c140-45d6-9de6-b43234b14a2a",
        subcategoryItems: [
          { name: "Wheelchairs", id: "b4aa65df-dc8b-4d66-931d-e9c728ec73ff" },
          { name: "Walkers", id: "8ae9935f-14b1-46ab-a3f7-d719c4ed3db2" },
          { name: "Canes", id: "5b4f5d7c-2673-45e2-b302-68b43e8e44de" },
          { name: "Mobility Scooters", id: "a765eb54-410c-4b3d-b3b4-2b4ae0fb2c64" }
        ]
      },
      {
        name: "Daily Living Aids",
        id: "a79a48d6-8ed9-4b35-9f8d-3b825b8724d5",
        subcategoryItems: [
          { name: "Dressing Aids", id: "8b23b799-fb9c-4e6e-97ff-0e843d209659" },
          { name: "Eating Aids", id: "db312734-e146-4d03-9705-ea501c1333a2" },
          { name: "Bathing Aids", id: "6cfaaf73-9b2b-4bd4-a4c8-81e6fba32f13" },
          { name: "Communication Aids", id: "7b35bcf0-13e2-4943-b8f2-e19e2a5e6f68" }
        ]
      },
      {
        name: "Accessibility Equipment",
        id: "d0c9b924-9293-45b3-905c-7fa5241dc132",
        subcategoryItems: [
          { name: "Ramps", id: "fab927ab-c569-4d5f-b637-d4c6ed154a54" },
          { name: "Lifts", id: "81a6c2cc-45de-4e1c-b676-90b1b1e09c06" },
          { name: "Accessible Furniture", id: "517fd112-58c7-4111-9cbf-fdf5c4c2bb0e" }
        ]
      }
    ]
  },

  //Maternity Backend
  {
    name: "Maternity & Prenatal Care",
    id: "b12911d2-5286-49a6-8431-6c3e1c8b3b9b",
    gender: ['Female'],
    subcategories: [
      {
        name: "Maternity Clothing",
        id: "bf5d468a-cfb0-47c1-b1d6-2fce6bb5c241",
        subcategoryItems: [
          { name: "Dresses", id: "e8d8e6c6-c2bb-4053-b5b2-e9075b5946f7" },
          { name: "Tops", id: "688b69a1-612c-4bd1-8451-0d735e64b7d4" },
          { name: "Bottoms", id: "6acb8fb6-6820-4235-9cc6-f66f7b527a7f" },
        ]
      },
      {
        name: "Prenatal Care",
        id: "ef89b1d6-e556-408f-b4f1-d60b0ae39380",
        subcategoryItems: [
          { name: "Vitamins", id: "4bf4b308-0b37-4ee1-9255-8c413dc634b6" },
          { name: "Support Bands", id: "91bd093d-115f-4d95-82f0-3c3c2d5e6e80" },
          { name: "Pregnancy Pillows", id: "9bc8e2dc-6819-4d70-a8f8-5c82ed830d96" },
          { name: "Skincare", id: "6e7a9ad7-4c59-4850-91a1-f8301b5e356c" }
        ]
      },
      {
        name: "Baby Essentials",
        id: "de012745-2743-4b4b-a469-f7b5f7a5e8c4",
        subcategoryItems: [
          { name: "Clothing", id: "d93c76ae-654c-499d-aed8-3b72c69fd50b" },
          { name: "Diapers", id: "4b5b8328-909c-4e7f-aafe-d4d7e5b0e457" },
          { name: "Feeding", id: "c3256b0f-3e45-498e-a834-df8b6b1d6759" },
          { name: "Nursery", id: "2edb6a23-6e6d-44a7-94cf-f66ec5d857b7" }
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
        gender: ['Male', 'Female'], // Many products in senior care can be gendered
        subcategoryItems: [
          { id: "c3747f8f-50c7-4168-b3c2-cc8a328e40b2", name: "Supplements" },
          { id: "73a41941-891e-403e-b53f-ded234949ba8", name: "Monitors" },
          { id: "a6d22dfb-40de-4ca5-88bb-36caeaff3b9d", name: "Mobility Aids" },
          { id: "02ea08b4-7ab7-465d-9a05-a8b11b1433dd", name: "Vision & Hearing Aids" }
        ]
      },
      {
        id: "4e79cf49-84e3-49eb-8453-b9ad412b5d9d",
        name: "Comfort & Care",
        gender: ['Male', 'Female'],
        subcategoryItems: [
          { id: "3e2cf0cb-0db0-45be-98c7-585da5d5a48a", name: "Recliners" },
          { id: "6a79b8f5-3e37-454e-8fc4-de8efb407254", name: "Cushions" },
          { id: "2b706c34-7cbe-419c-afc0-42bc9cedbd5a", name: "Adjustable Beds" },
          { id: "d0c2f399-9228-40af-9914-faacd023ab07", name: "Daily Living Aids" }
        ]
      },
      {
        id: "1eb7dd80-805d-4b50-a305-f6a9633e6e26",
        name: "Recreation & Leisure",
        subcategoryItems: [
          { id: "9db34332-ea0b-492b-aa38-931e5ea3e410", name: "Puzzles" },
          { id: "26e80424-db5d-49d1-a83e-4ed850fa5941", name: "Books" }
        ]
      }
    ]
  }
];