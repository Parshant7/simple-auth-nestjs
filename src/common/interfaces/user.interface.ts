interface userDetails {
    _id: string,
    name: {
        first_name: string,
        last_name: string
    },
    username: string,
    email: string,
    password: string,
    isPhoneVerified: string,
}

export interface userIdentifier {
    _id?: string,
    email?: string,
    countryCode?: string,
    phoneNo?: string
}