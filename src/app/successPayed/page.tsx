export default function SuccessPage() {
  return (
    <main className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
      <p className="text-lg text-gray-600">Thank you for your purchase!</p>
      <a href="/" className="inline-block mt-6 text-blue-600 underline">
        Go back to homepage
      </a>
    </main>
  );
}
