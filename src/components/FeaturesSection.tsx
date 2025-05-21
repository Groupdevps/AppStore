import { Truck, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-pink-500" />,
    title: "Free Shipping",
    subtitle: "On all orders over $100",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-pink-500" />,
    title: "Secure Payment",
    subtitle: "100% secure payment",
  },
  {
    icon: <Headphones className="w-8 h-8 text-pink-500" />,
    title: "24/7 Support",
    subtitle: "Ready to assist anytime",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            {feature.icon}
            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
