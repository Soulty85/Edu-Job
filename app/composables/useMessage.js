export function useMessage() {
    const toast = useToast();

    function successMessage(message) {
        toast.add({
            title: message,
            color: "success", // 'success', 'error', 'warning', 'info'
            position: "top-right",
            timeout: 3000,
        });
    }

    function errorMessage(message) {
        toast.add({
            title: message,
            color: "error",
            position: "top-right",
            timeout: 3000,
        });
    }

    return { successMessage, errorMessage };
}
