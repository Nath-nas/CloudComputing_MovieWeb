import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'ap-southeast-1_91iS0dt1d',
    ClientId: '5f5uhie63ucgen0pqgkta11cni'
};

export default new CognitoUserPool(poolData);