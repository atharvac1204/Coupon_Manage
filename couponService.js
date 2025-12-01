export const now = () => new Date();

export const evaluateCoupon = (coupon, user, cartValue, cartCategories, itemsCount, userUsageCount=0) => {
  const nowDate = now();
  if (new Date(coupon.startDate) > nowDate || new Date(coupon.endDate) < nowDate) return null;

  const e = coupon.eligibility || {};

  if (e.allowedUserTiers && !e.allowedUserTiers.includes(user.userTier)) return null;
  if (e.minLifetimeSpend && user.lifetimeSpend < e.minLifetimeSpend) return null;
  if (e.minOrdersPlaced && user.ordersPlaced < e.minOrdersPlaced) return null;
  if (e.firstOrderOnly && user.ordersPlaced > 0) return null;
  if (e.allowedCountries && !e.allowedCountries.includes(user.country)) return null;
  if (e.minCartValue && cartValue < e.minCartValue) return null;
  if (e.applicableCategories && !cartCategories.some(c => e.applicableCategories.includes(c))) return null;
  if (e.excludedCategories && cartCategories.some(c => e.excludedCategories.includes(c))) return null;
  if (e.minItemsCount && itemsCount < e.minItemsCount) return null;

  if (coupon.usageLimitPerUser && userUsageCount >= coupon.usageLimitPerUser) return null;

  let discount = 0;
  if (coupon.discountType === "FLAT") {
    discount = coupon.discountValue;
  } else {
    discount = (coupon.discountValue / 100) * cartValue;
    if (coupon.maxDiscountAmount) discount = Math.min(discount, coupon.maxDiscountAmount);
  }

  if (discount <= 0) return null;
  return Math.round(discount * 100) / 100;
};