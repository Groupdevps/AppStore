const STORAGE_KEY = "recentlyViewed";

export function saveViewedProduct(productId: string) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  let viewed = stored ? JSON.parse(stored) : [];

  // Evitar duplicados
  if (!viewed.includes(productId)) {
    viewed.push(productId);
    if (viewed.length > 20) viewed = viewed.slice(-20); // Máximo 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
  }
}

export function getViewedProducts(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
