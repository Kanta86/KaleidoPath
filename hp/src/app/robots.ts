import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/'],
        },
        sitemap: 'https://kaleidopath.com/sitemap.xml', // Domain not strictly known, assuming or skipping domain if unknown. 
        // I will use a relative URL or placeholder domain if not provided.
        // User didn't provide domain. I will omit domain or use example.com.
        // Sitemap path usually requires absolute URL.
        // I will use https://kaleidopath.com for now as placeholder.
    }
}
