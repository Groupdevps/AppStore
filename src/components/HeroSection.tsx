
export default function HeroSection() {
  return (
    <section className="relative bg-white py-16 px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between">
      <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img
          src="/hero-model.png"
          alt="Hero Model"
          className="max-w-sm w-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <p className="text-gray-500 text-sm">Best Price: <span className="font-bold">$860</span></p>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
          NEW ARRIVAL <br />
          <span className="text-pink-500">70% OFF THIS WINTER</span>
        </h1>
        <p className="text-gray-600">
          There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form.
        </p>
        <button className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-600 transition">
          Shop Now
        </button>
      </div>

      
      
    </section>
  );
}