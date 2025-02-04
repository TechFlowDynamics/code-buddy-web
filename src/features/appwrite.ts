import { PROJECT_ID } from "@/core/constants/appwriteConstants";
import { Client, Databases } from "appwrite";
// import { PROJECT_ID } from "./constants";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

export const databases = new Databases(client);