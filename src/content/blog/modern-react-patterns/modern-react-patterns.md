---
title: "Modern React Patterns for Scalable Applications"
date: "2024-11-15"
summary: "Learn about compound components, render props, custom hooks, and other patterns that will make your React code more reusable and maintainable."
tags: ["React", "JavaScript", "Design Patterns", "Frontend"]
cover: "cover.jpg"
---

## author: "Ehsan Pourhadi"

# Modern React Patterns for Scalable Applications

React has evolved significantly since its introduction, and with it, the patterns and practices that help us build better applications. In this article, we'll explore some of the most effective React patterns that can help you create more maintainable, reusable, and scalable code.

## 1. Compound Components

Compound components allow you to create flexible APIs by composing multiple components together. This pattern is excellent for building reusable UI components that need to work together.

```jsx
// Before: Monolithic component with many props
<Dropdown
  trigger="Select option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  onSelect={handleSelect}
  className="custom-dropdown"
/>

// After: Compound components for flexibility
<Dropdown onSelect={handleSelect}>
  <Dropdown.Trigger>Select option</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item value="option1">Option 1</Dropdown.Item>
    <Dropdown.Item value="option2">Option 2</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

### Implementation

```jsx
const DropdownContext = createContext();

export const Dropdown = ({ children, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    setIsOpen,
    onSelect,
  };

  return (
    <DropdownContext.Provider value={value}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  return <button onClick={() => setIsOpen(!isOpen)}>{children}</button>;
};

Dropdown.Content = ({ children }) => {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? <div className="dropdown-content">{children}</div> : null;
};
```

## 2. Custom Hooks for Logic Reuse

Custom hooks are perfect for extracting and reusing stateful logic across components. They promote the DRY principle and make your components cleaner.

```jsx
// Custom hook for API data fetching
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage in components
const UserProfile = ({ userId }) => {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!user) return <NotFound />;

  return <ProfileCard user={user} />;
};
```

## 3. Render Props Pattern

The render props pattern provides a way to share code between components using a prop whose value is a function.

```jsx
// Render props component for mouse tracking
export const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return render(position);
};

// Usage
const App = () => {
  return (
    <MouseTracker
      render={(position) => (
        <div>
          <h1>Mouse position:</h1>
          <p>
            X: {position.x}, Y: {position.y}
          </p>
        </div>
      )}
    />
  );
};
```

## 4. Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional functionality.

```jsx
// HOC for adding loading state
export const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    if (props.loading) {
      return <Spinner />;
    }

    return <WrappedComponent {...props} />;
  };
};

// HOC for error boundaries
export const withErrorBoundary = (WrappedComponent) => {
  return class extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <ErrorFallback error={this.state.error} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

// Usage
const SafeUserList = withErrorBoundary(withLoading(UserList));
```

## 5. Component Composition

Instead of inheritance, React favors composition. This pattern allows you to build complex UIs by combining simpler components.

```jsx
// Base layout components
export const Page = ({ children }) => (
  <div className="min-h-screen bg-gray-50">{children}</div>
);

export const PageHeader = ({ children }) => (
  <header className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
  </header>
);

export const PageContent = ({ children }) => (
  <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
);

// Composed page
const UserDashboard = () => (
  <Page>
    <PageHeader>
      <h1>User Dashboard</h1>
      <UserActions />
    </PageHeader>
    <PageContent>
      <UserStats />
      <RecentActivity />
    </PageContent>
  </Page>
);
```

## 6. Provider Pattern for Global State

The Provider pattern is excellent for sharing state across multiple components without prop drilling.

```jsx
// Theme context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    colors: theme === 'light' ? lightColors : darkColors
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={\`app app--\${theme}\`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Custom hook for consuming theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## 7. Container and Presentational Components

Separate your components into containers (logic) and presentational (UI) components for better maintainability.

```jsx
// Presentational component
const UserListPresentation = ({ users, loading, error, onRefresh }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={onRefresh} />;

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

// Container component
const UserListContainer = () => {
  const { data: users, loading, error, refetch } = useApi("/api/users");

  return (
    <UserListPresentation
      users={users || []}
      loading={loading}
      error={error}
      onRefresh={refetch}
    />
  );
};
```

## Best Practices

1. **Keep components small and focused** - Each component should have a single responsibility
2. **Use TypeScript** - Add type safety to catch errors early
3. **Implement error boundaries** - Gracefully handle component errors
4. **Optimize re-renders** - Use React.memo, useMemo, and useCallback wisely
5. **Test your patterns** - Ensure your reusable components work in different scenarios

## Conclusion

These React patterns provide powerful tools for building scalable applications. The key is to choose the right pattern for your specific use case:

- **Compound components** for flexible component APIs
- **Custom hooks** for reusable stateful logic
- **Render props** for dynamic rendering logic
- **HOCs** for cross-cutting concerns
- **Composition** for building complex UIs
- **Provider pattern** for global state management

By mastering these patterns, you'll be able to write more maintainable, reusable, and scalable React applications that stand the test of time.

---

Have you used these patterns in your React applications? I'd love to hear about your experiences and any other patterns you find useful in the comments below!
