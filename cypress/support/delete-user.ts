// Use this to delete a user by their email
// Simply call this with:
// npx ts-node -r tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com,
// and that user will get deleted
import { installGlobals } from "@remix-run/node";

import db from "../../knex/db";

installGlobals();

async function deleteUser(email: string) {
  if (!email) {
    throw new Error("email required for login");
  }
  if (!email.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  try {
    const deletedRows = await db("User").where({ email }).delete();
    if (deletedRows === 0) {
      console.log(`No user found with email ${email}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await db.destroy();
  }
}

deleteUser(process.argv[2]);
