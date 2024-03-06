# Deploy on render
https://www.freecodecamp.org/news/how-to-deploy-nodejs-application-with-render/

https://victoriacheng15.vercel.app/posts/a-simple-guide-to-setting-up-and-deploying-node-with-typescript/

https://medium.com/nmc-techblog/how-to-deploy-a-ts-node-js-app-in-minutes-e3ab17ab0673

https://www.geeksforgeeks.org/how-to-deploy-node-js-express-application-on-render/

https://medium.com/@svbala99/set-up-a-simple-express-server-and-deploy-it-for-free-on-render-com-1d770722d235


/// auth with cookies 
That's correct. While using HTTPS and setting the Secure flag on the cookie sent by your backend is crucial for security, the cookie won't automatically get included in every subsequent request from the Flutter app, unlike a web browser. This behavior is due to the way web browsers and Flutter apps handle cookies differently.

Key Differences:

    Web Browser Behavior: Web browsers typically store and manage cookies automatically based on the Set-Cookie header in responses. When making subsequent requests to the same domain, the browser includes all relevant cookies, including secure ones, in the request headers.
    Flutter App Behavior: Flutter apps rely on libraries like Dio and http_cookie to manage cookies. These libraries require explicit handling to ensure that received cookies, even those with the Secure flag, are included in subsequent requests.

Approaches to achieve automatic inclusion in Flutter:

    CookieJar with Secure Storage:
        Use Dio's CookieJar to manage cookies automatically.
        Combine it with secure storage (e.g., SharedPreferences) to store the received JWT token from the initial login or refresh response.
        Before each request, retrieve the token from secure storage and manually add it as a Cookie object to the cookieJar.
        Set the cookies property in Dio options to the cookieJar to ensure it uses those cookies for subsequent requests.

    Manual Extraction and Inclusion:
        Use http_cookie to parse the Set-Cookie header from the response and extract the JWT token.
        Manually add the extracted token as a Cookie object to Dio's request headers before sending each request.

Recommendation:

The first approach using CookieJar and secure storage is generally recommended because it offers a more automated and efficient way to handle cookies while maintaining security using secure storage. It simplifies your code and ensures the token is included in requests transparently.

Additional Notes:

    HTTP Cookie Library: Always use an appropriate library like http_cookie to handle parsing and working with cookies in your Flutter app.
    Secure Flag: Ensure the Secure flag is set on the backend cookie to ensure it's only sent over HTTPS connections.

By understanding the differences between web browsers and Flutter apps, and following the recommended approach, you can effectively manage secure cookies and ensure they are included in subsequent requests from your Flutter application for secure communication with your backend.