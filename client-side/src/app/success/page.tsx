'use client';
import Button from "../../components/Button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId');
  return (
    <>
      {orderId && (
        <Button href={`http://localhost:5000/api/orders/${orderId}/invoice?type=A4`}>
          Download PDF Invoice
        </Button>
      )}
      <Button href="/" className="mt-4">
        Back to Home
      </Button>
    </>
  );
}

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="text-5xl mb-4">🌿</div>
      <h1 className="text-3xl font-bold mb-2 text-forest-accent">Thank You for Your Order!</h1>
      <p className="text-forest-soft mb-8">
        Your order was placed successfully. We’ve sent a confirmation email with your invoice and order details.
      </p>
      <Suspense>
        <SuccessContent />
      </Suspense>
    </div>
  );
} 