export default function (context) {
  context.store.dispatch('initAuth', process.client ? null : context.req)
}
