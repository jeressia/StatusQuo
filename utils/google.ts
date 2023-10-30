import vision from "@google-cloud/vision";

const config = {
  private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
  client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
};

const client = new vision.ImageAnnotatorClient(config);

export default client;
