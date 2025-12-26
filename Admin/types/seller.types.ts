// types/seller.types.ts
export interface Seller {
  id: string
  entityName: string
  legalName: string
  ein: string
  slug: string
  website: string
  location: string
  address1: string
  address2: string
  city: string
  state: string
  country: string
  zip: string
  gmv: string
  category: string
  businessPhone: string
  emailSupport: string
  phoneSupport: string
  description: string
  tagLine: string
  logo: string
  banner: string
  web: string
  instagram: string
  twitter: string
  youtube: string
  facebook: string
  isOnboardingFormFilled: boolean
  userId: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    isVerified: boolean
    createdAt: string
    updatedAt?: string
  }
  products: Array<{ id: string }>
  createdAt?: string
  updatedAt?: string
}