import { useAuthContext } from "@/context/AuthContext"
import { Navigate } from "@tanstack/react-router"
import { PropsWithChildren } from "react"
import { useRouter } from "@tanstack/react-router"

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext()
    const router = useRouter()

    if (!user) {
        const next = router.state.location.pathname
        return <Navigate to="/login" search={{ next: next }} />
    }
    
    return children
}

export default ProtectedRoute