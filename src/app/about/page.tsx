import { Leaf, MessageCircle, BadgeCheck, Heart } from "lucide-react";
export default function About() {
  return (
   <main className="bg-white text-gray-800 px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Julie Fashion</h1>

      <section className="mb-8">
        <p className="text-lg mb-4">
          At Julie Fashion, we believe that clothing should empower and inspire. Founded in 2020, our mission is to provide high-quality, stylish clothing that makes you feel confident every day.
        </p>
        <p className="text-lg">
          From timeless pieces to modern designs, our collections are crafted with care and passion by our talented design team.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
        <p>
          Julie Fashion began as a small boutique in Bogotá, born out of a love for fashion and a desire to make quality accessible. Today, we ship worldwide and serve thousands of customers who love our attention to detail and unique designs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <Leaf className="w-5 h-5 text-green-600"/>
            <span>Sustainable fabrics</span>            
          </li>
          <li className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-blue-600"/>
            <span>Transparent communication</span>            
          </li>
          <li className="flex items-center space-x-3">
            <BadgeCheck className="w-5 h-5 text-purple-600"/>
            <span>Fair working conditions</span>            
          </li>
          <li className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-pink-600"/>
            <span>Customer-first service</span>            
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p>
          Questions or suggestions? <a href="/contact" className="text-pink-600 underline">Contact us here</a>.
        </p>
      </section>
    </main>
  )
}