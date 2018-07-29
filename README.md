# PhotoGame APP TM
A simple mobile application allows users to upload pictures that other users can vote up or vote down. 
current winner is the one whose pictures have been both viewed the  most and up-voted the most, and least down-voted.

## Onboarding
Registration is a simple process that involves entering a unique email and username. Asynchronous validation is performed like hitting a server to check the availability of a username or email as the user inputs a value in the email or password field. This way the user does not have to wait till he submits the form.

Login requires the username and password to match those in the backend database
## Onboarding Screenshots
![Alt text](https://github.com/depaulian/photogameapp/blob/master/screens1.png "Onboading screenshots")

## Photo Feed
The app performs HTTP requests through the HttpClient that comes with the HttpClientModule. All of its APIs are Observable-based. The feed is populated using a background proces which cached the requests in order to improve performance. The cache is updated every 30 seconds. Data in the UI is automatically updated. Users can post photos to storage and upload them to server through a background process.

##Photo Feed Screenshots
![Alt text](https://github.com/depaulian/photogameapp/blob/master/screens.png "Onboading screenshots")

## Technologies Used
- Asyncronous Validation using inbuilt validators
- Promises
- rxjs (map, shareReplay, switchMap, takeUntil, Subject, timer) to perform caching and manipulation of http responses
- HttpClient to perform http requests
- ionic storage to store data 

## App Testing
-update ionic-config.json and replace the proxy url value in the proxies object with that of the backend service
-When testing the app in the browser replace the apiURL in the AuthProvider with the value of the path key from ionic-config.json