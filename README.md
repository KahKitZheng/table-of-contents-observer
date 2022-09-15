# Table-of-contents-observer

Small example I wrote for myself to remind me how to generate a table of contents of all headings on a page and dynamically style the items if it's visible on the screen using React hooks and IntersectionObserver API.

## Usage

```tsx
import useHeadingObserver from "@/hooks/useHeadingObserver";

/**
 * Use `headings` to get a list of all headings on the page
 * Use `activeId` to check if a heading is visible on the screen
 */
const { activeId, headings } = useHeadingObserver();

// Render the headings in a table of content.
<aside>
  <p>Table of Contents</p>
  <ul>
    {headings.map((heading) => (
      <li key={heading.id} className={getClassName(heading.level)}>
        <Link href={`#${heading.id}`}>
          <a className={activeId === heading.id ? "active" : "inactive"}>
            {heading.text}
          </a>
        </Link>
      </li>
    ))}
  </ul>
</aside>;
```

## Development

```bash
npm install

npm run dev
```
