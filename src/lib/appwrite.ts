// src/lib/appwrite.ts - Oppdatert for Appwrite v18
import { Client, Databases, Account, Query } from "appwrite";

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint(
    (import.meta.env.VITE_APPWRITE_ENDPOINT as string) ||
      "https://cloud.appwrite.io/v1",
  )
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Database and Collection IDs
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID || "main";

export const COLLECTIONS = {
  NYHETER:
    import.meta.env.VITE_NYHETER || "nyheter",

} as const;

// Export Query for filtering (Appwrite v18)
export { Query };

// Helper function for creating documents with proper error handling
export const createDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Record<string, unknown>,
) => {
  try {
    return await databases.createDocument(
      databaseId,
      collectionId,
      documentId,
      data,
    );
  } catch (error) {
    console.error("Failed to create document:", error);
    throw error;
  }
};

// Helper function for updating documents
export const updateDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: Record<string, unknown>,
) => {
  try {
    return await databases.updateDocument(
      databaseId,
      collectionId,
      documentId,
      data,
    );
  } catch (error) {
    console.error("Failed to update document:", error);
    throw error;
  }
};

// Helper function for listing documents with optional queries
export const listDocuments = async (
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
) => {
  try {
    return await databases.listDocuments(databaseId, collectionId, queries);
  } catch (error) {
    console.error("Failed to list documents:", error);
    throw error;
  }
};

// Helper function for getting a single document
export const getDocument = async (
  databaseId: string,
  collectionId: string,
  documentId: string,
) => {
  try {
    return await databases.getDocument(databaseId, collectionId, documentId);
  } catch (error) {
    console.error("Failed to get document:", error);
    throw error;
  }
};

export { client };