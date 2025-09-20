import { useMessage } from "./useMessage";


export function formatErrors(error) {
    const { errorMessage } = useMessage();
    
    if (error?.data) {
        const errors = error.data;
        
        for (const field in errors) {
            if (Array.isArray(errors[field])) {
                errors[field].forEach((msg) => errorMessage(`${field}: ${msg}`));
            } else if (typeof errors[field] === "object") {
                for (const subField in errors[field]) {
                    errors[field][subField].forEach((msg) => errorMessage(`${subField}: ${msg}`));
                }
            }
        }
    } else {
        errorMessage("Une erreur est survenue.");
    }
};
