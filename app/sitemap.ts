import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ig-downloader.com', // Update with your domain
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
