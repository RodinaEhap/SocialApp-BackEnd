export enum tokenTypeEnum{
    ACCESS, 
    REFRESH 
}
export enum tokenStatusEnum{
    ACTIVE, 
    INACTIVE 
}       
export enum tokenPurposeEnum{
    AUTHENTICATION, 
    PASSWORD_RESET, 
    EMAIL_VERIFICATION 
}
export enum tokenSubjectEnum{
    USER, 
    ADMIN, 
    MODERATOR 
}
export enum tokenAudienceEnum{
    WEB, 
    MOBILE, 
    API 
}

export enum languageEnum{
    AR,
    EN
}
export enum logoutEnum{
    DEVICE,
    ALL
}