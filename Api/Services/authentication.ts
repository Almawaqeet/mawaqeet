import { useAppMutation } from "@/api/constructor";
import { routes } from "@/api/routes";
import { LoginRequest, LoginResponse } from "@/api/types";




export const useLogin = (body?: LoginRequest) => {
    return useAppMutation<LoginResponse>({
        apiRoute: routes.auth.login,
        method: 'POST',
        body: JSON.stringify(body)
    });
}
