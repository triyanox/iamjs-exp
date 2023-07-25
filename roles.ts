import { Role, Schema } from "@iamjs/core";
import { ExpressRoleManager } from "@iamjs/express";

const user = new Role({
  name: "User",
  description: "The user role",
  meta: {
    color: "blue",
  },
  config: {
    users: {
      scopes: "c-udl",
      custom: {
        ban: true,
      },
    },
    pages: {
      scopes: "c-ud-",
    },
  },
});

const admin = user
  .add({
    resource: "allpages",
    permissions: {
      scopes: "crudl",
    },
  })
  .remove({ resource: "allpages" })
  .remove({ resource: "pages" })
  .remove({ resource: "users" });

const schema = new Schema({
  user,
  admin,
});

const roleManager = new ExpressRoleManager({
  schema,
  onError: (err, req, res) => {
    res.status(401).send("Unauthorized");
  },
});

export default roleManager;
export { user, admin };
