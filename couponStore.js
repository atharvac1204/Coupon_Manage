let coupons = [];

export const addCoupon = (coupon) => {
  const exists = coupons.find(c => c.code === coupon.code);
  //Rejecting the existing coupons.
  if (exists) throw new Error("Coupon code already exists");
  coupons.push(coupon);
};

export const getCoupons = () => coupons;

export const clearCoupons = () => { coupons = []; };
