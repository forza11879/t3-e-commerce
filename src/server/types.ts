import type { Options as SMTPTransportOptions } from "nodemailer/lib/smtp-transport"

export type Awaitable<T> = T | PromiseLike<T>

export interface Theme {
    colorScheme?: "auto" | "dark" | "light"
    logo?: string
    brandColor?: string
    buttonText?: string
}

export type ProviderType = "oidc" | "oauth" | "email" | "credentials"

export interface CommonProviderOptions {
    /**
     * Uniquely identifies the provider in {@link AuthConfig.providers}
     * It's also part of the URL
     */
    id: string
    /**
     * The provider name used on the default sign-in page's sign-in button.
     * For example if it's "Google", the corresponding button will say:
     * "Sign in with Google"
     */
    name: string
    /** See {@link ProviderType} */
    type: ProviderType
}

export interface SendVerificationRequestParams {
    identifier: string
    url: string
    expires: Date
    provider: EmailConfig
    token: string
    theme: Theme
}

export interface EmailConfig extends CommonProviderOptions {
    type: "email"
    // TODO: Make use of https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
    server: string | SMTPTransportOptions
    /** @default "NextAuth <no-reply@example.com>" */
    from?: string
    /**
     * How long until the e-mail can be used to log the user in,
     * in seconds. Defaults to 1 day
     * @default 86400
     */
    maxAge?: number
    /** [Documentation](https://next-auth.js.org/providers/email#customizing-emails) */
    sendVerificationRequest: (
        params: SendVerificationRequestParams
    ) => Awaitable<void>
    /**
     * By default, we are generating a random verification token.
     * You can make it predictable or modify it as you like with this method.
     * @example
     * ```js
     *  Providers.Email({
     *    async generateVerificationToken() {
     *      return "ABC123"
     *    }
     *  })
     * ```
     * [Documentation](https://next-auth.js.org/providers/email#customizing-the-verification-token)
     */
    generateVerificationToken?: () => Awaitable<string>
    /** If defined, it is used to hash the verification token when saving to the database . */
    secret?: string
    /**
     * Normalizes the user input before sending the verification request.
     *
     * ⚠️ Always make sure this method returns a single email address.
     *
     * @note Technically, the part of the email address local mailbox element
     * (everything before the `@` symbol) should be treated as 'case sensitive'
     * according to RFC 2821, but in practice this causes more problems than
     * it solves, e.g.: when looking up users by e-mail from databases.
     * By default, we treat email addresses as all lower case,
     * but you can override this function to change this behavior.
     *
     * [Documentation](https://next-auth.js.org/providers/email#normalizing-the-e-mail-address) | [RFC 2821](https://tools.ietf.org/html/rfc2821) | [Email syntax](https://en.wikipedia.org/wiki/Email_address#Syntax)
     */
    normalizeIdentifier?: (identifier: string) => string
    options: EmailUserConfig
}

export type EmailUserConfig = Partial<Omit<EmailConfig, "options">>

export type EmailProvider = (options: EmailUserConfig) => EmailConfig

// TODO: Rename to Token provider
// when started working on https://github.com/nextauthjs/next-auth/discussions/1465
export type EmailProviderType = "Email"