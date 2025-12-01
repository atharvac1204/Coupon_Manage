import express from "express"
import { addCoupon, getCoupons } from "./couponStore.js";
import { evaluateCoupon } from "./couponService.js";
import { demoUser, demoSeedCoupons } from "./demoData.js";

const app = express();
app.use(express.json());

// Seed demo coupons and demo user
demoSeedCoupons();

// Create coupon
app.post("/coupon", (req, res) => {
  try {
    const coupon = req.body;
    addCoupon(coupon);
    res.status(201).json({ message: "Coupon added", coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// (optional) list coupons for debug
app.get("/coupons", (req, res) => {
  return res.json(getCoupons());
});

// Best coupon
app.post("/best-coupon", (req, res) => {
  const { user = demoUser, cart } = req.body;
  if (!cart || !cart.items) return res.status(400).json({ error: "cart.items required" });

  const cartValue = cart.items.reduce((acc, i) => acc + (i.unitPrice || 0) * (i.quantity || 0), 0);
  const cartCategories = [...new Set(cart.items.map(i => i.category))];
  const itemsCount = cart.items.reduce((acc, i) => acc + (i.quantity || 0), 0);

  const evaluated = getCoupons().map(c => ({
    coupon: c,
    discount: evaluateCoupon(c, user, cartValue, cartCategories, itemsCount, 0)
  })).filter(x => x.discount !== null);

  if (evaluated.length === 0) return res.json({ bestCoupon: null });

  evaluated.sort((a, b) =>
    b.discount - a.discount ||
    new Date(a.coupon.endDate) - new Date(b.coupon.endDate) ||
    a.coupon.code.localeCompare(b.coupon.code)
  );

  res.json({ bestCoupon: evaluated[0].coupon, discount: evaluated[0].discount });
});

app.get("/", (req, res) => res.send("Coupon API running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening ${PORT}`));