//Demo data for the testing.

import { addCoupon, clearCoupons } from "./couponStore.js";

export const demoUser = {
  userId: "demo-user",
  userTier: "NEW",
  country: "IN",
  lifetimeSpend: 0,
  ordersPlaced: 0
};

export const demoSeedCoupons = () => {
  try {
    clearCoupons();
  } catch(e) {}
  addCoupon({
    code: "WELCOME100",
    description: "₹100 off for new users",
    discountType: "FLAT",
    discountValue: 100,
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    usageLimitPerUser: 1,
    eligibility: { allowedUserTiers: ["NEW"], firstOrderOnly: true }
  });

  addCoupon({
    code: "TENPCT",
    description: "10% off orders above ₹1000, max ₹200",
    discountType: "PERCENT",
    discountValue: 10,
    maxDiscountAmount: 200,
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    eligibility: { minCartValue: 1000 }
  });
};