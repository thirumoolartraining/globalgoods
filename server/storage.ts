import { type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.inquiries = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: "raw-w320",
        name: "Raw Cashews W320",
        description: "Premium grade raw cashews, perfect for snacking and cooking. These whole cashews are carefully selected for their superior quality and consistency.",
        price: "1200.00",
        category: "raw",
        weight: "500g - 25kg",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "W320",
        tags: ["premium", "whole", "raw"]
      },
      {
        id: "roasted-salted",
        name: "Roasted & Salted Cashews",
        description: "Perfectly roasted with a touch of sea salt for enhanced flavor. Our signature roasting process brings out the natural sweetness.",
        price: "1400.00",
        category: "roasted",
        weight: "250g - 10kg",
        image: "https://images.unsplash.com/photo-1553909985-e6cd5c3e4b82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "W240",
        tags: ["roasted", "salted", "popular"]
      },
      {
        id: "organic",
        name: "Organic Cashews",
        description: "Certified organic cashews grown without synthetic pesticides. Sustainably sourced from certified organic farms.",
        price: "1600.00",
        category: "organic",
        weight: "500g - 20kg",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: true,
        grade: "W320",
        tags: ["organic", "sustainable", "certified"]
      },
      {
        id: "pieces",
        name: "Cashew Pieces",
        description: "Premium broken cashews perfect for cooking and baking. Ideal for recipes requiring smaller pieces.",
        price: "900.00",
        category: "pieces",
        weight: "1kg - 50kg",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "Pieces",
        tags: ["pieces", "cooking", "baking", "value"]
      },
      {
        id: "honey-roasted",
        name: "Honey Roasted Cashews",
        description: "Sweet and savory honey-glazed cashews. A perfect blend of natural honey and premium cashews.",
        price: "1800.00",
        category: "flavored",
        weight: "200g - 5kg",
        image: "https://images.unsplash.com/photo-1582362133738-e0770c080db1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "W240",
        tags: ["honey", "sweet", "flavored", "gourmet"]
      },
      {
        id: "spiced",
        name: "Spiced Cashews",
        description: "Aromatic blend of traditional Indian spices. A unique combination of flavors that awakens the palate.",
        price: "1500.00",
        category: "flavored",
        weight: "250g - 8kg",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "W280",
        tags: ["spiced", "indian", "flavored", "aromatic"]
      },
      {
        id: "jumbo-w240",
        name: "Jumbo Cashews W240",
        description: "Extra large premium cashews, perfect for gifting. The finest grade with exceptional size and quality.",
        price: "2200.00",
        category: "premium",
        weight: "500g - 15kg",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "W240",
        tags: ["jumbo", "premium", "large", "gift"]
      },
      {
        id: "butter",
        name: "Cashew Butter",
        description: "Smooth, creamy butter made from pure cashews. No additives, just natural cashew goodness.",
        price: "1200.00",
        category: "processed",
        weight: "350g jar",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        inStock: true,
        isOrganic: false,
        grade: "Premium",
        tags: ["butter", "smooth", "natural", "pure"]
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      inStock: insertProduct.inStock ?? true,
      isOrganic: insertProduct.isOrganic ?? false,
      grade: insertProduct.grade ?? null,
      tags: insertProduct.tags ?? null
    };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      customerPhone: insertOrder.customerPhone ?? null,
      status: "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      country: insertInquiry.country ?? null,
      company: insertInquiry.company ?? null,
      subject: insertInquiry.subject ?? null,
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
