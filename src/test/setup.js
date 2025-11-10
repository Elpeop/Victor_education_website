// filepath: c:\Users\Louis\OneDrive\Documents\Louis_s documents\Victor_Robot_Education\frontend\src\test\setup.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));