// utils/enrichProduct.ts
//
// ⚠️  TEMPORARY FRONTEND WORKAROUND
//
// Your images currently have colorCode: null in the database.
// The REAL fix is to tag each image with the correct colorCode
// when uploading/assigning images in your backend CMS/admin.
//
// Once your backend populates colorCode on images, DELETE this file
// and remove the enrichProductImages() call from index.tsx entirely.

interface RawProduct {
  [key: string]: any
}

export function enrichProductImages(product: RawProduct): RawProduct {
  return product
}