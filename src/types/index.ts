export interface Company{
    name: string
    catchPhrase: string
    bs: string
}
export interface Address{
    city: string
    street: string
    suite: string
    zipcode: string
    geo: {
        lat: string
        lng: string
    }
}

export interface User {
    id: number
    name: string
    company: Company
    address: Address
    username: string
    website: string
    phone: string
    email: string
}

export interface Article {
    userId: number
    id: number
    title: string
    body: string
    author?: string
}