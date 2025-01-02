import axiosFetch from "@/lib/axios";
import { conversation, message, pastConversations } from "@/types/message";

export const fetchMessages = async (userId: string | undefined, pageParam: number)=> {
    const response = await axiosFetch.get('/message/getMessages/' + userId + `?page=${pageParam}`, 
        { 
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 404;
            }
        }
    )

    if(response.status === 404) {
        // return empty messages array if conversation is not found
        return { data: { messages: [] }, nextPage: null }
    }

    return { data: response.data as conversation, nextPage: response.data.messages.length > 0 ? pageParam + 1 : null }
}

export const fetchPastConversations = async (search: string | undefined, pageParam: number) => {
    const response = await axiosFetch.get(`/message/getPastConversation?search=${search || ''}&page=${pageParam}`)
    return { data: response.data as pastConversations, nextPage: response.data.length > 0 ? pageParam + 1 : null }
}

export const handleTimeTrasnform = (time: string) => {
    const isToday = new Date(time).toDateString() === new Date().toDateString()
    if(isToday) {
        return new Date(time).toLocaleTimeString(navigator.language, { hour: '2-digit', minute:'2-digit' })
    } else {
        return new Date(time).toLocaleString(navigator.language, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })
    }
}

// updating the queries. and yes it's a bit complex because of infinitequery
export const updateMessages = async (userId: string, data: message, queryClient: any) => {
    queryClient.setQueryData(['getMessages', userId], (old: any) => {
        if (!old) return old; // Handle case where there's no existing data
        
        // if the message is not sent for the message you are viewing, return the old data
        if (data.senderId !== userId && data.receiverId !== userId) {
            return old;
        }

        // just putting in the new message in the first page
        return {
            ...old,
            pages: old.pages.map((page: any, index: number) => {
                if (index === 0) {
                    return {
                        ...page,
                        data: {
                            ...page.data,
                            messages: [
                                ...page.data.messages, // Existing messages
                                data,
                            ],
                        },
                    };
                }
                return page; // For other pages, return unchanged
            }),
        };
    });
}

export const updatePastConversations = async (search: string, updatedData: message, queryClient: any) => {
    queryClient.setQueryData(['pastConversations', search], (oldData: any) => {
        if(!oldData) return
         
        return {
            ...oldData,
            pages: oldData.pages.map((pages: any) => {
                return {
                    ...pages,
                    data: pages.data.map((data: any) => {
                        if(data.id === updatedData.conversationId) {
                            return {
                                ...data,
                                messages: [updatedData]
                            }
                        }
                        return data
                    })
                }
            })
        }
    })
}