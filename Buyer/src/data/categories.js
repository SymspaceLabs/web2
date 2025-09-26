const CATEGORIES_DATA = [
  {
    title: "Categories",
    child: [
      //Clothing Frontend
      {
        id: "a1d35d1e-4475-4c24-98bc-c678bb3d319e",
        title: "Clothing, Shoes & Accessories",
        slug: "clothing-shoes-accessories",
        child: [
          {
            id: "d5a8c4b1-8b21-4d37-9d7a-1f8e9c2b3d64",
            title: "Dresses",
            child: [
              { id: "cfed1f8d-4b9b-4553-92c5-dc2be01c38b7", title: "Casual Dresses", slug: "casual-dresses", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "d47f23a4-1cf5-4a39-9b79-6cd25c7f462d", title: "Formal Dresses", slug: "formal-dresses", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "c53f5378-e3b3-45b1-a129-e2c4067c8509", title: "Summer Dresses", slug: "summer-dresses", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern", "season"], tag_defaults: { ar_type: "body-tracking", gender: "women", season: "summer" } },
            ],
          },
          {
            id: "3f7ed738-cbf9-46a7-9f39-0c77502e17b2",
            title: "Tops",
            child: [
              { id: "7cd4a02e-becb-4865-aabb-b87a18dce2c0", title: "Blouses", slug: "blouses", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "9d826402-b7be-4329-97fc-bd64934eb233", title: "T-Shirts", slug: "t-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "f357256e-983f-46c7-a2f2-3f0d5ae5b348", title: "Sweaters", slug: "sweaters", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "1cb97a29-ec59-45c6-8a56-0a1e8f62e6d7", title: "Cardigans", slug: "cardigans", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "ada4f6d3-c1a2-4567-92b7-430226b3ca47", title: "Casual Shirts", slug: "casual-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "1de0fd99-62b6-4386-8c92-8ca4db389599", title: "Dress Shirts", slug: "dress-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "9c41b539-ec2c-4b49-91c2-6b8f18534c40", title: "Polo Shirts", slug: "polo-shirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          },
          {
            id: "d7c1a1c3-cda0-4686-bf84-e70241e383b3",
            title: "Bottoms",
            child: [
              { id: "e18d4a1b-bb01-4b19-87c2-f6be3e273d68", title: "Jeans", slug: "jeans", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "b888c11c-b62d-4be4-9756-4151a05692f9", title: "Shorts", slug: "shorts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "8f6db2a2-5ac9-4fa7-9802-d742c5f1a230", title: "Skirts", slug: "skirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "d49a2804-0665-4b50-9d8e-1e7b423f26b2", title: "Pants", slug: "pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" }, child: [ { id: "e8d641c8-c9f2-491a-96e0-0259b3c3c734", title: "Dress Pants", slug: "dress-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "62b3d30b-d023-45a8-8e62-c1f03f3938b8", title: "Chinos", slug: "chinos", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "a6f8749c-f233-4f9e-a61f-b3a537f1e7d0", title: "Joggers", slug: "joggers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "4d1a9e3f-67c8-47b2-8a9d-b84e1c28f3a5", title: "Cargos", slug: "cargos", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          },
            ],
          },
          {
            id: "9c93e575-8e62-49de-a3d9-16b61c31be2d",
            title: "Outerwear",
            child: [
              { id: "aba0a755-cf5d-4657-b017-8d014a539d43", title: "Jackets", slug: "jackets", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "e66fd981-7ec0-4d34-b7fa-b4b682f96e30", title: "Coats", slug: "coats", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "5dbdf1d5-bbfc-402f-806d-e4d049500c7f", title: "Blazers", slug: "blazers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "ef324850-c5c5-41d9-bc0f-f8b4b8f37a07", title: "Vests", slug: "vests", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "a567e980-5f8d-47be-80e9-9a75e88d3f79", title: "Hoodies", slug: "hoodies", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "4a3b8f17-c5d7-4be9-b64e-29b5341d7905", title: "Suits", slug: "suits", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          },
          {
            id: "69e7fd69-6ec4-4792-94f2-b39e4826c96f",
            title: "Activewear",
            child: [
              { id: "750f3a2d-2b19-4de3-b7b7-4f6b3f22e4d2", title: "Leggings", slug: "leggings", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "b543b93c-7d88-4b8d-ae5f-507b0cb11b7a", title: "Sport Bras", slug: "sport-bras", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "3c6814a9-b1c3-4a2f-8c74-9001daeea578", title: "Track Pants", slug: "track-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "2df96d8f-b8f9-4711-8f89-f72f167e78da", title: "Workout Tops", slug: "workout-tops", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "d7424957-f23b-4c95-85c7-e318e91f9a56", title: "Yoga Pants", slug: "yoga-pants", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "36e0ab1f-f44d-4e3f-9785-1d2f8c3c4e9b", title: "Sports Shorts", slug: "sports-shorts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "f32175e8-3401-4c53-8bd6-5b8cb2b2744a", title: "Joggers", slug: "joggers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "e3b9c2e5-502d-430c-8e73-4f5ea6e82b3c", title: "Sweatshirts", slug: "sweatshirts", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
              { id: "3d2e0cba-78f1-41c7-ae4b-0b8129b4e4cd", title: "Compression Wear", slug: "compression-wear", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          },
          {
            id: "86d2b4c8-b195-4de8-b47f-8e5d98c0f5ae",
            title: "Eyewear",
            child: [
              { id: "e09b241e-4c16-4e74-b120-55e4b55e5e0a", title: "Prescription Glasses", slug: "prescription-glasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "7f2e0a43-2d39-4ec9-808f-47f1eb7385f7", title: "Sunglasses", slug: "sunglasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "f329c04d-1ef5-4db3-a37c-583e4a7c9f7b", title: "Blue Light Glasses", slug: "blue-light-glasses", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } },
              { id: "2d1cfe2b-d69f-40b8-9061-0ec74c8f1b1b", title: "Kids' Eyewear", slug: "kids-eyewear", tags_required: ["ar_type", "age_group", "gender", "material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking", age_group: "kids" } },
            ],
          },
          {
            id: "faed8236-48bb-4591-98f7-e86b3ec6b2c8",
            title: "Intimates",
            child: [
              { id: "f5a7b94c-23d9-42e8-8375-b1a9f7e5d8c3", title: "Bras", slug: "bras", tags_required: ["ar_type", "age_group", "gender", "season", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "2d3202f1-5972-4a2e-bbdf-61af41769dc3", title: "Panties", slug: "panties", tags_required: ["ar_type", "age_group", "gender", "season", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "women" } },
              { id: "7fae12d0-9635-43fb-aaf4-362ed92c1234", title: "Boxers", slug: "boxers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "men" } },
              { id: "83b2f5a7-d94f-481b-832e-7e3b94a2f8c1", title: "Briefs", slug: "briefs", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "men" } },
              { id: "8b24c7f9-83d5-4a2f-985c-7e4f3812b390", title: "Sleepwear", slug: "sleepwear", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
            ],
          },
          {
            id: "9fc437c1-640c-48d6-92d4-8e9b7b2c367b",
            title: "Shoes",
            child: [
              { id: "215cfe87-5dc3-4b9b-80b9-01a7e99f7dc8", title: "Sandals", slug: "sandals", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", title: "Flats", slug: "flats", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "3c7f41d2-4d88-42b6-8f5a-86b9f3d23eb9", title: "Heels", slug: "heels", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking", gender: "women" } },
              { id: "8g3f1b54-3e40-5fd0-919g-58g2fc8496g8", title: "Boots", slug: "boots", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", title: "Sneakers", slug: "sneakers", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "e2b4f987-3218-403a-9024-c8d7b23f18a4", title: "Athletic Shoes", slug: "athletic-shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "4d3b5c84-59f7-46b1-9a7f-3724d9b2f087", title: "Formal Shoes", slug: "formal-shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
              { id: "829dcb34-e7a9-4a5c-84f5-7381a2b3093f", title: "Casual Shoes", slug: "casual-shoes", tags_required: ["ar_type", "age_group", "gender", "season", "occasion", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
            ],
          },
          {
            id: "02f35b89-9f7b-4e6c-88c4-e7f4d23872e1",
            title: "Accessories",
            child: [
              {
                id: "49382f7c-94a7-48e2-9d7c-5a39f7e5d8c3",
                title: "Bags",
                child: [
                  { id: "52d6e93f-09cb-4861-82f9-7b14e9c5f2a7", title: "Handbags", slug: "handbags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } },
                  { id: "b3f2e1c4-d5a6-4b78-9e01-2f3c4a5b6d7e", title: "Backpacks", slug: "backpacks", tags_required: ["ar_type", "gender", "material", "indoor_outdoor"], tag_defaults: { ar_type: "static" } },
                  { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", title: "Crossbody Bags", slug: "crossbody-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } },
                  { id: "3c7f41d2-4d88-42b6-8f5a-86b9f3d23eb9", title: "Shoulder Bags", slug: "shoulder-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } },
                  { id: "83b2f5a7-d94f-481b-832e-7e3b94a2f8c1", title: "Tote Bags", slug: "tote-bags", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } },
                  { id: "d84f7c39-5298-4b7d-a38c-72e4f91c8b03", title: "Clutches", slug: "clutches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } },
                ],
              },
              {
                id: "97c41e5f-d4e8-48b5-b9b2-09c374d8f1e6",
                title: "Jewelry & Watches",
                child: [
                  { id: "a43e7f92-5c87-49d3-9f72-3e5b947f81d2", title: "Earrings", slug: "earrings", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
                  { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", title: "Necklaces", slug: "necklaces", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
                  { id: "83f4a75c-92d3-42a5-88f9-4e7c5b2f381a", title: "Rings", slug: "rings", tags_required: ["ar_type", "gender", "material", "safety_certified"], optional_tags: ["gemstone"], tag_defaults: { ar_type: "hand-tracking" } },
                  { id: "8b24c7f9-83d5-4a2f-985c-7e4f3812b390", title: "Bracelets", slug: "bracelets", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "face-tracking" } },
                  { id: "4f8b2c07-3e98-4d87-9c5a-5e9d437e8f3a", title: "Plated Jewelry", slug: "plated-jewelry", tags_required: ["ar_type", "gender", "material", "safety_certified"], tag_defaults: { ar_type: "hand-tracking" } },
                  { id: "829dcb34-e7a9-4a5c-84f5-7381a2b3093f", title: "Men's Watches", slug: "mens-watches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "men" } },
                  { id: "4d3b5c84-59f7-46b1-9a7f-3724d9b2f087", title: "Women's Watches", slug: "womens-watches", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "women" } },
                  { id: "e2b4f987-3218-403a-9024-c8d7b23f18a4", title: "Smartwatches", slug: "smartwatches", tags_required: ["ar_type", "gender", "material"], tag_defaults: { ar_type: "hand-tracking" } },
                  { id: "c39f847b-f02e-4b7d-98f3-5f47e9d7c2b3", title: "Watch Bands & Accessories", slug: "watch-bands-accessories", tags_required: ["ar_type", "gender", "material"], tag_defaults: { ar_type: "hand-tracking" } },
                ],
              },
              {
                id: "42f97c8a-b9f3-4e5b-832f-98134c7e5a8b",
                title: "Headwear",
                child: [
                  { id: "87d4bc3f-1342-44c3-a8d7-8e7b9b24d9e7", title: "Hats", slug: "hats", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
                  { id: "326dgf98-6ed4-5c0c-91c0-12b8f88g8ed9", title: "Caps", slug: "caps", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
                  { id: "9fc437c1-640c-48d6-92d4-8e9b7b2c367b", title: "Beanies", slug: "beanies", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
                ],
              },
              {
                id: "f329c04d-1ef5-4db3-a37c-583e4a7c9f7b",
                title: "Seasonal Accessories",
                child: [
                  { id: "e18d4a1b-bb01-4b19-87c2-f6be3e273d68", title: "Gloves", slug: "gloves", tags_required: ["ar_type", "gender", "season", "material", "safety_certified"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "hand-tracking" } },
                  { id: "d7c1a1c3-cda0-4686-bf84-e70241e383b3", title: "Scarves", slug: "scarves", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "face-tracking" } },
                  { id: "d5a8c4b1-8b21-4d37-9d7a-1f8e9c2b3d64", title: "Socks", slug: "socks", tags_required: ["ar_type", "gender", "season", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "feet-tracking" } },
                  { id: "9c93e575-8e62-49de-a3d9-16b61c31be2d", title: "Ties", slug: "ties", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color", "pattern"], tag_defaults: { ar_type: "body-tracking" } },
                ],
              },
              {
                id: "4f8b2c07-3e98-4d87-9c5a-5e9d437e8f3a",
                title: "Wallets & Belts",
                child: [
                  { id: "1db0843f-bbf5-4a4b-9082-1a81dc7bf934", title: "Wallets", slug: "wallets", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "static" } },
                  { id: "1cb97a29-ec59-45c6-8a56-0a1e8f62e6d7", title: "Belts", slug: "belts", tags_required: ["ar_type", "gender", "material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking" } },
                ],
              },
            ],
          },
        ],
      },

      //Electronics Frontend
      {
        id: "9a3ff078-60f5-4f1c-b6c7-0c5976ec6c5f",
        title: "Electronics",
        child: [
          {
            id: "ec80f7d7-bfd1-4b79-8b07-04ad8f84850b",
            title: "Mobile Phones & Accessories",
            child: [
              { id: "d312a97f-2b27-4bfe-bf8d-5c1fdd5b1b79", title: "Smartphones", slug: 'smartphones' },
              { id: "f23b7c69-dc3e-4f64-9ac4-8c48f6780ecb", title: "Cases & Covers", slug: 'cases-covers' },
              { id: "56d49b33-5a6a-42d7-950d-505a9b0fdf62", title: "Screen Protectors", slug: 'screen-protectors' },
              { id: "780a69a9-98b8-44d5-a8f9-c44bf9dcbf78", title: "Chargers & Cables", slug: 'chargers-cables' },
              { id: "10c30a2f-5d3a-469c-bdf3-0e3e4b853a87", title: "Power Banks", slug: 'power-banks' }
            ]
          },
          {
            id: "302f2156-dfbc-497d-8f87-bfa13d76e94b",
            title: "Computers & Accessories",
            child: [
              { id: "8b88334c-9531-42d9-a5fd-d4303d3c31a7", title: "Laptops", slug: 'laptops' },
              { id: "5157a66a-e90e-4e5b-bf88-e76cf598cfbb", title: "Desktops", slug: 'desktops' },
              { id: "c8034c21-6254-4717-bc9e-e2d9bafc7032", title: "Monitors", slug: 'monitors' },
              { id: "b5473b6b-4d3d-4987-b8a4-504bd650ff80", title: "Keyboards & Mice", slug: 'keyboards-mice' },
              { id: "2d7a7d73-81d9-43b3-9b35-cb2b236c2ea6", title: "Printers & Scanners", slug: 'printers-scanners' }
            ]
          },
          {
            id: "0ed8f771-8d8d-4d48-9379-c1a5e70f989e",
            title: "Home Entertainment",
            child: [
              { id: "c87ba601-c1b7-4b52-a1c8-d8ec3b7b0a18", title: "Televisions", slug: 'televisions' },
              { id: "77c5ab4b-beb5-4e43-b71f-0c83a02b16af", title: "Sound Systems", slug: 'sound-systems' },
              { id: "5c3a74d9-1f9e-4bfb-833f-02a32c10874c", title: "Streaming Devices", slug: 'streaming-devices' },
              { id: "7b32f0d6-8e1b-4413-8b91-2552648b7dc5", title: "Blu-ray & DVD Players", slug: 'bluray-dvd-players' }
            ]
          },
          {
            id: "0fa9db70-0a8e-4f99-a67e-d8a2a2335e90",
            title: "Cameras & Photography",
            child: [
              { id: "61ae3d0a-efb2-485e-8ff5-c0b79d53c75e", title: "Digital Cameras", slug: 'digital-cameras' },
              { id: "10fcf01f-3ae5-49ab-b2c6-c0217b3b5641", title: "Lenses", slug: 'lenses' },
              { id: "84e9ed1b-d12d-4948-96b2-78728e34e5e8", title: "Tripods", slug: 'tripods' },
              { id: "fc0dcf91-cd0d-4f34-b5fc-874e59ea9d6f", title: "Camera Accessories", slug: 'camera-accessories' }
            ]
          }
        ]
      },

      //Furniture Frontend
      {
        id: "0ff2b00f-9b29-4e32-bbb1-d83d0a416b84",
        title: 'Home, Furniture & Appliances',
        child: [
          {
            id: "26ccfa5e-8ffb-4c68-b09f-9c730b577b5b",
            title: 'Furniture',
            child: [
              { id: "7a9a5e67-6c77-4b68-8c32-bb295aee9c24", title: "Living Room", slug: 'living-room' },
              { id: "fef93787-b22b-4e9e-bf85-32885d376f02", title: "Sofas", slug: 'sofas' },
              { id: "d62fd072-d47d-4fa1-b31d-b1cc5b28ad90", title: "Coffee Tables", slug: 'coffee-tables' },
              { id: "17c8d78c-b19f-4f3f-bd45-482d0b0c5d11", title: "TV Stands", slug: 'tv-stands' },
              { id: "e6c3f7e6-09b9-44fa-b8d3-dbeec64409de", title: "Recliners", slug: 'recliners' },
              { id: "f45e9246-0ef5-4996-b2f9-71c27ad98371", title: "Bedroom", slug: 'bedroom' },
              { id: "2bdc4f4b-6f5c-45bb-8572-27a973b1c9e6", title: "Beds", slug: 'beds' },
              { id: "4c63e2e1-f6f6-44bc-a496-21907337081d", title: "Dressers", slug: 'dressers' },
              { id: "5a8dbb56-5d36-41aa-a8d9-fc748dd97e38", title: "Nightstands", slug: 'nightstands' },
              { id: "ec2c0f78-6d5a-4053-b46b-3e45c7b0df90", title: "Wardrobes", slug: 'wardrobes' },
              { id: "47b4e7f5-4891-4147-818e-f255d650bdb7", title: "Office", slug: 'office' },
              { id: "8abfbbd7-0fcb-43d6-9111-6a5a42c0702b", title: "Desks", slug: 'desks' },
              { id: "5c1e5db5-2745-4d1e-b18b-9ff81cd83367", title: "Office Chairs", slug: 'office-chairs' },
              { id: "a0d92de3-59cd-4a07-8a56-f0f441045319", title: "Bookcases", slug: 'bookcases' },
              { id: "497b2f65-1f53-4adf-8902-d82fa8d18ea4", title: "Outdoor", slug: 'outdoor' },
              { id: "3c71d8af-12bb-4dbf-b6c7-b7bb9f5cda90", title: "Patio Sets", slug: 'patio-sets' },
              { id: "94939e0b-2123-42a0-80cd-dfc4ad11d9e7", title: "Outdoor Chairs", slug: 'outdoor-chairs' },
              { id: "d3c746a6-7ed5-4d99-89c5-059fe09a56a1", title: "Garden Storage", slug: 'garden-storage' }
            ],
          },
          {
            id: "e34f58b1-f9ba-4050-90e7-285c1c2e4d71",
            title: "Home Decor",
            child: [
              { id: "9ad4a4b4-8967-481f-b9b1-10f3f3b3ec36", title: "Lighting", slug: 'lighting' },
              { id: "eb5312cb-38e4-4208-84f6-75dd4a29f9e7", title: "Lamps", slug: 'lamps' },
              { id: "3d8d785a-321e-4c86-8191-77d19d8ea4b3", title: "Ceiling Lights", slug: 'ceiling-lights' },
              { id: "68f3eeb6-1985-42e0-bff5-faa70c776b5d", title: "Wall Lights", slug: 'wall-lights' },
              { id: "e5a29c16-e5c6-4a8a-a403-eaeaf2f49978", title: "Rugs", slug: 'rugs' },
              { id: "602c854d-144d-4b58-9c19-f2eb528a107b", title: "Wall Art", slug: 'wall-art' },
              { id: "6b4f0d9b-1ae8-4b8e-9d43-82d2906010e7", title: "Clocks", slug: 'clocks' },
              { id: "15bf4ea9-d5a4-41b3-8894-c738891d8d42", title: "Mirrors", slug: 'mirrors' }
            ]
          },
          {
            id: "59e873d9-87c3-4f4f-808f-4a3ebf6a743c",
            title: "Kitchen & Dining",
            child: [
              { id: "e2f84950-f9a2-4485-a22b-63c52f233c85", title: "Cookware", slug: 'cookware' },
              { id: "d8c241c3-e732-4cf7-8e47-76529d17b5ae", title: "Pots & Pans", slug: 'pots-pans' },
              { id: "96de0b5e-23ec-4d1c-a645-5f8329b99d30", title: "Bakeware", slug: 'bakeware' },
              { id: "4b36da5c-1e8b-4963-a61d-e8cf29924394", title: "Tableware", slug: 'tableware' },
              { id: "c073f7b3-cb7d-4f3a-a894-9e33a7597c0a", title: "Dinner Sets", slug: 'dinner-sets' },
              { id: "2e8f3c86-7bf8-4a7c-9446-f1cfa5d34ad4", title: "Glassware", slug: 'glassware' },
              { id: "758ad15f-0833-4b69-a62c-573b34dc78cb", title: "Cutlery", slug: 'cutlery' },
              { id: "2d4b0789-cf4c-4bf4-9c5b-1f8e26b2f02a", title: "Kitchen Storage", slug: 'kitchen-storage' },
              { id: "b8302364-2420-4d8f-a63d-ecae34fd0df5", title: "Containers", slug: 'containers' },
              { id: "fc2b1e57-c3ba-4113-8dfb-e0f9f43d843d", title: "Racks & Holders", slug: 'racks-holders' },
              { id: "4d4707b1-2bb5-477f-9a72-e151ce672bd3", title: "Small Appliances", slug: 'small-appliances' },
              { id: "c32c4977-2d9d-44d1-9b3c-36e9852da4b6", title: "Toasters", slug: 'toasters' },
              { id: "10e2c4fb-345e-4f3d-a50e-4fb153d83e20", title: "Blenders", slug: 'blenders' },
              { id: "f8714f3e-7bf9-4f7b-b6a9-d99c83e37cbf", title: "Coffee Makers", slug: 'coffee-makers' }
            ]
          },
          {
            id: "fd3cbf8c-45c9-42a8-9c4f-ff89b9d6b690",
            title: "Large Appliances",
            child: [
              { id: "d39810fb-9ba7-4eb7-b21d-d6a4e1703705", title: "Refrigerators", slug: 'refrigerators' },
              { id: "8d8d5e2b-53f4-4ea1-b2a4-3f9e824d11b4", title: "Washing Machines", slug: 'washing-machines' },
              { id: "c3e59b7f-3c9b-4378-b2c5-4f1c3f9a8537", title: "Ovens", slug: 'ovens' },
              { id: "d9273b49-7a49-408d-9349-45cf3879bf04", title: "Dishwashers", slug: 'dishwashers' }
            ]
          }
        ],
      },

      //Health Frontend
      {
        id: "e9bd737d-7c3e-4506-80a0-f47b06b03c4d",
        title: "Beauty, Health & Pets",
        slug: "beauty-health-pets",
        child: [
          {
            id: "c550b6c6-1945-4b98-816c-cd4db7f931f3",
            title: "Skincare",
            slug: "skincare",
            child: [
              { id: "d2552ae7-4f5c-4038-8f49-b6cb07a6169e", title: "Cleansers", slug: "cleansers" },
              { id: "7b8e30b0-cb38-42fc-9e42-4545e8cceac2", title: "Moisturizers", slug: "moisturizers" },
              { id: "ee3b5744-d734-4a5f-84e5-c785705cd2af", title: "Serums", slug: "serums" },
              { id: "5b56302e-d2e6-4e50-8d16-0a8c85c1742c", title: "Masks", slug: "masks" },
              { id: "b2f6e91d-4f11-4a87-b9c1-54e7d44c9b3a", title: "Toners", slug: "toners" },
              { id: "c18d19a2-72c6-4d1a-8e2b-f8f4133458e6", title: "Eye Creams", slug: "eye-creams" },
              { id: "a5c7f8e3-54b9-4d2c-8a1a-8f13456b9c7e", title: "Sunscreens (SPF)", slug: "sunscreens" },
              { id: "d8c1e4c7-1d2a-4f5e-8b6c-6a7b8e9d4a3c", title: "Acne Treatments", slug: "acne-treatments" },
              { id: "e1f9a2b5-3d4e-4f6c-8a7b-9c8d1e2f3a4b", title: "Anti-Aging Treatments", slug: "anti-aging-treatments" }
            ]
          },
          {
            id: "f9d7c6b4-2a1e-4c8d-8b4e-7e9a8f3d1b2c",
            title: "Skincare Tools",
            slug: "skincare-tools",
            child: [
              { id: "a7c2b5d4-9e1f-4b6c-8f9d-1e2c3b4a5d6e", title: "Rollers", slug: "rollers" },
              { id: "b3f8c7a6-2d1e-4c5a-8b9d-4e1a2f3c5d6b", title: "Facial Brushes", slug: "facial-brushes" },
              { id: "c4b9d8a7-e1f2-4c3d-8e5a-9b6a7c8d9e1f", title: "LED Devices", slug: "led-devices" }
            ]
          },
          {
            id: "a447cd79-d503-4816-924d-34b9db78f108",
            title: "Makeup",
            slug: "makeup",
            child: [
              {
                id: "d1e7c5b9-4a2e-4f8d-8b3c-6a7b8e9d4a1c",
                title: "Face",
                slug: "face",
                child: [
                  { id: "f27d3773-d2d1-40b2-b567-18089442fcb7", title: "Foundations", slug: "foundations" },
                  { id: "bb8af3eb-94e4-4c8f-a9e6-0c08c64f28d6", title: "Concealers", slug: "concealers" },
                  { id: "8bdbba63-29a3-4560-bfd2-019b82dd4a12", title: "Powders", slug: "powders" },
                  { id: "c0ff1f85-e819-4c09-94c1-40c15152eaf1", title: "Blushes & Highlighters", slug: "blushes-highlighters" }
                ]
              },
              {
                id: "b9c8a7d6-e1f2-4c3d-8e5a-9b6a7c8d9e2f",
                title: "Eyes",
                slug: "eyes",
                child: [
                  { id: "2746a2ed-cac7-4c34-a33b-fc8d79bc6d6e", title: "Eyeshadows", slug: "eyeshadows" },
                  { id: "24cc744f-bf3f-4db4-a60b-41d6635df914", title: "Mascaras", slug: "mascaras" },
                  { id: "7d700de6-0124-4a69-8e5c-cd77e7b9b124", title: "Eyeliners & Brow Products", slug: "eyeliners-brow-products" }
                ]
              },
              {
                id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d",
                title: "Lips",
                slug: "lips",
                child: [
                  { id: "52c10ad4-209c-482e-9aeb-376e4aa54f11", title: "Lipsticks", slug: "lipsticks" },
                  { id: "a4c2f8e6-b9d1-4e7c-8a3f-1d9e2b5c6a7e", title: "Lip Glosses", slug: "lip-glosses" },
                  { id: "e6f9d3b8-2a1c-4b4d-9e7f-1c3a8b4d6e9f", title: "Lip Liners", slug: "lip-liners" }
                ]
              },
              {
                id: "7728f440-4e04-42ef-b9b4-d0c051337748",
                title: "Makeup Tools & Removers",
                slug: "makeup-tools-removers",
                child: [
                  { id: "d7f8a9c1-4b2e-4d5a-8e9f-1c2a3b4d5e6f", title: "Brushes & Sponges", slug: "brushes-sponges" },
                  { id: "b1c3d5e7-2a4b-4f6c-8a9d-1e3f5a7b9c1d", title: "Makeup Removers", slug: "makeup-removers" }
                ]
              }
            ]
          },
          {
            id: "e5f9a2b1-3d7e-4c5d-8b9a-1f2e3d4c5a6b",
            title: "Personal Care",
            slug: "personal-care",
            child: [
              {
                id: "aae5ac37-58c4-4502-9c8c-d9db6fdbe8aa",
                title: "Haircare",
                slug: "haircare",
                child: [
                  { id: "b2d67251-1e8c-4390-bfc3-6a105cdab3cb", title: "Shampoos & Conditioners", slug: "shampoos-conditioners" },
                  { id: "594a09da-b73e-44d7-9aa2-7d0950bff67a", title: "Hair Treatments & Masks", slug: "hair-treatments-masks" },
                  { id: "155f940b-5f02-470c-b6aa-130bd76961b6", title: "Styling Tools", slug: "styling-tools" }
                ]
              },
              {
                id: "f8d7c6b5-1a2e-4c3d-8e4a-9b6a7c8d9e2f",
                title: "Bath & Body",
                slug: "bath-body",
                child: [
                  { id: "a2b3c4d5-e6f7-4a8b-9c1d-2e3f4a5b6c7d", title: "Body Washes", slug: "body-washes" },
                  { id: "c8d9e1f2-3a4b-4c5d-6e7a-8b9c1d2e3f4a", title: "Body Lotions & Scrubs", slug: "body-lotions-scrubs" }
                ]
              },
              {
                id: "d9e8f7c6-5a4b-4c3d-2e1f-1a2b3c4d5e6f",
                title: "Shaving & Hair Removal",
                slug: "shaving-hair-removal",
                child: [
                  { id: "f2c1d3e4-5a6b-4c7d-8e9f-1a2b3c4d5e6f", title: "Razors & Shaving Creams", slug: "razors-shaving-creams" },
                  { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", title: "Hair Removal Devices", slug: "hair-removal-devices" }
                ]
              },
              {
                id: "7748f268-e744-42cd-bb8c-999ef10378ea",
                title: "Fragrances & Scents",
                slug: "fragrances-scents",
                child: [
                  { id: "e283e781-3a34-4b5d-91b1-09a9fa4ec2e1", title: "Perfumes", slug: "perfumes" },
                  { id: "9612aa1c-8837-42b5-a856-1dcf2c0a9b7a", title: "Body Sprays", slug: "body-sprays" },
                  { id: "e9f7a2b1-3d5e-4c6b-8a7f-9d1c2a3b4e5f", title: "Deodorant", slug: "deodorant" }
                ]
              },
              {
                id: "b1c2d3e4-5a6b-4c7d-8e9f-1a2b3c4d5e7f",
                title: "Oral Care & Hygiene",
                slug: "oral-care-hygiene",
                child: [
                  { id: "9be4e746-6a3b-46d0-b142-6a8c33a536da", title: "Toothbrushes & Pastes", slug: "toothbrushes-pastes" },
                  { id: "e8f7c6d5-a4b3-4c2e-8d9b-1a2b3c4d5e6f", title: "Hygiene Essentials", slug: "hygiene-essentials" }
                ]
              }
            ]
          },
          {
            id: "8536a833-b2f6-4ae0-a51b-530dcde99077",
            title: "Health & Wellness",
            slug: "health-wellness",
            gender: ["Male", "Female", "Kids"],
            child: [
              { id: "81d3021a-13c4-48b0-bb20-658cd9f35a74", title: "Vitamins & Supplements", slug: "vitamins-supplements" },
              { id: "1bd839f0-d108-4f3a-a55c-235d5b49b0c1", title: "Medical Equipment", slug: "medical-equipment" },
              { id: "fc1bfa55-16d2-4f16-b9e2-3487c42b2d5f", title: "Fitness Equipment", slug: "fitness-equipment" },
              { id: "2aa6b6b4-83b0-4cb7-9b99-13e40b640ef8", title: "Health Monitors", slug: "health-monitors" }
            ]
          },
          {
            id: "a9e6754b-d72b-4d4f-b6e8-2c3f71c4a03e",
            title: "Pet Supplies",
            slug: "pet-supplies",
            gender: ["Male", "Female", "Kids"],
            child: [
              {
                id: "708785c4-b7d7-4b27-92b1-3e1a3dc78b90",
                title: "Dogs",
                slug: "dog-supplies",
                child: [
                  { id: "9be4e746-6a3b-46d0-b142-6a8c33a536da", title: "Food & Treats", slug: "dog-food-treats" },
                  { id: "b8c7a6d5-e4f3-4c2d-9e1b-3a4d5e6f7a8b", title: "Leashes", slug: "dog-leashes" },
                  { id: "c1a2b3d4-e5f6-4c7d-8e9f-1a2b3c4d5e7a", title: "Beds & Furniture", slug: "dog-beds-furniture" }
                ]
              },
              {
                id: "0038c0a2-9c9d-482e-9b04-3e945f8c495e",
                title: "Cats",
                slug: "cat-supplies",
                child: [
                  { id: "5d112e59-126c-4e17-8f8d-0b8819b065f2", title: "Food & Treats", slug: "cat-food-treats" },
                  { id: "d9e8f7c6-a5b4-4c3e-8d2f-1a3b5c7d9e1f", title: "Toys", slug: "cat-toys" },
                  { id: "e6d5c4b3-a2f1-4e8c-9d7b-1a2c3b4d5e6f", title: "Furniture", slug: "cat-furniture" },
                  { id: "f7a6b5c4-d3e2-4f1d-9c8a-1b2c3d4e5f6a", title: "Litter", slug: "cat-litter" }
                ]
              },
              { id: "7814a377-9a24-455e-b5d6-26d134b62f04", title: "Fish & Aquatic Pets", slug: "fish-aquatic-pets" },
              { id: "1f14f741-5768-4a77-906e-53fa8b87b8a3", title: "Small Animals", slug: "small-animals" },
              { id: "baf0a457-472f-47e4-b87c-65fa40464f78", title: "Birds", slug: "birds" }
            ]
          }
        ]
      },
      
      //Kids Frontend
      {
        title: "Kids & Toys",
        id: "7e3d391c-3910-49ba-904d-55e3e74338be",
        child: [
          {
            title: "Kids Clothing",
            child: [
              { title: "Girls", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1e", slug: "girls" },
              { title: "Boys", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5a", slug: "boys" }
            ]
          },
          {
            title: "Toys",
            id: "c2a3d6ab-a10e-497d-bbeb-0016b9df6c0c",
            child: [
              { title: "Educational", id: "9618f89b-31eb-43ea-8868-cb1cec5f3da1", slug: "educational" },
              { title: "Learning Toys", id: "76c0495a-d857-4492-8dc6-392d6e599009", slug: "learning" },
              { title: "STEM Toys", id: "06b6d031-5b87-4ce5-8541-3c49dbb87af7", slug: "stem" },
              { title: "Action Figures", id: "78d9ac49-78cb-4b97-9c7b-06db3714927e", slug: "action-figures" },
              { title: "Dolls & Accessories", id: "108e10ef-02a7-46fa-8949-889a99376e13", slug: "dolls-&-accessories" },
              { title: "Outdoor Play", id: "b0522642-c889-42a0-bc80-4a0bd8c72c1d", slug: "outdoor" },
              { title: "Playhouses", id: "3862201f-a660-4ea5-8b79-ef1f8c3e3dec", slug: "playhouses" },
              { title: "Slides", id: "e8c3e56d-7845-4c47-a32d-359a7ac06018", slug: "slides" },
              { title: "Swings", id: "56bdefa5-a31d-4d80-98e1-65ad68dfb711", slug: "swings" }
            ]
          }
        ]
      },

      //Recipes Frontend
      {
        title: "Recipes",
        id: "e4f7d2a1-c8b5-4a3e-8c6f-9d2a1c7b5e4d",
        child: [
          {
            title: "Trending Weeknight Dinners",
            id: "b7c2a1e4-d9f8-4e3a-b1c2-5d4e7f6a8b9c",
            child: [
              { title: "Chicken Alfredo", id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5d", slug: "chicken-alfredo" },
              { title: "Chicken Tacos", id: "c1a2b3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", slug: "chicken-tacos" },
              { title: "Fried Rice (Chicken/Vegetable)", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1c", slug: "fried-rice" },
              { title: "Baked Salmon", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5a", slug: "baked-salmon" },
              { title: "Stir-Fry Noodles (Lo Mein/Chow Mein)", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f4", slug: "stir-fry-noodles" },
              { title: "Shrimp Scampi", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p5", slug: "shrimp-scampi" }
            ]
          },
          {
            title: "Comfort Classics",
            id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1a",
            child: [
              { title: "Lasagna", id: "c1b2a3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p6", slug: "lasagna" },
              { title: "Spaghetti Bolognese", id: "a0b9c8d7-e6f5-4a2b-9c8d-7e6f5a4b3c2d", slug: "spaghetti-bolognese" },
              { title: "Beef Chili", id: "d4c3b2a1-e9f8-4e7a-b6c5-2d1e4f3a5b6c", slug: "beef-chili" },
              { title: "Mac & Cheese", id: "e2d1c4b3-a6f5-4e8d-9c2b-1a0e5f4d3c2b", slug: "mac-and-cheese" },
              { title: "Beef Stew", id: "b3c2a1d4-e5f6-4a7b-8c9d-1e2f3a4b5c6e", slug: "beef-stew" },
              { title: "Chicken Parmesan", id: "f8e7d6c5-b4a3-4b2c-9d1e-8a7b6c5d4e3f", slug: "chicken-parmesan" }
            ]
          },
          {
            title: "Breakfast & Brunch",
            id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3d",
            child: [
              { title: "Pancakes", id: "b9c8a7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5a", slug: "pancakes" },
              { title: "French Toast", id: "a0b1c2d3-e4f5-4g6h-i7j8-k9l0m1n2o3p4", slug: "french-toast" },
              { title: "Omelette", id: "c1b2a3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p7", slug: "omelette" },
              { title: "Breakfast Burritos", id: "d2e1f4a3-b6c5-4d8e-9f0a-1b2c3d4e5f6g", slug: "breakfast-burritos" },
              { title: "Avocado Toast with Eggs", id: "a3b2c1d4-e5f6-4g7h-i8j9-k0l1m2n3o4p8", slug: "avocado-toast-eggs" }
            ]
          },
          {
            title: "Baking & Desserts",
            id: "d93c76ae-654c-499d-aed8-3b72c69fd50b",
            child: [
              { title: "Chocolate Chip Cookies", id: "e5f4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1b", slug: "chocolate-chip-cookies" },
              { title: "Brownies", id: "a7b6c5d4-e3f2-4a1b-9c0d-8e7f6a5b4c3d", slug: "brownies" },
              { title: "Banana Bread", id: "f1e2d3c4-b5a6-4c7b-8d9e-0f1a2b3c4d5e", slug: "banana-bread" },
              { title: "Cheesecake", id: "b2c1a3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p9", slug: "cheesecake" },
              { title: "Cupcakes", id: "a8b7c6d5-e4f3-4a2b-9c1d-8e7f6a5b4c3e", slug: "cupcakes" }
            ]
          },
          {
            title: "Global Favorites",
            id: "c3256b0f-3e45-498e-a834-df8b6b1d6759",
            child: [
              {
                title: "Italian",
                id: "a5b4c3d2-e1f0-4a9b-8c7d-6e5f4d3c2b1a",
                child: [
                  { title: "Carbonara", id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6f", slug: "carbonara" },
                  { title: "Margherita Pizza", id: "d3c2b1a4-e5f6-4g7h-i8j9-k0l1m2n3o4p0", slug: "margherita-pizza" }
                ]
              },
              {
                title: "Mexican",
                id: "e9f8d7c6-b5a4-4c3d-9e2b-1a0e9f8d7c6b",
                child: [
                  { title: "Tacos al Pastor", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1d", slug: "tacos-al-pastor" },
                  { title: "Chicken Enchiladas", id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3e", slug: "chicken-enchiladas" }
                ]
              },
              {
                title: "Indian",
                id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p1",
                child: [
                  { title: "Butter Chicken", id: "e4f3d2c1-b0a9-8c7d-6e5f-4d3c2b1a0d9c", slug: "butter-chicken" },
                  { title: "Chana Masala", id: "f1d2c3e4-a5b6-4c7d-8e9f-0a1b2c3d4e5f", slug: "chana-masala" }
                ]
              },
              {
                title: "Chinese",
                id: "f6e5d4c3-b2a1-4e7a-b6c5-2d1e4f3a5b6d",
                child: [
                  { title: "Kung Pao Chicken", id: "b3c2a1d4-e5f6-4a7b-8c9d-1e2f3a4b5c6f", slug: "kung-pao-chicken" },
                  { title: "Mapo Tofu", id: "e1f2d3c4-b5a6-4c7b-8d9e-0f1a2b3c4d5f", slug: "mapo-tofu" }
                ]
              },
              {
                title: "Japanese",
                id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5f",
                child: [
                  { title: "Chicken Teriyaki", id: "d1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5g", slug: "chicken-teriyaki" },
                  { title: "Katsu Curry", id: "a2b3c4d5-e6f7-4a8b-9c1d-2e3f4a5b6c7e", slug: "katsu-curry" }
                ]
              },
              {
                title: "Thai",
                id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6g",
                child: [
                  { title: "Pad Thai", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f5", slug: "pad-thai" },
                  { title: "Green Curry", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p2", slug: "green-curry" }
                ]
              },
              {
                title: "Mediterranean",
                id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1e",
                child: [
                  { title: "Greek Salad + Chicken", id: "c1a2b3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6h", slug: "greek-chicken-salad"},
                  { title: "Shakshuka", id: "e2d1c4b3-a6f5-4e8d-9c2b-1a0e5f4d3c2c", slug: "shakshuka"}
                ]
              }
            ]
          },
          {
            title: "Appliance-Guided",
            id: "4b5b8328-909c-4e7f-aafe-d4d7e5b0e457",
            child: [
              {
                title: "Air Fryer",
                id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p3",
                child: [
                  { title: "Air Fryer Chicken Wings", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5b", slug: "air-fryer-chicken-wings" },
                  { title: "Air Fryer Salmon", id: "a3b2c1d4-e5f6-4g7h-i8j9-k0l1m2n3o4p9", slug: "air-fryer-salmon" }
                ]
              },
              {
                title: "Instant Pot / Pressure Cooker",
                id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f6",
                child: [
                  { title: "Instant Pot Beef Chili", id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6j", slug: "instant-pot-beef-chili" },
                  { title: "Instant Pot Butter Chicken", id: "c1a2b3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6k", slug: "instant-pot-butter-chicken" }
                ]
              },
              {
                title: "Oven & Sheet Pan",
                id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1f",
                child: [
                  { title: "Sheet-Pan Chicken & Veggies", id: "e9f8d7c6-b5a4-4c3d-9e2b-1a0e9f8d7c6c", slug: "sheet-pan-chicken-veggies" },
                  { title: "Roasted Salmon & Potatoes", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p4", slug: "roasted-salmon-potatoes" }
                ]
              },
              {
                title: "Stovetop & Wok",
                id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3f",
                child: [
                  { title: "Beef Stir-Fry", id: "d1c2b3a4-e5f6-4d7e-8f9a-0b1c2d3e4f5c", slug: "beef-stir-fry" },
                  { title: "Fried Rice", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f7", slug: "fried-rice-stovetop" }
                ]
              }
            ]
          },
          {
            title: "Meal Prep & Bowls",
            id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5g",
            child: [
              { title: "Chicken Burrito Bowls", id: "b1a2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6l", slug: "chicken-burrito-bowls" },
              { title: "Teriyaki Chicken Bowls", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1g", slug: "teriyaki-chicken-bowls" },
              { title: "Mediterranean Grain Bowls", id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3g", slug: "mediterranean-grain-bowls" },
              { title: "Korean Beef Bowls", id: "a1b2c3d4-e5f6-4g7h-i8j9-k0l1m2n3o4p5", slug: "korean-beef-bowls" }
            ]
          }
        ]
      },
      
      //Sports Frontend
      {
        title: "Sports, Fitness & Outdoors",
        id: "426ad39f-5df5-4a69-b1a8-c63fbe61ec10",
        child: [
          {
            title: "Fitness Equipment",
            id: "328c6f42-9a13-4c6a-95b1-e7d18f732aa8",
            child: [
              { title: "Cardio Machines", id: "dfc54366-e8d5-4c98-bc48-65e4d524c456", slug: 'cardio-machines' },
              { title: "Treadmills", id: "09c9803e-bf5c-4c68-bcf0-fb74830238f3", slug: 'treadmills' },
              { title: "Exercise Bikes", id: "9f8760f6-90e4-448b-a3d4-dba6433eddf2", slug: 'exercise-bikes' },
              { title: "Strength Training", id: "48b96fa5-0ef9-4115-a7aa-4e458e28eeb2", slug: 'strength-training' },
              { title: "Dumbbells", id: "eb85d9da-e2e1-4e3e-bf35-d0218e68f8f4", slug: 'dumbbells' },
              { title: "Weight Benches", id: "a27ac7ef-d6c6-462c-a553-f11d7d18d285", slug: 'weight-benches' },
              { title: "Fitness Accessories", id: "f2b28152-680b-471d-92f5-e3e51d790632", slug: 'fitness-accessories' },
              { title: "Yoga Mats", id: "69a8a342-f67f-41df-aad2-038fa3268a98", slug: 'yoga-mats' },
              { title: "Resistance Bands", id: "03c45395-476c-4d5d-8e7d-25d66f5f6dd6", slug: 'resistance-bands' }
            ]
          },
          {
            title: "Outdoor Recreation",
            id: "cfd4a5c7-3d89-4328-940d-344a2674a70f",
            child: [
              { title: "Camping", id: "2c03da59-6649-42da-bb22-5277f5bff87c", slug: 'camping' },
              { title: "Tents", id: "c6d9fb12-f344-47d8-8dbb-2eaa690b3ebc", slug: 'tents' },
              { title: "Sleeping Bags", id: "0b9b8569-f47c-401f-a0e7-b9b50e3b258f", slug: 'sleeping-bags' },
              { title: "Hiking", id: "f5e91dc4-cc55-4069-99a2-9a2716a58990", slug: 'hiking' },
              { title: "Poles", id: "7baffd16-8465-4f1b-90d1-612b4b32c1a7", slug: 'poles' },
              { title: "Gear", id: "ac4ed5ee-38c1-4761-bb48-ef8c528e7860", slug: 'gear' },
              { title: "Water Sports", id: "3c911690-b0b6-4ee3-a41b-b6a8f8fdf4a0", slug: 'water-sports' },
              { title: "Kayaks", id: "d41900d8-e426-4e48-aadb-93ea2683fc06", slug: 'kayaks' },
              { title: "Life Jackets", id: "3e0f2416-6b72-4871-8a41-97e16fce3142", slug: 'life-jackets' }
            ]
          },
          {
            title: "Team Sports",
            id: "c0e70967-d22b-4525-8b27-3bdef606e289",
            child: [
              { title: "Soccer", id: "b3241e97-2e9c-45b2-97a4-c2602256604a", slug: 'soccer' },
              { title: "Balls", id: "7b946045-4001-4cd6-8c4d-13e86da47426", slug: 'balls' },
              { title: "Apparel", id: "e6ef6e1f-73c2-4639-bd4f-2b05a30b1c5a", slug: 'apparel' },
              { title: "Basketball", id: "88eeb0f8-b473-4e66-aed5-4a022b2c37c4", slug: 'basketball' },
              { title: "Shoes", id: "6273cc4b-bc2e-4c55-88d8-5af4185291c2", slug: 'shoes' },
              { title: "Tennis", id: "e045c3ab-73e2-4d4f-b32e-1e8f1f67d77b", slug: 'tennis' },
              { title: "Rackets", id: "c25cba42-78ea-4f5e-83af-2827bc320c16", slug: 'rackets' },
            ]
          }
        ]
      },
      
      //Automotive Frontend
      {
        title: "Automotive",
        id: "f4b6c0c5-85e7-4c43-98c3-816b8b17e8cf",
        child: [
          {
            title: "Vehicle Parts & Accessories",
            id: "b83443dc-20da-4fd9-a09f-d7b3443e7ad2",
            child: [
              { title: "Car Electronics", id: "a76e501c-2de0-4ff2-97b1-530c9db48676", slug: 'car-electronics' },
              { title: "GPS", id: "9d9285b4-cf78-4243-a6ec-056164ee4b77", slug: 'gps' },
              { title: "Stereos", id: "c7f42050-211f-4d80-a5a5-6c279d88dc4e", slug: 'stereos' },
              { title: "Tools & Equipment", id: "df490b59-6f1d-4d95-8224-21a8e1352e34", slug: 'tools-equipment' },
              { title: "Wrenches", id: "b47ff7c5-580d-4a04-92c1-7f1f04089ef3", slug: 'wrenches' },
              { title: "Jacks", id: "146c681f-8159-4601-b1d6-d4b18ec9dce3", slug: 'jacks' },
              { title: "Replacement Parts", id: "1ef03cb0-67b1-4dc5-8a64-fc8dfc83b7d6", slug: 'replacement-parts' },
              { title: "Brakes", id: "8502e056-80f5-4aa8-9146-53a3b12d5e6c", slug: 'brakes' },
              { title: "Batteries", id: "6b6bc201-bc94-47b1-a65a-56494c03371a", slug: 'batteries' },
              { title: "Interior Accessories", id: "a02f2b1b-768c-49f5-b207-1bb5bfa16214", slug: 'interior-accessories' },
              { title: "Seat Covers", id: "9b52412e-bc92-4860-9d79-d6e7a3d32b70", slug: 'seat-covers' },
              { title: "Floor Mats", id: "03e9dd4f-853c-4a57-a9c2-d6f6d84e59e2", slug: 'floor-mats' },
              { title: "Exterior Accessories", id: "76b66f65-b3f2-485f-a934-f9f5f6cbe540", slug: 'exterior-accessories' },
              { title: "Car Covers", id: "cdbd08f2-6d77-4807-8859-9b5ea7e23e0b", slug: 'car-covers' },
              { title: "Bike Racks", id: "20a7db2c-b4c7-4bd1-8bc6-6f8c3dc6e6de", slug: 'bike-racks' }
            ]
          },
          {
            id: "20a7db2c-b4c7-4bd1-8bc6-6f8c3dc6e6de",
            title: "Auto Customization",
            slug: "auto-customization",
            child: [
              { id: "03d8d7b3-c1f9-4610-8b1b-410a5160a0a5", title: "Wheels & Rims", slug: "wheels-rims" },
              { id: "9b52412e-bc92-4860-9d79-d6e7a3d32b70", title: "Seat Covers", slug: "seat-covers" },
              { id: "6d9e03d4-b78f-4f2a-b7e1-886d34e9e436", title: "Wraps & Decals", slug: "wraps-decals" }
            ]
          }
        ]
      },

      //Special Needs Frontend
      {
        title: "Special Needs & Accessibility",
        id: "c9b589fa-96c6-46c7-a98b-ea2068a5e937",
        child: [
          {
            title: "Mobility Aids",
            id: "2b10ab5d-c140-45d6-9de6-b43234b14a2a",
            child: [
              { title: "Wheelchairs", id: "b4aa65df-dc8b-4d66-931d-e9c728ec73ff", slug: 'wheelchairs' },
              { title: "Walkers", id: "8ae9935f-14b1-46ab-a3f7-d719c4ed3db2", slug: 'walkers' },
              { title: "Canes", id: "5b4f5d7c-2673-45e2-b302-68b43e8e44de", slug: 'canes' },
              { title: "Mobility Scooters", id: "a765eb54-410c-4b3d-b3b4-2b4ae0fb2c64", slug: 'mobility-scooters' }
            ]
          },
          {
            title: "Daily Living Aids",
            id: "a79a48d6-8ed9-4b35-9f8d-3b825b8724d5",
            child: [
              { title: "Dressing Aids", id: "8b23b799-fb9c-4e6e-97ff-0e843d209659", slug: 'dressing-aids' },
              { title: "Eating Aids", id: "db312734-e146-4d03-9705-ea501c1333a2", slug: 'eating-aids' },
              { title: "Bathing Aids", id: "6cfaaf73-9b2b-4bd4-a4c8-81e6fba32f13", slug: 'bathing-aids' },
              { title: "Communication Aids", id: "7b35bcf0-13e2-4943-b8f2-e19e2a5e6f68", slug: 'communication-aids' }
            ]
          },
          {
            title: "Accessibility Equipment",
            id: "d0c9b924-9293-45b3-905c-7fa5241dc132",
            child: [
              { title: "Ramps", id: "fab927ab-c569-4d5f-b637-d4c6ed154a54", slug: 'ramps' },
              { title: "Lifts", id: "81a6c2cc-45de-4e1c-b676-90b1b1e09c06", slug: 'lifts' },
              { title: "Accessible Furniture", id: "517fd112-58c7-4111-9cbf-fdf5c4c2bb0e", slug: 'accessible-furniture' }
            ]
          },
          {
            id: "e4a2503d-2f08-4e6f-b25c-0c1a8a2d1d0f",
            title: "Eyecare & Vision Aids",
            child: [
              {
                id: "c1f7a1b3-4f9e-4c7a-9a0d-8e5f2a1b3c4d",
                title: "Reading Glasses",
                slug: "reading-glasses"
              },
              {
                id: "f5d9c2e0-8b1a-4d6c-8e3b-9c8f7a6d5b4e",
                title: "Contact Lens Care",
                slug: "contact-lens-care"
              },
              {
                id: "b0a6e3d2-7c9b-4e8a-9f5a-2c4d6b8e0f1a",
                title: "Eye Drops & Treatments",
                slug: "eye-drops-treatments"
              },
              {
                id: "a8c5f4e1-3d7b-4a9c-9f2e-0c1b3d5e7f9a",
                title: "Blue Light Filters",
                slug: "blue-light-filters"
              },
              {
                id: "d7b4a6c9-8e5f-4d3a-8b1c-2f9e0a8d7c6b",
                title: "Magnifiers & Low Vision Aids",
                slug: "magnifiers-low-vision-aids"
              },
              {
                id: "f9e0b1c3-6a8d-4b7e-9f0a-3c5d7e9f1a2b",
                title: "Eye Patches & Shields",
                slug: "eye-patches-shields"
              }
            ]
          }
        ]
      },

      //Maternity Frontend
      {
        title: "Maternity & Prenatal Care",
        id: "b12911d2-5286-49a6-8431-6c3e1c8b3b9b",
        child: [
          {
            title: "Maternity Clothing",
            id: "bf5d468a-cfb0-47c1-b1d6-2fce6bb5c241",
            child: [
              { title: "Dresses", id: "e8d8e6c6-c2bb-4053-b5b2-e9075b5946f7", slug: 'dresses' },
              { title: "Tops", id: "688b69a1-612c-4bd1-8451-0d735e64b7d4", slug: 'tops' },
              { title: "Bottoms", id: "6acb8fb6-6820-4235-9cc6-f66f7b527a7f", slug: 'bottoms' },
            ]
          },
          {
            title: "Prenatal Care",
            id: "ef89b1d6-e556-408f-b4f1-d60b0ae39380",
            child: [
              { title: "Vitamins", id: "4bf4b308-0b37-4ee1-9255-8c413dc634b6", slug: 'vitamins' },
              { title: "Support Bands", id: "91bd093d-115f-4d95-82f0-3c3c2d5e6e80", slug: 'support-bands' },
              { title: "Pregnancy Pillows", id: "9bc8e2dc-6819-4d70-a8f8-5c82ed830d96", slug: 'pregnancy-pillows' },
              { title: "Skincare", id: "6e7a9ad7-4c59-4850-91a1-f8301b5e356c", slug: 'skincare' }
            ]
          },
          {
            title: "Baby Essentials",
            id: "de012745-2743-4b4b-a469-f7b5f7a5e8c4",
            child: [
              { title: "Clothing", id: "d93c76ae-654c-499d-aed8-3b72c69fd50b", slug: "clothing" },
              { title: "Diapers", id: "4b5b8328-909c-4e7f-aafe-d4d7e5b0e457", slug: "diapers" },
              { title: "Disposable Diapers", id: "c1a2f3a6-5e8c-4d7a-8d1e-8a5b2e0c1f5d", slug: "disposable-diapers" },
              { title: "Cloth Diapers", id: "a9b8c7d6-e5f4-4a3b-9c2d-1e0f2d3c4b5a", slug: "cloth-diapers" },
              { title: "Feeding", id: "c3256b0f-3e45-498e-a834-df8b6b1d6759", slug: "feeding" },
              { title: "Bottles", id: "e8c7b6a5-d4e3-4f2b-a1c0-b9d8c7a6e5f4", slug: "bottles" },
              { title: "Breastfeeding Accessories", id: "f5e4d3c2-b1a0-49b8-8c7d-6a5f4e3d2c1b", slug: "breastfeeding-accessories" },
              { title: "Baby Gear", id: "1d0c2b3a-4e5f-4d6c-8e7f-9a8b0c1d2e3f", slug: "baby-gear" },
              { title: "Strollers", id: "5f4e3d2c-1b0a-49b8-8c7d-6a5f4e3d2c1b", slug: "strollers" },
              { title: "Car Seats", id: "3c2b1a0d-4e5f-4d6c-8e7f-9a8b0c1d2e3f", slug: "car-seats" },
              { title: "Carriers", id: "7a6b5c4d-8e9f-4d3c-2b1a-0d9c8b7a6f5e", slug: "carriers" },
              { title: "Nursery", id: "2edb6a23-6e6d-44a7-94cf-f66ec5d857b7", slug: "nursery" },
              { title: "Cribs", id: "9d8c7b6a-5f4e-4d3c-2b1a-0d9c8b7a6f5e", slug: "cribs" },
              { title: "Changing Tables", id: "b1c0d9e8-7f6e-4c5d-3b2a-1e0f9d8c7b6a", slug: "changing-tables" },
              { title: "Baby Monitors", id: "f4e3d2c1-b0a9-8c7d-6e5f-4d3c2b1a0d9c", slug: "baby-monitors" },
              { title: "Baby Proofing", id: "c7b6a5f4-e3d2-4c1b-0a9d-8c7b6a5f4e3d", slug: "baby-proofing" }
            ]
          }
        ]
      },

      //Senior care Frontend
      {
        id: "785fbee8-74f6-469f-a59b-9039969c4e13",
        title: "Senior Care",
        child: [
          {
            id: "412ec064-8b2e-4521-8c56-f3a742854324",
            title: "Health & Wellness",
            child: [
              { id: "c3747f8f-50c7-4168-b3c2-cc8a328e40b2", title: "Supplements", slug: 'supplements' },
              { id: "73a41941-891e-403e-b53f-ded234949ba8", title: "Monitors", slug: 'monitors' },
              { id: "a6d22dfb-40de-4ca5-88bb-36caeaff3b9d", title: "Mobility Aids", slug: 'mobility-aids' },
              { id: "02ea08b4-7ab7-465d-9a05-a8b11b1433dd", title: "Vision & Hearing Aids", slug: 'vision-hearing-aids' }
            ]
          },
          {
            id: "4e79cf49-84e3-49eb-8453-b9ad412b5d9d",
            title: "Comfort & Care",
            child: [
              { id: "3e2cf0cb-0db0-45be-98c7-585da5d5a48a", title: "Recliners", slug: 'recliners' },
              { id: "6a79b8f5-3e37-454e-8fc4-de8efb407254", title: "Cushions", slug: 'cushions' },
              { id: "2b706c34-7cbe-419c-afc0-42bc9cedbd5a", title: "Adjustable Beds", slug: 'adjustable-beds' },
              { id: "d0c2f399-9228-40af-9914-faacd023ab07", title: "Daily Living Aids", slug: 'daily-living-aids' }
            ]
          },
          {
            id: "1eb7dd80-805d-4b50-a305-f6a9633e6e26",
            title: "Recreation & Leisure",
            child: [
              { id: "9db34332-ea0b-492b-aa38-931e5ea3e410", title: "Puzzles", slug: 'puzzles' },
              { id: "26e80424-db5d-49d1-a83e-4ed850fa5941", title: "Books", slug: 'books' }
            ]
          }
        ]
      }
    ],
  },
];

export default CATEGORIES_DATA;