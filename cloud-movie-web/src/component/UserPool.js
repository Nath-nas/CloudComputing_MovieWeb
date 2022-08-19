import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'ap-southeast-1_q8ZqL7zu6',
    ClientId: '759h5el03q3cc3hkgfqktdlj5t'
};

export default new CognitoUserPool(poolData);