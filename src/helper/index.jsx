export const authenticate = () => {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"))
    } else {
        return false
    }
};

export const authenticateRole = () => {
    if (!localStorage.getItem("user")) {
        return false
    }
    const user = JSON.parse(localStorage.getItem("user"))
    if (user.role[0] === "ROLE_ADMIN") {
        return true
    } else {
        return false
    }
};