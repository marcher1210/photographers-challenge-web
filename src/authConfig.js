/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn:   process.env.REACT_APP_B2C_SIGNUP_SIGNIN,
        forgotPassword: process.env.REACT_APP_B2C_FORGOT_PASSWORD,
        editProfile:    process.env.REACT_APP_B2C_EDIT_PROFILE,
    },
    authorities: {
        signUpSignIn: {
            authority: "https://"+process.env.REACT_APP_B2C_AUTHORITY_DOMAIN+"/"+process.env.REACT_APP_B2C_DOMAIN_NAME+"/"+process.env.REACT_APP_B2C_SIGNUP_SIGNIN,
        },
        forgotPassword: {
            authority: "https://"+process.env.REACT_APP_B2C_AUTHORITY_DOMAIN+"/"+process.env.REACT_APP_B2C_DOMAIN_NAME+"/"+process.env.REACT_APP_B2C_FORGOT_PASSWORD,
        },
        editProfile: {
            authority: "https://"+process.env.REACT_APP_B2C_AUTHORITY_DOMAIN+"/"+process.env.REACT_APP_B2C_DOMAIN_NAME+"/"+process.env.REACT_APP_B2C_EDIT_PROFILE,
        }
    },
    authorityDomain: process.env.REACT_APP_B2C_AUTHORITY_DOMAIN
}


/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_MSAL_CLIENTID, // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: process.env.REACT_APP_MSAL_REDIRECT_URL, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                    default:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [process.env.REACT_APP_MSAL_API_APPLICATION_ID_URI+"/access_as_user"]
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiPages: {
        endpoint: process.env.REACT_APP_API_URI+"/pages?n=10",
        scopes: [process.env.REACT_APP_MSAL_API_APPLICATION_ID_URI+"/access_as_user"], // e.g. api://xxxxxx/access_as_user
    }
}
