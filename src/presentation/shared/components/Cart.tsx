import { useCartState } from "@/domain/cart/state";
import cartIcon from "@/presentation/shared/icons/cart.svg";

export default function Cart() {
  const itemsCount = useCartState((state) => state.itemsCount);
  return (
    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white">
      <img src={cartIcon} alt="Cart" className="h-5 w-5" />
      <span
        aria-label={`Cart items: ${itemsCount}`}
        className="absolute -top-2 -right-2 min-w-5 rounded-full bg-white p-0.5 text-center text-xs font-bold text-cyan-700 ring-1 ring-cyan-600"
      >
        {itemsCount}
      </span>
    </div>
  );
}
