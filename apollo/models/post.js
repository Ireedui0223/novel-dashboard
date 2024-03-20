import { fileModel } from "./file";

export const postModel = `
    id 
    title
    text
    type
    link
    image{ 
        ${fileModel}
    }
`;
