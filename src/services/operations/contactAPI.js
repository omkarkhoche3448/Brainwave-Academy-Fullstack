import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contactusEndpoint } from "../api";

const { CONTACT_US_API } = contactusEndpoint;

export function contactForm(data) {
    return async () => {
        const toastId = toast.loading("Loading...");
        try {
            // console.log("Data to be sent:", data);
            const response = await apiConnector("POST", CONTACT_US_API, data);
            // console.log("CONTACT_US_API RESPONSE:", response);

            if (response.status !== 201) {
                throw new Error(response.statusText);
            }

            toast.success("Data Sent Successfully");
        } catch (error) {
            console.error("CONTACT_US_API ERROR:", error);
        }
        toast.dismiss(toastId);
    };
}
