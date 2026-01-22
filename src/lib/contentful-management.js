import { createClient } from "contentful-management";

export function getManagementClient() {
  return createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });
}
