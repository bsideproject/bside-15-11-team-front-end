import queryString from "query-string";
import { Location } from 'react-router';
import RootStore from "./RootStore";
import { post } from "../apis/RestApis";
// import jwt from 'jsonwebtoken';

// const createSignWithAppleSecret = () => {

//     const privateKey = `MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgLaoDFZqHMDAVC44c
//     di+dK4InK8Vrq7BbvUm3XOixQwSgCgYIKoZIzj0DAQehRANCAASVd7iSQRwJVyrw
//     qCYHUqxeTtQ74dkZbcI0+1NhSCiwZd2dEx5sffP0jl/5mBrGuZo1dulwXXazkddZ
//     BSY+oBsu`;
    
//     const token = jwt.sign({}, privateKey, {
//         algorithm: 'ES256',
//         expiresIn: '10h',
//         audience: 'https://appleid.apple.com',
//         issuer: 'XQ24HP64B3',
//         subject: 'com.byeoljachui.startrail',
//         keyid: '7YZKZ49X83'
//     });

//     console.log("token : " + JSON.stringify(token));
// }

class AppleStore {

    rootStore : typeof RootStore;

    constructor(rootStore : typeof RootStore) {
        this.rootStore = rootStore;
    }

    
}

export default AppleStore;