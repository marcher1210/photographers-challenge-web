import { useEffect, useState } from "react";

import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";

import { loginRequest, protectedResources } from "../authConfig";
import { callApiWithToken } from "../fetch";
import PhotoChallengePage from "../components/PhotoChallengePage";

const PagesContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance, 
     * an array of all accounts currently signed in and an inProgress value 
     * that tells you what msal is currently doing. For more, visit: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        if (account && inProgress === "none" && !responseData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiPages.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.apiPages.endpoint)
                    .then(response => setResponseData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiPages.scopes,
                        }).then((response) => {
                            callApiWithToken(response.accessToken, protectedResources.apiPages.endpoint)
                                .then(response => {
                                    setResponseData(response);
                                });
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, inProgress, instance]);
  
    return (
        <div class="wrapper">
        <div class="page">
          <h1>Photo project</h1>
        </div>
        {responseData ? (responseData.items.map(function (element, index) {
         return <PhotoChallengePage what={element.what} when={element.when} where={JSON.stringify(element.where)} />
        })
        ):null
        }
      </div>
    );
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated 
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use 
 * (redirect or popup) and optionally a [request object](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md)
 * to be passed to the login API, a component to display while authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const GeneratePages = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Popup} 
            authenticationRequest={authRequest}
        >
            <PagesContent />
        </MsalAuthenticationTemplate>
      )
};