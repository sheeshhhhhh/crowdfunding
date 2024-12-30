
export type participant = {
    id: string,
    username: string,
    profile: string
}

export const messageStatus = {
    DELIVERED="DELIVERED",
    READ="READ",
    DELETED="DELETED"
} as const
export type messageStatus = typeof messageStatus[keyof typeof messageStatus]

export type message = {
    id: string,
    message: string,
    senderId: string,
    receiverId: string,
    conversationId: string,
    status: messageStatus,

    createAt: string
}

export type conversation = {
    id: string,
    updatedAt: string,
    createAt: string,

    participants: participant[],
    messages: message[]
}

export type pastConversations = conversation[]