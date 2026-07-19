# Security in React

## XSS Prevention

By default, React DOM escapes any values embedded in JSX before rendering, preventing injection attacks. Everything is converted to a string before rendering.

```jsx
const title = "<script>alert('hacked')</script>";

// React renders this as plain text, not as executable HTML
const element = <h1>{title}</h1>;
// Output: &lt;script&gt;alert('hacked')&lt;/script&gt;
```

## dangerouslySetInnerHTML

React provides `dangerouslySetInnerHTML` to render raw HTML. Use it only with trusted content — never with user input.

```jsx
function Markup({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

> This bypasses React's XSS protection. Always sanitize HTML before rendering it.

## Sanitize User Input

Never trust data from users, APIs, or URLs. Always sanitize before rendering.

```jsx
// Bad — renders raw user input
<div>{userInput}</div>

// Good — React escapes it automatically
// But be careful with dangerouslySetInnerHTML
```

When you need to render HTML from user input, use a sanitizer like DOMPurify.

## DOMPurify

The standard library for sanitizing HTML. Strips dangerous tags and attributes.

```bash
npm install dompurify
```

```jsx
import DOMPurify from 'dompurify';

function SafeMarkup({ html }) {
    const clean = DOMPurify.sanitize(html);

    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

Always use DOMPurify when rendering user-provided HTML, even with `dangerouslySetInnerHTML`.

## URL Safety

Never use user-provided URLs directly in `href` or `src` without validation. Malicious protocols can execute code.

```jsx
// Bad — allows javascript: protocol
<a href={userUrl}>Click</a>

// Good — validate URL protocol
function SafeLink({ url, children }) {
    const isSafe = /^https?:\/\//.test(url);

    if (!isSafe) return <span>{children}</span>;

    return <a href={url} target="_blank" rel="noopener noreferrer">{children}</a>;
}
```

Also use `rel="noopener noreferrer"` on external links to prevent [tabnapping](https://owasp.org/www-community/attacks/Reverse_Tabnapping).

## eval() and Dangerous Patterns

Never use these in React (or any frontend code):

```jsx
// Bad — executes arbitrary code
eval(userInput);
new Function(userInput)();
setTimeout("alert('hacked')", 1000);
setInterval("doSomething()", 1000);
```

Use function references instead:

```jsx
// Good
setTimeout(() => alert('safe'), 1000);
```

## Never Store Secrets

Never put sensitive data in client-side code. Everything in the browser is visible to users.

```jsx
// Bad — exposed in browser
const API_KEY = 'sk-1234567890';
const SECRET_TOKEN = 'abc123';

// Good — use environment variables (still visible, but less obvious)
const API_KEY = import.meta.env.VITE_API_KEY;

// Better — keep secrets on the backend
// Frontend calls your API, your API calls external services
```

Environment variables (`import.meta.env.VITE_*`) are still embedded in the build output and visible in browser DevTools. The only truly safe place for secrets is on your backend.
