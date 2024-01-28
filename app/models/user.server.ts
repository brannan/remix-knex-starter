import db from "../../knex/db";
import bcrypt from "bcryptjs";

// Create and export User interface for transition to knex
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create and export Password and User interfaces for transition to knex
export interface Password {
  userId: User["id"];
  hash: string;
}

export async function getUserById(id: User["id"]): Promise<User | null> {
  try {
    const user = await db<User>("User").where({ id }).first();
    return user || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserByEmail(email: User["email"]): Promise<User | null> {
  try {
    const user = await db<User>("User").where({ email }).first();
    return user || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(
  email: User["email"],
  password: Password["hash"],
): Promise<User> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { nanoid } = await import("nanoid");

    const user: User = await db.transaction(async (t) => {
      const [createdUser] = await t<User>("User")
        .insert({
          id: nanoid(),
          email,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning("*");

      await t<Password>("Password").insert({
        userId: createdUser.id,
        hash: hashedPassword,
      });

      return createdUser;
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUserByEmail(email: User["email"]): Promise<boolean> {
  try {
    await db<User>("User").where(email).del();
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

type UserWithPassword = Partial<User> & { id: string, email: string } & Pick<Password, "hash">;
type UserWithoutPassword = { id: string, email: string } & Partial<User>;

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
): Promise<Partial<UserWithoutPassword> | null> {
  console.log(`verifyLogin: ${email} ${password}`);
  try {
    const userWithPassword: UserWithPassword = await db("User")
      .select("User.*", "Password.hash")
      .join("Password", "Password.userId", "User.id")
      .where({ email })
      .first();

    //console.log(`userWithPassword: ${JSON.stringify(userWithPassword, null, 3)}`);

    // TODO: Is checking userWithPassword.password necessary?
    if (!userWithPassword || !userWithPassword.hash || !userWithPassword.id) {
      return null;
    }

    const isValid = await bcrypt.compare(
      password,
      userWithPassword.hash,
    );

    if (!isValid) {
      return null;
    }

    const userWithoutPassword: UserWithoutPassword = {
      ...userWithPassword,
      //hash: undefined, // Explicitly exclude password
    };
    console.log(`verified user: ${email}`);
    return userWithoutPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
