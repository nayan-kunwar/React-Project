//While it's true that you can directly access environment variables from the .env file in your components without
//The need for an additional conf.js file, having a separate configuration module can offer some benefits:

//We can use .env file to access env variables but we are making another file here below are the reason:
//Abstraction and Encapsulation: Components don't need to know whether the values are from environment variables, a .env file, or some other source.

//Simplifying Component Code: Components can import the conf.js module and use its exported configuration object directly. This can make component code cleaner
//we dont have to write [ import.meta.env.VITE_APPWRITE_URL ] many time. Just write [ conf.appwriteUrl ]
//Potential for Additional Logic:
//Ease of Testing:

//[ In summary ], while using environment variables directly in components can be perfectly valid, introducing a conf.js file provides
// an additional layer of abstraction and organization, making your code more modular and potentially easier to manage in larger projects.
// The choice between these approaches often depends on the specific needs and preferences of the project and development team.
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf;
