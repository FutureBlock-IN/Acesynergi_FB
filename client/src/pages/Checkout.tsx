import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShoppingCart, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cartContext";
import { useCurrency } from "@/lib/currencyContext";
import PayPalButton from "@/components/PayPalButton";
import { useToast } from "@/hooks/use-toast";

const SUPPORTED_PAYPAL_CURRENCIES = ["USD", "GBP", "EUR", "CAD", "AUD", "JPY", "SGD"];

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items: cartItems, clearCart } = useCart();
  const { formatPrice, country, currencyCode } = useCurrency();
  const { toast } = useToast();
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const getPaymentCurrency = () => {
    if (SUPPORTED_PAYPAL_CURRENCIES.includes(currencyCode)) {
      return currencyCode;
    }
    return "USD";
  };

  const paymentCurrency = getPaymentCurrency();
  const isFallbackCurrency = paymentCurrency !== currencyCode && currencyCode !== "USD";

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
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax1 = subtotal * taxInfo.rate1;
  const tax2 = subtotal * taxInfo.rate2;
  const total = subtotal + tax1 + tax2;

  const formatPaymentAmount = (amount: number) => {
    return amount.toFixed(2);
  };

  const handlePaymentSuccess = (data: any) => {
    console.log("Payment successful:", data);
    clearCart();
    setLocation("/payment-success");
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
    setPaymentError("Payment failed. Please try again or use a different payment method.");
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your payment. Please try again.",
      variant: "destructive",
      duration: 5000,
    });
  };

  const handlePaymentCancel = () => {
    toast({
      title: "Payment Cancelled",
      description: "You cancelled the payment. Your cart items are still saved.",
      duration: 5000,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <section className="relative bg-[#1a1a1a] text-white py-8 sm:py-12 md:py-16 mt-16 sm:mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-checkout-title">
              CHECKOUT
            </h1>
          </div>
        </section>

        <section className="flex-1 py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ShoppingCart className="w-20 h-20 mx-auto mb-6 text-gray-300" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some courses to proceed with checkout.</p>
              <Button
                onClick={() => setLocation("/courses")}
                className="bg-primary hover:bg-primary/90 text-white px-8"
                data-testid="button-browse-courses"
              >
                Browse Courses
              </Button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="relative bg-[#1a1a1a] text-white py-8 sm:py-12 md:py-16 mt-16 sm:mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-checkout-title">
            CHECKOUT
          </h1>
        </div>
      </section>

      <section className="flex-1 py-8 md:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/cart")}
            className="mb-6 text-primary hover:bg-primary/10"
            data-testid="button-back-to-cart"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>

          <div className="grid md:grid-cols-[1fr_380px] gap-8">
            <div>
              <Card className="p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none mb-6">
                <h2 className="text-xl font-bold mb-4 text-primary">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0"
                      data-testid={`checkout-item-${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {isFallbackCurrency && (
                <Card className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-800 font-medium">Currency Notice</p>
                      <p className="text-sm text-amber-700 mt-1">
                        {currencyCode} is not supported by PayPal. You will be charged in USD.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {paymentError && (
                <Card className="p-4 bg-red-50 rounded-xl border border-red-200 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-800 font-medium">Payment Error</p>
                      <p className="text-sm text-red-700 mt-1">{paymentError}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div>
              <Card className="p-6 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border-none sticky top-24">
                <h3 className="text-lg font-bold mb-6 pb-4 border-b border-gray-200 text-primary">
                  Payment Details
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold" data-testid="text-checkout-subtotal">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>{taxInfo.label1}:</span>
                    <span className="font-semibold">{formatPrice(Math.round(tax1))}</span>
                  </div>

                  {taxInfo.label2 && (
                    <div className="flex justify-between text-gray-700">
                      <span>{taxInfo.label2}:</span>
                      <span className="font-semibold">{formatPrice(Math.round(tax2))}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">Total:</span>
                      <span className="text-2xl font-bold text-primary" data-testid="text-checkout-total">
                        {formatPrice(Math.round(total))}
                      </span>
                    </div>
                    {isFallbackCurrency && (
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        Charged as: ${formatPaymentAmount(total)} USD
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-3">Pay with PayPal</p>
                    <PayPalButton
                      amount={formatPaymentAmount(total)}
                      currency={paymentCurrency}
                      intent="CAPTURE"
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      onCancel={handlePaymentCancel}
                    />
                  </div>

                  <div className="text-center text-xs text-gray-500 space-y-1.5">
                    <p className="flex items-center justify-center gap-2">
                      <Lock className="w-3 h-3" /> Secure SSL encrypted payment
                    </p>
                    <p>Your payment is processed securely through PayPal</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
