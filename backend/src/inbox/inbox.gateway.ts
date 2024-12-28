import { Logger, } from "@nestjs/common";
import { OnGatewayConnection, 
    OnGatewayDisconnect, WebSocketGateway, WebSocketServer, WsResponse, } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class InboxGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(InboxGateway.name);

    private playerToSocket: Record<string, string> = {};
    private socketToPlayer: Record<string, string> = {};

    async getUserId(socketId: string) {
        return this.socketToPlayer[socketId];
    }

    async getSocketId(playerId: string) {
        return this.playerToSocket[playerId];
    }

    @WebSocketServer() io: Server;
        
    async handleConnection(client: any, ...args: any[]) {
        const userId = client.handshake.query.userId; // will get the userId on handshake
        this.playerToSocket[userId] = client.id;
        this.socketToPlayer[client.id] = userId;

        this.logger.log(`Client connected: ${userId}`);
    }

    async handleDisconnect(client: any) {
        const socketId = client.id;
        const userId = this.getUserId[socketId];
        
        if(userId) {
            this.logger.log('Client disconnected: ' + userId);
            delete this.playerToSocket[userId];
            delete this.socketToPlayer[socketId];
        } else {
            this.logger.log('Client disconnected: ' + socketId);
        }
    }
}