export interface UserInfo {
    nickname? : string,
    profile_image? : string,
    thumbnail_image? : string
}

export interface KakaoProfile {
    nickname? : string,
    thumbnail_image_url? : string,
    profile_image_url? : string,
    is_default_image? : boolean
}

export interface KakaoAccount {
    profile_nickname_needs_agreement? : boolean,
    profile_image_needs_agreement? : boolean,
    profile? : KakaoProfile,
    has_age_range? : boolean,
    age_range_needs_agreement? : boolean,
    has_birthday? : boolean,
    birthday_needs_agreement? : boolean,
    birthday? : string,
    birthday_type? : string,
    has_gender? : boolean,
    gender_needs_agreement? : boolean,
    gender? : string,
    age_range? : string
}

export interface KakaoTokenResponse {
    access_token? : string,
    connected_at? : string,
    properties? : UserInfo,
    kakao_account? : KakaoAccount
}

export interface KakaoUserResponse {
    id? : string,
    connected_at? : string,
    properties? : UserInfo,
    kakao_account? : KakaoAccount
}