#!/usr/bin/env node

/**
 * SEO Validation Script for folio.sh
 * 
 * This script checks:
 * - Metadata tags (title, description, Open Graph, Twitter Cards)
 * - JSON-LD structured data
 * - robots.txt accessibility and content
 * - sitemap.xml accessibility and structure
 * - Canonical URLs
 * - Image optimization hints
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const COLORS = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    bold: '\x1b[1m',
};

const log = {
    success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
    error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
    warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
    info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
    header: (msg) => console.log(`\n${COLORS.bold}${msg}${COLORS.reset}\n`),
};

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

async function checkRobotsTxt() {
    log.header('📋 Checking robots.txt');

    try {
        const response = await fetchWithTimeout(`${BASE_URL}/robots.txt`);

        if (!response.ok) {
            log.error(`robots.txt returned ${response.status}`);
            return false;
        }

        const content = await response.text();

        // Check for essential directives
        const checks = [
            { test: /User-Agent:/i.test(content), msg: 'User-agent directive found' },
            { test: content.includes('Sitemap:'), msg: 'Sitemap directive found' },
            { test: content.includes('Allow:') || content.includes('Disallow:'), msg: 'Crawl directives found' },
        ];

        checks.forEach(({ test, msg }) => {
            if (test) {
                log.success(msg);
            } else {
                log.error(msg.replace('found', 'missing'));
            }
        });

        log.info(`robots.txt size: ${content.length} bytes`);
        return true;
    } catch (error) {
        log.error(`Failed to fetch robots.txt: ${error.message}`);
        return false;
    }
}

async function checkSitemap() {
    log.header('🗺️  Checking sitemap.xml');

    try {
        const response = await fetchWithTimeout(`${BASE_URL}/sitemap.xml`);

        if (!response.ok) {
            log.error(`sitemap.xml returned ${response.status}`);
            return false;
        }

        const content = await response.text();

        // Check for XML structure
        const checks = [
            { test: content.includes('<?xml'), msg: 'Valid XML declaration' },
            { test: content.includes('<urlset'), msg: 'URLset element found' },
            { test: content.includes('<url>'), msg: 'URL entries found' },
            { test: content.includes('<loc>'), msg: 'Location tags present' },
            { test: content.includes('<lastmod>'), msg: 'Last modified dates present' },
        ];

        checks.forEach(({ test, msg }) => {
            if (test) {
                log.success(msg);
            } else {
                log.warn(msg.replace('found', 'missing').replace('present', 'missing'));
            }
        });

        // Count URLs
        const urlCount = (content.match(/<loc>/g) || []).length;
        log.info(`Total URLs in sitemap: ${urlCount}`);

        if (urlCount > 50000) {
            log.warn('Sitemap has more than 50,000 URLs - consider sitemap index');
        }

        return true;
    } catch (error) {
        log.error(`Failed to fetch sitemap.xml: ${error.message}`);
        return false;
    }
}

async function checkHomepageMetadata() {
    log.header('🏷️  Checking Homepage Metadata');

    try {
        const response = await fetchWithTimeout(BASE_URL);

        if (!response.ok) {
            log.error(`Homepage returned ${response.status}`);
            return false;
        }

        const html = await response.text();

        // Essential metadata checks
        const checks = [
            { test: /<title>(.+?)<\/title>/.test(html), msg: 'Page title present', extract: /<title>(.+?)<\/title>/ },
            { test: /<meta name="description"/.test(html), msg: 'Meta description present', extract: /<meta name="description" content="(.+?)"/ },
            { test: /<meta name="keywords"/.test(html), msg: 'Meta keywords present' },
            { test: /<link rel="canonical"/.test(html), msg: 'Canonical URL present', extract: /<link rel="canonical" href="(.+?)"/ },

            // Open Graph
            { test: /<meta property="og:title"/.test(html), msg: 'OG title present' },
            { test: /<meta property="og:description"/.test(html), msg: 'OG description present' },
            { test: /<meta property="og:image"/.test(html), msg: 'OG image present', extract: /<meta property="og:image" content="(.+?)"/ },
            { test: /<meta property="og:url"/.test(html), msg: 'OG URL present' },
            { test: /<meta property="og:type"/.test(html), msg: 'OG type present' },

            // Twitter Cards
            { test: /<meta name="twitter:card"/.test(html), msg: 'Twitter card present' },
            { test: /<meta name="twitter:title"/.test(html), msg: 'Twitter title present' },
            { test: /<meta name="twitter:description"/.test(html), msg: 'Twitter description present' },

            // Structured Data
            { test: /<script type="application\/ld\+json">/.test(html), msg: 'JSON-LD structured data present' },
        ];

        checks.forEach(({ test, msg, extract }) => {
            if (test) {
                log.success(msg);
                if (extract) {
                    const match = html.match(extract);
                    if (match && match[1]) {
                        log.info(`  → ${match[1].substring(0, 80)}${match[1].length > 80 ? '...' : ''}`);
                    }
                }
            } else {
                log.error(msg.replace('present', 'missing'));
            }
        });

        // Check title length
        const titleMatch = html.match(/<title>(.+?)<\/title>/);
        if (titleMatch) {
            const titleLength = titleMatch[1].length;
            if (titleLength < 30 || titleLength > 60) {
                log.warn(`Title length (${titleLength}) should be 30-60 characters for optimal SEO`);
            }
        }

        // Check description length
        const descMatch = html.match(/<meta name="description" content="(.+?)"/);
        if (descMatch) {
            const descLength = descMatch[1].length;
            if (descLength < 120 || descLength > 160) {
                log.warn(`Description length (${descLength}) should be 120-160 characters for optimal SEO`);
            }
        }

        // Validate JSON-LD
        const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.+?)<\/script>/s);
        if (jsonLdMatch) {
            try {
                const jsonLd = JSON.parse(jsonLdMatch[1]);
                log.success(`Valid JSON-LD schema: ${jsonLd['@type']}`);

                // Check for Organization schema
                if (jsonLd['@type'] === 'Organization') {
                    const orgChecks = [
                        { test: jsonLd.name, msg: 'Organization name' },
                        { test: jsonLd.url, msg: 'Organization URL' },
                        { test: jsonLd.logo, msg: 'Organization logo' },
                    ];

                    orgChecks.forEach(({ test, msg }) => {
                        if (test) {
                            log.success(`  → ${msg} defined`);
                        } else {
                            log.warn(`  → ${msg} missing`);
                        }
                    });
                }
            } catch (error) {
                log.error(`Invalid JSON-LD: ${error.message}`);
            }
        }

        return true;
    } catch (error) {
        log.error(`Failed to check homepage: ${error.message}`);
        return false;
    }
}

async function checkPerformanceHints() {
    log.header('⚡ Checking Performance Optimization');

    try {
        const response = await fetchWithTimeout(BASE_URL);
        const html = await response.text();

        const checks = [
            { test: /<link rel="preload"/.test(html), msg: 'Resource preloading detected' },
            { test: /<link rel="preconnect"/.test(html), msg: 'DNS preconnect hints' },
            { test: /loading="lazy"/.test(html), msg: 'Lazy loading images' },
            { test: /fetchpriority="high"/.test(html), msg: 'Fetch priority hints' },
        ];

        checks.forEach(({ test, msg }) => {
            if (test) {
                log.success(msg);
            } else {
                log.info(`${msg} not detected (optional)`);
            }
        });

        return true;
    } catch (error) {
        log.error(`Failed to check performance hints: ${error.message}`);
        return false;
    }
}

async function checkConfig() {
    log.header('⚙️  Checking Configuration');

    try {
        const configPath = join(process.cwd(), 'lib', 'config.ts');
        const configContent = readFileSync(configPath, 'utf-8');

        const checks = [
            { test: /keywords:\s*\[/.test(configContent), msg: 'SEO keywords defined' },
            { test: /ogImage:/.test(configContent), msg: 'OG image path configured' },
            { test: /twitterHandle:/.test(configContent), msg: 'Twitter handle configured' },
            { test: /githubUrl:/.test(configContent), msg: 'GitHub URL configured' },
        ];

        checks.forEach(({ test, msg }) => {
            if (test) {
                log.success(msg);
            } else {
                log.warn(msg.replace('configured', 'missing').replace('defined', 'missing'));
            }
        });

        return true;
    } catch (error) {
        log.error(`Failed to check config: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log(`
╔═══════════════════════════════════════════╗
║   folio.sh SEO Validation Checker        ║
║   Testing URL: ${BASE_URL.padEnd(26)}║
╚═══════════════════════════════════════════╝
  `);

    log.info('Make sure your dev server is running on ' + BASE_URL);
    console.log('');

    const results = {
        robotsTxt: await checkRobotsTxt(),
        sitemap: await checkSitemap(),
        metadata: await checkHomepageMetadata(),
        performance: await checkPerformanceHints(),
        config: await checkConfig(),
    };

    // Summary
    log.header('📊 Summary');

    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    console.log(`\nPassed: ${passed}/${total} checks\n`);

    if (passed === total) {
        log.success('All SEO checks passed! 🎉');
        log.info('Your site is optimized for search engines.');
    } else {
        log.warn('Some SEO checks failed. Review the output above for details.');
    }

    console.log('\n' + COLORS.blue + 'Next steps:' + COLORS.reset);
    console.log('  1. Test with Google Rich Results: https://search.google.com/test/rich-results');
    console.log('  2. Validate Open Graph: https://www.opengraph.xyz/');
    console.log('  3. Run Lighthouse in Chrome DevTools');
    console.log('  4. Submit sitemap to Google Search Console');
    console.log('');
}

main().catch(console.error);
