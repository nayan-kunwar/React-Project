// Post and file related service
import conf from "../conf/conf.js";
import { Client, Storage, ID, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //---------------------Create a post/document------------------------------------
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      //https://appwrite.io/docs/products/databases/quick-start#create-documents
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // here unique id is slug
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error", error);
    }
  }

  //------------------------Update post/document--------------------------
  //https://appwrite.io/docs/references/cloud/client-web/databases

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: error", error);
    }
  }

  //--------------------Delete post/document----------------------------
  //https://appwrite.io/docs/references/cloud/client-web/databases#deleteDocument
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true; // true will be return when post deleted succesfully
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error", error);
      return false;
    }
  }

  //------------Get single post/document------------------
  //https://appwrite.io/docs/references/cloud/client-web/databases#getDocument
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);
      return false;
    }
  }

  //------------Get all posts with active status--------------
  //https://appwrite.io/docs/references/cloud/client-web/databases#listDocuments
  async getPosts(queries = [Query.equal("status", "active")]) {
    // here [ status ] is key that we have make in appwrite service. key should be used here
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service :: getPosts :: error", error);
      return false;
    }
  }

  //file uplaod services

  //----------Create file-------------
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }

  //-------Delete file--------------
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }

  //-------Get file preview---------
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
