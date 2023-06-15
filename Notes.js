// What is express?
//It is a minimal nodejs framework.
//basically its a higher level of abstraction build on top of  node.js, also it is written in node.js
//Express contains a very robust set of features:- complex routing, easier handling of requess and responses, miidleware server side rendering etc.,
//Express makes it easier to organize the into the mvc architecture.

//API:--
// Application Programming Interface, a piee of software that can be used by another software , in order to aallow applications to talk to each other.

//REST Api's :---- Representationsl States Transfer is basically a way of building web api's in a logical way.

//Principles of writing rest API.
//1- separate api into logical resources
//Resources-> object or representation of something , which has data associsated to it. Any information that can be named can be a resource.

//2- Expose Structure- Resource based Urls

//3- Using HTTp Methods for writing better url for crud operations

//4- using json for data interchanging.

//Stateless restfull Api-> all state is handled on the client . this means that each request must contain all the information necessary to process a certain request.

//Param Middleware
//It is a middleware that only runs on certain parameters, so basically when we have certain parameters in your url.

//Static Files:--
//Its the file which is sitting in our file system which we currently can't access using our routes.
//to serve this we need to use Built-in Middleware i.e, Express.static('directory name')

//Envuronment Variables.
//express by default sets the environment as development env.
//We use environment variables for stuffs like configuration setting of our application
//So whenever our app need some configuration for stuff that might change based on the environment
// that the app is running in we use environment variables.

//Mongoose
//What actually is mongoose:-
//It is a mongodb object modeling tool.
//It is a high level abstraction.
//Moongoose allows for rapid and simple development of mongodb database interactions.
//Mongoose schema:- Where we model our data , by describing the structure of the data, default values and validation.

//Aggregation Pipeline
//mongodb framework for data aggregation
