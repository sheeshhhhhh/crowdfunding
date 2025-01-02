import { Socket, io } from 'socket.io-client';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useAuthContext } from './AuthContext';

type SocketContextType = {
    socket: Socket | undefined;
}

const SocketInitialValue: SocketContextType = {
    socket: undefined,
}

const SocketContext = createContext<SocketContextType>(SocketInitialValue);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if(!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }

    return context;
}

const SocketProvider = ({ children }: PropsWithChildren<{}>) => {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const { user } = useAuthContext();

    useEffect(() => {
        if(!user) return;

        const newSocket = io('http://localhost:5000', {
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            transports: ['websocket'],
            query: {
                userId: user.id
            }
        })
        setSocket(newSocket);

        return () => {
            newSocket.off('connect');
        }
    }, [user])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;