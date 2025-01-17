
export async function isoFunc() {
  if (Meteor.isServer) {
    const { runTransactionWithRetry } = await import('/server/internals.ts')
    runTransactionWithRetry()
  } else {
    console.log('client!');
  }
}