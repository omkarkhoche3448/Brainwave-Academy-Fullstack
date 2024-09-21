import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../api";

export const getCatalogaPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category page data");
    }

    result = response?.data;

    if (!result?.data?.selectedCategory?.courses?.length) {
      toast.error("No courses found for this category.");
    }
  } catch (error) {
    console.error("CATALOG PAGE DATA API ERROR....", error);

    if (error.response?.status === 404) {
      toast.error("No courses found for this category.");
    } else {
      toast.error(error.message || "Something went wrong.");
    }

    result = null;
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};
