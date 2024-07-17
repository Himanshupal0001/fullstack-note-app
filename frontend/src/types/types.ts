export interface GOAL {
    _id: string, user: string, text: string, createdAt: string, updatedAt: string, __v?: number
}

export interface USER {
    _id: string,
    name: string,
    token: string,
    email: string
}