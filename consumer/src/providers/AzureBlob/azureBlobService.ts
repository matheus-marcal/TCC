import  {BlobServiceClient}  from "@azure/storage-blob"

import dotenv from  'dotenv'
dotenv.config()

const sasToken = process.env.AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.AZURE_STORAGE_RESOURCE_NAME;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME?process.env.AZURE_STORAGE_CONTAINER_NAME:'tcc1';

const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

const blobServiceClient = new BlobServiceClient(uploadUrl);

export default class azureBlobService{
    static async uploadFile(contentfile:string, fileName:string){
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobName = fileName;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(contentfile, contentfile.length);
    }
}

