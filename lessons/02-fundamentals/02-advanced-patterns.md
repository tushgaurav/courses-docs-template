# Advanced Patterns

Now that you understand the basics, let's explore some advanced patterns.

## Pattern 1: Composition

Composition allows you to build complex UIs from simple pieces:

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardHeader({ title }) {
  return <h2 className="card-header">{title}</h2>;
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

// Usage
<Card>
  <CardHeader title="My Card" />
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
</Card>
```

## Pattern 2: Render Props

Render props provide flexibility in what gets rendered:

```jsx
function DataProvider({ render }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return render(data);
}
```

## Pattern 3: Custom Hooks

Extract reusable logic into custom hooks:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}
```

## When to Use Each Pattern

- **Composition**: When building UI component libraries
- **Render Props**: When you need flexible rendering
- **Custom Hooks**: When sharing stateful logic

## Summary

These patterns will help you write cleaner, more maintainable code.
