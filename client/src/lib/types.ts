import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  weight: z.string(),
  image: z.string(),
  images: z.array(z.string()).default([]),
  stock: z.number().default(0),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
  })),
  total: z.number(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentMethod: z.string(),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']),
  notes: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Order = z.infer<typeof orderSchema>;

export const inquirySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  status: z.enum(['new', 'in_progress', 'resolved']).default('new'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;
