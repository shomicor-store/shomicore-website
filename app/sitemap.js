import sql from '@/lib/db';

export default async function sitemap() {
  const baseUrl = 'https://shomicore.es';

  // 1. Establish your static storefront core navigation paths
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/checkout`, lastModified: new Date() },
  ];

  try {
    // ⚡ THE ARCHITECTURAL FIX: Swapped updated_at for created_at to match your table schema fields!
    const products = await sql`SELECT slug, created_at FROM products`;

    const dynamicProductRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      // Fall back safely to created_at variables timestamp maps
      lastModified: product.created_at ? new Date(product.created_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Combine paths into a single unified indexing array mapping
    return [...staticRoutes, ...dynamicProductRoutes];
  } catch (error) {
    console.error("Sitemap compilation database query bypass:", error);
    return staticRoutes;
  }
}
