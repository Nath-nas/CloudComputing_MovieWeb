import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'ap-southeast-1_55KYwX0rd',
    ClientId: '4k89v15t9pe9qlb4unuortuuo2'
};

export default new CognitoUserPool(poolData);