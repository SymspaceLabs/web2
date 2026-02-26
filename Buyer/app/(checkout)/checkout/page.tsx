"use client"

import { useState, useEffect } from "react"
import { CreditCard, Truck, ShieldCheck, ChevronRight, Trash2, Plus, Minus, Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  salePrice?: number
  quantity: number
  color?: string
  size?: string
  stock: number
}

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentMethod {
  type: 'card' | 'paypal' | 'cod'
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      price: 49.99,
      salePrice: 39.99,
      quantity: 2,
      color: "Navy Blue",
      size: "L",
      stock: 10
    },
    {
      id: "2",
      name: "Classic Denim Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      price: 89.99,
      quantity: 1,
      color: "Dark Wash",
      size: "32",
      stock: 5
    }
  ])

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod['type']>('card')
  const [shippingMethod, setShippingMethod] = useState<string>('standard')
  const [saveInfo, setSaveInfo] = useState(false)
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 0 },
    { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: 15.00 },
    { id: 'overnight', name: 'Overnight Shipping', time: '1 business day', price: 29.99 }
  ]

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice || item.price
    return sum + (price * item.quantity)
  }, 0)

  const shippingCost = shippingOptions.find(s => s.id === shippingMethod)?.price || 0
  const tax = subtotal * 0.08 // 8% tax
  const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount
  const total = subtotal + shippingCost + tax - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
    }
  }

  const handleSubmit = () => {
    console.log('Order submitted:', {
      items: cartItems,
      shipping: shippingAddress,
      payment: paymentMethod,
      total
    })
    alert('Order placed successfully!')
  }

  return (
    <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="size-4" />
                Continue Shopping
            </Button>
            <h1 className="text-xl font-semibold">Secure Checkout</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="size-4" />
                <span className="hidden sm:inline">SSL Secured</span>
            </div>
            </div>
        </div>
        </header>

        <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        1
                    </div>
                    <h2 className="text-lg font-semibold">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                        id="firstName"
                        required
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                        placeholder="John"
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                        id="lastName"
                        required
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                        placeholder="Doe"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                        id="email"
                        type="email"
                        required
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                        placeholder="john.doe@example.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                        id="phone"
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        />
                    </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        2
                    </div>
                    <h2 className="text-lg font-semibold">Shipping Address</h2>
                    </div>

                    <div className="space-y-4">
                    <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                        id="address"
                        required
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        placeholder="123 Main Street"
                        />
                    </div>
                    <div>
                        <Label htmlFor="apartment">Apartment, Suite, etc. (Optional)</Label>
                        <Input
                        id="apartment"
                        value={shippingAddress.apartment}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                        placeholder="Apt 4B"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            required
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            placeholder="New York"
                        />
                        </div>
                        <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                            value={shippingAddress.state}
                            onValueChange={(value) => setShippingAddress({ ...shippingAddress, state: value })}
                        >
                            <SelectTrigger id="state">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                            id="zipCode"
                            required
                            value={shippingAddress.zipCode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                            placeholder="10001"
                        />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="country">Country *</Label>
                        <Select
                        value={shippingAddress.country}
                        onValueChange={(value) => setShippingAddress({ ...shippingAddress, country: value })}
                        >
                        <SelectTrigger id="country">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                        id="saveInfo"
                        checked={saveInfo}
                        onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                        />
                        <label
                        htmlFor="saveInfo"
                        className="text-sm text-muted-foreground cursor-pointer"
                        >
                        Save this information for next time
                        </label>
                    </div>
                    </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        3
                    </div>
                    <h2 className="text-lg font-semibold">Shipping Method</h2>
                    </div>

                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="space-y-3">
                        {shippingOptions.map((option) => (
                        <div
                            key={option.id}
                            className={cn(
                            "flex items-center justify-between p-4 rounded-lg border-2 transition-colors cursor-pointer",
                            shippingMethod === option.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground"
                            )}
                            onClick={() => setShippingMethod(option.id)}
                        >
                            <div className="flex items-center gap-3">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <div>
                                <label htmlFor={option.id} className="font-medium cursor-pointer">
                                {option.name}
                                </label>
                                <p className="text-sm text-muted-foreground">{option.time}</p>
                            </div>
                            </div>
                            <span className="font-semibold">
                            {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                            </span>
                        </div>
                        ))}
                    </div>
                    </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="bg-background rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        4
                    </div>
                    <h2 className="text-lg font-semibold">Payment Method</h2>
                    </div>

                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod['type'])}>
                    <div className="space-y-3 mb-4">
                        <div
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-lg border-2 transition-colors cursor-pointer",
                            paymentMethod === 'card'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                        onClick={() => setPaymentMethod('card')}
                        >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="size-5" />
                        <label htmlFor="card" className="font-medium cursor-pointer flex-1">
                            Credit / Debit Card
                        </label>
                        </div>
                        <div
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-lg border-2 transition-colors cursor-pointer",
                            paymentMethod === 'paypal'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                        onClick={() => setPaymentMethod('paypal')}
                        >
                        <RadioGroupItem value="paypal" id="paypal" />
                        <div className="size-5 bg-blue-600 rounded-sm" />
                        <label htmlFor="paypal" className="font-medium cursor-pointer flex-1">
                            PayPal
                        </label>
                        </div>
                        <div
                        className={cn(
                            "flex items-center gap-3 p-4 rounded-lg border-2 transition-colors cursor-pointer",
                            paymentMethod === 'cod'
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        )}
                        onClick={() => setPaymentMethod('cod')}
                        >
                        <RadioGroupItem value="cod" id="cod" />
                        <Truck className="size-5" />
                        <label htmlFor="cod" className="font-medium cursor-pointer flex-1">
                            Cash on Delivery
                        </label>
                        </div>
                    </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t">
                        <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                            id="cardNumber"
                            required
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                        />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input
                            id="expiry"
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            />
                        </div>
                        <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                            id="cvv"
                            required
                            placeholder="123"
                            maxLength={4}
                            />
                        </div>
                        </div>
                        <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                            id="cardName"
                            required
                            placeholder="John Doe"
                        />
                        </div>
                        <div className="flex items-center space-x-2">
                        <Checkbox
                            id="billingAddress"
                            checked={useShippingAsBilling}
                            onCheckedChange={(checked) => setUseShippingAsBilling(checked as boolean)}
                        />
                        <label
                            htmlFor="billingAddress"
                            className="text-sm text-muted-foreground cursor-pointer"
                        >
                            Billing address same as shipping
                        </label>
                        </div>
                    </div>
                    )}
                </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                <div className="bg-background rounded-lg p-6 shadow-sm sticky top-24">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                        <div className="relative size-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                            <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 right-1 bg-background size-5 rounded-full flex items-center justify-center text-xs font-semibold">
                            {item.quantity}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium truncate">{item.name}</h3>
                            {item.color && (
                            <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                            )}
                            {item.size && (
                            <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                            <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="size-6 rounded border flex items-center justify-center hover:bg-muted"
                            >
                                <Minus className="size-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="size-6 rounded border flex items-center justify-center hover:bg-muted"
                            >
                                <Plus className="size-3" />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="ml-auto text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="size-4" />
                            </button>
                            </div>
                        </div>
                        <div className="text-sm font-semibold">
                            ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                        </div>
                        </div>
                    ))}
                    </div>

                    <Separator className="my-4" />

                    {/* Promo Code */}
                    <div className="mb-4">
                    <Label htmlFor="promo" className="text-sm">Promo Code</Label>
                    <div className="flex gap-2 mt-1">
                        <Input
                        id="promo"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        />
                        <Button
                        type="button"
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        >
                        {promoApplied ? 'Applied' : 'Apply'}
                        </Button>
                    </div>
                    {promoApplied && (
                        <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>
                    )}
                    </div>

                    <Separator className="my-4" />

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                        <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span className="font-medium">-${discount.toFixed(2)}</span>
                        </div>
                    )}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between text-base font-semibold mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                    </div>

                    <Button type="submit" size="lg" className="w-full mb-4" onClick={handleSubmit}>
                    <Lock className="size-4 mr-2" />
                    Place Order
                    </Button>

                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <ShieldCheck className="size-3" />
                        <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Truck className="size-3" />
                        <span>Free Returns</span>
                    </div>
                    </div>
                </div>
                </div>
          </div>
        </div>
      </div>
  )
}