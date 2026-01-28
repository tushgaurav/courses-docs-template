# Core Concepts

Let's explore the fundamental concepts that form the foundation of everything we'll learn.

## Understanding the Basics

Every complex system is built on simple principles. Here are the key concepts:

### Concept 1: Components

Components are the building blocks of our system. They are:

- **Reusable** - Write once, use everywhere
- **Composable** - Combine to create complex structures
- **Isolated** - Changes in one don't affect others

```jsx
function MyComponent({ title }) {
  return <h1>{title}</h1>;
}
```

### Concept 2: State Management

State represents the current condition of your application:

| Type | Scope | Persistence |
|------|-------|-------------|
| Local | Component | Session |
| Global | Application | Optional |
| Server | Backend | Database |

### Concept 3: Data Flow

Data in our system flows in one direction:

1. User triggers an action
2. Action updates the state
3. State changes trigger re-render
4. UI reflects the new state

## Key Takeaways

- Keep components small and focused
- Manage state thoughtfully
- Follow unidirectional data flow

## Practice Exercise

Try creating a simple component that displays a greeting message with a customizable name.
