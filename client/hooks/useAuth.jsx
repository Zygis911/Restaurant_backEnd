import { useContext } from "react";

import { AuthContext } from "../src/utils/AuthContext";

export function useAuth() {
    return useContext(AuthContext);
}