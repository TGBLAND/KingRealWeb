/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://kingreal.com.vn',
    changefreq: 'daily',
    priority: 0.8,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    transform: async (config, path) => {
        let priority = config.priority
        let changefreq = config.changefreq

        if (path === '/') {
            priority = 1.0
            changefreq = 'hourly'
        }

        return {
            loc: path,
            changefreq: changefreq,
            priority: priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    },
    exclude: ['/404', '/500', '/admin', '/admin/*', '/auth', '/auth/*'],
}
