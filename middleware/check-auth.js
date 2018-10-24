export default function(context) {
  console.log("check-auth");
  context.store.dispatch("initAuth", process.client ? null : context.req);
}
