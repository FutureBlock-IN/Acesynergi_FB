// Added CurrencyProvider for global country/city/currency state management
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/lib/cartContext";
import { CurrencyProvider } from "@/lib/currencyContext";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import CourseDetails from "@/pages/CourseDetails";
import Schedule from "@/pages/Schedule";
import Corporate from "@/pages/Corporate";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import PaymentSuccess from "@/pages/PaymentSuccess";
import BookConsultation from "@/pages/BookConsultation";
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import Disclaimer from "@/pages/Disclaimer";
import ReschedulingPolicy from "@/pages/ReschedulingPolicy";
import AboutUs from "@/pages/AboutUs";
import Blog from "@/pages/Blog";
import BlogList from "@/pages/BlogList";
import BlogDetail from "@/pages/BlogDetail";
import BlogAdmin from "@/pages/BlogAdmin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CourseDetails} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/corporate" component={Corporate} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/book-consultation" component={BookConsultation} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/rescheduling-policy" component={ReschedulingPolicy} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blogs" component={BlogList} />
      <Route path="/blogs/admin/:secretKey" component={BlogAdmin} />
      <Route path="/blogs/:slug" component={BlogDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CurrencyProvider>
          <CartProvider>
            <Toaster />
            <Router />
          </CartProvider>
        </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
