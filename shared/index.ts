// Export all types and schemas
export * from './types';

// Export any utility functions if needed
export const sharedConfig = {
  // Add any shared configuration here
  maxImageSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
};
