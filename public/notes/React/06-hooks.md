# React Hooks

Hooks allow functional components to use state and lifecycle features that were previously only available in class components. Hook names start with `use`.

## Rules of Hooks

1. **Only call Hooks at the top level** — before return, not inside loops, conditions, nested functions, or try/catch/finally.
2. **Only call Hooks from React functions** — from React function components or custom Hooks.

## Available Hooks

| Hook | Description | File |
|---|---|---|
| `useState` | Add state to functional components | [State Hooks](./06a-hooks-state.md) |
| `useReducer` | Complex state logic with reducer pattern | [State Hooks](./06a-hooks-state.md) |
| `useEffect` | Side effects (data fetching, subscriptions, DOM manipulation) | [Effect Hooks](./06b-hooks-effects.md) |
| `useLayoutEffect` | Synchronous side effects (DOM measurements, preventing flicker) | [Effect Hooks](./06b-hooks-effects.md) |
| `useRef` | Mutable values that persist across renders | [Refs & Memo](./06c-hooks-memo.md) |
| `useCallback` | Memoize functions (prevent unnecessary re-renders) | [Refs & Memo](./06c-hooks-memo.md) |
| `useMemo` | Memoize computed values (expensive calculations) | [Refs & Memo](./06c-hooks-memo.md) |
| `useContext` | Consume React Context values | [Advanced Hooks](./06d-hooks-advanced.md) |
| Custom Hooks | Reusable logic encapsulation | [Advanced Hooks](./06d-hooks-advanced.md) |

## Quick Guide

- **Need state?** → `useState` or `useReducer` (for complex logic)
- **Need side effects?** → `useEffect` (or `useLayoutEffect` for DOM measurements)
- **Need mutable values?** → `useRef`
- **Need to memoize?** → `useCallback` (functions) or `useMemo` (values)
- **Need context?** → `useContext`
- **Need reusable logic?** → Custom Hooks
