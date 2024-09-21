import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
import {
    setLoading,
    setUser,
} from "../../slices/profileSlice";

const { GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndpoints;


export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            // console.log(token);
            const response = await apiConnector("GET", GET_USER_DETAILS_API, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

            dispatch(setUser({ ...response.data.data, image: userImage }));

            if (navigate) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.log("GET_USER_DETAILS API ERROR:", error);
            toast.error("Could Not Get User Details");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    };
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        // console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE.....", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    // console.log("After Calling BACKEND API FOR ENROLLED COURSES")
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {

    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null,
            {
                Authorization: `Bearer ${token}`,
            })

        // console.log("GET_INSTRUCTOR_API_RESPONSE", response);
        result = response?.data?.courses

    }
    catch (error) {
        console.log("GET_INSTRUCTOR_API ERROR", error);
        toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
}