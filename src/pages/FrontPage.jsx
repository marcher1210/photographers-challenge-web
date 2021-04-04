import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react"

export const FrontPage = () => {

    return (
        <div>
        <AuthenticatedTemplate>
            Click the navigation bar.
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            Please log in.
        </UnauthenticatedTemplate>
        </div>
      )
};