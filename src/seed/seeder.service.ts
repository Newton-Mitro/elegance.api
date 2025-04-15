import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class SeederService {
  constructor(private prisma: PrismaService) {}

  async seed(): Promise<void> {
    const roleNames = [
      'ADMIN',
      'MANAGER',
      'RECEPTIONIST',
      'STYLIST',
      'CUSTOMER',
    ];

    // 1. Seed all roles
    const roles: Role[] = await Promise.all(
      roleNames.map((roleName) => {
        return this.prisma.role.upsert({
          where: { name: roleName },
          update: {},
          create: {
            name: roleName,
          },
        }) as Promise<Role>;
      }),
    );

    // 2. Find ADMIN role
    const adminRole = roles.find((r) => r.name === 'ADMIN');
    if (!adminRole) throw new Error('ADMIN role not found');

    // 3. Create Superadmin User
    const phone = '01700000000';
    const email = 'superadmin@example.com';
    const password = 'SuperSecret123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdminUser = await this.prisma.user.upsert({
      where: { phone },
      update: {},
      create: {
        name: 'Super Admin',
        phone,
        email,
        password: hashedPassword,
        profilePictureUrl: null,
        status: 'ACTIVE',
      },
    });

    // 4. Assign ADMIN role via UserRoles with audit trail fields
    await this.prisma.userRoles.upsert({
      where: {
        userId_roleId: {
          userId: superAdminUser.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: superAdminUser.id,
        roleId: adminRole.id,
        assignedAt: new Date(),
        assignedBy: superAdminUser.id, // Assigned by themselves (initial setup)
        reason: 'Initial Super Admin setup',
      },
    });

    // 1. Service Categories
    const serviceCategories = [
      { name: 'Hair', nameBn: 'চুল' },
      { name: 'Skin', nameBn: 'ত্বক' },
      { name: 'Nails', nameBn: 'নখ' },
      { name: 'Threading & Waxing', nameBn: 'থ্রেডিং ও ওয়াক্সিং' },
      { name: 'Makeup', nameBn: 'মেকআপ' },
      { name: 'Combo Packages', nameBn: 'কম্বো প্যাকেজ' },
    ];

    const serviceCategoryMap: Record<string, string> = {};

    for (const category of serviceCategories) {
      const created = await this.prisma.serviceCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
      serviceCategoryMap[category.name] = created.id;
    }

    // 2. Seed Services
    const services = [
      // Hair
      {
        name: 'Basic Haircut',
        nameBn: 'সাধারণ চুল কাটানো',
        category: 'Hair',
        price: 500,
        durationMin: 30,
        description: 'Face-shape suited haircut',
      },
      {
        name: 'Hair Coloring - Global',
        nameBn: 'গ্লোবাল চুল রং',
        category: 'Hair',
        price: 2500,
        durationMin: 90,
        description: 'Top-brand global color',
      },
      {
        name: 'Hair Spa',
        nameBn: 'চুলের স্পা',
        category: 'Hair',
        price: 1500,
        durationMin: 60,
        description: 'Deep conditioning for shiny hair',
      },
      {
        name: 'Keratin Treatment',
        nameBn: 'কেরাটিন ট্রিটমেন্ট',
        category: 'Hair',
        price: 6000,
        durationMin: 150,
        description: 'Frizz reduction & shine',
      },
      {
        name: 'Hair Straightening',
        nameBn: 'চুল সোজা করা',
        category: 'Hair',
        price: 4000,
        durationMin: 120,
        description: 'Permanent hair straightening',
      },

      // Skin
      {
        name: 'Gold Facial',
        nameBn: 'গোল্ড ফেসিয়াল',
        category: 'Skin',
        price: 1200,
        durationMin: 60,
        description: 'Radiance with gold ingredients',
      },
      {
        name: 'Fruit Cleanup',
        nameBn: 'ফল ক্লিনআপ',
        category: 'Skin',
        price: 800,
        durationMin: 45,
        description: 'Gentle fruit-based cleanup',
      },
      {
        name: 'Skin Polishing',
        nameBn: 'স্কিন পলিশিং',
        category: 'Skin',
        price: 2000,
        durationMin: 60,
        description: 'Tan removal and brightness',
      },

      // Nails
      {
        name: 'Classic Manicure',
        nameBn: 'ক্লাসিক ম্যানিকিউর',
        category: 'Nails',
        price: 600,
        durationMin: 45,
        description: 'Manicure with massage',
      },
      {
        name: 'Spa Pedicure',
        nameBn: 'স্পা পেডিকিউর',
        category: 'Nails',
        price: 900,
        durationMin: 60,
        description: 'Pedicure with scrub & care',
      },
      {
        name: 'Nail Art',
        nameBn: 'নেইল আর্ট',
        category: 'Nails',
        price: 500,
        durationMin: 30,
        description: 'Creative nail decoration',
      },

      // Threading & Waxing
      {
        name: 'Eyebrow Threading',
        nameBn: 'ভ্রু থ্রেডিং',
        category: 'Threading & Waxing',
        price: 50,
        durationMin: 10,
        description: 'Perfect brow shape',
      },
      {
        name: 'Upper Lip Threading',
        nameBn: 'আপার লিপ থ্রেডিং',
        category: 'Threading & Waxing',
        price: 40,
        durationMin: 10,
        description: 'Clean upper lips',
      },
      {
        name: 'Full Body Waxing',
        nameBn: 'ফুল বডি ওয়াক্সিং',
        category: 'Threading & Waxing',
        price: 1500,
        durationMin: 90,
        description: 'Smooth skin waxing',
      },

      // Makeup
      {
        name: 'Bridal Makeup',
        nameBn: 'ব্রাইডাল মেকআপ',
        category: 'Makeup',
        price: 8000,
        durationMin: 180,
        description: 'Wedding special package',
      },
      {
        name: 'Party Makeup',
        nameBn: 'পার্টি মেকআপ',
        category: 'Makeup',
        price: 3000,
        durationMin: 90,
        description: 'Makeup for any event',
      },

      // Combo Packages
      {
        name: 'Bridal Combo Package',
        nameBn: 'ব্রাইডাল প্যাকেজ',
        category: 'Combo Packages',
        price: 12000,
        durationMin: 240,
        description: 'Full bridal beauty pack',
      },
      {
        name: 'Glow Combo Package',
        nameBn: 'গ্লো প্যাকেজ',
        category: 'Combo Packages',
        price: 3000,
        durationMin: 150,
        description: 'Facial, manicure, pedicure combo',
      },
    ];

    for (const service of services) {
      await this.prisma.service.upsert({
        where: { name: service.name },
        update: {},
        create: {
          name: service.name,
          nameBn: service.nameBn,
          description: service.description,
          price: service.price,
          durationMin: service.durationMin,
          categoryId: serviceCategoryMap[service.category],
        },
      });
    }

    // 3. Seed Product Categories
    const productCategories = [
      { name: 'Hair Products' },
      { name: 'Skin Products' },
      { name: 'Nail Products' },
      { name: 'Makeup Products' },
    ];

    const productCategoryMap: Record<string, string> = {};

    for (const category of productCategories) {
      const created = await this.prisma.productCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
      productCategoryMap[category.name] = created.id;
    }

    // 4. Seed Products
    const products = [
      // Hair
      {
        name: 'L’Oreal Hair Color',
        price: 1200,
        stock: 10,
        description: 'Vibrant professional hair color',
        category: 'Hair Products',
      },
      {
        name: 'Matrix Shampoo',
        price: 800,
        stock: 20,
        description: 'Smoothening shampoo',
        category: 'Hair Products',
      },

      // Skin
      {
        name: 'O3+ Facial Kit',
        price: 1500,
        stock: 15,
        description: 'Facial cleanser and mask',
        category: 'Skin Products',
      },
      {
        name: 'VLCC Bleach',
        price: 500,
        stock: 25,
        description: 'Skin bleach cream',
        category: 'Skin Products',
      },

      // Makeup
      {
        name: 'Lakme Foundation',
        price: 1000,
        stock: 30,
        description: 'Smooth finish foundation',
        category: 'Makeup Products',
      },
      {
        name: 'Maybelline Lipstick',
        price: 750,
        stock: 40,
        description: 'Moisturizing lipstick',
        category: 'Makeup Products',
      },

      // Nails
      {
        name: 'Nail Polish Set',
        price: 400,
        stock: 50,
        description: 'Colorful nail polish',
        category: 'Nail Products',
      },
    ];

    for (const product of products) {
      await this.prisma.product.upsert({
        where: { name: product.name },
        update: {},
        create: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId: productCategoryMap[product.category],
        },
      });
    }

    console.log('✅ Full services and products seeded!');
  }
}
