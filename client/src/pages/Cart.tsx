// Cart page with global currency support
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, Tag, Lock, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cartContext";
import { useCurrency } from "@/lib/currencyContext";

export default function Cart() {
  const [, setLocation] = useLocation();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const { items: cartItems, removeFromCart, updateQuantity } = useCart();
  const { formatPrice, country } = useCurrency();  // Use global currency formatting
  
  // Tax labels based on selected country
  // India: GST split into SGST + CGST (9% each = 18% total)
  // USA: Sales Tax (varies by state, using ~9% average)
  // UK: VAT (20%)
  // Others: Service Tax (18%)
  const getTaxInfo = () => {
    switch (country) {
      case "India":
        return { label1: "SGST (9%)", label2: "CGST (9%)", rate1: 0.09, rate2: 0.09 };
      case "USA":
        return { label1: "Sales Tax (9%)", label2: null, rate1: 0.09, rate2: 0 };
      case "UK":
        return { label1: "VAT (20%)", label2: null, rate1: 0.20, rate2: 0 };
      default:
        return { label1: "Tax (9%)", label2: "Service Tax (9%)", rate1: 0.09, rate2: 0.09 };
    }
  };
  
  const taxInfo = getTaxInfo();

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + delta);
    }
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * 0.1 : 0;
  const tax1 = (subtotal - discount) * taxInfo.rate1;
  const tax2 = (subtotal - discount) * taxInfo.rate2;
  const total = subtotal - discount + tax1 + tax2;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] text-white py-8 sm:py-12 md:py-16 mt-16 sm:mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-cart-title">
            MY CART
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="flex-1 py-6 sm:py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-16 md:py-20"
            >
              <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 text-gray-300" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-700">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Start adding courses to your cart!</p>
              <Button
                onClick={() => setLocation("/courses")}
                className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8"
                data-testid="button-continue-shopping-empty"
              >
                Continue Shopping
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-[65fr_35fr] gap-6 lg:gap-8">
              {/* LEFT SIDE - Cart Items */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h2>
                  <span className="text-sm sm:text-base text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 sm:p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow" data-testid={`card-cart-item-${item.id}`}>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Course Thumbnail */}
                          <div className="flex-shrink-0 w-full sm:w-32">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded-lg"
                              data-testid={`img-cart-item-${item.id}`}
                            />
                          </div>

                          {/* Course Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-primary flex-1" data-testid={`text-cart-title-${item.id}`}>
                                {item.title}
                              </h3>
                              {/* Remove Button - Mobile Top Right */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                data-testid={`button-cart-remove-${item.id}`}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                              <span className="flex items-center gap-1">
                                <span className="font-medium">Duration:</span> {item.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="font-medium">Format:</span> {item.format}
                              </span>
                            </div>

                            {/* Price - Show on mobile at top */}
                            <div className="flex items-center justify-between sm:hidden mb-4">
                              <div>
                                <div className="text-xl font-bold text-primary" data-testid={`text-cart-price-mobile-${item.id}`}>
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                                <div className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.originalPrice * item.quantity)}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              {/* Quantity Selector */}
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 font-medium">Quantity:</span>
                                <div className="flex items-center bg-gray-100 rounded-lg">
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, -1)}
                                    className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                                    data-testid={`button-cart-decrease-${item.id}`}
                                  >
                                    <Minus className="w-4 h-4 text-primary" />
                                  </button>
                                  <span className="px-4 text-primary font-medium" data-testid={`text-cart-quantity-${item.id}`}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleUpdateQuantity(item.id, 1)}
                                    className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                                    data-testid={`button-cart-increase-${item.id}`}
                                  >
                                    <Plus className="w-4 h-4 text-primary" />
                                  </button>
                                </div>
                              </div>

                              {/* Price - Desktop */}
                              <div className="hidden sm:block text-right">
                                <div className="text-xl font-bold text-primary" data-testid={`text-cart-price-${item.id}`}>
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                                <div className="text-sm text-gray-500 line-through" data-testid={`text-cart-original-price-${item.id}`}>
                                  {formatPrice(item.originalPrice * item.quantity)}
                                </div>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Item Subtotal:</span>
                                <span className="text-base sm:text-lg font-semibold text-primary" data-testid={`text-cart-subtotal-${item.id}`}>
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/schedule")}
                    className="text-primary border-primary hover:bg-primary/10 w-full sm:w-auto"
                    data-testid="button-continue-shopping"
                  >
                    ← Continue Shopping
                  </Button>
                </div>
              </div>

              {/* RIGHT SIDE - Order Summary */}
              <div>
                <Card className="p-4 sm:p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none" data-testid="card-order-summary">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 text-primary flex items-center gap-2">
                    <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    Order Summary
                  </h3>

                  {/* Price Breakdown - Uses formatPrice for currency conversion */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-semibold" data-testid="text-summary-subtotal">{formatPrice(subtotal)}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-sm sm:text-base text-green-600">
                        <span>Discount (10%):</span>
                        <span className="font-semibold" data-testid="text-summary-discount">-{formatPrice(discount)}</span>
                      </div>
                    )}

                    {/* Tax 1 - Primary tax (SGST/Sales Tax/VAT based on country) */}
                    <div className="flex justify-between text-sm sm:text-base text-gray-700">
                      <span>{taxInfo.label1}:</span>
                      <span className="font-semibold" data-testid="text-summary-tax1">{formatPrice(Math.round(tax1))}</span>
                    </div>

                    {/* Tax 2 - Secondary tax (CGST for India, or combined tax) */}
                    {taxInfo.label2 && (
                      <div className="flex justify-between text-sm sm:text-base text-gray-700">
                        <span>{taxInfo.label2}:</span>
                        <span className="font-semibold" data-testid="text-summary-tax2">{formatPrice(Math.round(tax2))}</span>
                      </div>
                    )}

                    <div className="pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-bold text-primary">Total:</span>
                        <span className="text-xl sm:text-2xl font-bold text-primary" data-testid="text-summary-total">
                          {formatPrice(Math.round(total))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                      Have a promo code?
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 border-[#E5E7EB] text-sm sm:text-base"
                        data-testid="input-coupon-code"
                        disabled={appliedCoupon}
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10 text-sm sm:text-base"
                        disabled={appliedCoupon || !couponCode.trim()}
                        data-testid="button-apply-coupon"
                      >
                        {appliedCoupon ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={() => setLocation("/checkout")}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-11 sm:h-12 text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                    data-testid="button-proceed-checkout"
                  >
                    Proceed to Checkout →
                  </Button>

                  {/* Trust Indicators */}
                  <div className="text-center text-xs text-gray-500 space-y-1.5 sm:space-y-2">
                    <p className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <Lock className="w-3 h-3" /> Secure SSL encrypted payment
                    </p>
                    <p className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <CreditCard className="w-3 h-3" /> Multiple payment options available
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
