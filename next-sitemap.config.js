/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://kingreal.com.vn',
    generateRobotsTxt: true,
    exclude: ['/admin*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: ['/admin'],
            },
        ],
    },
};
