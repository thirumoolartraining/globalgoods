import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { Layout } from "@/components/layout";
import { ScrollToTop } from "@/components/scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Shop from "@/pages/shop";
import Product from "@/pages/product";
import Export from "@/pages/export";
import Contact from "@/pages/contact";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import ThankYou from "@/pages/thank-you";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import ShippingPolicy from "@/pages/shipping-policy";
import CancellationRefund from "@/pages/cancellation-refund";
import TestTailwind from "./test-tailwind";

function DebugRoute({ path, component: Component, ...props }: any) {
  console.log(`DebugRoute: Checking path ${path}`);
  return (
    <Route path={path} {...props}>
      {(params: any) => {
        console.log(`DebugRoute: Matched ${path} with params`, params);
        return <Component {...params} />;
      }}
    </Route>
  );
}

function Router() {
  console.log('Router rendering, current path:', window.location.pathname);
  
  return (
    <Layout>
      <Switch>
        <Route path="/test-route">
          <div>Test Route Works!</div>
        </Route>
        <DebugRoute path="/" component={Home} />
        <DebugRoute path="/about" component={About} />
        <DebugRoute path="/shop" component={Shop} />
        <DebugRoute path="/product/:id" component={Product} />
        <DebugRoute path="/export" component={Export} />
        <DebugRoute path="/contact" component={Contact} />
        <DebugRoute path="/cart" component={Cart} />
        <DebugRoute path="/checkout" component={Checkout} />
        <DebugRoute path="/thank-you/:orderId?" component={ThankYou} />
        <DebugRoute path="/privacy" component={Privacy} />
        <DebugRoute path="/terms" component={Terms} />
        <DebugRoute path="/shipping-policy" component={ShippingPolicy} />
        <DebugRoute path="/cancellation-refund" component={CancellationRefund} />
        <Route path="/test-tailwind" component={TestTailwind} />
        <Route>
          {() => {
            console.log('No route matched, showing NotFound');
            return <NotFound />;
          }}
        </Route>
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
