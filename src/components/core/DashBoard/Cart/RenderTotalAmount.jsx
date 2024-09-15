import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import toast from "react-hot-toast";

export default function RenderTotalAmount() {
  const dispatch = useDispatch();
  const { total, cart } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const userId = user._id;

  const handleBuyNow = async () => {
    // console.log("buying Course");
    try {
      await buyCourse(token, cart, dispatch);
    } catch (error) {
      console.error("Failed to buy course:", error);
      toast.error("Failed to complete purchase. Please try again.");
    }
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onClick={handleBuyNow}
        customClasses="w-full justify-center"
      />
    </div>
  );
}
