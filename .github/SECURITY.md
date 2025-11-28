# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously at folio.sh. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email us at [INSERT SECURITY EMAIL]
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment:** We will acknowledge receipt within 48 hours
- **Assessment:** We will assess the vulnerability and determine its severity
- **Timeline:** We aim to provide a fix within 7-14 days for critical issues
- **Disclosure:** We will coordinate with you on public disclosure timing

### Scope

The following are in scope:

- folio.sh web application
- API endpoints
- Authentication flows
- Data handling and storage

The following are out of scope:

- Third-party services (Clerk, Supabase, OpenRouter)
- Social engineering attacks
- Physical security
- Denial of service attacks

## Security Best Practices

When contributing to folio.sh, please follow these security practices:

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Use Zod schemas for validation
3. **Use parameterized queries** - Never concatenate SQL strings
4. **Check authentication** - Always verify user identity on protected routes
5. **Sanitize outputs** - Prevent XSS attacks
6. **Keep dependencies updated** - Regularly update npm packages

Thank you for helping keep folio.sh secure!
