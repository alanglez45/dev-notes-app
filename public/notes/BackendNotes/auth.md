# Authorization and Authentication

## What is authentication

Authentication is the process of verifying that user or device allowing access to a system or resources.
In other words, when a user attempts to access information on a network, they must provide secret credentials to prove their identity.

## Authentication factors

There are three main categories of credentials used to authenticate or verify identity:
- knowledge factor (the most common factor): verify identity by confirming users through confidential information they have, such as a login and password
- possession factor: verify their identity with a unique object such as secret key
- inherence factor: verify identity through inherent biometric characteristics of the user such a fingerprint, TouchID, FaceID, etc.

### Single-Factor Authentication

Single-factor authentication (SFA) or one-factor authentication is the simplest form of authentication method. This method involves matching one credential to verify access to a system (i.e., a username and a password). SFA is considered low-security and recently was added to list of Bad Practices.

### Two-Factor Authentication

Two-factor authentication (2FA) provides a second layer of protection resources. 2FA requires something user can prove that he is who he is (e.g., a security token, TouchID). this method is more secure because even if a user's password is stolen, the hacker will have to provide a second form of authentication to gain access.

### Three-Factor Authentication

Three-factor authentication (3FA) requires identity-confirming credentials from three separate authentication factors.

### Multi-Factor Authentication

Any process that requires two or more factors of authentication known as multi-factor authentication (MFA).

### Single Sign-On Authentication

Single sign-on (SSO) authentication allows users to access multiple accounts and applications using just one set of credentials. As an example we can consider Google, which allow users to sign in to other applications using their Google credentials. Basically, applications outsource the authentication process to a trusted third party (such as Google), which has already confirmed the user's identity.

### One-Time Password

A one-time password (OTP) is an auto-generated password that is valid for one login session and often used for MFA. For instance, a user will start to log using username and password, which then triggers the application to send an OTP to their registered phone or email. The user can use this code to complete the authentication.

### Passwordless Authentication

This method doesn't require any knowledge-based authentication factor. Usually, after entering ID, user will be prompted to authenticate through a registered device or token. SSO and MFA usually use passwordless authentication to improve the user experience and strengthen security.

### Certificate-Based Authentication

Certificate-based authentication (CBA) uses a digital certificate to identify a user or device. This certificate, also known as a public-key certificate, is an electronic document that stores the public key data, including information about the key, its owner, and the digital signature verifying the identity. CBA is often used as part of a two-factor or multi-factor authentication process.

## What is authorization

Authorization is the process of verification that authenticated user or device has access to the specific resource or functionality.

## Authorization strategies

### Role-based access control (RBAC)
In this strategy, every user is assigned one or more predetermined roles, and each role comes with a specified set of permissions.

```
app.post(`/products`, (req, res) => {
  const user = req.currentUser;
  if (user.role !== Roles.ADMIN || user.role !== Roles.MANAGER) {
    res.status(403).send("User don't have permissions to create products");
  }
    // Logic
    ...
});
```

### Attribute-based access control (ABAC)
To cope with unsolvable problems within RBAC, was developed another solution based on attributes. This strategy uses attributes of the resource and user instead of user role to allow or decline access to the resource.

For example, user can create order in the shop, this will add owner attribute to the order entity. In case if someone decided to delete this order by id, we can create function to check that attribute owner of the order is equal to attribute id of the user.

```
app.delete(`/order/:orderId`, async (req, res) => {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    const user = req.currentUser;
    if (order.owner !== user.id) {
        res.status(401).send("User don't have permissions to delete order");
    }
    // Logic
    ...
});
```

### Access-control list (ACL)
In this strategy we use list of rules that allow or deny access to the resource.

Using our example with the shop, we can create groups named product_manager and customer that has different scope of permissions to the resources. Now we can assign user to relevant groups and then based on list of permissions allow or deny access to the resource:

```
const isAccessAllowed = (resourceName, method, permissions = []) => {
    return permissions.some(perm => {
        return perm.resource = resourceName
            && perm.methods.contains(method)
            && perm.access == 'allow';
     });
}

app.post(`/products`, async (req, res) => {
    const user = req.currentUser;
    const isAllowed = isAccessAllowed('/products/*', 'POST', req.currentUser.perms);
    if (!isAllowed) {
        res.status(401).send("User don't have permissions to create product");
    }
    // Logic
    ...
});
```

### Basic authentication

Basic authentication is an authentication scheme built into the HTTP protocol and usually implemented on the web-server side. When using basic authentication, the client include the authorization header of each request it makes. This header should start with Basic word followed by a space and a base64-encoded string username:password.

As an example, we can consider user with login testuser and password testpassword. To make HTTP request with basic authentication, we need to encode string testuser:testpassword to base64 and add it to authorization header like this:
```
Authorization: Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk
```

## JSON Web Token

JSON Web Token (JWT) is an open standard that provide compact and self-contained way for securely information between components of the system as a JSON object that is digitally signed. JWT can be signed using a secret or a public/private key pair.

Authentication is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

### Token structure
- Header
- Payload
- Signature

The header is json object that consists of two parts: the token type (JWT), and the signing algorithm being used:
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (user, client) and additional data. There are three types of claims:
- registered - set of predefined claims which are not mandatory but recommended, such as iss (issuer), exp (expiration time), sub (subject)
- public - can be defined at will by those using JWTs
- private - custom claims created to share information between components of the system

```
{
  "iss": "CloudX Team",
  "sub": "auth",
  "exp": 1505467756869,
  "userId": "b08f86fa-35ba-57f3-8f1b-ads3904660bd",
  "displayName": "John Doe",
  "role": "admin"
}
```

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that. For NodeJS we can use jsonwebtoken module:
```
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY;

const token = jwt.sign(
    {
        userId: "b08f86fa-35ba-57f3-8f1b-ads3904660bd",
        "displayName": "John Doe",
        "role": "admin"
    },
    TOKEN_KEY,
    {
        expiresIn: "2h",
    }
);
```

As you can see, wee use process.env.TOKEN_KEY to provide secret key that we use to sign the token. This key also will be used to get data from the token and verify if this token valid:
```
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY;

try {
  var payload = jwt.verify(token, TOKEN_KEY);
} catch(err) {
  console.error(`Token is invalid`);
}
```

## OAuth (Optional)

Open Authorization or OAuth 2.0 is an authorization protocol designed to allow a website or an application to access resources hosted by other web apps on behalf of a user.

This protocol prevents the user from the entering his password out of the service provider: the whole process is curtailed to clicking the «I agree to provide access to ...» button. The main approach is to have one secure account, the user can use it for identity verification on other services, without disclosing his password. OAuth also can be used for authorization as well (it allows to provide the rights for the actions that the service client will use for access verification).

There are multiple trusted services such as Google, Amazon, etc. that provide OAuth. From Architecture point of view it allow us to design system using trusted service for authorization that relieves us of security responsibilities.

### Roles

The idea of roles is part of the core specification of the OAuth 2.0. The OAuth 2.0 provide the following:
- resource owner - the user or system that owns the protected resources and can grant access to them
- client - The client is the system that requires access to the protected resources
- authorization server - the server that receives requests from the client for access token
- resource server - the server that protects the user's resources and receives access requests from the client

## Identity providers (Optional)

An identity provider (IdP) is a component of the system that provides an end user or device with a single set of login credentials across multiple applications.

As an example, considered log to application using user Google Account. In this example, Google Sign-In is the identity provider.

### How do identity providers work?

IdPs communicates using languages like Security Assertion Markup Language (SAML) or data formats like Open Authorization (OAuth). Using an identity provider is convenient for users because it means they no longer must remember multiple logins.

From the service provider's point of view, this approach can be more secure for the following reasons:
- provides a central audit trail of all access events
- saves users the hassle of creating and maintaining multiple usernames and passwords with single sign-on (SSO)
- client application doesn't have to be concerned about protecting personally identifiable information (PII)

### Types of identity providers

An enterprise based identity provider used in a corporate enterprise for identity and access management (IAM).

Popular companies that offer IdP services include the following:
- Google
- Facebook
- Apple
- Microsoft
- Amazon Web Services (AWS)
