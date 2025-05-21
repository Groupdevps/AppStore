export default function ContactPage() {
  return (
    <main className="bg-white px-6 py-12 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="mb-8 text-lg">
        We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to get in touch.
      </p>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Other ways to reach us</h2>
        <p>Email: <a href="mailto:support@juliefashion.com" className="text-pink-600 underline">support@storeapp.com</a></p>
        <p>Phone: <span className="text-gray-700">+57 123 456 7890</span></p>
        <p>Location: Bogotá, Colombia</p>
      </div>
    </main>
  );
}