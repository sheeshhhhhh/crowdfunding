import { useAuthContext } from "@/context/AuthContext"
import { Navigate } from "@tanstack/react-router"
import { PropsWithChildren } from "react"

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext()

    if (!user) {
        return <Navigate to="/login" />
    }
    
    return children
}

export default ProtectedRoute