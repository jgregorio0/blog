export default function (context) {
  if(!context.store.getters.isAuthenticated){
    console.log('not authentified, redirect to auth form')
    context.redirect('/admin/auth')
  }
}
