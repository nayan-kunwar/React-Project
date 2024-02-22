import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//This is a [ Authentication service ].
// If backend service will changes in future only this service or file will change
export class AuthService {
  //Class fields are similar to object properties, not variables, so we don't use keywords such as const to declare them.
  client = new Client();
  account;

  //When someone will create object then client will be made.
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  //----------SignUp--------------------------------
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // When user is created directly login that user.
        return this.login({ email, password })
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //----------SignIn [Login]-----------------
  async login({ email, password }) {
    try {
        //Directly return dont hold in a variable when we will make login page in frontend then we will handle this.
       return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //-------------Get the currently logged in user.---------------
  async getCurrentUser(){
    try {
        //Documentation appwrite: https://appwrite.io/docs/references/cloud/client-web/account#get
        // Attempt to get the current user using the Appwrite SDK's account.get() method
        return await this.account.get()
    } catch (error) { 
        // catch is used when we were not able to access appwrite service. In this case error will be thrown and handled by catch block
        //Using a , with console.log separates arguments with spaces.

        // // If there's an error during the Appwrite SDK call, log the error
        console.log("Appwrite Service :: getCurrentuser :: error", error );
    }

    // This case is used when execution did not went to try block, in that case we have to return null
    // If there was an error or any other issue, return null
    return null 
  }

  //---- Logout----------
  async logout(){
    try {
        //Delete all sessions
        await this.account.deleteSessions() 
    } catch (error) {
        console.log("Appwrite Service :: logout :: error", error );
    }
  }

}

const authService = new AuthService();

//export object not class AuthService because if we export class then whenver we want to access we need to create an object of class.
//So directly create an object and export it.
export default authService;
